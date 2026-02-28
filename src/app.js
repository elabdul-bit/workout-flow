import { useState } from "react";

// ─── MASSIVE Exercise Library ─────────────────────────────────────────────────
const EXERCISE_LIBRARY = {
  "Squat Variations": [
    { name: "Back Squat", variants: ["High bar", "Low bar", "Narrow stance", "Wide stance"] },
    { name: "Front Squat", variants: ["Barbell", "Dumbbell", "Goblet"] },
    { name: "Pause Squat", variants: ["High bar", "Low bar", "Front"] },
    { name: "Box Squat", variants: ["High bar", "Low bar", "Wide stance"] },
    { name: "Safety Bar Squat", variants: ["Standard", "Cambered"] },
    { name: "Hack Squat", variants: ["Machine", "Barbell"] },
    { name: "Zercher Squat", variants: ["Barbell", "Safety bar"] },
    { name: "Bulgarian Split Squat", variants: ["Barbell", "Dumbbell", "Bodyweight"] },
    { name: "Goblet Squat", variants: ["Kettlebell", "Dumbbell"] },
    { name: "Anderson Squat", variants: ["High bar", "Low bar"] },
    { name: "Overhead Squat", variants: ["Barbell", "Dumbbell"] },
    { name: "Pistol Squat", variants: ["Bodyweight", "Assisted", "Weighted"] },
    { name: "Heel Elevated Squat", variants: ["Barbell", "Dumbbell", "Goblet"] },
  ],
  "Hip Hinge / Deadlift": [
    { name: "Conventional Deadlift", variants: ["Standard", "Pause at knee", "Deficit", "Rack pull"] },
    { name: "Sumo Deadlift", variants: ["Standard", "Pause at knee", "Deficit"] },
    { name: "Romanian Deadlift", variants: ["Barbell", "Dumbbell", "Single leg"] },
    { name: "Stiff-leg Deadlift", variants: ["Barbell", "Dumbbell"] },
    { name: "Trap Bar Deadlift", variants: ["High handles", "Low handles", "Single leg"] },
    { name: "Snatch Grip Deadlift", variants: ["Standard", "Deficit"] },
    { name: "Kettlebell Deadlift", variants: ["Standard", "Single leg", "Suitcase"] },
    { name: "Good Morning", variants: ["Barbell", "Safety bar", "Seated"] },
    { name: "Hip Thrust", variants: ["Barbell", "Dumbbell", "Banded", "Single leg"] },
    { name: "Glute Bridge", variants: ["Bodyweight", "Barbell", "Dumbbell", "Banded"] },
    { name: "45° Back Extension", variants: ["Bodyweight", "Barbell", "Dumbbell"] },
    { name: "Nordic Hamstring Curl", variants: ["Bodyweight", "Weighted"] },
    { name: "Kettlebell Swing", variants: ["Two-hand", "One-hand", "American"] },
    { name: "Cable Pull-through", variants: ["Standard", "Single leg"] },
    { name: "Power Clean", variants: ["Barbell", "Hang", "From blocks"] },
  ],
  "Quad / Knee Dominant": [
    { name: "Leg Press", variants: ["Standard", "Narrow", "Wide", "Single leg", "High foot"] },
    { name: "Leg Extension", variants: ["Bilateral", "Single leg"] },
    { name: "Step-up", variants: ["Barbell", "Dumbbell", "Lateral", "Crossover"] },
    { name: "Lunge", variants: ["Walking", "Reverse", "Lateral", "Curtsy", "Overhead"] },
    { name: "Sissy Squat", variants: ["Bodyweight", "Weighted"] },
    { name: "Sled Push", variants: ["Heavy", "Moderate", "Sprint"] },
    { name: "Sled Drag", variants: ["Forward", "Backward"] },
  ],
  "Hamstring / Posterior Chain": [
    { name: "Leg Curl", variants: ["Lying", "Seated", "Standing", "Single leg"] },
    { name: "Glute-ham Raise", variants: ["Bodyweight", "Weighted"] },
    { name: "Swiss Ball Leg Curl", variants: ["Standard", "Single leg"] },
    { name: "Band Leg Curl", variants: ["Standing", "Prone"] },
    { name: "Dumbbell Leg Curl", variants: ["Lying", "Standing"] },
  ],
  "Calf": [
    { name: "Standing Calf Raise", variants: ["Machine", "Barbell", "Dumbbell", "Single leg"] },
    { name: "Seated Calf Raise", variants: ["Machine", "Dumbbell"] },
    { name: "Donkey Calf Raise", variants: ["Bodyweight", "Weighted"] },
    { name: "Leg Press Calf Raise", variants: ["Bilateral", "Single leg"] },
  ],
  "Horizontal Push (Chest)": [
    { name: "Barbell Bench Press", variants: ["Flat", "Incline", "Decline", "Close grip", "Pause", "Spoto press"] },
    { name: "Dumbbell Bench Press", variants: ["Flat", "Incline", "Decline", "Neutral grip"] },
    { name: "Machine Chest Press", variants: ["Flat", "Incline", "Converging"] },
    { name: "Push-up", variants: ["Standard", "Wide", "Diamond", "Archer", "Decline", "Incline", "Ring"] },
    { name: "Dip", variants: ["Chest", "Tricep", "Weighted", "Ring"] },
    { name: "Landmine Press", variants: ["Single arm", "Double arm", "Kneeling"] },
    { name: "Floor Press", variants: ["Barbell", "Dumbbell", "Kettlebell"] },
    { name: "Board Press", variants: ["2-board", "3-board", "4-board"] },
    { name: "Pin Press", variants: ["Off chest", "Mid range", "Lockout"] },
  ],
  "Chest Fly / Isolation": [
    { name: "Cable Fly", variants: ["Low cable", "Mid cable", "High cable", "Single arm"] },
    { name: "Dumbbell Fly", variants: ["Flat", "Incline", "Decline"] },
    { name: "Pec Deck", variants: ["Standard"] },
    { name: "Chest Crossover", variants: ["Low to high", "High to low", "Mid"] },
  ],
  "Vertical Push (Shoulders)": [
    { name: "Overhead Press", variants: ["Barbell", "Dumbbell", "Behind neck", "Push press", "Seated", "Standing"] },
    { name: "Arnold Press", variants: ["Seated", "Standing"] },
    { name: "Z-Press", variants: ["Barbell", "Dumbbell"] },
    { name: "Dumbbell Shoulder Press", variants: ["Seated", "Standing", "Single arm", "Alternating"] },
    { name: "Machine Shoulder Press", variants: ["Standard", "Plate-loaded"] },
    { name: "Handstand Push-up", variants: ["Wall-supported", "Freestanding", "Pike"] },
  ],
  "Shoulder Isolation": [
    { name: "Lateral Raise", variants: ["Dumbbell", "Cable", "Machine", "Band", "Leaning"] },
    { name: "Front Raise", variants: ["Dumbbell", "Barbell", "Cable", "Plate"] },
    { name: "Rear Delt Fly", variants: ["Dumbbell", "Cable", "Machine", "Band"] },
    { name: "Face Pull", variants: ["Rope", "Band", "Single arm"] },
    { name: "Upright Row", variants: ["Barbell", "Dumbbell", "Cable", "Band"] },
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
    { name: "Machine Row", variants: ["Standard", "Chest-supported", "Iso-lateral"] },
    { name: "Inverted Row", variants: ["Overhand", "Underhand", "Ring", "Weighted"] },
    { name: "Seal Row", variants: ["Barbell", "Dumbbell"] },
  ],
  "Biceps": [
    { name: "Barbell Curl", variants: ["Standard", "EZ-bar", "Wide grip", "Reverse grip"] },
    { name: "Dumbbell Curl", variants: ["Standard", "Hammer", "Incline", "Concentration", "Spider", "Alternating"] },
    { name: "Preacher Curl", variants: ["Barbell", "EZ-bar", "Dumbbell", "Cable", "Machine"] },
    { name: "Cable Curl", variants: ["Straight bar", "EZ-bar", "Rope", "Single arm", "Behind back"] },
    { name: "Machine Curl", variants: ["Standard", "Iso-lateral"] },
    { name: "Zottman Curl", variants: ["Standard", "Incline"] },
    { name: "Cross-body Hammer Curl", variants: ["Dumbbell", "Cable"] },
  ],
  "Triceps": [
    { name: "Tricep Pushdown", variants: ["Rope", "Straight bar", "V-bar", "Single arm", "Reverse grip"] },
    { name: "Skull Crusher", variants: ["Barbell", "EZ-bar", "Dumbbell", "Cable"] },
    { name: "Overhead Tricep Extension", variants: ["Barbell", "Dumbbell", "Cable", "Rope", "Single arm"] },
    { name: "Close Grip Bench Press", variants: ["Standard", "Floor press", "Incline"] },
    { name: "JM Press", variants: ["Standard", "EZ-bar"] },
    { name: "Tate Press", variants: ["Dumbbell"] },
    { name: "Kickback", variants: ["Dumbbell", "Cable", "Single arm"] },
  ],
  "Forearms / Grip": [
    { name: "Wrist Curl", variants: ["Barbell", "Dumbbell", "Cable"] },
    { name: "Reverse Wrist Curl", variants: ["Barbell", "Dumbbell", "Cable"] },
    { name: "Reverse Curl", variants: ["Barbell", "EZ-bar", "Dumbbell", "Cable"] },
    { name: "Farmer's Walk", variants: ["Dumbbell", "Trap bar", "Kettlebell"] },
    { name: "Dead Hang", variants: ["Double overhand", "Single arm", "Towel"] },
    { name: "Plate Pinch", variants: ["Standard", "Single hand"] },
  ],
  "Core — Anterior": [
    { name: "Plank", variants: ["Standard", "Weighted", "RKC", "Long lever"] },
    { name: "Ab Wheel Rollout", variants: ["Kneeling", "Standing", "Single arm"] },
    { name: "Cable Crunch", variants: ["Rope", "Single arm", "Kneeling"] },
    { name: "Hanging Leg Raise", variants: ["Straight leg", "Bent knee", "Toes to bar"] },
    { name: "Lying Leg Raise", variants: ["Standard", "Weighted"] },
    { name: "Dead Bug", variants: ["Standard", "Weighted", "Band"] },
    { name: "Dragon Flag", variants: ["Negative only", "Full"] },
    { name: "Hollow Body Hold", variants: ["Standard", "Rocking"] },
    { name: "L-sit", variants: ["Parallel bars", "Floor", "Rings"] },
  ],
  "Core — Lateral / Rotational": [
    { name: "Pallof Press", variants: ["Standard", "Overhead", "Half-kneeling", "Tall-kneeling"] },
    { name: "Russian Twist", variants: ["Bodyweight", "Weighted", "Cable"] },
    { name: "Side Plank", variants: ["Standard", "Weighted", "With hip dip"] },
    { name: "Copenhagen Plank", variants: ["Standard", "Adduction"] },
    { name: "Cable Woodchop", variants: ["High to low", "Low to high", "Horizontal"] },
    { name: "Suitcase Carry", variants: ["Dumbbell", "Kettlebell"] },
  ],
  "Core — Extension": [
    { name: "Back Extension", variants: ["Bodyweight", "Weighted", "45°", "GHD"] },
    { name: "Superman Hold", variants: ["Standard", "Alternating"] },
    { name: "Bird Dog", variants: ["Standard", "Weighted", "Band"] },
    { name: "McGill Crunch", variants: ["Standard"] },
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

function calc1RM(weight,reps,rpe) {
  if(!weight||!reps||!rpe) return null;
  const t=RPE_PCT[parseFloat(rpe)]; if(!t) return null;
  const p=t[Math.min(Math.max(Math.round(reps),1),10)];
  return p?Math.round(weight/p):null;
}
function calcWeight(e1rm,reps,rpe) {
  if(!e1rm||!reps||!rpe) return null;
  const t=RPE_PCT[parseFloat(rpe)]; if(!t) return null;
  const p=t[Math.min(Math.max(Math.round(reps),1),10)];
  return p?Math.round((e1rm*p)/2.5)*2.5:null;
}
function getAvgE1RM(history,exerciseName) {
  const all=[];
  history.forEach(w=>w.exercises.forEach(ex=>{
    if(ex.name===exerciseName) ex.sets.forEach(s=>{
      const e=calc1RM(s.weight,s.reps,s.rpe); if(e) all.push({e1rm:e,date:w.date});
    });
  }));
  if(!all.length) return null;
  const sorted=all.sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
  return Math.round(sorted.reduce((s,x)=>s+x.e1rm,0)/sorted.length);
}
function getHistorySets(history) {
  const map={};
  history.forEach(w=>w.exercises.forEach(ex=>{
    if(!map[ex.name]) map[ex.name]=[];
    ex.sets.forEach(s=>{if(s.weight&&s.reps&&s.rpe) map[ex.name].push({...s,date:w.date,variant:ex.variant});});
  }));
  return map;
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
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:200,display:"flex",alignItems:"flex-end"}}>
      <div style={{background:C.card,borderRadius:"20px 20px 0 0",width:"100%",maxHeight:"88vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"16px 16px 8px",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <span style={{color:C.text,fontSize:18,fontWeight:700}}>Select Exercise</span>
            <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,fontSize:22,cursor:"pointer"}}>×</button>
          </div>
          <input autoFocus type="text" placeholder="Search 150+ exercises..." value={search}
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

// ─── ExerciseCard (live logging) ──────────────────────────────────────────────
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
function TemplatesScreen({templates,setTemplates,history,onStartTemplate}) {
  const [view,setView]=useState("list"); // "list" | "build" | "edit"
  const [editTarget,setEditTarget]=useState(null);

  if(view==="build"||view==="edit") {
    return (
      <TemplateBuilder
        initial={editTarget}
        onSave={t=>{
          if(view==="edit") setTemplates(templates.map(x=>x.id===t.id?t:x));
          else setTemplates([...templates,{...t,id:Date.now()}]);
          setView("list"); setEditTarget(null);
        }}
        onCancel={()=>{setView("list");setEditTarget(null);}}
      />
    );
  }

  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={{padding:"20px 16px 12px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{color:C.text,fontSize:20,fontWeight:700}}>Templates</div>
          <div style={{color:C.muted,fontSize:13,marginTop:2}}>Saved workouts with prescribed loading</div>
        </div>
        <button onClick={()=>setView("build")}
          style={{background:C.purpleDim,border:`1px solid ${C.purple}`,borderRadius:10,color:C.purple,cursor:"pointer",fontSize:13,fontWeight:700,padding:"8px 14px"}}>
          + New
        </button>
      </div>

      <div style={{padding:16}}>
        {templates.length===0&&(
          <div style={{textAlign:"center",padding:"56px 20px",color:C.muted}}>
            <div style={{fontSize:48,marginBottom:12}}>📋</div>
            <div style={{fontSize:16,fontWeight:600,color:C.mutedLight,marginBottom:8}}>No templates yet</div>
            <div style={{fontSize:14,marginBottom:20,lineHeight:1.5}}>Build a template with exercises and prescribed sets, reps, and RPE. When you start it, weights auto-fill from your history.</div>
            <button onClick={()=>setView("build")}
              style={{background:C.purpleDim,border:`1px solid ${C.purple}`,borderRadius:12,color:C.purple,cursor:"pointer",fontSize:15,fontWeight:700,padding:"12px 28px"}}>
              Build Your First Template
            </button>
          </div>
        )}

        {templates.map(t=>(
          <TemplateCard key={t.id} template={t} history={history}
            onStart={()=>onStartTemplate(t)}
            onEdit={()=>{setEditTarget(t);setView("edit");}}
            onDelete={()=>setTemplates(templates.filter(x=>x.id!==t.id))}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Template Card ────────────────────────────────────────────────────────────
function TemplateCard({template,history,onStart,onEdit,onDelete}) {
  const [expanded,setExpanded]=useState(false);
  return (
    <div style={{marginBottom:14}}>
      {/* Header */}
      <div style={{background:C.purpleDim,border:`1px solid ${C.purple}`,borderRadius:expanded?"14px 14px 0 0":14,padding:"14px 16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div style={{flex:1,cursor:"pointer"}} onClick={()=>setExpanded(!expanded)}>
            <div style={{color:C.purple,fontSize:16,fontWeight:700}}>{template.name}</div>
            {template.description&&<div style={{color:C.mutedLight,fontSize:12,marginTop:3}}>{template.description}</div>}
            <div style={{color:`${C.purple}99`,fontSize:12,marginTop:4}}>{template.exercises.length} exercise{template.exercises.length!==1?"s":""} · tap to preview</div>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0,marginLeft:8}}>
            <button onClick={e=>{e.stopPropagation();onEdit();}}
              style={{background:"none",border:`1px solid ${C.purple}44`,borderRadius:7,color:C.mutedLight,cursor:"pointer",fontSize:11,padding:"4px 9px"}}>Edit</button>
            <button onClick={e=>{e.stopPropagation();if(window.confirm(`Delete "${template.name}"?`))onDelete();}}
              style={{background:"none",border:`1px solid ${C.danger}44`,borderRadius:7,color:C.danger,cursor:"pointer",fontSize:11,padding:"4px 9px"}}>Del</button>
            <button onClick={e=>{e.stopPropagation();onStart();}}
              style={{background:"#0d2a1a",border:`1px solid ${C.success}`,borderRadius:8,color:C.success,cursor:"pointer",fontSize:12,fontWeight:700,padding:"6px 12px"}}>
              ▶ Start
            </button>
          </div>
        </div>
      </div>

      {/* Expanded preview */}
      {expanded&&(
        <div style={{border:`1px solid ${C.border}`,borderTop:"none",borderRadius:"0 0 14px 14px",background:C.card,overflow:"hidden"}}>
          {template.exercises.map((ex,i)=>{
            const e1rm=getAvgE1RM(history,ex.name);
            const projW=e1rm?calcWeight(e1rm,ex.prescription.reps,ex.prescription.rpe):null;
            return (
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderTop:i===0?"none":`1px solid ${C.border}`}}>
                <div>
                  <span style={{color:C.accent,fontSize:13,fontWeight:600}}>{ex.name}</span>
                  <span style={{color:C.muted,fontSize:12,marginLeft:6}}>· {ex.variant}</span>
                  <div style={{color:C.purple,fontSize:12,marginTop:2}}>
                    {ex.prescription.sets}×{ex.prescription.reps} @ RPE {ex.prescription.rpe}
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  {projW?(
                    <>
                      <div style={{color:C.success,fontSize:14,fontWeight:700}}>{projW} lbs</div>
                      <div style={{color:C.muted,fontSize:10}}>Avg E1RM: {e1rm}</div>
                    </>
                  ):(
                    <div style={{color:C.muted,fontSize:12}}>No history</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Template Builder ─────────────────────────────────────────────────────────
function TemplateBuilder({initial,onSave,onCancel}) {
  const [name,setName]=useState(initial?.name||"");
  const [description,setDescription]=useState(initial?.description||"");
  const [exercises,setExercises]=useState(initial?.exercises||[]);
  const [showPicker,setShowPicker]=useState(false);

  const addExercise=(exName,variant)=>{
    setExercises([...exercises,{name:exName,variant,prescription:{sets:3,reps:5,rpe:8}}]);
  };
  const updatePrescription=(idx,field,val)=>{
    const u=[...exercises];
    u[idx].prescription={...u[idx].prescription,[field]:parseFloat(val)||val};
    setExercises(u);
  };
  const removeExercise=idx=>setExercises(exercises.filter((_,i)=>i!==idx));

  const canSave=name.trim()&&exercises.length>0;

  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:100,background:C.bg}}>
      {/* Header */}
      <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:C.bg,zIndex:10}}>
        <button onClick={onCancel} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14}}>← Cancel</button>
        <div style={{color:C.text,fontSize:17,fontWeight:700}}>{initial?"Edit Template":"New Template"}</div>
        <button onClick={()=>canSave&&onSave({id:initial?.id,name,description,exercises})}
          style={{background:canSave?C.purpleDim:"transparent",border:`1px solid ${canSave?C.purple:C.border}`,borderRadius:9,color:canSave?C.purple:C.muted,cursor:canSave?"pointer":"default",fontSize:13,fontWeight:700,padding:"7px 14px"}}>
          Save
        </button>
      </div>

      <div style={{padding:16}}>
        {/* Name */}
        <div style={{marginBottom:14}}>
          <div style={{color:C.mutedLight,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6}}>Template Name</div>
          <input type="text" placeholder='e.g. "Lower A" or "Push Day"' value={name} onChange={e=>setName(e.target.value)}
            style={{...IS,textAlign:"left",padding:"10px 14px",fontSize:15,borderRadius:10,width:"100%"}}/>
        </div>
        <div style={{marginBottom:20}}>
          <div style={{color:C.mutedLight,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6}}>Description (optional)</div>
          <input type="text" placeholder="Short note about this template..." value={description} onChange={e=>setDescription(e.target.value)}
            style={{...IS,textAlign:"left",padding:"9px 14px",fontSize:14,borderRadius:10,width:"100%"}}/>
        </div>

        {/* Exercise list */}
        {exercises.length>0&&(
          <div style={{marginBottom:12}}>
            <div style={{color:C.mutedLight,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:8}}>
              Exercises — Sets × Reps @ RPE
            </div>

            {exercises.map((ex,idx)=>(
              <div key={idx} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"11px 12px",marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div>
                    <div style={{color:C.accent,fontSize:14,fontWeight:700}}>{ex.name}</div>
                    <div style={{color:C.muted,fontSize:12}}>{ex.variant}</div>
                  </div>
                  <button onClick={()=>removeExercise(idx)}
                    style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18,padding:0,lineHeight:1}}>×</button>
                </div>
                {/* Prescription row */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 22px 1fr 22px 1fr",alignItems:"center",gap:6}}>
                  <div>
                    <div style={{color:C.muted,fontSize:9,textAlign:"center",marginBottom:3,textTransform:"uppercase"}}>Sets</div>
                    <input type="number" value={ex.prescription.sets} onChange={e=>updatePrescription(idx,"sets",e.target.value)} style={{...IS,fontSize:14}}/>
                  </div>
                  <span style={{color:C.muted,fontSize:13,textAlign:"center"}}>×</span>
                  <div>
                    <div style={{color:C.muted,fontSize:9,textAlign:"center",marginBottom:3,textTransform:"uppercase"}}>Reps</div>
                    <input type="number" value={ex.prescription.reps} onChange={e=>updatePrescription(idx,"reps",e.target.value)} style={{...IS,fontSize:14}}/>
                  </div>
                  <span style={{color:C.muted,fontSize:13,textAlign:"center"}}>@</span>
                  <div>
                    <div style={{color:C.muted,fontSize:9,textAlign:"center",marginBottom:3,textTransform:"uppercase"}}>RPE</div>
                    <select value={ex.prescription.rpe} onChange={e=>updatePrescription(idx,"rpe",e.target.value)} style={{...IS,appearance:"none",fontSize:14}}>
                      {RPE_KEYS.map(r=><option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={()=>setShowPicker(true)}
          style={{background:C.accentDim,border:`1px dashed ${C.accent}`,borderRadius:12,color:C.accent,cursor:"pointer",fontSize:14,fontWeight:700,padding:"14px",width:"100%",marginBottom:8}}>
          + Add Exercise
        </button>

        {!canSave&&name.trim()&&exercises.length===0&&(
          <div style={{color:C.muted,fontSize:12,textAlign:"center",marginTop:4}}>Add at least one exercise to save</div>
        )}
      </div>

      {showPicker&&<ExercisePicker onSelect={(n,v)=>{addExercise(n,v);setShowPicker(false);}} onClose={()=>setShowPicker(false)}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRE-WORKOUT REVIEW
// ═══════════════════════════════════════════════════════════════════════════════
function PreWorkoutReview({template,history,onConfirm,onCancel}) {
  const build=()=>template.exercises.map(ex=>{
    const e1rm=getAvgE1RM(history,ex.name);
    const {sets:n,reps,rpe}=ex.prescription;
    const w=e1rm?calcWeight(e1rm,reps,rpe):null;
    return {
      id:Math.random(), name:ex.name, variant:ex.variant, prescription:ex.prescription, notes:"",
      sets:Array.from({length:n},()=>({id:Math.random(),weight:w?String(w):"",reps:String(reps),rpe:String(rpe)})),
    };
  });
  const [exercises,setExercises]=useState(build);
  const [showPicker,setShowPicker]=useState(false);
  const updateEx=(idx,ex)=>{const u=[...exercises];u[idx]=ex;setExercises(u);};

  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:100,background:C.bg}}>
      {/* Header */}
      <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"sticky",top:0,background:C.bg,zIndex:10}}>
        <div>
          <div style={{color:C.muted,fontSize:11,textTransform:"uppercase",letterSpacing:"0.5px",fontWeight:600}}>Template Preview</div>
          <div style={{color:C.text,fontSize:18,fontWeight:700,marginTop:2}}>{template.name}</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={onCancel} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,color:C.muted,cursor:"pointer",fontSize:12,fontWeight:700,padding:"6px 10px"}}>Cancel</button>
          <button onClick={()=>onConfirm(exercises)} style={{background:"#0d2a1a",border:`1px solid ${C.success}`,borderRadius:8,color:C.success,cursor:"pointer",fontSize:12,fontWeight:700,padding:"6px 14px"}}>Start →</button>
        </div>
      </div>

      <div style={{margin:"12px 16px 0",padding:"10px 14px",background:C.purpleDim,border:`1px solid ${C.purple}44`,borderRadius:10,display:"flex",gap:10,alignItems:"flex-start"}}>
        <span>✏️</span>
        <span style={{color:C.mutedLight,fontSize:13,lineHeight:1.4}}>Weights pre-filled from your avg E1RM (last 3 sessions). Tweak anything before starting.</span>
      </div>

      <div style={{padding:"14px 16px"}}>
        {exercises.map((ex,idx)=>{
          const e1rm=getAvgE1RM(history,ex.name);
          return (
            <div key={ex.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,marginBottom:14,overflow:"hidden"}}>
              <div style={{padding:"11px 14px 8px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{color:C.accent,fontSize:15,fontWeight:700}}>{ex.name}</div>
                  <div style={{color:C.mutedLight,fontSize:12,marginTop:2}}>{ex.variant}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{color:C.purple,fontSize:12,fontWeight:700}}>{ex.prescription.sets}×{ex.prescription.reps} @ RPE {ex.prescription.rpe}</div>
                  {e1rm&&<div style={{color:C.muted,fontSize:10,marginTop:2}}>Avg E1RM: {e1rm} lbs</div>}
                </div>
              </div>
              <div style={{padding:"0 14px"}}>
                <div style={{display:"grid",gridTemplateColumns:"26px 1fr 22px 1fr 22px 1fr 22px",gap:3,padding:"4px 0"}}>
                  {["Set","Weight","","Reps","","RPE",""].map((h,i)=><span key={i} style={{color:C.muted,fontSize:9,textAlign:"center",textTransform:"uppercase"}}>{h}</span>)}
                </div>
                {ex.sets.map((set,si)=>(
                  <div key={set.id} style={{display:"grid",gridTemplateColumns:"26px 1fr 22px 1fr 22px 1fr 22px",alignItems:"center",gap:3,padding:"5px 0",borderBottom:`1px solid ${C.border}`}}>
                    <span style={{color:C.muted,fontSize:12,textAlign:"center",fontWeight:700}}>{si+1}</span>
                    <input type="number" value={set.weight} onChange={e=>{const s=[...ex.sets];s[si]={...set,weight:e.target.value};updateEx(idx,{...ex,sets:s});}} style={IS}/>
                    <span style={{color:C.muted,fontSize:11,textAlign:"center"}}>×</span>
                    <input type="number" value={set.reps} onChange={e=>{const s=[...ex.sets];s[si]={...set,reps:e.target.value};updateEx(idx,{...ex,sets:s});}} style={IS}/>
                    <span style={{color:C.muted,fontSize:11,textAlign:"center"}}>@</span>
                    <select value={set.rpe} onChange={e=>{const s=[...ex.sets];s[si]={...set,rpe:e.target.value};updateEx(idx,{...ex,sets:s});}} style={{...IS,appearance:"none"}}>
                      {RPE_KEYS.map(r=><option key={r} value={r}>{r}</option>)}
                    </select>
                    <button onClick={()=>{const s=ex.sets.filter((_,i)=>i!==si);updateEx(idx,{...ex,sets:s});}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14,padding:0,textAlign:"center"}}>×</button>
                  </div>
                ))}
              </div>
              <button onClick={()=>{const last=ex.sets[ex.sets.length-1];updateEx(idx,{...ex,sets:[...ex.sets,{...last,id:Math.random()}]});}}
                style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:13,fontWeight:700,padding:"8px 14px",width:"100%",textAlign:"center"}}>
                + Add set
              </button>
            </div>
          );
        })}
        <button onClick={()=>setShowPicker(true)}
          style={{background:C.accentDim,border:`1px dashed ${C.accent}`,borderRadius:12,color:C.accent,cursor:"pointer",fontSize:14,fontWeight:700,padding:14,width:"100%"}}>
          + Add Extra Exercise
        </button>
      </div>

      {showPicker&&<ExercisePicker
        onSelect={(n,v)=>{setExercises([...exercises,{id:Math.random(),name:n,variant:v,prescription:null,notes:"",sets:[{weight:"",reps:"",rpe:"",id:Math.random()},{weight:"",reps:"",rpe:"",id:Math.random()}]}]);setShowPicker(false);}}
        onClose={()=>setShowPicker(false)}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LIVE WORKOUT
// ═══════════════════════════════════════════════════════════════════════════════
function LiveWorkoutScreen({exercises:initial,workoutTitle,onFinish,onCancel}) {
  const [exercises,setExercises]=useState(initial);
  const [showPicker,setShowPicker]=useState(false);
  const updateEx=(idx,ex)=>{const u=[...exercises];u[idx]=ex;setExercises(u);};
  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:100,background:C.bg}}>
      <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:C.bg,zIndex:10}}>
        <button onClick={onCancel} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14}}>← Back</button>
        <div style={{color:C.text,fontSize:17,fontWeight:700}}>{workoutTitle}</div>
        <button onClick={()=>onFinish(exercises)} style={{background:"#0d2a1a",border:`1px solid ${C.success}`,borderRadius:8,color:C.success,cursor:"pointer",fontSize:12,fontWeight:700,padding:"6px 12px"}}>Finish ✓</button>
      </div>
      <div style={{padding:"14px 16px"}}>
        {exercises.length===0&&(
          <div style={{textAlign:"center",padding:"40px 20px",color:C.muted}}>
            <div style={{fontSize:36,marginBottom:10}}>🏋️</div>
            <div style={{fontSize:14}}>Tap below to add your first exercise</div>
          </div>
        )}
        {exercises.map((ex,idx)=>(
          <ExerciseCard key={ex.id} exercise={ex} onChange={e=>updateEx(idx,e)} onDelete={()=>setExercises(exercises.filter((_,i)=>i!==idx))}/>
        ))}
        <button onClick={()=>setShowPicker(true)} style={{background:C.accentDim,border:`1px dashed ${C.accent}`,borderRadius:12,color:C.accent,cursor:"pointer",fontSize:14,fontWeight:700,padding:14,width:"100%"}}>+ Add Exercise</button>
      </div>
      {showPicker&&<ExercisePicker
        onSelect={(n,v)=>{setExercises([...exercises,{id:Math.random(),name:n,variant:v,prescription:null,notes:"",sets:[{weight:"",reps:"",rpe:"",id:Math.random()},{weight:"",reps:"",rpe:"",id:Math.random()},{weight:"",reps:"",rpe:"",id:Math.random()}]}]);setShowPicker(false);}}
        onClose={()=>setShowPicker(false)}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOME SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function HomeScreen({onStartEmpty}) {
  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      {/* App name header */}
      <div style={{padding:"24px 16px 16px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
          <span style={{fontSize:28}}>🏋️</span>
          <div>
            <div style={{color:C.text,fontSize:22,fontWeight:800,letterSpacing:"-0.5px"}}>Workout Flow</div>
            <div style={{color:C.muted,fontSize:13}}>Track. Analyze. Progress.</div>
          </div>
        </div>
      </div>

      <div style={{padding:16}}>
        <button onClick={onStartEmpty}
          style={{background:C.accentDim,border:`1px solid ${C.accent}`,borderRadius:14,color:C.accent,cursor:"pointer",fontSize:16,fontWeight:700,padding:"22px",width:"100%",textAlign:"center",marginBottom:14}}>
          <div style={{fontSize:30,marginBottom:6}}>➕</div>
          Start Empty Workout
        </button>

        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"18px 16px",textAlign:"center",color:C.muted,fontSize:14,lineHeight:1.6}}>
          <div style={{fontSize:30,marginBottom:10}}>📋</div>
          Have a saved workout? Go to the <span style={{color:C.purple,fontWeight:700}}>Templates</span> tab to start a session with weights auto-filled from your history.
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HISTORY SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function HistoryScreen({history}) {
  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={{padding:"20px 16px 12px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{color:C.text,fontSize:20,fontWeight:700}}>History</div>
        <div style={{color:C.muted,fontSize:13,marginTop:2}}>{history.length} workout{history.length!==1?"s":""} logged</div>
      </div>
      <div style={{padding:16}}>
        {history.length===0&&(
          <div style={{textAlign:"center",padding:"60px 20px",color:C.muted}}>
            <div style={{fontSize:48,marginBottom:12}}>📋</div>
            <div style={{fontSize:15,fontWeight:600,color:C.mutedLight}}>No workouts logged yet</div>
            <div style={{fontSize:13,marginTop:4}}>Finish a workout to see it here</div>
          </div>
        )}
        {history.map(w=>(
          <div key={w.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div>
                <span style={{color:C.text,fontSize:15,fontWeight:700}}>{w.name}</span>
                {w.templateName&&<div style={{color:C.purple,fontSize:11,marginTop:2}}>from template: {w.templateName}</div>}
              </div>
              <span style={{color:C.muted,fontSize:13}}>{w.date}</span>
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
// RPE CALC SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function RPECalcScreen({history}) {
  const historySets=getHistorySets(history);
  const exNames=Object.keys(historySets);
  const [source,setSource]=useState("manual");
  const [mW,setMW]=useState(""); const [mR,setMR]=useState(""); const [mRpe,setMRpe]=useState("");
  const [selEx,setSelEx]=useState(exNames[0]||""); const [selIdx,setSelIdx]=useState(0);
  const [hov,setHov]=useState(null);
  let bW,bR,bRpe;
  if(source==="manual"){bW=parseFloat(mW);bR=parseFloat(mR);bRpe=parseFloat(mRpe);}
  else{const s=(historySets[selEx]||[])[selIdx]||{};bW=s.weight;bR=s.reps;bRpe=s.rpe;}
  const e1rm=calc1RM(bW,bR,bRpe);
  const cellBg=w=>{if(!w||!e1rm)return C.card;const p=w/e1rm;if(p>=0.95)return"#3b1515";if(p>=0.90)return"#2d2010";if(p>=0.85)return"#1a2a0d";if(p>=0.80)return"#0d2a1a";return C.card;};
  const cellFg=w=>{if(!w||!e1rm)return C.muted;const p=w/e1rm;if(p>=0.95)return C.danger;if(p>=0.90)return C.warning;if(p>=0.85)return"#a3e635";if(p>=0.80)return C.success;return C.mutedLight;};

  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={{padding:"20px 16px 12px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{color:C.text,fontSize:20,fontWeight:700}}>RPE Load Calculator</div>
        <div style={{color:C.muted,fontSize:13,marginTop:2}}>Project weights across all RPE × rep combos</div>
      </div>
      <div style={{padding:16}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
          {[{id:"manual",l:"✏️ Manual"},{id:"history",l:"📋 History"}].map(s=>(
            <button key={s.id} onClick={()=>setSource(s.id)} style={{background:source===s.id?C.accentDim:C.card,border:`1px solid ${source===s.id?C.accent:C.border}`,borderRadius:10,color:source===s.id?C.accent:C.muted,cursor:"pointer",fontSize:13,fontWeight:700,padding:"9px 8px"}}>{s.l}</button>
          ))}
        </div>
        {source==="manual"?(
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
                {(historySets[selEx]||[]).map((s,i)=>{
                  const e=calc1RM(s.weight,s.reps,s.rpe);
                  return(<div key={i} onClick={()=>setSelIdx(i)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",borderRadius:8,marginBottom:5,cursor:"pointer",background:selIdx===i?C.accentDim:C.inputBg,border:`1px solid ${selIdx===i?C.accent:C.inputBorder}`}}>
                    <div><span style={{color:C.text,fontSize:13,fontWeight:700}}>{s.weight}×{s.reps}@{s.rpe}</span><div style={{color:C.muted,fontSize:11}}>{s.variant}·{s.date}</div></div>
                    <span style={{color:C.success,fontSize:12,fontWeight:700}}>{e} lbs</span>
                  </div>);
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
                      {REP_KEYS.map(reps=>{const w=calcWeight(e1rm,reps,rpe);const isH=hov?.rpe===rpe&&hov?.reps===reps;return(<td key={reps} onMouseEnter={()=>setHov({rpe,reps})} onMouseLeave={()=>setHov(null)} style={{padding:"5px 3px",textAlign:"center",fontSize:isH?13:12,fontWeight:isH?800:600,color:cellFg(w),background:cellBg(w),borderBottom:`1px solid ${C.border}`,cursor:"default",outline:isH?"1px solid #ffffff20":"none",outlineOffset:-1}}>{w||"—"}</td>);})}
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
// PROGRESS SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function ProgressScreen({history}) {
  const allExercises=[...new Set(history.flatMap(w=>w.exercises.map(e=>e.name)))];
  const [selEx,setSelEx]=useState(allExercises[0]||"");

  const dataPoints=[];
  history.slice().reverse().forEach(w=>{
    w.exercises.forEach(ex=>{
      if(ex.name===selEx){
        const best=Math.max(0,...ex.sets.map(s=>calc1RM(s.weight,s.reps,s.rpe)||0));
        if(best>0) dataPoints.push({date:w.date,e1rm:best});
      }
    });
  });

  const H=150,W=300;
  const vals=dataPoints.map(d=>d.e1rm);
  const minV=vals.length?Math.max(0,Math.min(...vals)-20):0;
  const maxV=vals.length?Math.max(...vals)+20:100;
  const toY=v=>H-((v-minV)/(maxV-minV))*H;

  return (
    <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
      <div style={{padding:"20px 16px 12px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{color:C.text,fontSize:20,fontWeight:700}}>Progress</div>
        <div style={{color:C.muted,fontSize:13,marginTop:2}}>E1RM over time by exercise</div>
      </div>
      <div style={{padding:16}}>
        {allExercises.length===0?(
          <div style={{textAlign:"center",padding:"60px 20px",color:C.muted}}>
            <div style={{fontSize:48,marginBottom:12}}>📈</div>
            <div style={{fontSize:15,fontWeight:600,color:C.mutedLight}}>No data yet</div>
            <div style={{fontSize:13,marginTop:4}}>Log workouts to see your progress</div>
          </div>
        ):(
          <>
            <select value={selEx} onChange={e=>setSelEx(e.target.value)}
              style={{...IS,textAlign:"left",padding:"9px 14px",fontSize:14,marginBottom:14,width:"100%",borderRadius:10}}>
              {allExercises.map(n=><option key={n} value={n}>{n}</option>)}
            </select>

            {dataPoints.length>0?(
              <>
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:14,marginBottom:14}}>
                  <svg width="100%" viewBox={`0 0 ${W} ${H+24}`} style={{display:"block"}}>
                    {[minV,Math.round((minV+maxV)/2),maxV].map(v=>(
                      <g key={v}><line x1="20" y1={toY(v)} x2={W} y2={toY(v)} stroke={C.border} strokeWidth="1"/><text x="0" y={toY(v)+4} fill={C.muted} fontSize="8">{v}</text></g>
                    ))}
                    {dataPoints.length>1&&(
                      <polyline points={dataPoints.map((d,i)=>`${20+(i/(dataPoints.length-1))*(W-30)},${toY(d.e1rm)}`).join(" ")} fill="none" stroke={C.accent} strokeWidth="2" strokeLinejoin="round"/>
                    )}
                    {dataPoints.map((d,i)=>(
                      <g key={i}>
                        <circle cx={20+(dataPoints.length>1?i/(dataPoints.length-1):0.5)*(W-30)} cy={toY(d.e1rm)} r="4" fill={C.accent}/>
                        <text x={20+(dataPoints.length>1?i/(dataPoints.length-1):0.5)*(W-30)} y={H+18} fill={C.muted} fontSize="8" textAnchor="middle">{d.date.slice(5)}</text>
                      </g>
                    ))}
                  </svg>
                </div>
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{color:C.text,fontSize:15,fontWeight:700}}>{selEx}</div>
                    <div style={{color:C.muted,fontSize:12}}>Best E1RM</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{color:C.accent,fontSize:22,fontWeight:800}}>{Math.max(...vals)} lbs</div>
                    {dataPoints.length>1&&<div style={{color:vals[vals.length-1]>=vals[0]?C.success:C.danger,fontSize:12}}>{vals[vals.length-1]>=vals[0]?"+":""}{vals[vals.length-1]-vals[0]} lbs total</div>}
                  </div>
                </div>
              </>
            ):(
              <div style={{background:C.card,border:`1px dashed ${C.border}`,borderRadius:14,padding:"40px 20px",textAlign:"center",color:C.muted,fontSize:14}}>No logged sets for {selEx} yet</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════
const NAV = [
  {id:"home",     icon:"🏠", label:"Home"},
  {id:"history",  icon:"📋", label:"History"},
  {id:"templates",icon:"📅", label:"Templates"},
  {id:"calc",     icon:"📊", label:"RPE Calc"},
  {id:"progress", icon:"📈", label:"Progress"},
];

export default function App() {
  const [tab,setTab]=useState("home");
  const [history,setHistory]=useState([]);
  const [templates,setTemplates]=useState([]);
  const [flow,setFlow]=useState(null);
  // flow: null | {type:"review", template} | {type:"live", exercises, title, templateName}

  const handleStartTemplate=template=>{
    setFlow({type:"review",template});
    setTab("home");
  };
  const handleConfirm=exercises=>{
    setFlow(f=>({type:"live",exercises,title:f.template.name,templateName:f.template.name}));
  };
  const handleFinish=exercises=>{
    setHistory([{
      id:Date.now(),
      date:new Date().toISOString().slice(0,10),
      name:flow.title,
      templateName:flow.templateName||null,
      exercises:exercises.map(ex=>({
        name:ex.name, variant:ex.variant,
        sets:ex.sets.map(s=>({weight:parseFloat(s.weight)||0,reps:parseFloat(s.reps)||0,rpe:parseFloat(s.rpe)||0})),
      })),
    },...history]);
    setFlow(null);
  };

  const shell=content=>(
    <div style={{background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",display:"flex",flexDirection:"column",fontFamily:"'DM Sans','Segoe UI',sans-serif",color:C.text}}>
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

  // Workout flows render without nav
  if(flow?.type==="review") return shell(
    <PreWorkoutReview template={flow.template} history={history} onConfirm={handleConfirm} onCancel={()=>setFlow(null)}/>
  );
  if(flow?.type==="live") return shell(
    <LiveWorkoutScreen exercises={flow.exercises} workoutTitle={flow.title} onFinish={handleFinish} onCancel={()=>setFlow(null)}/>
  );

  return shell(
    <>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {tab==="home"      && <HomeScreen onStartEmpty={()=>setFlow({type:"live",exercises:[],title:"Workout",templateName:null})}/>}
        {tab==="history"   && <HistoryScreen history={history}/>}
        {tab==="templates" && <TemplatesScreen templates={templates} setTemplates={setTemplates} history={history} onStartTemplate={handleStartTemplate}/>}
        {tab==="calc"      && <RPECalcScreen history={history}/>}
        {tab==="progress"  && <ProgressScreen history={history}/>}
      </div>

      {/* Bottom nav */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.tabBg,borderTop:`1px solid ${C.border}`,display:"grid",gridTemplateColumns:"repeat(5,1fr)",alignItems:"center",padding:"8px 0 12px",zIndex:50}}>
        {NAV.map(item=>(
          <button key={item.id} onClick={()=>setTab(item.id)}
            style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"0 2px"}}>
            <span style={{fontSize:17}}>{item.icon}</span>
            <span style={{fontSize:9,fontWeight:tab===item.id?700:500,color:tab===item.id?C.accent:C.muted}}>{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
