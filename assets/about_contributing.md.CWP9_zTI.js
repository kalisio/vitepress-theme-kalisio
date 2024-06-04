import{_ as e,c as t,o as a,aj as o}from"./chunks/framework.B6y2dDHq.js";const m=JSON.parse('{"title":"Contributing","description":"","frontmatter":{},"headers":[],"relativePath":"about/contributing.md","filePath":"about/contributing.md","lastUpdated":1717498311000}'),i={name:"about/contributing.md"},s=o('<h1 id="contributing" tabindex="-1">Contributing <a class="header-anchor" href="#contributing" aria-label="Permalink to &quot;Contributing&quot;">​</a></h1><p>If you are a developer you can help us build a better Kalisio Crisis !</p><h2 id="submission-guidelines" tabindex="-1">Submission guidelines <a class="header-anchor" href="#submission-guidelines" aria-label="Permalink to &quot;Submission guidelines&quot;">​</a></h2><h3 id="report-a-bug" tabindex="-1">Report a bug <a class="header-anchor" href="#report-a-bug" aria-label="Permalink to &quot;Report a bug&quot;">​</a></h3><p>Before creating an issue please make sure you have checked out the docs, you might want to also try searching Github. It&#39;s pretty likely someone has already asked a similar question.</p><p>Issues can be reported in the <a href="https://github.com/kalisio/crisis/issues" target="_blank" rel="noreferrer">issue tracker</a>.</p><h3 id="pull-requests" tabindex="-1">Pull Requests <a class="header-anchor" href="#pull-requests" aria-label="Permalink to &quot;Pull Requests&quot;">​</a></h3><p>We love pull requests and we&#39;re continually working to make it as easy as possible for people to contribute.</p><p>We prefer small pull requests with minimal code changes. The smaller they are the easier they are to review and merge. A core team member will pick up your PR and review it as soon as they can. They may ask for changes or reject your pull request. This is not a reflection of you as an engineer or a person. Please accept feedback graciously as we will also try to be sensitive when providing it.</p><p>Although we generally accept many PRs they can be rejected for many reasons. We will be as transparent as possible but it may simply be that you do not have the same context or information regarding the roadmap that the core team members have. We value the time you take to put together any contributions so we pledge to always be respectful of that time and will try to be as open as possible so that you don&#39;t waste it.</p><h2 id="commit-message-guidelines" tabindex="-1">Commit message guidelines <a class="header-anchor" href="#commit-message-guidelines" aria-label="Permalink to &quot;Commit message guidelines&quot;">​</a></h2><p>We follow the <a href="https://www.conventionalcommits.org/en/v1.0.0-beta.3/" target="_blank" rel="noreferrer">Conventional commits specifications</a> which provides a set of rules to make commit messages more readable when looking through the project history. But also, we use the git commit messages to generate the change log.</p><h3 id="commit-message-format" tabindex="-1">Commit message format <a class="header-anchor" href="#commit-message-format" aria-label="Permalink to &quot;Commit message format&quot;">​</a></h3><p>The commit message should be structured as follows:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;type&gt;: &lt;subject&gt; [optional `breaking`]</span></span></code></pre></div><p>Where <code>type</code> must be one of the following:</p><ul><li><code>build</code>: changes that affect the build system (external dependencies)</li><li><code>ci</code>: changes to our CI configuration files and scripts</li><li><code>chore</code>: changes that affect the project structure</li><li><code>docs</code>: changes that affect the documentation only</li><li><code>feat</code>: a new feature</li><li><code>fix</code>: a bug fix</li><li><code>perf</code>: a code change that improves performance</li><li><code>refactor</code>: a code change that neither fixes a bug nor adds a feature</li><li><code>revert</code>: revert changes</li><li><code>style</code>: changes that do not affect the meaning of the code (lint issues)</li><li><code>test</code>: adding missing tests or correcting existing tests</li></ul><p>Use the optional <code>[ breaking ]</code> keyword to declare a <strong>BREAKING CHANGE</strong>.</p><h3 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><ul><li>Commit message with description and breaking change in body</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>feat: allow provided config object to extend other configs [ breaking ]</span></span></code></pre></div><ul><li>Commit message with no body</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docs: correct spelling in the contributing.md file</span></span></code></pre></div><ul><li>Commit message for a fix using an issue number.</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fix: fix minor issue in code (#12)</span></span></code></pre></div><h2 id="versioning-guidelines" tabindex="-1">Versioning guidelines <a class="header-anchor" href="#versioning-guidelines" aria-label="Permalink to &quot;Versioning guidelines&quot;">​</a></h2><p>We rely on <a href="https://semver.org/" target="_blank" rel="noreferrer">Semantic Versioning</a> for versioning a release. Indeed, given a version number <code>MAJOR.MINOR.PATCH</code>, increment the:</p><ul><li><code>MAJOR</code> version when you make a major evolution leading to breaking changes,</li><li><code>MINOR</code> version when you add functionality in a backwards-compatible manner</li><li><code>PATCH</code> version when you make backwards-compatible bug fixes.</li></ul><p>The command <code>npm run release:&lt;type&gt;</code>, where <code>&lt;type&gt;</code> is either <code>patch</code>, <code>minor</code> or <code>major</code>, helps you to do the release.</p><p>It performs the following task for you:</p><ul><li>increase the package version number in the <code>package.json</code> file</li><li>generate the change log</li><li>create a tag accordingly in the git repository and push it</li></ul><h2 id="contributor-code-of-conduct" tabindex="-1">Contributor Code of Conduct <a class="header-anchor" href="#contributor-code-of-conduct" aria-label="Permalink to &quot;Contributor Code of Conduct&quot;">​</a></h2><p>As contributors and maintainers of this project, we pledge to respect all people who contribute through reporting issues, posting feature requests, updating documentation, submitting pull requests or patches, and other activities.</p><p>We are committed to making participation in this project a harassment-free experience for everyone, regardless of level of experience, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, or religion.</p><p>Examples of unacceptable behavior by participants include the use of sexual language or imagery, derogatory comments or personal attacks, trolling, public or private harassment, insults, or other unprofessional conduct.</p><p>Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct. Project maintainers who do not follow the Code of Conduct may be removed from the project team.</p><p>Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by opening an issue or contacting one or more of the project maintainers.</p><p>This Code of Conduct is adapted from the <a href="http://contributor-covenant.org" target="_blank" rel="noreferrer">Contributor Covenant</a>, version 1.0.0, available at <a href="http://contributor-covenant.org/version/1/0/0/" target="_blank" rel="noreferrer">http://contributor-covenant.org/version/1/0/0/</a></p>',38),n=[s];function r(l,c,d,h,u,p){return a(),t("div",null,n)}const b=e(i,[["render",r]]);export{m as __pageData,b as default};