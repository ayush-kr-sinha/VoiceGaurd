const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");
const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const selectedFile = document.getElementById("selectedFile");
const fileName = document.getElementById("fileName");
const fileMeta = document.getElementById("fileMeta");
const analyzeArea = document.getElementById("analyzeArea");
const analyzeBtn = document.getElementById("analyzeBtn");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
const removeFile = document.getElementById("removeFile");
const historyBody = document.getElementById("historyBody");
const historySearch = document.getElementById("historySearch");
const riskFilter = document.getElementById("riskFilter");

let selected = null;

let history = [
  {file:"rec_001.wav", date:"2026-10-22 18:30", risk:"Elevated Risk", time:"1 min 22 sec"},
  {file:"rec_002.mp3", date:"2026-10-22 18:33", risk:"Low Risk", time:"1 min 22 sec"},
  {file:"rec_003.mp3", date:"2026-10-21 18:59", risk:"Low Risk", time:"1 min 20 sec"},
  {file:"rec_004.mp3", date:"2026-10-20 19:07", risk:"Low Risk", time:"1 min 25 sec"},
  {file:"rec_006.mp3", date:"2026-10-19 18:01", risk:"High Risk", time:"1 min 23 sec"},
  {file:"rec_007.mp3", date:"2026-10-18 05:33", risk:"High Risk", time:"1 min 25 sec"},
  {file:"rec_008.mp3", date:"2026-10-17 10:39", risk:"High Risk", time:"1 min 23 sec"}
];

function showPage(name){
  pages.forEach(p => p.classList.toggle("active-page", p.id === `page-${name}`));
  navLinks.forEach(b => b.classList.toggle("active", b.dataset.page === name));
  window.scrollTo({top:0,behavior:"smooth"});
}
navLinks.forEach(btn => btn.addEventListener("click",()=>showPage(btn.dataset.page)));
document.querySelector(".brand").addEventListener("click",e=>{e.preventDefault();showPage("new")});

function setFile(file){
  if(!file) return;
  selected = file;
  fileName.textContent = file.name;
  fileMeta.textContent = `${(file.size/1024/1024).toFixed(2)} MB`;
  selectedFile.classList.remove("hidden");
  analyzeArea.classList.remove("hidden");
  result.classList.add("hidden");
}
fileInput.addEventListener("change",e=>setFile(e.target.files[0]));
dropZone.addEventListener("dragover",e=>{e.preventDefault();dropZone.classList.add("dragover")});
dropZone.addEventListener("dragleave",()=>dropZone.classList.remove("dragover"));
dropZone.addEventListener("drop",e=>{e.preventDefault();dropZone.classList.remove("dragover");setFile(e.dataTransfer.files[0])});
removeFile.addEventListener("click",()=>{
  selected=null;fileInput.value="";selectedFile.classList.add("hidden");analyzeArea.classList.add("hidden");result.classList.add("hidden");
});

analyzeBtn.addEventListener("click",()=>{
  if(!selected)return;
  analyzeArea.classList.add("hidden");
  loading.classList.remove("hidden");
  result.classList.add("hidden");
  setTimeout(()=>{
    loading.classList.add("hidden");
    // Demo result. Replace this block with your FastAPI model response later.
    const aiProbability = Math.floor(Math.random()*71)+20;
    const high = aiProbability >= 70;
    const elevated = aiProbability >= 40 && !high;
    const confidence = Math.max(aiProbability, 100-aiProbability);
    const risk = high ? "High Risk" : elevated ? "Elevated Risk" : "Low Risk";

    document.getElementById("riskTitle").textContent = risk;
    const badge=document.getElementById("riskBadge");
    badge.textContent=risk;
    badge.className=`badge ${high?"high":elevated?"elevated":"low"}`;
    document.getElementById("confidence").textContent=confidence+"%";
    document.getElementById("confidenceBar").style.width=confidence+"%";
    document.getElementById("aiProbability").textContent=aiProbability+"%";
    document.getElementById("aiBar").style.width=aiProbability+"%";

    document.getElementById("resultText").textContent = high
      ? "The analysis found strong indicators associated with synthetic or manipulated speech. Treat the recording as suspicious."
      : elevated
      ? "Some characteristics are unusual and may be associated with synthetic speech. Further verification is recommended."
      : "The analysis indicates a low probability that this voice contains AI-generated segments. It is likely to be genuine.";

    document.getElementById("recommendation").innerHTML = high
      ? "<strong>Recommended:</strong> Do not share OTPs, PINs, passwords, banking details, or send money based on this call alone."
      : elevated
      ? "<strong>Recommended:</strong> Verify the speaker through another trusted channel before taking sensitive action."
      : "<strong>Recommended:</strong> This recording appears low risk based on the current analysis.";

    history.unshift({file:selected.name,date:new Date().toLocaleString("en-IN",{hour12:false}),risk,time:"~1.2 sec"});
    renderHistory();
    result.classList.remove("hidden");
  },1200);
});

document.getElementById("analyzeAnother").addEventListener("click",()=>removeFile.click());
document.getElementById("viewHistory").addEventListener("click",()=>showPage("history"));

function renderHistory(){
  const q=historySearch.value.toLowerCase();
  const filter=riskFilter.value;
  const rows=history.filter(x=>(!q||x.file.toLowerCase().includes(q))&&(filter==="all"||x.risk===filter));
  historyBody.innerHTML="";
  document.getElementById("emptyHistory").classList.toggle("hidden",rows.length>0);
  rows.forEach(x=>{
    const cls=x.risk==="High Risk"?"risk-high":x.risk==="Elevated Risk"?"risk-elevated":"risk-low";
    historyBody.insertAdjacentHTML("beforeend",`
      <tr>
        <td>${escapeHtml(x.file)}</td><td>${escapeHtml(x.date)}</td>
        <td><span class="risk-pill ${cls}">${x.risk}</span></td>
        <td>${x.time}</td><td><button class="view-btn">View</button></td>
      </tr>`);
  });
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
historySearch.addEventListener("input",renderHistory);
riskFilter.addEventListener("change",renderHistory);
renderHistory();
