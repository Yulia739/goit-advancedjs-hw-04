/* empty css                      */import{a as h,i as d,S as b}from"./assets/vendor-DWXSRYDZ.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const m={BASE_URL:"https://pixabay.com/api/",API_KEY:"38590711-cd4e1138b2603dfebaf6d7de9",DEFAULT_PARAMS:{image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15}},L={closeOnClick:!0,position:"topRight",displayMode:0,progressBar:!1};async function y(e,r=1){var i,t;if(!(e!=null&&e.trim()))throw new Error("Please enter a search query");const o={...m.DEFAULT_PARAMS,q:e.trim().toLowerCase(),page:r};try{return(await h.get(m.BASE_URL,{params:{key:m.API_KEY,...o}})).data}catch(s){const l=((t=(i=s.response)==null?void 0:i.data)==null?void 0:t.message)||s.message||"Failed to fetch images. Please try again.";throw d.error({...L,message:l}),new Error(l)}}const v=({comments:e,downloads:r,likes:o,largeImageURL:i,previewURL:t,views:s})=>`
  <li class="gallery-item">
    <a class="gallery-link" href="${i}">
      <img
        class="gallery-image"
        src="${t}"
        alt="Gallery image"
        loading="lazy"
      />
    </a>
    <div class="image-descriptions-container">
      <div class="small-descriptions-container">
        <p>Likes</p>
        <p>${o}</p>
      </div>
      <div class="small-descriptions-container">
        <p>Views</p>
        <p>${s}</p>
      </div>
      <div class="small-descriptions-container">
        <p>Comments</p>
        <p>${e}</p>
      </div>
      <div class="small-descriptions-container">
        <p>Downloads</p>
        <p>${r}</p>
      </div>
    </div>
  </li>
`;function f(e){if(!Array.isArray(e)||e.length===0)return"";const r=e.map(v).join("");return setTimeout(()=>{document.querySelectorAll(".gallery-item").forEach(i=>{i.classList.add("animate")})},0),r}function A(e){const r=e*2;window.scrollBy({top:r,behavior:"smooth"})}const n={form:document.querySelector("form"),gallery:document.querySelector(".gallery"),input:document.querySelector('input[type="text"]'),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more-btn"),loadMoreContainer:document.querySelector(".load-more-container")},P={captions:!0,captionsData:"alt",captionSelector:"img",captionPosition:"outside",captionDelay:250,overlayOpacity:.8,styles:"../css/styles.css"},u={closeOnClick:!0,position:"topRight",displayMode:0,progressBar:!1,backgroundColor:"#EF4040",messageColor:"white",iconColor:"white",maxWidth:"432px"},a={currentPage:1,currentQuery:"",totalHits:0,lightbox:null};function g(e){e?n.loader.classList.add("visible"):n.loader.classList.remove("visible")}function c(e){n.loadMoreBtn.style.display=e?"block":"none"}function p(){d.info({...u,backgroundColor:"#4CAF50",message:"We're sorry, but you've reached the end of search results."})}const S=async()=>{if(a.currentQuery){a.currentPage+=1,c(!1),g(!0);try{const e=await y(a.currentQuery,a.currentPage);if(e.hits.length===0){p();return}const r=f(e.hits);n.gallery.insertAdjacentHTML("beforeend",r),a.lightbox&&a.lightbox.refresh();const o=document.querySelectorAll(".gallery-item");if(o.length>0){const t=o[0].getBoundingClientRect().height;A(t)}a.currentPage*15>=e.totalHits?(c(!1),p()):c(!0)}catch(e){d.error({...u,message:e.message||"Failed to load more images"}),c(!0)}finally{g(!1)}}},w=async e=>{e.preventDefault();const r=n.input.value.trim();if(!r){d.error({...u,message:"Please enter a search query"});return}a.currentPage=1,a.currentQuery=r,n.gallery.innerHTML="",c(!1),g(!0),a.lightbox&&(a.lightbox.destroy(),a.lightbox=null);try{const o=await y(r,a.currentPage);if(o.hits.length===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");n.gallery.innerHTML=f(o.hits),a.lightbox=new b(".gallery a",P),o.hits.length<o.totalHits&&c(!0),a.totalHits=o.totalHits}catch(o){d.error({...u,message:o.message||"Failed to fetch images"})}finally{g(!1)}};n.form.addEventListener("submit",w);n.loadMoreBtn.addEventListener("click",S);
//# sourceMappingURL=index.js.map
