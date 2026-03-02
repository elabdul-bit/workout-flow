import { useState, useEffect, useRef } from "react";

// ─── Exercise Library ─────────────────────────────────────────────────────────
const EXERCISE_LIBRARY = {
  "Squat Variations": [
    { name: "Back Squat", variants: ["High bar", "Low bar", "Narrow stance", "Wide stance"] },
    { name: "Front Squat", variants: ["Barbell", "Dumbbell", "Goblet"] },
    { name: "Pause Squat", variants: ["High bar", "Low bar", "Front"] },
    { name: "Box Squat", variants: ["High bar", "Low bar", "Wide stance"] },
    { name: "Safety Bar Squat", variants: ["Standard", "Cambered"] },
    { name: "Hack Squat", variants: ["Machine", "Barbell"] },
    { name: "Bulgarian Split Squat", variants: ["Barbell", "Dumbbell", "Bodyweight"] },
    { name: "Goblet Squat", variants: ["Kettlebell", "Dumbbell"] },
    { name: "Overhead Squat", variants: ["Barbell", "Dumbbell"] },
    { name: "Pistol Squat", variants: ["Bodyweight", "Assisted", "Weighted"] },
    { name: "Heel Elevated Squat", variants: ["Barbell", "Dumbbell", "Goblet"] },
  ],
  "Hip Hinge / Deadlift": [
    { name: "Conventional Deadlift", variants: ["Standard", "Pause at knee", "Deficit", "Rack pull"] },
    { name: "Sumo Deadlift", variants: ["Standard", "Pause at knee", "Deficit"] },
    { name: "Romanian Deadlift", variants: ["Barbell", "Dumbbell", "Single leg"] },
    { name: "Trap Bar Deadlift", variants: ["High handles", "Low handles", "Single leg"] },
    { name: "Good Morning", variants: ["Barbell", "Safety bar", "Seated"] },
    { name: "Hip Thrust", variants: ["Barbell", "Dumbbell", "Banded", "Single leg"] },
    { name: "Nordic Hamstring Curl", variants: ["Bodyweight", "Weighted"] },
    { name: "Kettlebell Swing", variants: ["Two-hand", "One-hand", "American"] },
    { name: "Power Clean", variants: ["Barbell", "Hang", "From blocks"] },
  ],
  "Quad / Knee Dominant": [
    { name: "Leg Press", variants: ["Standard", "Narrow", "Wide", "Single leg", "High foot"] },
    { name: "Leg Extension", variants: ["Bilateral", "Single leg"] },
    { name: "Step-up", variants: ["Barbell", "Dumbbell", "Lateral", "Crossover"] },
    { name: "Lunge", variants: ["Walking", "Reverse", "Lateral", "Curtsy", "Overhead"] },
    { name: "Sled Push", variants: ["Heavy", "Moderate", "Sprint"] },
  ],
  "Hamstring / Posterior Chain": [
    { name: "Leg Curl", variants: ["Lying", "Seated", "Standing", "Single leg"] },
    { name: "Glute-ham Raise", variants: ["Bodyweight", "Weighted"] },
    { name: "Swiss Ball Leg Curl", variants: ["Standard", "Single leg"] },
  ],
  "Calf": [
    { name: "Standing Calf Raise", variants: ["Machine", "Barbell", "Dumbbell", "Single leg"] },
    { name: "Seated Calf Raise", variants: ["Machine", "Dumbbell"] },
    { name: "Leg Press Calf Raise", variants: ["Bilateral", "Single leg"] },
  ],
  "Horizontal Push (Chest)": [
    { name: "Barbell Bench Press", variants: ["Flat", "Incline", "Decline", "Close grip", "Pause", "Spoto press"] },
    { name: "Dumbbell Bench Press", variants: ["Flat", "Incline", "Decline", "Neutral grip"] },
    { name: "Machine Chest Press", variants: ["Flat", "Incline", "Converging"] },
    { name: "Push-up", variants: ["Standard", "Wide", "Diamond", "Archer", "Decline", "Incline", "Ring"] },
    { name: "Dip", variants: ["Chest", "Tricep", "Weighted", "Ring"] },
    { name: "Floor Press", variants: ["Barbell", "Dumbbell", "Kettlebell"] },
  ],
  "Chest Fly / Isolation": [
    { name: "Cable Fly", variants: ["Low cable", "Mid cable", "High cable", "Single arm"] },
    { name: "Dumbbell Fly", variants: ["Flat", "Incline", "Decline"] },
    { name: "Pec Deck", variants: ["Standard"] },
  ],
  "Vertical Push (Shoulders)": [
    { name: "Overhead Press", variants: ["Barbell", "Dumbbell", "Behind neck", "Push press", "Seated", "Standing"] },
    { name: "Arnold Press", variants: ["Seated", "Standing"] },
    { name: "Z-Press", variants: ["Barbell", "Dumbbell"] },
    { name: "Dumbbell Shoulder Press", variants: ["Seated", "Standing", "Single arm", "Alternating"] },
    { name: "Handstand Push-up", variants: ["Wall-supported", "Freestanding", "Pike"] },
  ],
  "Shoulder Isolation": [
    { name: "Lateral Raise", variants: ["Dumbbell", "Cable", "Machine", "Band", "Leaning"] },
    { name: "Front Raise", variants: ["Dumbbell", "Barbell", "Cable", "Plate"] },
    { name: "Rear Delt Fly", variants: ["Dumbbell", "Cable", "Machine", "Band"] },
    { name: "Face Pull", variants: ["Rope", "Band", "Single arm"] },
    { name: "Shrug", variants: ["Barbell", "Dumbbell", "Trap bar", "Cable", "Machine"] },
  ],
  "Vertical Pull (Back Width)": [
    { name: "Pull-up", variants: ["Wide grip", "Shoulder width", "Neutral grip", "Close grip", "Weighted", "Band-assisted"] },
    { name: "Chin-up", variants: ["Standard", "Close grip", "Weighted", "L-sit"] },
    { name: "Lat Pulldown", variants: ["Wide grip", "Close grip", "Neutral grip", "Single arm", "Behind neck", "Straight arm"] },
    { name: "Straight Arm Pulldown", variants: ["Bar", "Rope", "Single arm"] },
    { name: "Pullover", variants: ["Dumbbell", "Barbell", "Cable", "Machine"] },
  ],
  "Horizontal Pull (Back Thickness)": [
    { name: "Barbell Row", variants: ["Overhand", "Underhand", "Pendlay", "Yates", "Wide grip"] },
    { name: "Dumbbell Row", variants: ["Single arm", "Chest-supported", "Meadows row", "Kroc row"] },
    { name: "Seated Cable Row", variants: ["Wide grip", "Close grip", "Single arm", "Rope"] },
    { name: "T-Bar Row", variants: ["Standard", "Chest-supported", "Landmine"] },
    { name: "Inverted Row", variants: ["Overhand", "Underhand", "Ring", "Weighted"] },
  ],
  "Biceps": [
    { name: "Barbell Curl", variants: ["Standard", "EZ-bar", "Wide grip", "Reverse grip"] },
    { name: "Dumbbell Curl", variants: ["Standard", "Hammer", "Incline", "Concentration", "Spider", "Alternating"] },
    { name: "Preacher Curl", variants: ["Barbell", "EZ-bar", "Dumbbell", "Cable", "Machine"] },
    { name: "Cable Curl", variants: ["Straight bar", "EZ-bar", "Rope", "Single arm", "Behind back"] },
    { name: "Zottman Curl", variants: ["Standard", "Incline"] },
  ],
  "Triceps": [
    { name: "Tricep Pushdown", variants: ["Rope", "Straight bar", "V-bar", "Single arm", "Reverse grip"] },
    { name: "Skull Crusher", variants: ["Barbell", "EZ-bar", "Dumbbell", "Cable"] },
    { name: "Overhead Tricep Extension", variants: ["Barbell", "Dumbbell", "Cable", "Rope", "Single arm"] },
    { name: "Close Grip Bench Press", variants: ["Standard", "Floor press", "Incline"] },
    { name: "Kickback", variants: ["Dumbbell", "Cable", "Single arm"] },
  ],
  "Forearms / Grip": [
    { name: "Wrist Curl", variants: ["Barbell", "Dumbbell", "Cable"] },
    { name: "Reverse Curl", variants: ["Barbell", "EZ-bar", "Dumbbell", "Cable"] },
    { name: "Farmer's Walk", variants: ["Dumbbell", "Trap bar", "Kettlebell"] },
    { name: "Dead Hang", variants: ["Double overhand", "Single arm", "Towel"] },
  ],
  "Core — Anterior": [
    { name: "Plank", variants: ["Standard", "Weighted", "RKC", "Long lever"] },
    { name: "Ab Wheel Rollout", variants: ["Kneeling", "Standing", "Single arm"] },
    { name: "Cable Crunch", variants: ["Rope", "Single arm", "Kneeling"] },
    { name: "Hanging Leg Raise", variants: ["Straight leg", "Bent knee", "Toes to bar"] },
    { name: "Dead Bug", variants: ["Standard", "Weighted", "Band"] },
    { name: "Hollow Body Hold", variants: ["Standard", "Rocking"] },
  ],
  "Core — Lateral / Rotational": [
    { name: "Pallof Press", variants: ["Standard", "Overhead", "Half-kneeling", "Tall-kneeling"] },
    { name: "Side Plank", variants: ["Standard", "Weighted", "With hip dip"] },
    { name: "Cable Woodchop", variants: ["High to low", "Low to high", "Horizontal"] },
    { name: "Suitcase Carry", variants: ["Dumbbell", "Kettlebell"] },
  ],
  "Core — Extension": [
    { name: "Back Extension", variants: ["Bodyweight", "Weighted", "45°", "GHD"] },
    { name: "Bird Dog", variants: ["Standard", "Weighted", "Band"] },
    { name: "Reverse Hyperextension", variants: ["Standard", "Weighted"] },
  ],
  "Cardio / Conditioning": [
    { name: "Assault Bike", variants: ["Steady state", "Intervals", "Max effort"] },
    { name: "Rowing (Erg)", variants: ["Steady state", "Intervals", "500m repeats"] },
    { name: "Ski Erg", variants: ["Steady state", "Intervals"] },
    { name: "Treadmill Run", variants: ["Easy pace", "Tempo", "Intervals", "Incline walk"] },
    { name: "Battle Ropes", variants: ["Waves", "Slams", "Circles"] },
    { name: "Box Jump", variants: ["Standard", "Broad jump", "Depth jump"] },
    { name: "Burpee", variants: ["Standard", "Box jump", "Pull-up"] },
  ],
};

