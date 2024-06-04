import{_ as h,c as p,j as s,I as e,aj as a,a as i,D as t,o as d}from"./chunks/framework.B6y2dDHq.js";const D=JSON.parse('{"title":"Usage","description":"","frontmatter":{},"headers":[],"relativePath":"guide/usage.md","filePath":"guide/usage.md","lastUpdated":1717498311000}'),r={name:"guide/usage.md"},k=a(`<h1 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h1><h2 id="using-keycloak-authentication" tabindex="-1">Using Keycloak authentication <a class="header-anchor" href="#using-keycloak-authentication" aria-label="Permalink to &quot;Using Keycloak authentication&quot;">​</a></h2><p>To enforce user authentication with <strong>Keycloak</strong>, all you need to do is:</p><ol><li>Declare a <code>keycloak</code> section in the <code>ThemeConfig</code> object like this:</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">keycloak</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;https://keycloak.url&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,        </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Url to the Keycloak instance</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  realm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;keycloak realm&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,            </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Keycloak realm to be used</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  clientId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;site&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,                   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Keycloak client id assigned to your site</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  roles</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;role1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;role2&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]      </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Keycloak realm roles required to acceqq the site</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  fallbackUrl</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;https://kalisio.com&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // Fallback Url if access is denied</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ol start="2"><li>Declare a <code>useKeycloak</code> property to <code>true</code> in the <code>ThemeConfig</code> object:</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">useKeycloak</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>During development, it may be convenient to bypass <strong>Keycloak</strong> authentication. You can achieve this by either commenting out the relevant line or utilizing an environment variable. This allows you to set or unset the variable, avoiding the need to modify the <code>config.js</code> file.</p></div><h2 id="using-quasar-framework" tabindex="-1">Using Quasar framework <a class="header-anchor" href="#using-quasar-framework" aria-label="Permalink to &quot;Using Quasar framework&quot;">​</a></h2><p><strong>Quasar framework</strong> is shipped with the theme. You can simply create any components and use any features provided by Quasar.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>There is still some work to be done to use SASS <strong>Quasar</strong> variables, internationalization (i18n) and plugins. For now the <a href="https://quasar.dev/quasar-plugins/dialog/" target="_blank" rel="noreferrer">Dialog plugin</a> is the only plugin installed.</p></div><h2 id="using-ready-made-components" tabindex="-1">Using ready-made components <a class="header-anchor" href="#using-ready-made-components" aria-label="Permalink to &quot;Using ready-made components&quot;">​</a></h2><p>Here, we offer a comprehensive description of the various components shipped with the theme.</p><h3 id="homefooter" tabindex="-1">HomeFooter <a class="header-anchor" href="#homefooter" aria-label="Permalink to &quot;HomeFooter&quot;">​</a></h3><p>This component renders a footer for the home page.</p><p>Within the <code>ThemeConfig</code> section:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">trustLogos</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  { imageLink: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, link: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><p><em>TODO</em></p><h3 id="image" tabindex="-1">Image <a class="header-anchor" href="#image" aria-label="Permalink to &quot;Image&quot;">​</a></h3><p>This component renders an image that supports the <strong>dark</strong> mode.</p><p>It exposes the following props:</p><table><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>src</code></td><td>the image to be displayed in normal mode</td><td>&#39;&#39;</td></tr><tr><td><code>darkSrc</code></td><td>the image to be displayed in dark mode</td><td>&#39;&#39;</td></tr></tbody></table>`,22),c=a(`<p>Example</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;//s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-black-256x84.png&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> darkSrc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-white-256x84.png&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/&gt;</span></span></code></pre></div>`,2),g=s("h3",{id:"kalisiologo",tabindex:"-1"},[i("KalisioLogo "),s("a",{class:"header-anchor",href:"#kalisiologo","aria-label":'Permalink to "KalisioLogo"'},"​")],-1),u=s("p",null,[i("This component renders an "),s("strong",null,"Kalisio"),i(" logo using the "),s("a",{href:"./usage.html#image"},"Image"),i(" component.")],-1),m=a('<p>Example</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">KalisioLogo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span></code></pre></div>',2),E=a(`<h3 id="kalisiomaps" tabindex="-1">KalisioMaps <a class="header-anchor" href="#kalisiomaps" aria-label="Permalink to &quot;KalisioMaps&quot;">​</a></h3><p>This component renders an instance of <strong>Kano</strong> wihtin an <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe" target="_blank" rel="noreferrer">iframe</a>.</p><p>If you like to get automatically connected, you must provide a token within the <code>maps</code> section in the <code>ThemeConfig</code>:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">maps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  jwt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&lt;TOKEN&gt;&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // the token to get automatically connected</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div>`,4),y=a('<p>Example</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">KalisioMaps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span></code></pre></div>',2),_=a(`<h3 id="templateanchor" tabindex="-1">TemplateAnchor <a class="header-anchor" href="#templateanchor" aria-label="Permalink to &quot;TemplateAnchor&quot;">​</a></h3><p>This component allows to interpolate an <code>href</code> according a context that includes:</p><ul><li>a <strong>domain</strong>: if you like to query an API depending on the flavor</li><li>a <strong>time</strong>: if you like to query an API at a specific time</li><li>a <strong>jwt</strong> : if you like to query an API that requires authentication</li></ul><p>It exposes the following props:</p><table><thead><tr><th>Name</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>text</code></td><td>text to display</td><td>Required</td></tr><tr><td><code>hrefTemplate</code></td><td>the url to be interpolated</td><td>Required</td></tr><tr><td><code>domainPath</code></td><td>the path to extract the <strong>domain</strong> value in the <code>ThemeConfig</code> section</td><td><code>jwt</code></td></tr><tr><td><code>jwtPath</code></td><td>the path to extract the <strong>jwt</strong> value in the <code>ThemeConfig</code> section</td><td><code>domain</code></td></tr></tbody></table><p>And it required to define within the <code>ThemeConfig</code> section the required keys:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  domain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&lt;DOMAIN&gt;&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // the domain to use when interpolating the url</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  jwt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&lt;TOKEN&gt;&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // the token to use if authentication is required</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Set the <code>domainPath</code> and <code>jwtPath</code> if you declare the keys <code>domain</code> and <code>jwt</code> in a different section</p></div><h3 id="tourlink" tabindex="-1">TourLink <a class="header-anchor" href="#tourlink" aria-label="Permalink to &quot;TourLink&quot;">​</a></h3><p><em>TODO</em></p>`,10);function b(F,f,v,C,T,A){const n=t("Image"),o=t("KalisioLogo"),l=t("KalisioMaps");return d(),p("div",null,[k,s("blockquote",null,[c,e(n,{src:"//s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-black-256x84.png",darkSrc:"https://s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-white-256x84.png"})]),g,u,s("blockquote",null,[m,e(o)]),E,s("blockquote",null,[y,e(l)]),_])}const x=h(r,[["render",b]]);export{D as __pageData,x as default};
