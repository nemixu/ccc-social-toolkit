import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import Sidebar from "./components/Sidebar";
import Templates from "./components/Templates";
import Toast from "./components/Toast";
import hashtagSets from "./data/hashtags";

const defaultLogo = "/assets/ccc-trans.png";

const initialBanner = {
  line1: "CLONDALKIN",
  line2: "CYCLING CLUB",
  tagline: "Dublin · All abilities welcome",
  handle: "@clondalkincyclingclub",
};

const initialSpin = {
  day: "Sunday",
  h1: "SPIN",
  h2: "DAY.",
  time: "10:00 AM",
  loc: "Council Offices, Clondalkin",
  note: "All abilities welcome · Helmet required · Bring a tube",
  handle: "@clondalkincyclingclub",
};

const initialResult = {
  pill: "Well done lads",
  km: "87",
  route: "Wicklow Gap Loop",
  elev: "1,240",
  time: "3:15",
  riders: "24",
  handle: "@clondalkincyclingclub",
};

const initialSchedule = {
  title: "This Week's Rides",
  tueInfo: "Evening spin · Council Offices",
  tueTime: "7:00 PM",
  thuInfo: "Evening spin · Council Offices",
  thuTime: "7:00 PM",
  sunInfo: "Main spin · Council Offices",
  sunTime: "10:00 AM",
  web: "clondalkincycle.com",
  handle: "@clondalkincyclingclub",
};

const FIRESTORE_ROUTE_COLLECTION = "spinRoutes";

const DEFAULT_ROUTE_CATEGORIES = [
  { key: "hilly", label: "Hilly", routes: [] },
  { key: "flat", label: "Flat", routes: [] },
  { key: "cafe", label: "Cafe Spins", routes: [] },
  { key: "intergroup", label: "Inter Group", routes: [] },
  { key: "training", label: "Training Spins", routes: [] },
];

function groupRoutesByCategory(routes) {
  const grouped = {
    hilly: [],
    flat: [],
    cafe: [],
    intergroup: [],
    training: [],
  };

  routes.forEach((route) => {
    const key = route.category || route.categoryKey || "flat";
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(route);
  });

  return DEFAULT_ROUTE_CATEGORIES.map((category) => ({
    ...category,
    routes: grouped[category.key] || [],
  }));
}

function App() {
  const [activeTab, setActiveTab] = useState("banner");
  const [logo, setLogo] = useState(defaultLogo);
  const [logoIsTransparent, setLogoIsTransparent] = useState(false);
  const [bannerData, setBannerData] = useState(initialBanner);
  const [spinData, setSpinData] = useState(initialSpin);
  const [resultData, setResultData] = useState(initialResult);
  const [scheduleData, setScheduleData] = useState(initialSchedule);
  const [routeCategories, setRouteCategories] = useState(
    DEFAULT_ROUTE_CATEGORIES,
  );
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedRouteId, setCopiedRouteId] = useState(null);
  const toastTimer = useRef(null);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => {
      setToastVisible(false);
    }, 2200);
  };

  const handleLogoUpload = (src, transparent) => {
    setLogo(src);
    setLogoIsTransparent(transparent);
    showToast("Logo updated!");
  };

  const copyHashtags = async (index, tagString) => {
    try {
      await navigator.clipboard.writeText(tagString);
      setCopiedIndex(index);
      showToast("Hashtags copied!");
      window.setTimeout(() => setCopiedIndex(null), 2500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = tagString;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedIndex(index);
      showToast("Hashtags copied!");
      window.setTimeout(() => setCopiedIndex(null), 2500);
    }
  };

  const categorizeRoute = (route) => {
    const elevationValue = parseFloat(route.elevation.replace(/[^0-9.]/g, ""));
    const notes = (route.notes || "").toLowerCase();
    const title = (route.title || "").toLowerCase();

    if (!Number.isNaN(elevationValue) && elevationValue > 600) {
      return "hilly";
    }
    if (notes.includes("training") || title.includes("training")) {
      return "training";
    }
    if (notes.includes("cafe") || title.includes("cafe")) {
      return "cafe";
    }
    if (notes.includes("inter") || title.includes("group")) {
      return "intergroup";
    }
    return "flat";
  };

  const addRoute = async (routeData) => {
    const categoryKey = categorizeRoute(routeData);
    const routeToSave = {
      ...routeData,
      category: categoryKey,
      createdAt: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(
        collection(db, FIRESTORE_ROUTE_COLLECTION),
        routeToSave,
      );

      const newRoute = {
        id: docRef.id,
        ...routeData,
        category: categoryKey,
      };

      setRouteCategories((categories) =>
        categories.map((category) =>
          category.key === categoryKey
            ? { ...category, routes: [...category.routes, newRoute] }
            : category,
        ),
      );

      setSelectedRoute(newRoute);
      showToast("Route saved to Firestore!");
    } catch (error) {
      console.error("Failed to save route:", error);
      showToast("Unable to save route. Check Firebase setup.");
    }
  };

  const selectRoute = (route) => {
    setSelectedRoute(route);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const routesQuery = query(
      collection(db, FIRESTORE_ROUTE_COLLECTION),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      routesQuery,
      (snapshot) => {
        const routes = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        setRouteCategories(groupRoutesByCategory(routes));
      },
      (error) => {
        console.error("Firestore route snapshot failed:", error);
      },
    );

    return unsubscribe;
  }, []);

  const copyRouteUrl = async (route) => {
    if (!route?.url) {
      return;
    }

    try {
      await navigator.clipboard.writeText(route.url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = route.url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopiedRouteId(route.id);
    showToast("Route URL copied!");
    window.setTimeout(() => setCopiedRouteId(null), 2200);
  };

  const downloadTemplate = async (templateId, filename) => {
    const element = document.getElementById(templateId);
    if (!element) {
      showToast("Template not found");
      return;
    }

    showToast("Generating PNG...");

    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#090f09",
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      showToast("Saved!");
    } catch {
      showToast("Screenshot failed — try right-click > Save");
    }
  };

  return (
    <div className="app">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        logo={logo}
        logoIsTransparent={logoIsTransparent}
        bannerData={bannerData}
        setBannerData={setBannerData}
        spinData={spinData}
        setSpinData={setSpinData}
        resultData={resultData}
        setResultData={setResultData}
        scheduleData={scheduleData}
        setScheduleData={setScheduleData}
        routeCategories={routeCategories}
        onAddRoute={addRoute}
        hashtags={hashtagSets}
        copiedIndex={copiedIndex}
        copyHashtags={copyHashtags}
        downloadTemplate={downloadTemplate}
        onLogoUpload={handleLogoUpload}
      />

      <main className="canvas">
        <div className="canvas-label">
          {activeTab === "banner" && "Cover Banner"}
          {activeTab === "spin" && "Sunday Spin Post"}
          {activeTab === "result" && "Ride Result Post"}
          {activeTab === "schedule" && "Weekly Schedule Post"}
          {activeTab === "spinroutes" && "Spin Routes"}
          {activeTab === "hashtags" && "Hashtags"}
        </div>
        <Templates
          activeTab={activeTab}
          logo={logo}
          logoIsTransparent={logoIsTransparent}
          bannerData={bannerData}
          spinData={spinData}
          resultData={resultData}
          scheduleData={scheduleData}
          selectedRoute={selectedRoute}
          routeCategories={routeCategories}
          onSelectRoute={selectRoute}
          onCopyRoute={copyRouteUrl}
          copiedRouteId={copiedRouteId}
        />
      </main>

      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  );
}

export default App;