// ─── RPE Table ────────────────────────────────────────────────────────────────
const RPE_PCT = {
  10:  {1:1.000,2:0.955,3:0.922,4:0.892,5:0.863,6:0.837,7:0.811,8:0.786,9:0.762,10:0.739},
  9.5: {1:0.978,2:0.939,3:0.906,4:0.877,5:0.850,6:0.824,7:0.799,8:0.774,9:0.750,10:0.728},
  9:   {1:0.955,2:0.922,3:0.892,4:0.863,5:0.837,6:0.811,7:0.786,8:0.762,9:0.739,10:0.707},
  8.5: {1:0.939,2:0.906,3:0.877,4:0.850,5:0.824,6:0.799,7:0.774,8:0.750,9:0.728,10:0.694},
  8:   {1:0.922,2:0.892,3:0.863,4:0.837,5:0.811,6:0.786,7:0.762,8:0.739,9:0.707,10:0.680},
  7.5: {1:0.906,2:0.877,3:0.850,4:0.824,5:0.799,6:0.774,7:0.750,8:0.728,9:0.694,10:0.667},
  7:   {1:0.892,2:0.863,3:0.837,4:0.811,5:0.786,6:0.762,7:0.739,8:0.707,9:0.680,10:0.654},
  6.5: {1:0.877,2:0.850,3:0.824,4:0.799,5:0.774,6:0.750,7:0.728,8:0.694,9:0.667,10:0.641},
  6:   {1:0.863,2:0.837,3:0.811,4:0.786,5:0.762,6:0.739,7:0.707,8:0.680,9:0.654,10:0.629},
};
const RPE_KEYS = [6,6.5,7,7.5,8,8.5,9,9.5,10];
const REP_KEYS = [1,2,3,4,5,6,7,8,9,10];

function calc1RM(weight, reps, rpe) {
  if (!weight || !reps || !rpe) return null;
  const t = RPE_PCT[parseFloat(rpe)]; if (!t) return null;
  const p = t[Math.min(Math.max(Math.round(reps), 1), 10)];
  return p ? Math.round(weight / p) : null;
}
function calcWeight(e1rm, reps, rpe) {
  if (!e1rm || !reps || !rpe) return null;
  const t = RPE_PCT[parseFloat(rpe)]; if (!t) return null;
  const p = t[Math.min(Math.max(Math.round(reps), 1), 10)];
  return p ? Math.round((e1rm * p) / 2.5) * 2.5 : null;
}

// ─── Progression Logic ────────────────────────────────────────────────────────
function getProgressiveLoad_Linear(history, exerciseName, prescription) {
  if (!prescription) return { weight: null, reps: prescription?.reps || 5, label: null };
  for (let i = 0; i < history.length; i++) {
    const ex = history[i].exercises.find(e => e.name === exerciseName);
    if (!ex || !ex.sets?.length) continue;
    const valid = ex.sets.filter(s => s.weight > 0 && s.reps > 0);
    if (!valid.length) continue;
    const topW = Math.max(...valid.map(s => s.weight));
    const top = valid.filter(s => s.weight === topW);
    const last = top[top.length - 1];
    const repCap = prescription.reps + 1;
    if (last.reps >= repCap) {
      return { weight: last.weight + 5, reps: prescription.reps, label: `+5 lbs from ${last.weight}` };
    } else {
      return { weight: last.weight, reps: last.reps + 1, label: `+1 rep at ${last.weight} lbs` };
    }
  }
  return { weight: null, reps: prescription.reps, label: "First session" };
}

function getProgressiveLoad_E1RM(history, exerciseName, prescription) {
  if (!prescription) return { weight: null, reps: prescription?.reps || 5, label: null };
  const e1rms = [];
  for (let i = 0; i < history.length && e1rms.length < 3; i++) {
    const ex = history[i].exercises.find(e => e.name === exerciseName);
    if (!ex || !ex.sets?.length) continue;
    let best = 0;
    ex.sets.forEach(s => { const e = calc1RM(s.weight, s.reps, s.rpe); if (e && e > best) best = e; });
    if (best > 0) e1rms.push(best);
  }
  if (!e1rms.length) return { weight: null, reps: prescription.reps, label: "First session" };
  const avgE1RM = Math.round(e1rms.reduce((a, b) => a + b, 0) / e1rms.length);
  const target1RM = Math.round(avgE1RM * 1.01);
  const w = calcWeight(target1RM, prescription.reps, prescription.rpe);
  return { weight: w, reps: prescription.reps, label: `Avg E1RM ${avgE1RM} → target ${target1RM} (+1%)` };
}

function getProgressiveLoad(history, exerciseName, prescription, mode) {
  return mode === "e1rm"
    ? getProgressiveLoad_E1RM(history, exerciseName, prescription)
    : getProgressiveLoad_Linear(history, exerciseName, prescription);
}

// ─── Storage — ALL shared so data survives across sessions ───────────────────
// Keys:
//   wf3:users          → { [username]: { hash } }          (shared)
//   wf3:session        → { username }                       (shared)
//   wf3:data:[user]    → { templates, history, settings }  (shared)

const SK = {
  users:    "wf3:users",
  session:  "wf3:session",
  data:     u => `wf3:data:${u}`,
};

async function sGet(key) {
  try {
    const r = await window.storage.get(key, true);
    if (!r || !r.value) return null;
    return JSON.parse(r.value);
  } catch { return null; }
}

async function sSet(key, val) {
  try {
    await window.storage.set(key, JSON.stringify(val), true);
    return true;
  } catch { return false; }
}

function hashPass(username, password) {
  // Simple deterministic hash — not cryptographic but sufficient for this use case
  const str = `${username}|${password}|wf3`;
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return h.toString(36);
}

// ─── Colors ───────────────────────────────────────────────────────────────────
const C = {
  bg:"#0f0f13", card:"#17171f", border:"#2a2a38",
  accent:"#4f9cf9", accentDim:"#1e3a5f",
  text:"#f0f0f8", muted:"#6b6b82", mutedLight:"#9090a8",
  success:"#34d399", warning:"#fbbf24", danger:"#f87171",
  inputBg:"#1e1e2a", inputBorder:"#2e2e40", tabBg:"#13131a",
  purple:"#a78bfa", purpleDim:"#2d1b69",
};
const IS = {
  background:C.inputBg, border:`1px solid ${C.inputBorder}`, borderRadius:8,
  color:C.text, fontSize:14, fontWeight:600, padding:"6px 4px",
  textAlign:"center", width:"100%", fontFamily:"'DM Mono',monospace", outline:"none",
};

// ═══════════════════════════════════════════════════════════════════════════════
// AUTH SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [storageOk, setStorageOk] = useState(null); // null=checking, true, false

  // Test storage on mount
  useEffect(() => {
    async function test() {
      const ok = await sSet("wf3:ping", { t: Date.now() });
      setStorageOk(ok);
    }
    test();
  }, []);

  const handleSubmit = async () => {
    setError(""); setLoading(true);
    const u = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_");
    const p = password.trim();
    if (!u || !p) { setError("Fill in both fields."); setLoading(false); return; }
    if (u.length < 3) { setError("Username must be at least 3 characters."); setLoading(false); return; }
    if (p.length < 4) { setError("Password must be at least 4 characters."); setLoading(false); return; }

    const users = (await sGet(SK.users)) || {};
    const hash = hashPass(u, p);

    if (mode === "signup") {
      if (users[u]) { setError("Username taken. Try logging in."); setLoading(false); return; }
      users[u] = { hash, created: Date.now() };
      const saved = await sSet(SK.users, users);
      if (!saved) { setError("Storage error — could not save account."); setLoading(false); return; }
      // Initialize empty data for new user
      await sSet(SK.data(u), { templates: [], history: [], settings: { age:"", sex:"", weight:"", progressionMode:"linear" } });
      await sSet(SK.session, { username: u });
      onLogin(u);
    } else {
      if (!users[u]) { setError("No account found. Sign up first."); setLoading(false); return; }
      if (users[u].hash !== hash) { setError("Incorrect password."); setLoading(false); return; }
      await sSet(SK.session, { username: u });
      onLogin(u);
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{marginBottom:32,textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:8}}>🏋️</div>
        <div style={{color:C.text,fontSize:28,fontWeight:800,letterSpacing:"-0.5px"}}>Workout Flow</div>
        <div style={{color:C.muted,fontSize:14,marginTop:4}}>Track. Analyze. Progress.</div>
      </div>

      {storageOk === false && (
        <div style={{background:"#3b1515",border:`1px solid ${C.danger}`,borderRadius:12,color:C.danger,fontSize:13,padding:"12px 16px",marginBottom:16,maxWidth:380,width:"100%",textAlign:"center",lineHeight:1.5}}>
          ⚠️ Storage unavailable. Accounts won't persist. Try refreshing the page.
        </div>
      )}

      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:20,padding:24,width:"100%",maxWidth:380}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:24,background:C.inputBg,borderRadius:12,padding:4}}>
          {["login","signup"].map(m=>(
            <button key={m} onClick={()=>{setMode(m);setError("");}}
              style={{background:mode===m?C.accent:"transparent",border:"none",borderRadius:9,color:mode===m?"#fff":C.muted,cursor:"pointer",fontSize:13,fontWeight:700,padding:"9px 0"}}>
              {m==="login"?"Log In":"Sign Up"}
            </button>
          ))}
        </div>

        <div style={{marginBottom:14}}>
          <div style={{color:C.mutedLight,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6}}>Username</div>
          <input type="text" placeholder="your_username" value={username}
            onChange={e=>setUsername(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSubmit()}
            style={{...IS,textAlign:"left",padding:"11px 14px",fontSize:15,borderRadius:10,width:"100%"}}/>
        </div>
        <div style={{marginBottom:20}}>
          <div style={{color:C.mutedLight,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6}}>Password</div>
          <input type="password" placeholder="••••••••" value={password}
            onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSubmit()}
            style={{...IS,textAlign:"left",padding:"11px 14px",fontSize:15,borderRadius:10,width:"100%"}}/>
        </div>

        {error && <div style={{background:"#3b1515",border:`1px solid ${C.danger}44`,borderRadius:9,color:C.danger,fontSize:13,padding:"9px 14px",marginBottom:16,textAlign:"center"}}>{error}</div>}

        <button onClick={handleSubmit} disabled={loading || storageOk===false}
          style={{background:C.accent,border:"none",borderRadius:12,color:"#fff",cursor:loading?"default":"pointer",fontSize:15,fontWeight:700,padding:"14px",width:"100%",opacity:(loading||storageOk===false)?0.6:1}}>
          {loading?"…":mode==="login"?"Log In →":"Create Account →"}
        </button>

        <div style={{textAlign:"center",marginTop:16,color:C.muted,fontSize:13}}>
          {mode==="login"?"No account? ":"Have an account? "}
          <span onClick={()=>{setMode(mode==="login"?"signup":"login");setError("");}} style={{color:C.accent,cursor:"pointer",fontWeight:700}}>
            {mode==="login"?"Sign up":"Log in"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Exercise Picker ──────────────────────────────────────────────────────────
function ExercisePicker({ onSelect, onClose }) {
  const [search,setSearch]=useState("");
  const [selCat,setSelCat]=useState(null);
  const [selEx,setSelEx]=useState(null);
  const display=search
    ?Object.entries(EXERCISE_LIBRARY).reduce((acc,[cat,exs])=>{
        const m=exs.filter(e=>e.name.toLowerCase().includes(search.toLowerCase()));
        if(m.length) acc[cat]=m; return acc;
      },{})
    :EXERCISE_LIBRARY;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:200,display:"flex",alignItems:"flex-start"}}>
      <div style={{background:C.card,borderRadius:"0 0 20px 20px",width:"100%",maxHeight:"88vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"16px 16px 8px",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <span style={{color:C.text,fontSize:18,fontWeight:700}}>Select Exercise</span>
            <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,fontSize:22,cursor:"pointer"}}>×</button>
          </div>
          <input autoFocus type="text" placeholder="Search exercises..." value={search}
            onChange={e=>{setSearch(e.target.value);setSelCat(null);setSelEx(null);}}
            style={{...IS,width:"100%",textAlign:"left",padding:"10px 14px",fontSize:15,borderRadius:10}}/>
        </div>
        <div style={{overflowY:"auto",flex:1,padding:"4px 0"}}>
          {Object.entries(display).map(([cat,exs])=>(
            <div key={cat}>
              <div onClick={()=>setSelCat(selCat===cat?null:cat)}
                style={{padding:"9px 16px",color:C.accent,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",background:selCat===cat?C.inputBg:"transparent"}}>
                <span>{cat} <span style={{color:C.muted,fontWeight:400}}>({exs.length})</span></span>
                <span style={{color:C.muted,fontSize:13}}>{selCat===cat?"▲":"▼"}</span>
              </div>
              {(search||selCat===cat)&&exs.map(ex=>(
                <div key={ex.name}>
                  <div onClick={()=>setSelEx(selEx?.name===ex.name?null:ex)}
                    style={{padding:"10px 24px",color:C.text,fontSize:14,cursor:"pointer",background:selEx?.name===ex.name?C.accentDim:"transparent",borderLeft:selEx?.name===ex.name?`3px solid ${C.accent}`:"3px solid transparent",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span>{ex.name}</span>
                    <span style={{color:C.muted,fontSize:11}}>{ex.variants.length} variants ›</span>
                  </div>
                  {selEx?.name===ex.name&&ex.variants.map(v=>(
                    <div key={v} onClick={()=>{onSelect(ex.name,v);onClose();}}
                      style={{padding:"9px 42px",color:C.accent,fontSize:13,cursor:"pointer",background:C.inputBg,borderLeft:`3px solid ${C.accentDim}`}}>
                      {v}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SetRow ───────────────────────────────────────────────────────────────────
function SetRow({set,onChange,onDelete}) {
  const e1rm=calc1RM(parseFloat(set.weight),parseFloat(set.reps),parseFloat(set.rpe));
  return (
    <div style={{display:"grid",gridTemplateColumns:"22px 1fr 22px 1fr 22px 1fr 52px 22px",alignItems:"center",gap:3,padding:"6px 0",borderBottom:`1px solid ${C.border}`}}>
      <span style={{color:C.muted,fontSize:15,textAlign:"center"}}>≡</span>
      <input type="number" placeholder="lbs" value={set.weight} onChange={e=>onChange({...set,weight:e.target.value})} style={IS}/>
      <span style={{color:C.muted,fontSize:12,textAlign:"center"}}>×</span>
      <input type="number" placeholder="reps" value={set.reps} onChange={e=>onChange({...set,reps:e.target.value})} style={IS}/>
      <span style={{color:C.muted,fontSize:12,textAlign:"center"}}>@</span>
      <select value={set.rpe} onChange={e=>onChange({...set,rpe:e.target.value})} style={{...IS,appearance:"none"}}>
        <option value="">RPE</option>
        {RPE_KEYS.map(r=><option key={r} value={r}>{r}</option>)}
      </select>
      <span style={{fontSize:12,fontWeight:700,color:e1rm?C.accent:C.muted,textAlign:"right",paddingRight:2}}>{e1rm||"—"}</span>
      <button onClick={onDelete} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:15,padding:0,textAlign:"center"}}>×</button>
    </div>
  );
}

// ─── ExerciseCard ─────────────────────────────────────────────────────────────
function ExerciseCard({exercise,onChange,onDelete}) {
  const best=Math.max(0,...exercise.sets.map(s=>calc1RM(parseFloat(s.weight),parseFloat(s.reps),parseFloat(s.rpe))||0));
  const updateSet=(idx,s)=>{const sets=[...exercise.sets];sets[idx]=s;onChange({...exercise,sets});};
  const addSet=()=>{const last=exercise.sets[exercise.sets.length-1];onChange({...exercise,sets:[...exercise.sets,{...last,id:Math.random()}]});};
  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,marginBottom:14,overflow:"hidden"}}>
      <div style={{padding:"12px 14px 8px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{color:C.accent,fontSize:16,fontWeight:700}}>{exercise.name}</div>
          <div style={{color:C.mutedLight,fontSize:12,marginTop:2}}>
            {exercise.variant}
            {exercise.prescription&&<span style={{color:C.purple,marginLeft:8}}>Target: {exercise.prescription.sets}×{exercise.prescription.reps} @ RPE {exercise.prescription.rpe}</span>}
            {best>0&&<span style={{color:C.success,marginLeft:8,fontWeight:700}}>E1RM: {best}</span>}
          </div>
        </div>
        <button onClick={onDelete} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:7,color:C.muted,cursor:"pointer",fontSize:11,padding:"3px 8px"}}>✕</button>
      </div>
      <div style={{padding:"0 8px 0 14px"}}>
        <div style={{display:"grid",gridTemplateColumns:"22px 1fr 22px 1fr 22px 1fr 52px 22px",gap:3,padding:"3px 0"}}>
          {["","Weight","","Reps","","RPE","E1RM",""].map((h,i)=>(
            <span key={i} style={{color:C.muted,fontSize:9,textAlign:"center",textTransform:"uppercase",letterSpacing:"0.4px"}}>{h}</span>
          ))}
        </div>
        {exercise.sets.map((set,idx)=>(
          <SetRow key={set.id} set={set} onChange={s=>updateSet(idx,s)} onDelete={()=>onChange({...exercise,sets:exercise.sets.filter((_,i)=>i!==idx)})}/>
        ))}
      </div>
      <button onClick={addSet} style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:14,fontWeight:700,padding:"10px 14px",width:"100%",textAlign:"center"}}>+ Add set</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATES SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function TemplatesScreen({templates,setTemplates,history,onStartTemplate,progressionMode}) {
  const [view,setView]=useState("list");
  const [editTarget,setEditTarget]=useState(null);

  if(view==="build"||view==="edit") {
    return <TemplateBuilder initial={editTarget}
      onSave={t=>{
        if(view==="edit") setTemplates(templates.map(x=>x.id===t.id?t:x));
        else setTemplates([...templates,{...t,id:Date.now()}]);
        setView("list"); setEditTarget(null);
      }}
      onCancel={()=>{setView("list");setEditTarget(null);}}/>;
  }

  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={{padding:"20px 16px 12px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{color:C.text,fontSize:20,fontWeight:700}}>Templates</div>
          <div style={{color:C.muted,fontSize:13,marginTop:2}}>{progressionMode==="e1rm"?"E1RM +1% mode":"Linear progression mode"}</div>
        </div>
        <button onClick={()=>setView("build")} style={{background:C.purpleDim,border:`1px solid ${C.purple}`,borderRadius:10,color:C.purple,cursor:"pointer",fontSize:13,fontWeight:700,padding:"8px 14px"}}>+ New</button>
      </div>
      <div style={{padding:16}}>
        {templates.length===0&&(
          <div style={{textAlign:"center",padding:"56px 20px",color:C.muted}}>
            <div style={{fontSize:48,marginBottom:12}}>📋</div>
            <div style={{fontSize:16,fontWeight:600,color:C.mutedLight,marginBottom:8}}>No templates yet</div>
            <div style={{fontSize:14,marginBottom:20,lineHeight:1.5}}>Build a template with exercises and prescribed sets, reps, and RPE.</div>
            <button onClick={()=>setView("build")} style={{background:C.purpleDim,border:`1px solid ${C.purple}`,borderRadius:12,color:C.purple,cursor:"pointer",fontSize:15,fontWeight:700,padding:"12px 28px"}}>Build Your First Template</button>
          </div>
        )}
        {templates.map(t=>(
          <TemplateCard key={t.id} template={t} history={history} progressionMode={progressionMode}
            onStart={()=>onStartTemplate(t)}
            onEdit={()=>{setEditTarget(t);setView("edit");}}
            onDelete={()=>setTemplates(templates.filter(x=>x.id!==t.id))}/>
        ))}
      </div>
    </div>
  );
}

function TemplateCard({template,history,onStart,onEdit,onDelete,progressionMode}) {
  const [expanded,setExpanded]=useState(false);
  return (
    <div style={{marginBottom:14}}>
      <div style={{background:C.purpleDim,border:`1px solid ${C.purple}`,borderRadius:expanded?"14px 14px 0 0":14,padding:"14px 16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div style={{flex:1,cursor:"pointer"}} onClick={()=>setExpanded(!expanded)}>
            <div style={{color:C.purple,fontSize:16,fontWeight:700}}>{template.name}</div>
            {template.description&&<div style={{color:C.mutedLight,fontSize:12,marginTop:3}}>{template.description}</div>}
            <div style={{color:`${C.purple}99`,fontSize:12,marginTop:4}}>{template.exercises.length} exercise{template.exercises.length!==1?"s":""} · tap to preview</div>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0,marginLeft:8}}>
            <button onClick={e=>{e.stopPropagation();onEdit();}} style={{background:"none",border:`1px solid ${C.purple}44`,borderRadius:7,color:C.mutedLight,cursor:"pointer",fontSize:11,padding:"4px 9px"}}>Edit</button>
            <button onClick={e=>{e.stopPropagation();if(window.confirm(`Delete "${template.name}"?`))onDelete();}} style={{background:"none",border:`1px solid ${C.danger}44`,borderRadius:7,color:C.danger,cursor:"pointer",fontSize:11,padding:"4px 9px"}}>Del</button>
            <button onClick={e=>{e.stopPropagation();onStart();}} style={{background:"#0d2a1a",border:`1px solid ${C.success}`,borderRadius:8,color:C.success,cursor:"pointer",fontSize:12,fontWeight:700,padding:"6px 12px"}}>▶ Start</button>
          </div>
        </div>
      </div>
      {expanded&&(
        <div style={{border:`1px solid ${C.border}`,borderTop:"none",borderRadius:"0 0 14px 14px",background:C.card,overflow:"hidden"}}>
          {template.exercises.map((ex,i)=>{
            const prog=getProgressiveLoad(history,ex.name,ex.prescription,progressionMode);
            return (
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderTop:i===0?"none":`1px solid ${C.border}`}}>
                <div>
                  <span style={{color:C.accent,fontSize:13,fontWeight:600}}>{ex.name}</span>
                  <span style={{color:C.muted,fontSize:12,marginLeft:6}}>· {ex.variant}</span>
                  <div style={{color:C.purple,fontSize:12,marginTop:2}}>{ex.prescription.sets}×{ex.prescription.reps} @ RPE {ex.prescription.rpe}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  {prog.weight
                    ?<><div style={{color:C.success,fontSize:14,fontWeight:700}}>{prog.weight} lbs × {prog.reps}</div><div style={{color:C.muted,fontSize:10}}>{prog.label}</div></>
                    :<div style={{color:C.muted,fontSize:12}}>No history yet</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TemplateBuilder({initial,onSave,onCancel}) {
  const [name,setName]=useState(initial?.name||"");
  const [description,setDescription]=useState(initial?.description||"");
  const [exercises,setExercises]=useState(initial?.exercises||[]);
  const [showPicker,setShowPicker]=useState(false);
  const addEx=(n,v)=>setExercises([...exercises,{name:n,variant:v,prescription:{sets:3,reps:5,rpe:8}}]);
  const updPx=(idx,f,v)=>{const u=[...exercises];u[idx].prescription={...u[idx].prescription,[f]:parseFloat(v)||v};setExercises(u);};
  const canSave=name.trim()&&exercises.length>0;
  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:100,background:C.bg}}>
      <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:C.bg,zIndex:10}}>
        <button onClick={onCancel} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14}}>← Cancel</button>
        <div style={{color:C.text,fontSize:17,fontWeight:700}}>{initial?"Edit Template":"New Template"}</div>
        <button onClick={()=>canSave&&onSave({id:initial?.id,name,description,exercises})}
          style={{background:canSave?C.purpleDim:"transparent",border:`1px solid ${canSave?C.purple:C.border}`,borderRadius:9,color:canSave?C.purple:C.muted,cursor:canSave?"pointer":"default",fontSize:13,fontWeight:700,padding:"7px 14px"}}>Save</button>
      </div>
      <div style={{padding:16}}>
        <div style={{marginBottom:14}}>
          <div style={{color:C.mutedLight,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6}}>Template Name</div>
          <input type="text" placeholder='e.g. "Lower A"' value={name} onChange={e=>setName(e.target.value)} style={{...IS,textAlign:"left",padding:"10px 14px",fontSize:15,borderRadius:10,width:"100%"}}/>
        </div>
        <div style={{marginBottom:20}}>
          <div style={{color:C.mutedLight,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6}}>Description (optional)</div>
          <input type="text" placeholder="Short note..." value={description} onChange={e=>setDescription(e.target.value)} style={{...IS,textAlign:"left",padding:"9px 14px",fontSize:14,borderRadius:10,width:"100%"}}/>
        </div>
        {exercises.length>0&&(
          <div style={{marginBottom:12}}>
            <div style={{color:C.mutedLight,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:8}}>Exercises</div>
            {exercises.map((ex,idx)=>(
              <div key={idx} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"11px 12px",marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div><div style={{color:C.accent,fontSize:14,fontWeight:700}}>{ex.name}</div><div style={{color:C.muted,fontSize:12}}>{ex.variant}</div></div>
                  <button onClick={()=>setExercises(exercises.filter((_,i)=>i!==idx))} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18,padding:0}}>×</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 22px 1fr 22px 1fr",alignItems:"center",gap:6}}>
                  <div><div style={{color:C.muted,fontSize:9,textAlign:"center",marginBottom:3,textTransform:"uppercase"}}>Sets</div><input type="number" value={ex.prescription.sets} onChange={e=>updPx(idx,"sets",e.target.value)} style={{...IS,fontSize:14}}/></div>
                  <span style={{color:C.muted,fontSize:13,textAlign:"center"}}>×</span>
                  <div><div style={{color:C.muted,fontSize:9,textAlign:"center",marginBottom:3,textTransform:"uppercase"}}>Reps</div><input type="number" value={ex.prescription.reps} onChange={e=>updPx(idx,"reps",e.target.value)} style={{...IS,fontSize:14}}/></div>
                  <span style={{color:C.muted,fontSize:13,textAlign:"center"}}>@</span>
                  <div><div style={{color:C.muted,fontSize:9,textAlign:"center",marginBottom:3,textTransform:"uppercase"}}>RPE</div><select value={ex.prescription.rpe} onChange={e=>updPx(idx,"rpe",e.target.value)} style={{...IS,appearance:"none",fontSize:14}}>{RPE_KEYS.map(r=><option key={r} value={r}>{r}</option>)}</select></div>
                </div>
              </div>
            ))}
          </div>
        )}
        <button onClick={()=>setShowPicker(true)} style={{background:C.accentDim,border:`1px dashed ${C.accent}`,borderRadius:12,color:C.accent,cursor:"pointer",fontSize:14,fontWeight:700,padding:"14px",width:"100%"}}>+ Add Exercise</button>
      </div>
      {showPicker&&<ExercisePicker onSelect={(n,v)=>{addEx(n,v);setShowPicker(false);}} onClose={()=>setShowPicker(false)}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRE-WORKOUT REVIEW
// ═══════════════════════════════════════════════════════════════════════════════
function PreWorkoutReview({template,history,onConfirm,onCancel,progressionMode}) {
  const build=()=>template.exercises.map(ex=>{
    const prog=getProgressiveLoad(history,ex.name,ex.prescription,progressionMode);
    const {sets:n,rpe}=ex.prescription;
    return {id:Math.random(),name:ex.name,variant:ex.variant,prescription:ex.prescription,_progLabel:prog.label,
      sets:Array.from({length:n},()=>({id:Math.random(),weight:prog.weight?String(prog.weight):"",reps:String(prog.reps),rpe:String(rpe)}))};
  });
  const [exercises,setExercises]=useState(build);
  const [showPicker,setShowPicker]=useState(false);
  const updEx=(idx,ex)=>{const u=[...exercises];u[idx]=ex;setExercises(u);};
  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:100,background:C.bg}}>
      <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"sticky",top:0,background:C.bg,zIndex:10}}>
        <div>
          <div style={{color:C.muted,fontSize:11,textTransform:"uppercase",letterSpacing:"0.5px",fontWeight:600}}>Preview</div>
          <div style={{color:C.text,fontSize:18,fontWeight:700,marginTop:2}}>{template.name}</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={onCancel} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,color:C.muted,cursor:"pointer",fontSize:12,fontWeight:700,padding:"6px 10px"}}>Cancel</button>
          <button onClick={()=>onConfirm(exercises)} style={{background:"#0d2a1a",border:`1px solid ${C.success}`,borderRadius:8,color:C.success,cursor:"pointer",fontSize:12,fontWeight:700,padding:"6px 14px"}}>Start →</button>
        </div>
      </div>
      <div style={{margin:"12px 16px 0",padding:"10px 14px",background:C.purpleDim,border:`1px solid ${C.purple}44`,borderRadius:10,display:"flex",gap:10,alignItems:"flex-start"}}>
        <span>📈</span>
        <span style={{color:C.mutedLight,fontSize:13,lineHeight:1.4}}>
          {progressionMode==="e1rm"?"Weights suggested for +1% E1RM vs last 3 sessions.":"Weights auto-progressed from last session (+1 rep → +5 lbs)."} Tweak before starting.
        </span>
      </div>
      <div style={{padding:"14px 16px"}}>
        {exercises.map((ex,idx)=>(
          <div key={ex.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,marginBottom:14,overflow:"hidden"}}>
            <div style={{padding:"11px 14px 8px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div><div style={{color:C.accent,fontSize:15,fontWeight:700}}>{ex.name}</div><div style={{color:C.mutedLight,fontSize:12,marginTop:2}}>{ex.variant}</div></div>
              <div style={{textAlign:"right"}}>
                <div style={{color:C.purple,fontSize:12,fontWeight:700}}>{ex.prescription.sets}×{ex.prescription.reps} @ RPE {ex.prescription.rpe}</div>
                {ex._progLabel&&<div style={{color:C.success,fontSize:10,marginTop:2}}>↑ {ex._progLabel}</div>}
              </div>
            </div>
            <div style={{padding:"0 14px"}}>
              <div style={{display:"grid",gridTemplateColumns:"26px 1fr 22px 1fr 22px 1fr 22px",gap:3,padding:"4px 0"}}>
                {["Set","Weight","","Reps","","RPE",""].map((h,i)=><span key={i} style={{color:C.muted,fontSize:9,textAlign:"center",textTransform:"uppercase"}}>{h}</span>)}
              </div>
              {ex.sets.map((set,si)=>(
                <div key={set.id} style={{display:"grid",gridTemplateColumns:"26px 1fr 22px 1fr 22px 1fr 22px",alignItems:"center",gap:3,padding:"5px 0",borderBottom:`1px solid ${C.border}`}}>
                  <span style={{color:C.muted,fontSize:12,textAlign:"center",fontWeight:700}}>{si+1}</span>
                  <input type="number" value={set.weight} onChange={e=>{const s=[...ex.sets];s[si]={...set,weight:e.target.value};updEx(idx,{...ex,sets:s});}} style={IS}/>
                  <span style={{color:C.muted,fontSize:11,textAlign:"center"}}>×</span>
                  <input type="number" value={set.reps} onChange={e=>{const s=[...ex.sets];s[si]={...set,reps:e.target.value};updEx(idx,{...ex,sets:s});}} style={IS}/>
                  <span style={{color:C.muted,fontSize:11,textAlign:"center"}}>@</span>
                  <select value={set.rpe} onChange={e=>{const s=[...ex.sets];s[si]={...set,rpe:e.target.value};updEx(idx,{...ex,sets:s});}} style={{...IS,appearance:"none"}}>{RPE_KEYS.map(r=><option key={r} value={r}>{r}</option>)}</select>
                  <button onClick={()=>updEx(idx,{...ex,sets:ex.sets.filter((_,i)=>i!==si)})} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14,padding:0,textAlign:"center"}}>×</button>
                </div>
              ))}
            </div>
            <button onClick={()=>{const last=ex.sets[ex.sets.length-1];updEx(idx,{...ex,sets:[...ex.sets,{...last,id:Math.random()}]});}} style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:13,fontWeight:700,padding:"8px 14px",width:"100%",textAlign:"center"}}>+ Add set</button>
          </div>
        ))}
        <button onClick={()=>setShowPicker(true)} style={{background:C.accentDim,border:`1px dashed ${C.accent}`,borderRadius:12,color:C.accent,cursor:"pointer",fontSize:14,fontWeight:700,padding:14,width:"100%"}}>+ Add Extra Exercise</button>
      </div>
      {showPicker&&<ExercisePicker onSelect={(n,v)=>{setExercises([...exercises,{id:Math.random(),name:n,variant:v,prescription:null,sets:[{weight:"",reps:"",rpe:"",id:Math.random()},{weight:"",reps:"",rpe:"",id:Math.random()}]}]);setShowPicker(false);}} onClose={()=>setShowPicker(false)}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LIVE WORKOUT
// ═══════════════════════════════════════════════════════════════════════════════
function LiveWorkoutScreen({exercises:initial,workoutTitle,onFinish,onCancel}) {
  const [exercises,setExercises]=useState(initial);
  const [showPicker,setShowPicker]=useState(false);
  const updEx=(idx,ex)=>{const u=[...exercises];u[idx]=ex;setExercises(u);};
  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80,background:C.bg}}>
      <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:C.bg,zIndex:10}}>
        <button onClick={onCancel} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14}}>← Menu</button>
        <div style={{color:C.text,fontSize:17,fontWeight:700}}>{workoutTitle}</div>
        <button onClick={()=>onFinish(exercises)} style={{background:"#0d2a1a",border:`1px solid ${C.success}`,borderRadius:8,color:C.success,cursor:"pointer",fontSize:12,fontWeight:700,padding:"6px 12px"}}>Finish ✓</button>
      </div>
      <div style={{padding:"14px 16px"}}>
        {exercises.length===0&&<div style={{textAlign:"center",padding:"40px 20px",color:C.muted}}><div style={{fontSize:36,marginBottom:10}}>🏋️</div><div style={{fontSize:14}}>Tap below to add your first exercise</div></div>}
        {exercises.map((ex,idx)=><ExerciseCard key={ex.id} exercise={ex} onChange={e=>updEx(idx,e)} onDelete={()=>setExercises(exercises.filter((_,i)=>i!==idx))}/>)}
        <button onClick={()=>setShowPicker(true)} style={{background:C.accentDim,border:`1px dashed ${C.accent}`,borderRadius:12,color:C.accent,cursor:"pointer",fontSize:14,fontWeight:700,padding:14,width:"100%"}}>+ Add Exercise</button>
      </div>
      {showPicker&&<ExercisePicker onSelect={(n,v)=>{setExercises([...exercises,{id:Math.random(),name:n,variant:v,prescription:null,sets:[{weight:"",reps:"",rpe:"",id:Math.random()},{weight:"",reps:"",rpe:"",id:Math.random()},{weight:"",reps:"",rpe:"",id:Math.random()}]}]);setShowPicker(false);}} onClose={()=>setShowPicker(false)}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════════════════════════
function HomeScreen({onStartEmpty,username}) {
  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={{padding:"24px 16px 16px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:28}}>🏋️</span>
          <div>
            <div style={{color:C.text,fontSize:22,fontWeight:800,letterSpacing:"-0.5px"}}>Workout Flow</div>
            <div style={{color:C.muted,fontSize:13}}>Welcome back, <span style={{color:C.accent}}>{username}</span></div>
          </div>
        </div>
      </div>
      <div style={{padding:16}}>
        <button onClick={onStartEmpty} style={{background:C.accentDim,border:`1px solid ${C.accent}`,borderRadius:14,color:C.accent,cursor:"pointer",fontSize:16,fontWeight:700,padding:"22px",width:"100%",textAlign:"center",marginBottom:14}}>
          <div style={{fontSize:30,marginBottom:6}}>➕</div>Start Empty Workout
        </button>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"18px 16px",textAlign:"center",color:C.muted,fontSize:14,lineHeight:1.6}}>
          <div style={{fontSize:30,marginBottom:10}}>📋</div>
          Have a saved workout? Go to the <span style={{color:C.purple,fontWeight:700}}>Templates</span> tab to start a session with auto-progressed weights.
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HISTORY
// ═══════════════════════════════════════════════════════════════════════════════
function HistoryScreen({history,onDelete}) {
  const [confirmId,setConfirmId]=useState(null);
  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={{padding:"20px 16px 12px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{color:C.text,fontSize:20,fontWeight:700}}>History</div>
        <div style={{color:C.muted,fontSize:13,marginTop:2}}>{history.length} workout{history.length!==1?"s":""} logged</div>
      </div>
      <div style={{padding:16}}>
        {history.length===0&&<div style={{textAlign:"center",padding:"60px 20px",color:C.muted}}><div style={{fontSize:48,marginBottom:12}}>📋</div><div style={{fontSize:15,fontWeight:600,color:C.mutedLight}}>No workouts logged yet</div></div>}
        {history.map(w=>(
          <div key={w.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div>
                <span style={{color:C.text,fontSize:15,fontWeight:700}}>{w.name}</span>
                {w.templateName&&<div style={{color:C.purple,fontSize:11,marginTop:2}}>from: {w.templateName}</div>}
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{color:C.muted,fontSize:12}}>{w.date}</span>
                {confirmId===w.id
                  ?<div style={{display:"flex",gap:4}}>
                    <button onClick={()=>{onDelete(w.id);setConfirmId(null);}} style={{background:"#3b1515",border:`1px solid ${C.danger}`,borderRadius:6,color:C.danger,cursor:"pointer",fontSize:11,fontWeight:700,padding:"3px 8px"}}>Delete</button>
                    <button onClick={()=>setConfirmId(null)} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:6,color:C.muted,cursor:"pointer",fontSize:11,padding:"3px 8px"}}>Cancel</button>
                  </div>
                  :<button onClick={()=>setConfirmId(w.id)} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:6,color:C.muted,cursor:"pointer",fontSize:13,padding:"2px 7px"}}>🗑</button>
                }
              </div>
            </div>
            {w.exercises.map((ex,i)=>{
              const best=Math.max(0,...ex.sets.map(s=>calc1RM(s.weight,s.reps,s.rpe)||0));
              return (
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderTop:`1px solid ${C.border}`}}>
                  <div>
                    <span style={{color:C.accent,fontSize:13,fontWeight:600}}>{ex.name}</span>
                    <span style={{color:C.muted,fontSize:12,marginLeft:6}}>· {ex.variant}</span>
                    <div style={{color:C.muted,fontSize:11,marginTop:1}}>{ex.sets.length} sets</div>
                  </div>
                  <span style={{color:C.success,fontSize:13,fontWeight:700}}>{best>0?`${best} lbs E1RM`:"—"}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// RPE CALC
// ═══════════════════════════════════════════════════════════════════════════════
function getHistorySets(history) {
  const map={};
  history.forEach(w=>w.exercises.forEach(ex=>{
    if(!map[ex.name]) map[ex.name]=[];
    ex.sets.forEach(s=>{if(s.weight&&s.reps&&s.rpe) map[ex.name].push({...s,date:w.date,variant:ex.variant});});
  }));
  return map;
}
function RPECalcScreen({history}) {
  const hs=getHistorySets(history);
  const exNames=Object.keys(hs);
  const [src,setSrc]=useState("manual");
  const [mW,setMW]=useState(""); const [mR,setMR]=useState(""); const [mRpe,setMRpe]=useState("");
  const [selEx,setSelEx]=useState(exNames[0]||""); const [selIdx,setSelIdx]=useState(0);
  const [hov,setHov]=useState(null);
  let bW,bR,bRpe;
  if(src==="manual"){bW=parseFloat(mW);bR=parseFloat(mR);bRpe=parseFloat(mRpe);}
  else{const s=(hs[selEx]||[])[selIdx]||{};bW=s.weight;bR=s.reps;bRpe=s.rpe;}
  const e1rm=calc1RM(bW,bR,bRpe);
  const cBg=w=>{if(!w||!e1rm)return C.card;const p=w/e1rm;if(p>=0.95)return"#3b1515";if(p>=0.90)return"#2d2010";if(p>=0.85)return"#1a2a0d";if(p>=0.80)return"#0d2a1a";return C.card;};
  const cFg=w=>{if(!w||!e1rm)return C.muted;const p=w/e1rm;if(p>=0.95)return C.danger;if(p>=0.90)return C.warning;if(p>=0.85)return"#a3e635";if(p>=0.80)return C.success;return C.mutedLight;};
  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={{padding:"20px 16px 12px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{color:C.text,fontSize:20,fontWeight:700}}>RPE Load Calculator</div>
        <div style={{color:C.muted,fontSize:13,marginTop:2}}>Project weights across all RPE × rep combos</div>
      </div>
      <div style={{padding:16}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
          {[{id:"manual",l:"✏️ Manual"},{id:"history",l:"📋 History"}].map(s=>(
            <button key={s.id} onClick={()=>setSrc(s.id)} style={{background:src===s.id?C.accentDim:C.card,border:`1px solid ${src===s.id?C.accent:C.border}`,borderRadius:10,color:src===s.id?C.accent:C.muted,cursor:"pointer",fontSize:13,fontWeight:700,padding:"9px 8px"}}>{s.l}</button>
          ))}
        </div>
        {src==="manual"?(
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,padding:14,marginBottom:14}}>
            <div style={{color:C.mutedLight,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:10}}>Reference Lift</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 20px 1fr 20px 1fr",alignItems:"center",gap:6}}>
              <div><div style={{color:C.muted,fontSize:9,textAlign:"center",marginBottom:3,textTransform:"uppercase"}}>Weight</div><input type="number" placeholder="lbs" value={mW} onChange={e=>setMW(e.target.value)} style={{...IS,fontSize:15}}/></div>
              <span style={{color:C.muted,textAlign:"center"}}>×</span>
              <div><div style={{color:C.muted,fontSize:9,textAlign:"center",marginBottom:3,textTransform:"uppercase"}}>Reps</div><input type="number" placeholder="reps" value={mR} onChange={e=>setMR(e.target.value)} style={{...IS,fontSize:15}}/></div>
              <span style={{color:C.muted,textAlign:"center"}}>@</span>
              <div><div style={{color:C.muted,fontSize:9,textAlign:"center",marginBottom:3,textTransform:"uppercase"}}>RPE</div><select value={mRpe} onChange={e=>setMRpe(e.target.value)} style={{...IS,appearance:"none",fontSize:15}}><option value="">—</option>{RPE_KEYS.map(r=><option key={r} value={r}>{r}</option>)}</select></div>
            </div>
            {e1rm&&<div style={{marginTop:12,padding:"8px 12px",background:"#0d2a1a",borderRadius:8,border:"1px solid #34d399",textAlign:"center"}}><span style={{color:C.muted,fontSize:12}}>E1RM: </span><span style={{color:C.success,fontSize:20,fontWeight:800}}>{e1rm} lbs</span></div>}
          </div>
        ):(
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,padding:14,marginBottom:14}}>
            <div style={{color:C.mutedLight,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:10}}>From History</div>
            {exNames.length===0?<div style={{color:C.muted,fontSize:14,textAlign:"center",padding:"12px 0"}}>No history yet.</div>:(
              <>
                <select value={selEx} onChange={e=>{setSelEx(e.target.value);setSelIdx(0);}} style={{...IS,textAlign:"left",padding:"7px 10px",marginBottom:10,fontSize:13}}>{exNames.map(n=><option key={n} value={n}>{n}</option>)}</select>
                {(hs[selEx]||[]).map((s,i)=>{
                  const e=calc1RM(s.weight,s.reps,s.rpe);
                  return <div key={i} onClick={()=>setSelIdx(i)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",borderRadius:8,marginBottom:5,cursor:"pointer",background:selIdx===i?C.accentDim:C.inputBg,border:`1px solid ${selIdx===i?C.accent:C.inputBorder}`}}>
                    <div><span style={{color:C.text,fontSize:13,fontWeight:700}}>{s.weight}×{s.reps}@{s.rpe}</span><div style={{color:C.muted,fontSize:11}}>{s.variant}·{s.date}</div></div>
                    <span style={{color:C.success,fontSize:12,fontWeight:700}}>{e} lbs</span>
                  </div>;
                })}
                {e1rm&&<div style={{marginTop:8,padding:"8px 12px",background:"#0d2a1a",borderRadius:8,border:"1px solid #34d399",textAlign:"center"}}><span style={{color:C.muted,fontSize:12}}>E1RM: </span><span style={{color:C.success,fontSize:20,fontWeight:800}}>{e1rm} lbs</span></div>}
              </>
            )}
          </div>
        )}
        {e1rm?(
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,overflow:"hidden"}}>
            <div style={{padding:"10px 14px 8px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between"}}>
              <span style={{color:C.text,fontSize:13,fontWeight:700}}>Weight by RPE × Reps (lbs)</span>
              <span style={{color:C.muted,fontSize:12}}>E1RM: {e1rm}</span>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{borderCollapse:"collapse",width:"100%",minWidth:380}}>
                <thead><tr>
                  <th style={{padding:"6px 8px",color:C.muted,fontSize:10,background:C.inputBg,position:"sticky",left:0,zIndex:2,borderBottom:`1px solid ${C.border}`,borderRight:`1px solid ${C.border}`,textTransform:"uppercase",minWidth:44}}>RPE\R</th>
                  {REP_KEYS.map(r=><th key={r} style={{padding:"6px 4px",color:hov?.reps===r?C.accent:C.muted,fontSize:12,fontWeight:700,textAlign:"center",background:hov?.reps===r?C.accentDim:C.inputBg,borderBottom:`1px solid ${C.border}`,minWidth:36}}>{r}</th>)}
                </tr></thead>
                <tbody>
                  {RPE_KEYS.slice().reverse().map(rpe=>(
                    <tr key={rpe}>
                      <td style={{padding:"5px 8px",color:hov?.rpe===rpe?C.accent:C.mutedLight,fontSize:12,fontWeight:700,textAlign:"center",background:hov?.rpe===rpe?C.accentDim:C.inputBg,borderBottom:`1px solid ${C.border}`,borderRight:`1px solid ${C.border}`,position:"sticky",left:0}}>{rpe}</td>
                      {REP_KEYS.map(reps=>{const w=calcWeight(e1rm,reps,rpe);const isH=hov?.rpe===rpe&&hov?.reps===reps;return <td key={reps} onMouseEnter={()=>setHov({rpe,reps})} onMouseLeave={()=>setHov(null)} style={{padding:"5px 3px",textAlign:"center",fontSize:isH?13:12,fontWeight:isH?800:600,color:cFg(w),background:cBg(w),borderBottom:`1px solid ${C.border}`,cursor:"default",outline:isH?"1px solid #ffffff20":"none",outlineOffset:-1}}>{w||"—"}</td>;})}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{padding:"7px 14px",color:C.muted,fontSize:10,textAlign:"center",borderTop:`1px solid ${C.border}`}}>Rounded to nearest 2.5 lbs · Borge Fagerli RPE chart</div>
          </div>
        ):(
          <div style={{background:C.card,borderRadius:13,border:`1px dashed ${C.border}`,padding:"44px 20px",textAlign:"center"}}>
            <div style={{fontSize:38,marginBottom:10}}>📊</div>
            <div style={{color:C.text,fontSize:14,fontWeight:600,marginBottom:4}}>Enter a reference lift above</div>
            <div style={{color:C.muted,fontSize:13}}>Weight + reps + RPE → full load table</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROGRESS
// ═══════════════════════════════════════════════════════════════════════════════
function ProgressScreen({history}) {
  const all=[...new Set(history.flatMap(w=>w.exercises.map(e=>e.name)))];
  const [selEx,setSelEx]=useState(all[0]||"");
  useEffect(()=>{if(all.length&&!all.includes(selEx))setSelEx(all[0]);},[history]);
  const pts=[];
  history.slice().reverse().forEach(w=>{
    w.exercises.forEach(ex=>{
      if(ex.name===selEx){const b=Math.max(0,...ex.sets.map(s=>calc1RM(s.weight,s.reps,s.rpe)||0));if(b>0)pts.push({date:w.date,e1rm:b});}
    });
  });
  const H=150,W=300,vs=pts.map(d=>d.e1rm);
  const mn=vs.length?Math.max(0,Math.min(...vs)-20):0,mx=vs.length?Math.max(...vs)+20:100;
  const toY=v=>H-((v-mn)/(mx-mn))*H;
  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={{padding:"20px 16px 12px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{color:C.text,fontSize:20,fontWeight:700}}>Progress</div>
        <div style={{color:C.muted,fontSize:13,marginTop:2}}>E1RM over time by exercise</div>
      </div>
      <div style={{padding:16}}>
        {all.length===0?<div style={{textAlign:"center",padding:"60px 20px",color:C.muted}}><div style={{fontSize:48,marginBottom:12}}>📈</div><div style={{fontSize:15,fontWeight:600,color:C.mutedLight}}>No data yet</div></div>:(
          <>
            <select value={selEx} onChange={e=>setSelEx(e.target.value)} style={{...IS,textAlign:"left",padding:"9px 14px",fontSize:14,marginBottom:14,width:"100%",borderRadius:10}}>{all.map(n=><option key={n} value={n}>{n}</option>)}</select>
            {pts.length>0?(
              <>
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:14,marginBottom:14}}>
                  <svg width="100%" viewBox={`0 0 ${W} ${H+24}`} style={{display:"block"}}>
                    {[mn,Math.round((mn+mx)/2),mx].map(v=><g key={v}><line x1="20" y1={toY(v)} x2={W} y2={toY(v)} stroke={C.border} strokeWidth="1"/><text x="0" y={toY(v)+4} fill={C.muted} fontSize="8">{v}</text></g>)}
                    {pts.length>1&&<polyline points={pts.map((d,i)=>`${20+(i/(pts.length-1))*(W-30)},${toY(d.e1rm)}`).join(" ")} fill="none" stroke={C.accent} strokeWidth="2" strokeLinejoin="round"/>}
                    {pts.map((d,i)=><g key={i}><circle cx={20+(pts.length>1?i/(pts.length-1):0.5)*(W-30)} cy={toY(d.e1rm)} r="4" fill={C.accent}/><text x={20+(pts.length>1?i/(pts.length-1):0.5)*(W-30)} y={H+18} fill={C.muted} fontSize="8" textAnchor="middle">{d.date.slice(5)}</text></g>)}
                  </svg>
                </div>
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><div style={{color:C.text,fontSize:15,fontWeight:700}}>{selEx}</div><div style={{color:C.muted,fontSize:12}}>Best E1RM</div></div>
                  <div style={{textAlign:"right"}}><div style={{color:C.accent,fontSize:22,fontWeight:800}}>{Math.max(...vs)} lbs</div>{pts.length>1&&<div style={{color:vs[vs.length-1]>=vs[0]?C.success:C.danger,fontSize:12}}>{vs[vs.length-1]>=vs[0]?"+":""}{vs[vs.length-1]-vs[0]} lbs total</div>}</div>
                </div>
              </>
            ):<div style={{background:C.card,border:`1px dashed ${C.border}`,borderRadius:14,padding:"40px 20px",textAlign:"center",color:C.muted,fontSize:14}}>No logged sets for {selEx} yet</div>}
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════════════════════════════════════
function SettingsScreen({settings,onSave,username,onLogout}) {
  const [age,setAge]=useState(settings.age||"");
  const [sex,setSex]=useState(settings.sex||"");
  const [weight,setWeight]=useState(settings.weight||"");
  const [pm,setPm]=useState(settings.progressionMode||"linear");
  const [saved,setSaved]=useState(false);
  const handleSave=()=>{onSave({age,sex,weight,progressionMode:pm});setSaved(true);setTimeout(()=>setSaved(false),2000);};
  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={{padding:"20px 16px 12px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{color:C.text,fontSize:20,fontWeight:700}}>Settings</div>
        <div style={{color:C.muted,fontSize:13,marginTop:2}}>Signed in as <span style={{color:C.accent,fontWeight:700}}>{username}</span></div>
      </div>
      <div style={{padding:16}}>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16,marginBottom:16}}>
          <div style={{color:C.text,fontSize:15,fontWeight:700,marginBottom:14}}>Profile</div>
          <div style={{marginBottom:14}}>
            <div style={{color:C.mutedLight,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6}}>Age</div>
            <input type="number" placeholder="e.g. 28" value={age} onChange={e=>setAge(e.target.value)} style={{...IS,textAlign:"left",padding:"10px 14px",fontSize:15,borderRadius:10,width:"100%"}}/>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{color:C.mutedLight,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6}}>Biological Sex</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {["Male","Female","Other"].map(s=><button key={s} onClick={()=>setSex(s)} style={{background:sex===s?C.accentDim:C.inputBg,border:`1px solid ${sex===s?C.accent:C.inputBorder}`,borderRadius:9,color:sex===s?C.accent:C.muted,cursor:"pointer",fontSize:13,fontWeight:sex===s?700:500,padding:"9px 4px"}}>{s}</button>)}
            </div>
          </div>
          <div>
            <div style={{color:C.mutedLight,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6}}>Bodyweight (lbs)</div>
            <input type="number" placeholder="e.g. 185" value={weight} onChange={e=>setWeight(e.target.value)} style={{...IS,textAlign:"left",padding:"10px 14px",fontSize:15,borderRadius:10,width:"100%"}}/>
          </div>
        </div>

        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16,marginBottom:16}}>
          <div style={{color:C.text,fontSize:15,fontWeight:700,marginBottom:4}}>Progression Logic</div>
          <div style={{color:C.muted,fontSize:12,marginBottom:14,lineHeight:1.5}}>How weights are suggested when starting a template workout</div>
          {[
            {id:"linear",title:"Linear Progression",desc:`Tracks your last session's top set. Each workout adds +1 rep at the same weight until the rep cap, then bumps weight +5 lbs and resets reps.`,example:"185×4 → 185×5 → 190×4",col:C.accent,dim:C.accentDim},
            {id:"e1rm",title:"E1RM Auto-Wave (+1%)",desc:"Averages your estimated 1RM from the last 3 sessions and targets a +1% E1RM increase. Back-calculates weight for your prescribed reps and RPE.",example:"Avg E1RM 245 → Target 247 → Suggests 200×5 @ RPE 8",col:C.purple,dim:C.purpleDim},
          ].map(opt=>(
            <div key={opt.id} onClick={()=>setPm(opt.id)}
              style={{background:pm===opt.id?opt.dim:C.inputBg,border:`2px solid ${pm===opt.id?opt.col:C.inputBorder}`,borderRadius:12,padding:14,marginBottom:10,cursor:"pointer"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{color:pm===opt.id?opt.col:C.text,fontSize:14,fontWeight:700}}>{opt.title}</div>
                <div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${pm===opt.id?opt.col:C.muted}`,background:pm===opt.id?opt.col:"transparent",flexShrink:0}}/>
              </div>
              <div style={{color:C.muted,fontSize:12,lineHeight:1.5}}>{opt.desc}</div>
              <div style={{marginTop:8,padding:"6px 10px",background:opt.dim,borderRadius:7,color:opt.col,fontSize:11,fontWeight:600}}>Example: {opt.example}</div>
            </div>
          ))}
        </div>

        <button onClick={handleSave} style={{background:saved?"#0d2a1a":C.accent,border:`1px solid ${saved?C.success:C.accent}`,borderRadius:12,color:saved?C.success:"#fff",cursor:"pointer",fontSize:15,fontWeight:700,padding:"14px",width:"100%",marginBottom:12}}>
          {saved?"✓ Saved!":"Save Settings"}
        </button>

        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16}}>
          <div style={{color:C.text,fontSize:14,fontWeight:700,marginBottom:4}}>Account</div>
          <div style={{color:C.muted,fontSize:12,marginBottom:12}}>Your data is saved per account and persists across sessions.</div>
          <button onClick={onLogout} style={{background:"none",border:`1px solid ${C.danger}44`,borderRadius:10,color:C.danger,cursor:"pointer",fontSize:13,fontWeight:700,padding:"10px",width:"100%"}}>Log Out</button>
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
const NAV=[
  {id:"home",icon:"🏠",label:"Home"},
  {id:"history",icon:"📋",label:"History"},
  {id:"templates",icon:"📅",label:"Templates"},
  {id:"calc",icon:"📊",label:"RPE Calc"},
  {id:"progress",icon:"📈",label:"Progress"},
  {id:"settings",icon:"⚙️",label:"Settings"},
];
function BottomNav({tab,setTab,activeWorkout}) {
  return (
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:C.tabBg,borderTop:`1px solid ${C.border}`,display:"grid",gridTemplateColumns:"repeat(6,1fr)",alignItems:"center",padding:"8px 0 12px",zIndex:50}}>
      {NAV.map(item=>(
        <button key={item.id} onClick={()=>setTab(item.id)}
          style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"0 1px",position:"relative"}}>
          <span style={{fontSize:15}}>{item.icon}</span>
          <span style={{fontSize:8,fontWeight:tab===item.id?700:500,color:tab===item.id?C.accent:C.muted}}>{item.label}</span>
          {activeWorkout&&item.id==="home"&&<span style={{position:"absolute",top:-2,right:"50%",transform:"translateX(10px)",width:6,height:6,borderRadius:"50%",background:C.success}}/>}
        </button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════
const DEFAULT_SETTINGS={age:"",sex:"",weight:"",progressionMode:"linear"};

export default function App() {
  const [authUser,setAuthUser]=useState(null);
  const [tab,setTab]=useState("home");
  const [history,setHistory]=useState([]);
  const [templates,setTemplates]=useState([]);
  const [settings,setSettings]=useState(DEFAULT_SETTINGS);
  const [ready,setReady]=useState(false);
  const [flow,setFlow]=useState(null);

  // Track whether we've finished loading so we don't write before reading
  const loadedRef = useRef(false);

  // ── On mount: restore session from shared storage ──────────────────────────
  useEffect(()=>{
    async function init() {
      try {
        const session = await sGet(SK.session);
        if (session?.username) {
          const data = await sGet(SK.data(session.username));
          if (data) {
            setTemplates(data.templates || []);
            setHistory(data.history || []);
            setSettings(data.settings || DEFAULT_SETTINGS);
          }
          setAuthUser(session.username);
        }
      } catch(e) { console.error("Init error", e); }
      loadedRef.current = true;
      setReady(true);
    }
    init();
  },[]);

  // ── Save all user data atomically whenever anything changes ────────────────
  // We store everything in ONE key per user to avoid race conditions
  const saveTimeout = useRef(null);
  const saveData = (user, tmpl, hist, sett) => {
    if (!loadedRef.current || !user) return;
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(()=>{
      sSet(SK.data(user), { templates: tmpl, history: hist, settings: sett });
    }, 400); // debounce slightly to batch rapid changes
  };

  useEffect(()=>{ saveData(authUser, templates, history, settings); },[authUser, templates, history, settings]);

  const handleLogin = async (username) => {
    // Data was already initialized in AuthScreen for new users
    // For returning users, load their data
    const data = await sGet(SK.data(username));
    setTemplates(data?.templates || []);
    setHistory(data?.history || []);
    setSettings(data?.settings || DEFAULT_SETTINGS);
    setAuthUser(username);
  };

  const handleLogout = async () => {
    await sSet(SK.session, null);
    setAuthUser(null);
    setHistory([]);
    setTemplates([]);
    setSettings(DEFAULT_SETTINGS);
    setFlow(null);
    setTab("home");
  };

  const handleDeleteWorkout = id => setHistory(prev => prev.filter(w => w.id !== id));
  const handleStartTemplate = t => { setFlow({type:"review",template:t}); setTab("home"); };
  const handleConfirm = exercises => setFlow(f=>({type:"live",exercises,title:f.template.name,templateName:f.template.name}));
  const handleFinish = exercises => {
    const entry = {
      id:Date.now(), date:new Date().toISOString().slice(0,10),
      name:flow.title, templateName:flow.templateName||null,
      exercises:exercises.map(ex=>({
        name:ex.name,variant:ex.variant,
        sets:ex.sets.map(s=>({weight:parseFloat(s.weight)||0,reps:parseFloat(s.reps)||0,rpe:parseFloat(s.rpe)||0})),
      })),
    };
    setHistory(prev=>[entry,...prev]);
    setFlow(null);
  };

  const pm = settings.progressionMode || "linear";

  const shell = content => (
    <div style={{background:C.bg,minHeight:"100vh",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column",fontFamily:"'DM Sans','Segoe UI',sans-serif",color:C.text}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        input::placeholder{color:#4a4a60;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#2a2a38;border-radius:4px;}
        select option{background:#17171f;color:#f0f0f8;}
      `}</style>
      {content}
    </div>
  );

  if (!ready) return shell(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",gap:16}}>
      <div style={{fontSize:40}}>🏋️</div>
      <div style={{color:C.muted,fontSize:14}}>Loading…</div>
    </div>
  );

  if (!authUser) return shell(<AuthScreen onLogin={handleLogin}/>);

  if (flow?.type==="review") return shell(
    <><PreWorkoutReview template={flow.template} history={history} onConfirm={handleConfirm} onCancel={()=>setFlow(null)} progressionMode={pm}/>
    <BottomNav tab={tab} setTab={t=>{setFlow(null);setTab(t);}} activeWorkout={true}/></>
  );
  if (flow?.type==="live") return shell(
    <><LiveWorkoutScreen exercises={flow.exercises} workoutTitle={flow.title} onFinish={handleFinish} onCancel={()=>setTab("home")}/>
    <BottomNav tab={tab} setTab={setTab} activeWorkout={true}/></>
  );

  return shell(
    <>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {tab==="home"      && <HomeScreen onStartEmpty={()=>setFlow({type:"live",exercises:[],title:"Workout",templateName:null})} username={authUser}/>}
        {tab==="history"   && <HistoryScreen history={history} onDelete={handleDeleteWorkout}/>}
        {tab==="templates" && <TemplatesScreen templates={templates} setTemplates={setTemplates} history={history} onStartTemplate={handleStartTemplate} progressionMode={pm}/>}
        {tab==="calc"      && <RPECalcScreen history={history}/>}
        {tab==="progress"  && <ProgressScreen history={history}/>}
        {tab==="settings"  && <SettingsScreen settings={settings} onSave={setSettings} username={authUser} onLogout={handleLogout}/>}
      </div>
      <BottomNav tab={tab} setTab={setTab} activeWorkout={false}/>
    </>
  );
}
