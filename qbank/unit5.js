window.QB = window.QB || [];
window.QB.push(
{
  id: "U5-01",
  unit: 5,
  topic: "Autoencoder types & anomaly detection",
  q: "Discuss autoencoders, their types, and their applications in anomaly detection with examples.",
  alt: [
    "What is an autoencoder? Explain its architecture and different types.",
    "Explain autoencoders with a neat diagram and discuss how they are used for anomaly detection.",
    "Describe the working of an autoencoder and its variants with applications."
  ],
  marks: [4, 10],
  priority: "must",
  prob: 92,
  diff: 3,
  pyq: ["8AID 2025 C5", "8AID 2024 A10", "7CAI 2025 A3"],
  why: "Asked as a full 10-marker in 2025 and its applications part came in 2024 and 7CAI 2025; the single most likely Part C question of the unit.",
  short: "An autoencoder is an unsupervised network (encoder, code, decoder) that reconstructs its input; types: undercomplete, sparse, denoising, contractive, variational. High reconstruction error flags anomalies.",
  en: `<p><b>Definition:</b> An <b>autoencoder (AE)</b> is an unsupervised (self-supervised) neural network trained to reproduce its input at its output through a constrained hidden layer called the <b>code</b> or <b>bottleneck</b>. Because it cannot simply copy, it learns the most important features of the data. The input itself is the target.</p>
<h4>1. Architecture</h4>
<ul>
<li><b>Encoder</b> f: maps input x to code h. <div class="formula">h = f(x) = σ(W x + b)</div></li>
<li><b>Code / latent layer</b> h: compressed representation.</li>
<li><b>Decoder</b> g: rebuilds the input from the code. <div class="formula">r = g(h) = σ(W′ h + b′)</div></li>
<li><b>Loss:</b> <div class="formula">L(x, g(f(x))) = ‖x − r‖²  (MSE) or binary cross-entropy for 0–1 pixels</div></li>
<li><b>Training:</b> backpropagation + gradient descent (SGD/Adam), with x as both input and target.</li>
</ul>
<h4>2. Types of autoencoders</h4>
<table>
<tr><th>Type</th><th>Key idea</th><th>Main use</th></tr>
<tr><td>Undercomplete</td><td>dim(h) &lt; dim(x), bottleneck forces compression</td><td>Dimensionality reduction</td></tr>
<tr><td>Overcomplete</td><td>dim(h) ≥ dim(x); needs regularization</td><td>Rich features (with penalty)</td></tr>
<tr><td>Sparse</td><td>L1 / KL penalty: few hidden units active</td><td>Feature learning</td></tr>
<tr><td>Denoising (DAE)</td><td>Input noisy x̃, target clean x</td><td>Image/audio denoising</td></tr>
<tr><td>Contractive (CAE)</td><td>Penalty λ‖∂h/∂x‖²<sub>F</sub></td><td>Robust features</td></tr>
<tr><td>Stochastic / Variational (VAE)</td><td>Encoder outputs μ, σ; sample z = μ + σε</td><td>Generating new data</td></tr>
<tr><td>Convolutional</td><td>Conv encoder, transposed-conv decoder</td><td>Images</td></tr>
</table>
<h4>3. Anomaly detection with an AE</h4>
<p><b>Idea:</b> an AE trained only on <b>normal</b> data reconstructs normal samples well (low error) but reconstructs unusual samples badly (<b>high reconstruction error</b>).</p>
<ol>
<li>Collect normal data only (genuine transactions, healthy sensor readings).</li>
<li>Train the AE to minimise reconstruction error on it.</li>
<li>On normal validation data compute errors and set a <b>threshold</b>, e.g. μ + 3σ or the 99th percentile.</li>
<li>For a new sample compute e = ‖x − r‖². If e &gt; threshold, flag it as an <b>anomaly</b>.</li>
</ol>
<p><b>Example:</b> normal errors have μ = 0.02, σ = 0.01, so threshold = 0.05. Reading A: e = 0.03, normal. Reading B: e = 0.18, anomaly (possible bearing fault). In credit-card fraud, a ₹95,000 purchase at 3 AM abroad gives e = 0.40, so it is flagged.</p>
<p><b>Why it works:</b> needs no labelled anomalies (they are rare), learns "what normal looks like", and handles high-dimensional data. Used in fraud detection, network intrusion detection, machine fault detection and medical scans.</p>
<h4>4. Other applications</h4>
<ul><li>Dimensionality reduction and compression</li><li>Image denoising</li><li>Feature learning and pre-training</li><li>Data generation (VAE)</li><li>Recommendation systems, missing-value imputation</li></ul>
<p><b>Limitations:</b> threshold choice is tricky, the AE may reconstruct some anomalies well if it generalises too much, and it needs mostly clean normal training data.</p>
<p><b>Conclusion:</b> an autoencoder learns a compact code of normal data, and its reconstruction error becomes a powerful, label-free anomaly score.</p>`,
  hi: `<p><b>Definition:</b> <b>Autoencoder (AE)</b> ek unsupervised (self-supervised) neural network hai jo apne input ko hi output pe wapas banane ki koshish karta hai, beech mein ek patli layer (<b>code / bottleneck</b>) se guzar ke. Seedha copy nahi kar sakta, isliye data ke sabse important features seekh leta hai. Yahan input hi label hai.</p>
<h4>1. Architecture</h4>
<ul>
<li><b>Encoder</b> f: input x ko chhota code h banata hai. <div class="formula">h = f(x) = σ(W x + b)</div></li>
<li><b>Code / latent layer</b> h: data ki compressed summary.</li>
<li><b>Decoder</b> g: code se input wapas banata hai. <div class="formula">r = g(h) = σ(W′ h + b′)</div></li>
<li><b>Loss:</b> <div class="formula">L(x, g(f(x))) = ‖x − r‖²</div> (MSE), ya 0–1 pixels ke liye binary cross-entropy.</li>
<li><b>Training:</b> normal MLP jaisa backprop + gradient descent, bas target = x khud.</li>
</ul>
<h4>2. Types (ek line mein)</h4>
<table>
<tr><th>Type</th><th>Kya karta hai</th><th>Use</th></tr>
<tr><td>Undercomplete</td><td>Code chhota, zabardasti compress</td><td>Dimensionality reduction</td></tr>
<tr><td>Overcomplete</td><td>Code bada, penalty chahiye</td><td>Rich features</td></tr>
<tr><td>Sparse</td><td>Kam neurons on rakho (L1/KL)</td><td>Feature learning</td></tr>
<tr><td>Denoising</td><td>Gandi image do, saaf wapas banao</td><td>Noise hatana</td></tr>
<tr><td>Contractive</td><td>Chhote badlaav pe code na hile (Jacobian penalty)</td><td>Robust features</td></tr>
<tr><td>Variational (VAE)</td><td>Code = distribution (μ, σ), sample karo</td><td>Naya data banana</td></tr>
<tr><td>Convolutional</td><td>Conv layers use karta hai</td><td>Images</td></tr>
</table>
<h4>3. Anomaly detection kaise</h4>
<p>Machine ko sirf <b>normal</b> data dikhao. Normal cheez woh achhe se copy kar leti hai (error kam), ajeeb cheez theek se copy nahi hoti (<b>error zyada</b>).</p>
<ol>
<li>Sirf normal data lo (asli transactions, healthy machine readings).</li>
<li>AE ko us pe train karo.</li>
<li>Normal validation data ka error nikaalo, <b>threshold</b> rakho: μ + 3σ ya 99th percentile.</li>
<li>Naye sample ka error e = ‖x − r‖². Agar e &gt; threshold, toh <b>anomaly</b>.</li>
</ol>
<p><b>Example:</b> μ = 0.02, σ = 0.01, threshold = 0.05. Reading A ka error 0.03: normal. Reading B ka error 0.18: anomaly, shayad bearing kharab. Desi example: kirane wale bhaiya ko pata hai roz log doodh, bread, sabzi lete hain. Raat 3 baje koi ₹95,000 ka saaman le, toh "yeh normal nahi lag raha": wahi bada reconstruction error hai, fraud ka shak.</p>
<p><b>Kyun kaam karta hai:</b> fraud ke labelled examples chahiye hi nahi (fraud rare hota hai), model bas "normal kaisa dikhta hai" seekhta hai, aur high-dimensional data bhi handle kar leta hai.</p>
<h4>4. Baaki applications</h4>
<ul><li>Dimensionality reduction, compression</li><li>Image denoising</li><li>Feature learning, pre-training</li><li>VAE se naya data generate karna</li><li>Recommendation, missing values bharna</li></ul>
<p><b>Limitations:</b> threshold set karna mushkil, kabhi-kabhi AE anomaly ko bhi achha copy kar leta hai, aur training data saaf normal hona chahiye.</p>
<p><b>Conclusion:</b> AE normal data ka chhota code seekhta hai, aur uska reconstruction error bina labels ke anomaly pakadne ka best score ban jaata hai.</p>`,
  keys: ["encoder", "code / bottleneck", "decoder", "reconstruction error", "unsupervised", "undercomplete", "sparse", "denoising", "contractive", "VAE", "threshold μ + 3σ", "trained on normal data only"],
  draw: "Hourglass AE (x → encoder → code h → decoder → r) plus a reconstruction-error histogram with the threshold line separating normal from anomalies.",
  fig: "unit5.html#q1",
  num: false
},
{
  id: "U5-02",
  unit: 5,
  topic: "Applications of autoencoders",
  q: "What are the applications of autoencoders?",
  alt: [
    "Mention one application of autoencoders.",
    "List any four applications of autoencoders and explain any two.",
    "Where are autoencoders used in real life?"
  ],
  marks: [2, 4],
  priority: "must",
  prob: 90,
  diff: 1,
  pyq: ["8AID 2024 A10", "7CAI 2025 A3", "8AID 2025 C5"],
  why: "Part A in 2024 and 7CAI 2025, plus part of 2025 C5; almost guaranteed in some form.",
  short: "Dimensionality reduction, image denoising, anomaly/fraud detection, feature learning and pre-training, data compression, generating new data (VAE), recommendation systems.",
  en: `<p><b>Definition:</b> An autoencoder learns a compact code h = f(x) of its input and reconstructs it as r = g(h). Both the <b>code</b> and the <b>reconstruction error</b> are useful, which gives many applications.</p>
<h4>Main applications</h4>
<ul>
<li><b>Dimensionality reduction:</b> the bottleneck code (e.g. 784 → 32) is used for visualisation, clustering or faster classifiers. It is a non-linear alternative to PCA.</li>
<li><b>Anomaly / fraud detection:</b> train on normal data only; a sample with reconstruction error above a threshold is an anomaly (credit-card fraud, network intrusion, machine faults).</li>
<li><b>Image denoising:</b> a denoising AE maps a noisy image x̃ to the clean x (old photos, medical scans, low-light images).</li>
<li><b>Feature learning and pre-training:</b> encoder layers learned without labels initialise a supervised network (stacked AEs, greedy layer-wise pre-training).</li>
<li><b>Data compression:</b> store or send the small code, decode at the other end.</li>
<li><b>Generative modelling:</b> a VAE samples z ~ N(0, I) and decodes it into new faces, digits or molecules.</li>
<li><b>Recommendation systems:</b> the user–item rating vector is reconstructed; predicted values for unrated items become recommendations (AutoRec).</li>
<li><b>Missing-value imputation and inpainting:</b> reconstruct the missing parts from the learned structure.</li>
<li><b>Information retrieval / semantic hashing:</b> similar documents get similar short codes for fast search.</li>
</ul>
<h4>Example</h4>
<p>A bank trains an AE on lakhs of genuine transactions. A new transaction with reconstruction error 0.40 against a threshold of 0.05 is flagged as fraud without any fraud labels.</p>
<p><b>Conclusion:</b> autoencoders are used wherever we need compact features, clean reconstructions or a "how normal is this" score.</p>`,
  hi: `<p><b>Basic idea:</b> AE input ka chhota code h = f(x) banata hai aur usse r = g(h) wapas banata hai. Isme do cheezein kaam ki hain: <b>code</b> (chhoti summary) aur <b>reconstruction error</b> (kitna galat copy hua). Inhi se saari applications nikalti hain.</p>
<h4>Main applications</h4>
<ul>
<li><b>Dimensionality reduction:</b> 784 pixels ko 32 numbers mein dabao, phir plotting, clustering ya fast classifier ke liye use karo. PCA ka non-linear bhai.</li>
<li><b>Anomaly / fraud detection:</b> sirf normal data pe train karo; jiska error threshold se zyada, woh suspicious (card fraud, hacking attempt, machine fault).</li>
<li><b>Image denoising:</b> denoising AE gandi/noisy photo ko saaf banata hai (purani shaadi ki photo, X-ray, raat ki photo).</li>
<li><b>Feature learning / pre-training:</b> bina labels ke encoder seekh lo, phir usko supervised network ki shuruaat bana do.</li>
<li><b>Compression:</b> chhota code bhejo, doosri taraf decode karo.</li>
<li><b>Naya data banana:</b> VAE random z se naye chehre ya digits bana deta hai.</li>
<li><b>Recommendation:</b> user ke ratings ka vector reconstruct karo; jo movies dekhi nahi unka predicted rating = suggestion. Netflix/Hotstar jaisa.</li>
<li><b>Missing values bharna / inpainting:</b> photo ka kata hua hissa ya table ki khaali values bhar dena.</li>
<li><b>Semantic hashing:</b> milte-julte documents ke milte-julte chhote codes, search fast.</li>
</ul>
<h4>Desi example</h4>
<p>Bank ne lakhon asli transactions pe AE train kiya. Naya transaction aaya jiska error 0.40 hai, threshold 0.05. Bina kisi fraud label ke system bolta hai "yeh fraud lag raha hai".</p>
<p><b>Conclusion:</b> jahan chhota feature chahiye, saaf reconstruction chahiye, ya "yeh normal hai ya nahi" ka score chahiye, wahan AE kaam aata hai.</p>`,
  keys: ["dimensionality reduction", "anomaly detection", "denoising", "feature learning", "pre-training", "compression", "VAE generation", "recommendation"],
  draw: "Optional: small hourglass AE with arrows labelled 'code → features' and 'error → anomaly score'.",
  fig: "unit5.html#q1",
  num: false
},
{
  id: "U5-03",
  unit: 5,
  topic: "Undercomplete autoencoder",
  q: "What is an undercomplete autoencoder? How does it avoid learning the identity function?",
  alt: [
    "Explain undercomplete autoencoders with a diagram.",
    "Why must the code layer of an autoencoder be smaller than the input?",
    "How is an undercomplete autoencoder related to PCA?",
    "Define undercomplete autoencoder."
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 85,
  diff: 3,
  pyq: ["7CAI 2025 C5", "7CAI 2025 B5"],
  why: "10-marker in 7CAI 2025 and half of the 7CAI B5 comparison; the textbook's first AE type.",
  short: "An autoencoder whose code dimension is smaller than the input dimension; the bottleneck forces compression, so it cannot copy and learns the most salient features.",
  en: `<p><b>Definition:</b> An autoencoder whose code h has a <b>smaller dimension than the input</b> x (dim h &lt; dim x) is called <b>undercomplete</b>. The narrow middle layer is the <b>bottleneck</b>.</p>
<h4>1. The identity-function problem</h4>
<ul>
<li>The AE minimises <div class="formula">L(x, g(f(x))) = ‖x − g(f(x))‖²</div></li>
<li>If the code were as wide as the input (or wider, overcomplete), the network could learn <b>g(f(x)) = x</b> by copying each value through. Loss becomes zero, but <b>nothing useful</b> is learned.</li>
</ul>
<h4>2. How the undercomplete AE prevents it</h4>
<ul>
<li><b>Bottleneck:</b> 784 pixels must pass through only 32 numbers. Copying 784 values into 32 slots is impossible, so the network must <b>compress</b>.</li>
<li>To keep the error low it keeps only the <b>most salient features</b> (shape, stroke) and drops noise and redundancy.</li>
<li>The reconstruction loss pushes the code to capture the main <b>factors of variation</b> of the data.</li>
</ul>
<h4>3. Link to PCA</h4>
<ul>
<li>With a <b>linear decoder and MSE loss</b>, an undercomplete AE learns the <b>same subspace as PCA</b>.</li>
<li>With non-linear encoder f and decoder g it learns a <b>non-linear generalisation of PCA</b> (curved manifolds).</li>
</ul>
<h4>4. Working / training steps</h4>
<ol>
<li>Choose dim h much smaller than dim x (e.g. 784 → 128 → 32 → 128 → 784).</li>
<li>Forward pass: h = f(x), r = g(h).</li>
<li>Compute L = ‖x − r‖², backpropagate, update with Adam/SGD.</li>
<li>After training, use f(x) as the reduced representation.</li>
</ol>
<h4>5. Caution: capacity</h4>
<p>If the encoder and decoder are too powerful (very deep), even a 1-D code can memorise the training set (map each sample to an index) and reconstruct it without learning general features. So capacity must be moderate, or regularization added.</p>
<h4>Example</h4>
<p>MNIST digits: 784 → 32 code. The 32 numbers end up encoding digit identity, slant and thickness, which is enough to redraw the digit.</p>
<h4>Advantages / limitations</h4>
<ul><li>+ Simple, no extra penalty, natural dimensionality reduction.</li><li>− Code size must be guessed; too small loses detail, too much capacity memorises.</li></ul>
<p><b>Conclusion:</b> "dim(h) &lt; dim(x) forces compression, so the AE cannot copy and must learn the salient features."</p>`,
  hi: `<p><b>Definition:</b> Jis AE mein beech wala code h input x se <b>chhota</b> ho (dim h &lt; dim x), use <b>undercomplete autoencoder</b> kehte hain. Yeh patli layer hi <b>bottleneck</b> hai.</p>
<h4>1. Identity function wali problem</h4>
<ul>
<li>AE ka loss: <div class="formula">L(x, g(f(x))) = ‖x − g(f(x))‖²</div></li>
<li>Agar beech ki layer input jitni badi ho, toh network seedha copy-paste kar dega: g(f(x)) = x. Loss zero, marks poore, par seekha kuch nahi. Yahi <b>identity function</b> problem hai.</li>
</ul>
<h4>2. Undercomplete kaise rokta hai</h4>
<ul>
<li><b>Bottleneck:</b> 784 cheezein sirf 32 dabbon mein bharni hain. Har cheez copy karna possible hi nahi, toh <b>compress</b> karna padega.</li>
<li>Error kam rakhne ke liye woh sirf <b>sabse zaroori features</b> rakhta hai (digit ka shape, stroke) aur noise/faltu cheezein chhod deta hai.</li>
<li>Loss usko data ke main "factors of variation" pakadne pe majboor karta hai.</li>
</ul>
<h4>3. PCA se connection</h4>
<ul>
<li><b>Linear decoder + MSE loss</b> ho toh undercomplete AE wahi subspace seekhta hai jo <b>PCA</b> seekhta hai.</li>
<li>Non-linear layers ho toh yeh PCA ka <b>non-linear, zyada powerful</b> version ban jaata hai.</li>
</ul>
<h4>4. Training steps</h4>
<ol>
<li>Code chhota rakho, jaise 784 → 128 → 32 → 128 → 784.</li>
<li>Forward: h = f(x), r = g(h).</li>
<li>Loss ‖x − r‖² nikaalo, backprop, Adam se update.</li>
<li>Training ke baad f(x) hi tumhara reduced data hai.</li>
</ol>
<h4>5. Savdhaan: capacity</h4>
<p>Agar encoder/decoder bahut bade aur deep hain, toh 1 number ka code bhi poora training set ratta maar sakta hai (har sample ko ek index de do). Isliye capacity moderate rakho ya regularization lagao.</p>
<h4>Desi example</h4>
<p>Teacher bole "10 page ka chapter sirf 5 line mein likho". Hubahu copy ho hi nahi sakta, toh main points chunne padenge. 10 page ki chhoot hoti toh tum copy kar dete aur kuch nahi seekhte. 5 line ki limit = bottleneck.</p>
<h4>Fayde / nuksaan</h4>
<ul><li>+ Simple, koi extra penalty nahi, seedha dimensionality reduction.</li><li>− Code size guess karna padta hai; bahut chhota toh detail khoti, capacity zyada toh ratta.</li></ul>
<p><b>Conclusion:</b> "dim(h) &lt; dim(x) compression pe majboor karta hai, isliye AE copy nahi kar pata aur important features seekhta hai."</p>`,
  keys: ["dim(h) < dim(x)", "bottleneck", "identity function g(f(x)) = x", "compression", "salient features", "linear decoder + MSE = PCA", "capacity"],
  draw: "Hourglass: 784 → 128 → 32 (code) → 128 → 784, with Loss = ‖x − r‖² written below.",
  fig: "unit5.html#q2",
  num: false
},
{
  id: "U5-04",
  unit: 5,
  topic: "Regularized autoencoders",
  q: "What are regularized autoencoders? What is their purpose? Explain the sparse, denoising and contractive autoencoders.",
  alt: [
    "What is the purpose of a regularized autoencoder?",
    "Explain different regularized autoencoders.",
    "How do regularized autoencoders learn useful features even with an overcomplete code?"
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 85,
  diff: 3,
  pyq: ["7CAI 2025 A7", "7CAI 2025 B5", "8AID 2025 A10"],
  why: "Purpose asked in 7CAI A7, compared in 7CAI B5 and 8AID 2025 A10: appears in every recent paper.",
  short: "A regularized autoencoder adds a penalty to the reconstruction loss so it learns sparse, robust features instead of copying the input, even when the code is large.",
  en: `<p><b>Definition:</b> A <b>regularized autoencoder</b> adds a penalty term Ω to the reconstruction loss. The penalty encourages useful properties of the code (sparsity, robustness to noise, small derivatives), so it works even when the code is equal to or larger than the input (overcomplete).</p>
<div class="formula">L = L(x, g(f(x))) + λ · Ω(h, x)</div>
<h4>Purpose</h4>
<ul>
<li>Prevent learning the <b>identity function</b> without shrinking the code.</li>
<li>Learn <b>sparse, robust, meaningful</b> features that generalise.</li>
<li>Let us choose code size and capacity by the data's complexity, not by the need to block copying.</li>
</ul>
<h4>1. Sparse autoencoder</h4>
<ul>
<li>Penalty on hidden activations: <div class="formula">Ω = λ Σ |h<sub>j</sub>|  (L1)</div> or a KL penalty <div class="formula">Σ<sub>j</sub> KL(ρ ‖ ρ̂<sub>j</sub>) = Σ<sub>j</sub> [ρ log(ρ/ρ̂<sub>j</sub>) + (1−ρ) log((1−ρ)/(1−ρ̂<sub>j</sub>))]</div> where ρ̂<sub>j</sub> is the average activation of unit j and ρ is small (e.g. 0.05).</li>
<li>Only a few neurons fire for each input, acting like specialist feature detectors.</li>
</ul>
<h4>2. Denoising autoencoder (DAE)</h4>
<ul>
<li>Corrupt x into x̃ (Gaussian noise, randomly zeroed pixels), then reconstruct the <b>clean</b> x: <div class="formula">L = L(x, g(f(x̃)))</div></li>
<li>To remove noise it must learn the structure of the data, not copy.</li>
</ul>
<h4>3. Contractive autoencoder (CAE)</h4>
<ul>
<li>Penalty on the encoder's Jacobian: <div class="formula">Ω = λ ‖∂f(x)/∂x‖²<sub>F</sub></div></li>
<li>The code becomes insensitive to small input changes and sensitive only along the data manifold.</li>
</ul>
<h4>Comparison</h4>
<table>
<tr><th>Type</th><th>Regularizer</th><th>Effect</th></tr>
<tr><td>Sparse</td><td>L1 / KL on h</td><td>Few active units</td></tr>
<tr><td>Denoising</td><td>Noisy input, clean target</td><td>Noise-robust reconstruction</td></tr>
<tr><td>Contractive</td><td>‖J<sub>f</sub>(x)‖²<sub>F</sub></td><td>Robust, locally invariant code</td></tr>
</table>
<h4>Example</h4>
<p>A DAE trained on scanned documents with coffee stains learns to output clean text; a sparse AE trained on natural image patches learns edge detectors similar to the visual cortex.</p>
<h4>Advantages / limitations</h4>
<ul><li>+ Overcomplete codes allowed, more robust features, better generalisation.</li><li>− Extra hyper-parameter λ to tune; CAE's Jacobian is costly.</li></ul>
<p><b>Conclusion:</b> regularized AEs stop copying by a penalty rather than a bottleneck, giving sparse and robust features.</p>`,
  hi: `<p><b>Definition:</b> <b>Regularized autoencoder</b> mein reconstruction loss ke saath ek extra "saza" (penalty) Ω jod dete hain. Yeh penalty code ko achhi aadatein sikhati hai (kam neurons on, noise se na ghabrana, chhote badlaav pe na hilna). Isliye code input jitna ya usse bada (overcomplete) bhi ho toh bhi copy-paste nahi hota.</p>
<div class="formula">L = L(x, g(f(x))) + λ · Ω(h, x)</div>
<h4>Purpose</h4>
<ul>
<li>Pipe patli kiye bina <b>identity function</b> (seedha copy) rokna.</li>
<li><b>Sparse, robust, kaam ke</b> features seekhna jo naye data pe bhi chalein.</li>
<li>Code size data ke hisaab se rakh sakte ho, sirf copy rokne ke liye chhota karna zaroori nahi.</li>
</ul>
<h4>1. Sparse AE</h4>
<ul>
<li>Hidden activations pe penalty: <div class="formula">Ω = λ Σ |h<sub>j</sub>|</div> ya KL penalty jo har neuron ki average activation ρ̂<sub>j</sub> ko chhote ρ (jaise 0.05) ke paas rakhe.</li>
<li>Matlab har input pe sirf 2–4 neurons jalte hain, baaki so jaate hain. Bade office mein har sawaal ka jawab sirf 2–3 experts dete hain, sab nahi.</li>
</ul>
<h4>2. Denoising AE</h4>
<ul>
<li>x mein noise daalo (x̃), aur output mein <b>saaf</b> x maango: <div class="formula">L = L(x, g(f(x̃)))</div></li>
<li>Noise hatane ke liye usko samajhna padta hai ki asli data kaisa dikhta hai. Jaise kharoch wali purani photo do, saaf photo wapas lo.</li>
</ul>
<h4>3. Contractive AE</h4>
<ul>
<li>Encoder ke Jacobian pe penalty: <div class="formula">Ω = λ ‖∂f(x)/∂x‖²<sub>F</sub></div></li>
<li>Input thoda sa badle toh code mat hilao. Dost chashma lagaye ya topi, phir bhi pehchaan same.</li>
</ul>
<h4>Table</h4>
<table>
<tr><th>Type</th><th>Penalty</th><th>Asar</th></tr>
<tr><td>Sparse</td><td>L1 / KL on h</td><td>Kam neurons active</td></tr>
<tr><td>Denoising</td><td>Noisy input, clean target</td><td>Noise se robust</td></tr>
<tr><td>Contractive</td><td>Jacobian norm</td><td>Code stable</td></tr>
</table>
<h4>Fayde / nuksaan</h4>
<ul><li>+ Bada code chalega, robust features, achha generalisation.</li><li>− λ tune karna padta hai; contractive ka Jacobian mehnga.</li></ul>
<p><b>Conclusion:</b> regularized AE copy ko pipe patli karke nahi, penalty laga ke rokta hai, aur sparse/robust features deta hai.</p>`,
  keys: ["penalty term Ω", "L + λΩ", "overcomplete allowed", "sparse (L1/KL)", "denoising L(x, g(f(x̃)))", "contractive Jacobian", "prevents identity", "robust features"],
  draw: "Denoising AE flow: clean x → add noise → x̃ → encoder → h → decoder → r, loss compares r with clean x.",
  fig: "unit5.html#q3",
  num: false
},
{
  id: "U5-05",
  unit: 5,
  topic: "Autoencoder basics",
  q: "What is an autoencoder? Explain its encoder, code and decoder, the reconstruction loss and how it is trained.",
  alt: [
    "Define autoencoder.",
    "Explain the basic structure of an autoencoder with a diagram.",
    "How is an autoencoder trained? Why is it called self-supervised?",
    "What is reconstruction error?"
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 80,
  diff: 2,
  pyq: ["8AID 2025 C5", "7CAI 2025 C5"],
  why: "Every AE question starts with this definition and diagram; a standalone 'define autoencoder' Part A is very likely.",
  short: "An unsupervised network that encodes input x to a code h = f(x) and decodes r = g(h), trained to minimise reconstruction loss L(x, g(f(x))).",
  en: `<p><b>Definition:</b> An <b>autoencoder</b> is a feed-forward neural network trained to copy its input to its output, x → r ≈ x, through a hidden <b>code</b> layer that is constrained (small or regularized). It is unsupervised (self-supervised) because the target is the input itself.</p>
<h4>1. Components</h4>
<ul>
<li><b>Encoder</b> f: <div class="formula">h = f(x) = σ(W<sub>e</sub> x + b<sub>e</sub>)</div> compresses the input into features.</li>
<li><b>Code / latent / bottleneck</b> h: the learned representation.</li>
<li><b>Decoder</b> g: <div class="formula">r = g(h) = σ(W<sub>d</sub> h + b<sub>d</sub>)</div> reconstructs the input. Often symmetric to the encoder; sometimes tied weights W<sub>d</sub> = W<sub>e</sub><sup>T</sup>.</li>
</ul>
<h4>2. Reconstruction loss</h4>
<ul>
<li>Real-valued data: <div class="formula">L = ‖x − r‖² = Σ<sub>i</sub> (x<sub>i</sub> − r<sub>i</sub>)²</div></li>
<li>Binary / 0–1 data: <div class="formula">L = − Σ<sub>i</sub> [x<sub>i</sub> log r<sub>i</sub> + (1 − x<sub>i</sub>) log(1 − r<sub>i</sub>)]</div></li>
<li><b>Reconstruction error</b> of a sample = this loss; high error means the AE has not seen data like it.</li>
</ul>
<h4>3. Training steps</h4>
<ol>
<li>Prepare unlabelled data X; scale features (e.g. 0–1).</li>
<li>Forward pass: h = f(x), r = g(h).</li>
<li>Compute loss L(x, r) (+ λΩ if regularized).</li>
<li>Backpropagate the gradients through decoder and encoder.</li>
<li>Update weights with SGD/Adam; repeat for many epochs (fit(X, X)).</li>
<li>Use the encoder output h as features, or the error as a score.</li>
</ol>
<h4>4. Why constrain the code?</h4>
<p>Without a constraint the network learns the identity g(f(x)) = x and nothing useful. Constraints: a small code (undercomplete) or a penalty (regularized).</p>
<h4>Example</h4>
<p>A 28×28 digit (784 values) is encoded into 32 numbers and decoded back to 784; the reconstructed digit looks almost identical, so the 32 numbers hold its essence.</p>
<h4>Applications</h4>
<p>Dimensionality reduction, denoising, anomaly detection, feature learning, generation (VAE).</p>
<p><b>Conclusion:</b> encoder compresses, decoder rebuilds, and the reconstruction loss teaches the code to keep only what matters.</p>`,
  hi: `<p><b>Definition:</b> <b>Autoencoder</b> ek feed-forward neural network hai jo input ko hi output pe copy karna seekhta hai (x → r ≈ x), par beech mein ek restricted <b>code</b> layer se hoke. Label ki zaroorat nahi, input hi target hai, isliye unsupervised / self-supervised.</p>
<h4>1. Teen hisse</h4>
<ul>
<li><b>Encoder</b> f: <div class="formula">h = f(x) = σ(W<sub>e</sub> x + b<sub>e</sub>)</div> data ko chhota karta hai.</li>
<li><b>Code / latent / bottleneck</b> h: chhoti summary.</li>
<li><b>Decoder</b> g: <div class="formula">r = g(h) = σ(W<sub>d</sub> h + b<sub>d</sub>)</div> summary se original wapas banata hai. Aksar encoder ka mirror hota hai; kabhi tied weights W<sub>d</sub> = W<sub>e</sub><sup>T</sup>.</li>
</ul>
<h4>2. Reconstruction loss</h4>
<ul>
<li>Real numbers: <div class="formula">L = ‖x − r‖²</div></li>
<li>0–1 pixels: binary cross-entropy <div class="formula">L = − Σ [x log r + (1 − x) log(1 − r)]</div></li>
<li><b>Reconstruction error</b> = kitna galat copy hua. Zyada error = "yeh cheez maine pehle nahi dekhi".</li>
</ul>
<h4>3. Training kaise</h4>
<ol>
<li>Bina label ka data X lo, 0–1 mein scale karo.</li>
<li>Forward: h = f(x), r = g(h).</li>
<li>Loss nikaalo (regularized ho toh + λΩ).</li>
<li>Backprop se gradients decoder aur encoder dono mein.</li>
<li>Adam/SGD se weights update; bahut epochs (fit(X, X)).</li>
<li>Baad mein encoder ka h features ki tarah, ya error score ki tarah use karo.</li>
</ol>
<h4>4. Code ko restrict kyun?</h4>
<p>Restriction na ho toh network seedha copy (identity) seekh lega. Isliye ya toh code chhota (undercomplete), ya penalty (regularized).</p>
<h4>Desi example</h4>
<p>ZIP aur UNZIP socho: badi file ZIP hui (encoder), chhoti ZIP file = code, UNZIP karke wapas (decoder). Agar khol ke file waisi hi mile, toh ZIP ne zaroori cheezein bacha li. 784 pixel ka digit 32 numbers mein, aur wapas 784 mein almost same.</p>
<h4>Applications</h4>
<p>Dimensionality reduction, denoising, anomaly detection, feature learning, VAE se generation.</p>
<p><b>Conclusion:</b> encoder chhota karta hai, decoder wapas banata hai, aur loss code ko sirf kaam ki cheezein rakhna sikhata hai.</p>`,
  keys: ["encoder h = f(x)", "decoder r = g(h)", "code / latent", "reconstruction loss", "MSE / cross-entropy", "self-supervised", "backpropagation", "identity function"],
  draw: "Hourglass diagram with labels encoder, code h, decoder, and L = ‖x − r‖².",
  fig: "unit5.html#q2",
  num: false
},
{
  id: "U5-06",
  unit: 5,
  topic: "Undercomplete vs regularized autoencoder",
  q: "Differentiate between undercomplete and regularized autoencoders.",
  alt: [
    "Compare undercomplete and regularized autoencoders.",
    "How do undercomplete and regularized autoencoders differ in preventing identity mapping?"
  ],
  marks: [2, 4],
  priority: "must",
  prob: 78,
  diff: 2,
  pyq: ["7CAI 2025 B5"],
  why: "Asked as a 4-marker in 7CAI 2025; comparisons repeat often in RTU papers.",
  short: "Undercomplete AE prevents copying with a small code (dim h less than dim x); regularized AE allows any code size and prevents copying with a penalty (sparse, denoising, contractive).",
  en: `<p><b>Both</b> aim to stop the autoencoder from learning the identity g(f(x)) = x, but they do it differently.</p>
<ul>
<li><b>Undercomplete AE:</b> code dimension smaller than input; the bottleneck forces compression. <div class="formula">L = L(x, g(f(x)))</div></li>
<li><b>Regularized AE:</b> code can be any size (even overcomplete); a penalty Ω is added. <div class="formula">L = L(x, g(f(x))) + λ Ω(h, x)</div></li>
</ul>
<table>
<tr><th>Point</th><th>Undercomplete AE</th><th>Regularized AE</th></tr>
<tr><td>How copying is prevented</td><td>Small bottleneck (dim h &lt; dim x)</td><td>Penalty / noise in training objective</td></tr>
<tr><td>Code size</td><td>Must be smaller than input</td><td>Equal or larger allowed (overcomplete)</td></tr>
<tr><td>Loss</td><td>Reconstruction only</td><td>Reconstruction + λΩ</td></tr>
<tr><td>Examples</td><td>Basic bottleneck AE, linear AE (= PCA)</td><td>Sparse, denoising, contractive AE</td></tr>
<tr><td>Extra hyper-parameter</td><td>Code size only</td><td>λ, noise level, sparsity target ρ</td></tr>
<tr><td>Risk</td><td>Too much capacity can still memorise</td><td>Wrong λ: too weak copies, too strong underfits</td></tr>
<tr><td>Main use</td><td>Compression, dimensionality reduction</td><td>Robust/sparse features, denoising</td></tr>
<tr><td>Features learned</td><td>Compact, dense</td><td>Sparse or noise-robust, often richer</td></tr>
</table>
<p><b>Example:</b> 784 → 32 → 784 on MNIST is undercomplete; 784 → 1000 → 784 with an L1 sparsity penalty is a regularized (sparse, overcomplete) AE.</p>
<p><b>Conclusion:</b> undercomplete limits the size of the code, regularized limits the behaviour of the code.</p>`,
  hi: `<p>Dono ka maksad ek hi hai: AE ko seedha copy (identity g(f(x)) = x) karne se rokna. Tareeka alag hai.</p>
<ul>
<li><b>Undercomplete AE:</b> code input se chhota; pipe patli hai, toh compress karna hi padega. <div class="formula">L = L(x, g(f(x)))</div></li>
<li><b>Regularized AE:</b> code kitna bhi bada ho sakta hai; loss mein penalty jod di. <div class="formula">L = L(x, g(f(x))) + λ Ω(h, x)</div></li>
</ul>
<table>
<tr><th>Point</th><th>Undercomplete</th><th>Regularized</th></tr>
<tr><td>Copy kaise rokta hai</td><td>Patli pipe (dim h &lt; dim x)</td><td>Penalty / noise</td></tr>
<tr><td>Code size</td><td>Input se chhota hi</td><td>Barabar ya bada bhi chalega</td></tr>
<tr><td>Loss</td><td>Sirf reconstruction</td><td>Reconstruction + λΩ</td></tr>
<tr><td>Examples</td><td>Basic bottleneck AE, linear AE (= PCA)</td><td>Sparse, denoising, contractive</td></tr>
<tr><td>Tune kya karna</td><td>Sirf code size</td><td>λ, noise level, ρ</td></tr>
<tr><td>Risk</td><td>Capacity zyada toh ratta</td><td>λ galat toh copy ya underfit</td></tr>
<tr><td>Use</td><td>Compression, dim. reduction</td><td>Robust/sparse features, denoising</td></tr>
</table>
<p><b>Desi example:</b> Undercomplete = "chapter ko sirf 5 line mein likho" (jagah hi kam). Regularized = "jitna chaho likho, par har faltu line pe 1 mark katega" (jagah poori, par saza). Dono mein student ko main points hi likhne padte hain.</p>
<p><b>Conclusion:</b> undercomplete code ka <b>size</b> limit karta hai, regularized code ka <b>behaviour</b> limit karta hai.</p>`,
  keys: ["bottleneck vs penalty", "dim h < dim x", "overcomplete allowed", "L + λΩ", "sparse/denoising/contractive", "identity prevention"],
  draw: "Two small sketches side by side: narrow hourglass (undercomplete) vs wide middle layer with 'λΩ' label (regularized).",
  fig: "unit5.html#q3",
  num: false
},
{
  id: "U5-07",
  unit: 5,
  topic: "Regularized vs stochastic autoencoder",
  q: "Differentiate between regularized and stochastic autoencoders.",
  alt: [
    "Compare deterministic (regularized) and stochastic autoencoders.",
    "How does a stochastic autoencoder differ from a sparse or denoising autoencoder?"
  ],
  marks: [2, 4],
  priority: "must",
  prob: 78,
  diff: 3,
  pyq: ["8AID 2025 A10"],
  why: "Asked directly as 8AID 2025 A10; easily expands into a 4-mark table.",
  short: "Regularized AE is deterministic (h = f(x)) and adds a penalty to the loss; stochastic AE uses distributions p(h|x), p(x|h), minimises −log p(x|h) and can generate new data (VAE).",
  en: `<p><b>Regularized AE:</b> deterministic encoder and decoder (h = f(x), r = g(h)); useful features come from a penalty term Ω (sparsity, noise, Jacobian).</p>
<p><b>Stochastic AE:</b> encoder and decoder are probability distributions:</p>
<div class="formula">p<sub>encoder</sub>(h | x)   and   p<sub>decoder</sub>(x | h),   loss = − log p<sub>decoder</sub>(x | h)</div>
<table>
<tr><th>Point</th><th>Regularized AE</th><th>Stochastic AE</th></tr>
<tr><td>Mapping</td><td>Deterministic: h = f(x)</td><td>Probabilistic: h ~ p<sub>enc</sub>(h|x)</td></tr>
<tr><td>Output</td><td>A single reconstruction r</td><td>A distribution over x (can sample)</td></tr>
<tr><td>How useful features arise</td><td>Penalty Ω added to loss</td><td>Noise / sampling inside the model + likelihood objective</td></tr>
<tr><td>Loss</td><td>L(x, g(f(x))) + λΩ</td><td>−log p<sub>dec</sub>(x|h) (+ KL term in VAE)</td></tr>
<tr><td>Generative?</td><td>No (mainly representation learning)</td><td>Yes, sample h and decode new data</td></tr>
<tr><td>Examples</td><td>Sparse, denoising, contractive</td><td>Variational AE (VAE)</td></tr>
<tr><td>Main use</td><td>Robust features, denoising</td><td>Generation, uncertainty modelling</td></tr>
</table>
<p><b>Example:</b> a denoising AE always returns the same clean digit for the same input; a VAE can return slightly different digits each time and can create new digits from random z.</p>
<p><b>Conclusion:</b> regularized = deterministic + penalty; stochastic = probabilistic + likelihood, which makes it generative.</p>`,
  hi: `<p><b>Regularized AE:</b> encoder-decoder fixed functions hain (h = f(x), r = g(h)). Same input do toh har baar same output. Achhe features ek penalty Ω (sparsity, noise, Jacobian) se aate hain.</p>
<p><b>Stochastic AE:</b> encoder aur decoder probability distributions hain:</p>
<div class="formula">p<sub>encoder</sub>(h | x)  aur  p<sub>decoder</sub>(x | h),  loss = − log p<sub>decoder</sub>(x | h)</div>
<table>
<tr><th>Point</th><th>Regularized</th><th>Stochastic</th></tr>
<tr><td>Mapping</td><td>Fixed: h = f(x)</td><td>Random: h ~ p(h|x)</td></tr>
<tr><td>Output</td><td>Ek hi reconstruction</td><td>Distribution, sample kar sakte ho</td></tr>
<tr><td>Features kaise</td><td>Penalty Ω se</td><td>Noise/sampling + likelihood se</td></tr>
<tr><td>Loss</td><td>Reconstruction + λΩ</td><td>−log p(x|h) (+ KL in VAE)</td></tr>
<tr><td>Naya data bana sakta?</td><td>Nahi</td><td>Haan</td></tr>
<tr><td>Examples</td><td>Sparse, denoising, contractive</td><td>VAE</td></tr>
</table>
<p><b>Desi example:</b> Regularized AE ek photocopy machine jaisa hai: same page do, same copy. Stochastic AE ek painter jaisa hai: same chehra dikhao, har baar thoda alag par asli jaisa portrait banata hai, aur bina chehra dekhe bhi naya chehra bana sakta hai.</p>
<p><b>Conclusion:</b> regularized = fixed mapping + saza; stochastic = probability + likelihood, isliye naya data generate kar sakta hai.</p>`,
  keys: ["deterministic vs probabilistic", "penalty Ω", "p_encoder(h|x)", "p_decoder(x|h)", "−log p(x|h)", "VAE", "generative"],
  draw: "Optional: deterministic arrow x → h → r vs stochastic x → (μ, σ) → sample z → x̂.",
  fig: "unit5.html#q3",
  num: false
},
{
  id: "U5-08",
  unit: 5,
  topic: "Designing an autoencoder for dimensionality reduction",
  q: "Design a simple autoencoder for dimensionality reduction and explain its components.",
  alt: [
    "How can an autoencoder be used for dimensionality reduction?",
    "Explain with an example the use of an autoencoder to reduce 784-dimensional data to a low-dimensional code.",
    "How can autoencoders address the curse of dimensionality?"
  ],
  marks: [4, 10],
  priority: "must",
  prob: 75,
  diff: 3,
  pyq: ["8AID 2025 B7", "8AID 2025 B1"],
  why: "Asked as 8AID 2025 B7; also a strong answer for the curse-of-dimensionality question (8AID 2025 B1).",
  short: "Use a symmetric encoder–bottleneck–decoder (e.g. 784→128→32→128→784) trained with MSE on X→X; after training the encoder's 32-D code is the reduced representation.",
  en: `<p><b>Task:</b> reduce MNIST images (28×28 = 784 pixels) to a <b>32-dimensional code</b> (24.5× compression) using an undercomplete autoencoder.</p>
<h4>1. Architecture (layer table)</h4>
<table>
<tr><th>Part</th><th>Layer</th><th>Neurons</th><th>Activation</th><th>Parameters (W + b)</th></tr>
<tr><td>Input</td><td>Flattened image</td><td>784</td><td>— (pixels scaled 0–1)</td><td>0</td></tr>
<tr><td>Encoder</td><td>Dense 1</td><td>128</td><td>ReLU</td><td>784×128 + 128 = 100,480</td></tr>
<tr><td>Code</td><td>Dense 2 (bottleneck)</td><td>32</td><td>ReLU / linear</td><td>128×32 + 32 = 4,128</td></tr>
<tr><td>Decoder</td><td>Dense 3</td><td>128</td><td>ReLU</td><td>32×128 + 128 = 4,224</td></tr>
<tr><td>Output</td><td>Dense 4</td><td>784</td><td>Sigmoid</td><td>128×784 + 784 = 101,136</td></tr>
<tr><td colspan="4"><b>Total trainable parameters</b></td><td><b>209,968</b></td></tr>
</table>
<h4>2. Training set-up</h4>
<ul>
<li><b>Loss:</b> <div class="formula">MSE = (1/n) Σ (x<sub>i</sub> − r<sub>i</sub>)²</div> or binary cross-entropy (pixels in 0–1).</li>
<li><b>Optimiser:</b> Adam, learning rate 0.001, batch 256, 20–50 epochs, early stopping on validation loss.</li>
<li><b>Data:</b> X is both input and target, so no labels are needed.</li>
</ul>
<h4>3. Components explained</h4>
<ul>
<li><b>Encoder (784→128→32):</b> progressively compresses and extracts features.</li>
<li><b>Bottleneck (32):</b> the reduced representation; this is what we keep.</li>
<li><b>Decoder (32→128→784):</b> mirror of the encoder; forces the code to retain the information needed to rebuild the image.</li>
<li><b>Loss + backprop:</b> measure and reduce reconstruction error.</li>
</ul>
<h4>4. Using it</h4>
<ol>
<li>Train on X → X.</li>
<li>Discard the decoder.</li>
<li>encoder(x) gives 32 features for visualisation (2-D/3-D codes), clustering, or a faster classifier.</li>
</ol>
<pre>inp = Input(784)
h    = Dense(128, 'relu')(inp)
code = Dense(32, 'relu')(h)
h2   = Dense(128, 'relu')(code)
out  = Dense(784, 'sigmoid')(h2)
ae = Model(inp, out); ae.compile('adam', 'mse'); ae.fit(X, X, epochs=30)
encoder = Model(inp, code)</pre>
<h4>5. Design choices</h4>
<ul><li>Code size: smaller = more compression but blurrier reconstruction; pick by validation error.</li><li>Keep it symmetric; add dropout/L2 or noise if it overfits.</li><li>For images, a convolutional AE works even better.</li></ul>
<h4>Advantages over PCA</h4>
<p>Captures <b>non-linear</b> structure; with linear layers and MSE it reduces to PCA. Helps with the curse of dimensionality by giving downstream models a small, informative input.</p>
<p><b>Conclusion:</b> a symmetric encoder–bottleneck–decoder trained to reconstruct its input gives a learned, non-linear dimensionality reducer.</p>`,
  hi: `<p><b>Task:</b> MNIST ki image (28×28 = 784 pixels) ko sirf <b>32 numbers</b> mein dabaana hai (24.5 guna compression), undercomplete AE se.</p>
<h4>1. Layer table</h4>
<table>
<tr><th>Part</th><th>Layer</th><th>Neurons</th><th>Activation</th><th>Parameters</th></tr>
<tr><td>Input</td><td>Flatten image</td><td>784</td><td>— (0–1 scale)</td><td>0</td></tr>
<tr><td>Encoder</td><td>Dense 1</td><td>128</td><td>ReLU</td><td>100,480</td></tr>
<tr><td>Code</td><td>Bottleneck</td><td>32</td><td>ReLU / linear</td><td>4,128</td></tr>
<tr><td>Decoder</td><td>Dense 3</td><td>128</td><td>ReLU</td><td>4,224</td></tr>
<tr><td>Output</td><td>Dense 4</td><td>784</td><td>Sigmoid</td><td>101,136</td></tr>
<tr><td colspan="4"><b>Total</b></td><td><b>209,968 (≈ 2.1 lakh)</b></td></tr>
</table>
<p>Parameter formula yaad rakho: (inputs × outputs) + outputs (bias).</p>
<h4>2. Training set-up</h4>
<ul>
<li><b>Loss:</b> MSE <div class="formula">(1/n) Σ (x<sub>i</sub> − r<sub>i</sub>)²</div> ya binary cross-entropy.</li>
<li><b>Optimiser:</b> Adam, lr 0.001, batch 256, 20–50 epochs, early stopping.</li>
<li><b>Data:</b> X hi input, X hi target, koi label nahi.</li>
</ul>
<h4>3. Har hissa kya karta hai</h4>
<ul>
<li><b>Encoder (784→128→32):</b> dheere-dheere chhota karta hai, features nikaalta hai.</li>
<li><b>Bottleneck (32):</b> yahi reduced data hai, yahi humein chahiye.</li>
<li><b>Decoder (32→128→784):</b> encoder ka ulta; code ko majboor karta hai ki image banane layak info rakhe.</li>
<li><b>Loss + backprop:</b> galti naapo aur kam karo.</li>
</ul>
<h4>4. Use kaise karein</h4>
<ol>
<li>X → X pe train karo.</li>
<li>Decoder hata do.</li>
<li>encoder(x) se 32 features: plotting, clustering, ya fast classifier.</li>
</ol>
<h4>5. Design tips</h4>
<ul><li>Code jitna chhota, compression utna zyada par image utni dhundhli; validation error se choose karo.</li><li>Symmetric rakho; overfit ho toh dropout/L2/noise.</li><li>Images ke liye convolutional AE aur better.</li></ul>
<h4>Desi example</h4>
<p>Shaadi ki 500 photos WhatsApp pe bhejni hain. Pehle compress karke chhoti bhejte ho (encoder), doosri taraf khul ke dikhti hain (decoder). Agar photo theek dikhe toh chhoti file ne zaroori cheezein bacha li. Wahi chhoti file = 32-D code.</p>
<p><b>PCA se better kyun:</b> non-linear patterns pakadta hai; linear layers + MSE ho toh PCA hi ban jaata hai. Curse of dimensionality mein bhi help: aage wale model ko chhota, kaam ka input milta hai.</p>
<p><b>Conclusion:</b> symmetric encoder–bottleneck–decoder ko apna input dobara banana sikhao, encoder hi tumhara dimensionality reducer ban jaata hai.</p>`,
  keys: ["784→128→32→128→784", "bottleneck code", "symmetric decoder", "MSE / BCE", "Adam", "fit(X, X)", "discard decoder", "non-linear PCA", "parameter count"],
  draw: "Hourglass with layer sizes 784–128–32–128–784 and a layer/parameter table beside it.",
  fig: "unit5.html#q4",
  num: false
},
{
  id: "U5-09",
  unit: 5,
  topic: "Anomaly detection with autoencoders",
  q: "Explain in detail how an autoencoder is used for anomaly detection, with a real-world example.",
  alt: [
    "How does reconstruction error help in detecting anomalies?",
    "Explain fraud detection using autoencoders.",
    "Why are autoencoders suitable for anomaly detection when labelled anomalies are rare?"
  ],
  marks: [4, 10],
  priority: "must",
  prob: 75,
  diff: 3,
  pyq: ["8AID 2025 C5"],
  why: "Anomaly detection was the explicit focus of 8AID 2025 C5; can come alone as a 4- or 10-marker.",
  short: "Train the AE on normal data only; anomalies reconstruct poorly, so a reconstruction error above a threshold (e.g. μ + 3σ) flags an anomaly.",
  en: `<p><b>Anomaly detection</b> finds rare samples that differ from normal behaviour (fraud, faults, intrusions). Labelled anomalies are rare, so an <b>autoencoder trained only on normal data</b> is an ideal unsupervised (semi-supervised) detector.</p>
<h4>1. Principle</h4>
<ul>
<li>The AE learns to compress and rebuild <b>normal patterns</b>.</li>
<li>A normal sample gives low reconstruction error; an abnormal sample lies off the learned manifold, so its reconstruction is poor and its error is high.</li>
<li><b>Anomaly score:</b> <div class="formula">e(x) = ‖x − g(f(x))‖² </div></li>
</ul>
<h4>2. Step-by-step pipeline</h4>
<ol>
<li><b>Data:</b> collect normal data; scale features (min-max/standardise).</li>
<li><b>Model:</b> undercomplete (or denoising) AE, e.g. 30 → 16 → 8 → 16 → 30.</li>
<li><b>Train</b> with MSE on normal data only.</li>
<li><b>Threshold:</b> compute errors on normal validation data; set <div class="formula">T = μ<sub>e</sub> + k·σ<sub>e</sub>  (k ≈ 3)</div> or the 95th/99th percentile; tune using a few known anomalies if available.</li>
<li><b>Detect:</b> for each new x, if e(x) &gt; T, flag as anomaly; otherwise normal.</li>
<li><b>Evaluate</b> with precision, recall, F1, ROC-AUC (accuracy misleads with imbalance).</li>
</ol>
<h4>3. Worked example (machine sensors)</h4>
<p>Normal errors: μ = 0.02, σ = 0.01, so T = 0.02 + 3(0.01) = 0.05.<br>Reading A: e = 0.03 &lt; 0.05, normal.<br>Reading B: e = 0.18 &gt; 0.05, anomaly (maybe a bearing fault).</p>
<h4>4. Real-world applications</h4>
<ul>
<li><b>Credit-card fraud:</b> trained on genuine transactions; a large purchase at 3 AM abroad has high error.</li>
<li><b>Network intrusion:</b> unusual traffic patterns.</li>
<li><b>Predictive maintenance:</b> vibration/temperature sensors in factories, aircraft engines.</li>
<li><b>Medical imaging:</b> tumours as regions that reconstruct poorly.</li>
<li><b>Manufacturing visual inspection:</b> scratches and defects on products.</li>
</ul>
<h4>5. Advantages and limitations</h4>
<table>
<tr><th>Advantages</th><th>Limitations</th></tr>
<tr><td>No anomaly labels needed</td><td>Threshold choice is sensitive</td></tr>
<tr><td>Handles high-dimensional, non-linear data</td><td>May reconstruct some anomalies well if it generalises too much</td></tr>
<tr><td>Per-feature error shows which feature is abnormal</td><td>Training data must be mostly clean</td></tr>
<tr><td>Works for images, time series (LSTM-AE), tabular</td><td>Needs retraining when "normal" drifts</td></tr>
</table>
<p><b>Conclusion:</b> "train on normal, flag high reconstruction error" turns an autoencoder into a label-free anomaly detector.</p>`,
  hi: `<p><b>Anomaly detection</b> matlab normal se hatke rare cheezein pakadna: fraud, machine fault, hacking. Problem: anomaly ke labelled examples bahut kam hote hain. Isliye <b>sirf normal data pe trained AE</b> best tareeka hai.</p>
<h4>1. Principle</h4>
<ul>
<li>AE sirf <b>normal patterns</b> ko compress aur rebuild karna seekhta hai.</li>
<li>Normal sample aaya: achhi copy, error kam. Ajeeb sample aaya: AE ne aisa kabhi dekha nahi, copy kharab, error zyada.</li>
<li><b>Anomaly score:</b> <div class="formula">e(x) = ‖x − g(f(x))‖²</div></li>
</ul>
<h4>2. Step by step</h4>
<ol>
<li><b>Data:</b> sirf normal data lo, scale karo.</li>
<li><b>Model:</b> undercomplete ya denoising AE, jaise 30 → 16 → 8 → 16 → 30.</li>
<li>MSE se sirf normal data pe <b>train</b>.</li>
<li><b>Threshold:</b> normal validation data ka error nikaalo, <div class="formula">T = μ<sub>e</sub> + 3σ<sub>e</sub></div> ya 99th percentile.</li>
<li><b>Detect:</b> naya x, agar e(x) &gt; T toh anomaly.</li>
<li><b>Evaluate:</b> precision, recall, F1, ROC-AUC (imbalanced data mein accuracy dhokha deti hai).</li>
</ol>
<h4>3. Example</h4>
<p>μ = 0.02, σ = 0.01, toh T = 0.05. Reading A ka error 0.03: normal. Reading B ka error 0.18: anomaly, bearing check karo.</p>
<h4>4. Real life</h4>
<ul>
<li><b>Card fraud:</b> raat 3 baje videsh mein ₹95,000 ki shopping, error bahut zyada.</li>
<li><b>Network intrusion:</b> ajeeb traffic pattern.</li>
<li><b>Factory machines:</b> vibration/temperature sensors.</li>
<li><b>Medical scans:</b> tumour wala hissa theek se reconstruct nahi hota.</li>
<li><b>Quality check:</b> product pe scratch/defect.</li>
</ul>
<h4>Desi example</h4>
<p>Society ka chowkidaar saalon se sab residents ko pehchaanta hai. Koi naya aadmi raat ko aaye toh uske "dimaag ke record" se match nahi hota, turant rok leta hai. Chowkidaar ne kabhi "chor ki list" nahi padhi, sirf normal log yaad hain. Bilkul AE jaisa.</p>
<h4>5. Fayde / nuksaan</h4>
<table>
<tr><th>Fayde</th><th>Nuksaan</th></tr>
<tr><td>Anomaly labels nahi chahiye</td><td>Threshold set karna tricky</td></tr>
<tr><td>High-dimensional, non-linear data chalega</td><td>Kabhi anomaly ko bhi achha copy kar leta hai</td></tr>
<tr><td>Kaunsa feature ajeeb hai, dikh jaata hai</td><td>Training data saaf normal chahiye</td></tr>
<tr><td>Images, time series (LSTM-AE), tables sab pe</td><td>"Normal" badle toh retrain</td></tr>
</table>
<p><b>Conclusion:</b> "normal pe train karo, zyada error ko flag karo": AE bina labels ka anomaly detector ban jaata hai.</p>`,
  keys: ["train on normal data only", "reconstruction error as anomaly score", "threshold μ + 3σ / percentile", "fraud detection", "predictive maintenance", "precision/recall/F1", "no labels needed"],
  draw: "Pipeline: normal data → train AE → error histogram with threshold T; new sample → error → compare with T → normal / anomaly.",
  fig: "unit5.html#q1",
  num: false
},
{
  id: "U5-10",
  unit: 5,
  topic: "Types of autoencoders",
  q: "List and briefly explain the different types of autoencoders.",
  alt: [
    "Name any four types of autoencoders.",
    "Classify autoencoders based on code size and regularization."
  ],
  marks: [2, 4],
  priority: "must",
  prob: 70,
  diff: 2,
  pyq: ["8AID 2025 C5"],
  why: "'Types' was part of 8AID 2025 C5 and fits a 4-mark Part B on its own.",
  short: "Undercomplete, overcomplete, sparse, denoising, contractive, variational/stochastic and convolutional autoencoders.",
  en: `<p>Autoencoders are classified by <b>how they stop the network from simply copying its input</b> and by their architecture.</p>
<h4>A. By code size</h4>
<ul>
<li><b>Undercomplete:</b> dim(h) &lt; dim(x); bottleneck forces compression. Used for dimensionality reduction.</li>
<li><b>Overcomplete:</b> dim(h) ≥ dim(x); can copy, so it needs regularization.</li>
</ul>
<h4>B. Regularized (penalty-based)</h4>
<ul>
<li><b>Sparse AE:</b> L1 or KL penalty keeps most hidden units near zero. <div class="formula">L + λ Σ|h<sub>j</sub>|</div></li>
<li><b>Denoising AE:</b> reconstruct clean x from corrupted x̃. <div class="formula">L(x, g(f(x̃)))</div></li>
<li><b>Contractive AE:</b> penalise sensitivity of the code. <div class="formula">L + λ‖∂f(x)/∂x‖²<sub>F</sub></div></li>
</ul>
<h4>C. Probabilistic</h4>
<ul>
<li><b>Stochastic AE:</b> p<sub>enc</sub>(h|x), p<sub>dec</sub>(x|h).</li>
<li><b>Variational AE (VAE):</b> encoder outputs μ, σ; z = μ + σε; loss = reconstruction + KL. Generates new data.</li>
</ul>
<h4>D. By architecture</h4>
<ul>
<li><b>Convolutional AE:</b> conv + pooling encoder, transposed-conv/upsampling decoder, for images.</li>
<li><b>Stacked / deep AE:</b> several hidden layers, often pre-trained layer by layer.</li>
<li><b>Recurrent (LSTM) AE:</b> for sequences and time series.</li>
</ul>
<table>
<tr><th>Type</th><th>Use</th></tr>
<tr><td>Undercomplete</td><td>Compression</td></tr>
<tr><td>Sparse</td><td>Interpretable features</td></tr>
<tr><td>Denoising</td><td>Noise removal</td></tr>
<tr><td>Contractive</td><td>Robust features</td></tr>
<tr><td>VAE</td><td>Generation</td></tr>
<tr><td>Convolutional</td><td>Image tasks</td></tr>
</table>
<p><b>Conclusion:</b> all types share encoder–code–decoder; they differ in the constraint that makes the code useful.</p>`,
  hi: `<p>AE ke types is baat pe depend karte hain ki woh <b>seedha copy karne se kaise roka gaya hai</b>, aur architecture kaisa hai.</p>
<h4>A. Code size se</h4>
<ul>
<li><b>Undercomplete:</b> code chhota, pipe patli, compression. Dimensionality reduction ke liye.</li>
<li><b>Overcomplete:</b> code bada ya barabar; copy kar sakta hai, isliye penalty chahiye.</li>
</ul>
<h4>B. Regularized (penalty wale)</h4>
<ul>
<li><b>Sparse:</b> zyada tar neurons off. <div class="formula">L + λ Σ|h<sub>j</sub>|</div></li>
<li><b>Denoising:</b> gandi input se saaf output. <div class="formula">L(x, g(f(x̃)))</div></li>
<li><b>Contractive:</b> chhote badlaav pe code na hile. <div class="formula">L + λ‖∂f(x)/∂x‖²<sub>F</sub></div></li>
</ul>
<h4>C. Probability wale</h4>
<ul>
<li><b>Stochastic AE:</b> p(h|x), p(x|h), fixed output nahi.</li>
<li><b>VAE:</b> encoder μ aur σ deta hai, z = μ + σε, loss = reconstruction + KL. Naya data bana sakta hai.</li>
</ul>
<h4>D. Architecture se</h4>
<ul>
<li><b>Convolutional AE:</b> images ke liye conv layers.</li>
<li><b>Stacked / deep AE:</b> kai hidden layers, layer-by-layer pre-training.</li>
<li><b>LSTM AE:</b> sequence / time series ke liye.</li>
</ul>
<table>
<tr><th>Type</th><th>Kaam</th></tr>
<tr><td>Undercomplete</td><td>Compression</td></tr>
<tr><td>Sparse</td><td>Saaf, interpretable features</td></tr>
<tr><td>Denoising</td><td>Noise hatana</td></tr>
<tr><td>Contractive</td><td>Robust features</td></tr>
<tr><td>VAE</td><td>Naya data banana</td></tr>
<tr><td>Convolutional</td><td>Images</td></tr>
</table>
<p><b>Yaad rakhne ki trick:</b> "U-O-S-D-C-V-C": Undercomplete, Overcomplete, Sparse, Denoising, Contractive, Variational, Convolutional. Jaise ek hi ghar (encoder–code–decoder) ke alag-alag rules: kisi mein kamra chhota, kisi mein bijli ka bill (penalty), kisi mein lucky draw (sampling).</p>
<p><b>Conclusion:</b> sab mein encoder–code–decoder same hai, farak sirf us constraint ka hai jo code ko useful banata hai.</p>`,
  keys: ["undercomplete", "overcomplete", "sparse", "denoising", "contractive", "variational / stochastic", "convolutional", "stacked"],
  draw: "A small table or tree: Autoencoders → by size (under/over), regularized (sparse/denoising/contractive), probabilistic (VAE), architecture (conv/stacked/LSTM).",
  fig: "unit5.html#q1",
  num: false
},
{
  id: "U5-11",
  unit: 5,
  topic: "Stochastic encoders and decoders",
  q: "Explain stochastic encoders and decoders. How are they related to the variational autoencoder?",
  alt: [
    "What is a stochastic autoencoder?",
    "Explain p_encoder(h|x) and p_decoder(x|h).",
    "How does noise injection in the encoder make an autoencoder generative?"
  ],
  marks: [2, 4, 10],
  priority: "high",
  prob: 55,
  diff: 4,
  pyq: ["8AID 2025 A10"],
  why: "Named syllabus sub-topic and half of 8AID 2025 A10; not yet asked alone, so due.",
  short: "Encoder and decoder are distributions p_encoder(h|x) and p_decoder(x|h) instead of fixed functions; trained by minimising −log p_decoder(x|h), e.g. the VAE.",
  en: `<p><b>Definition:</b> In a <b>stochastic autoencoder</b> the encoder and decoder are not fixed functions but <b>conditional probability distributions</b>. Noise is injected so the same x can map to slightly different codes.</p>
<div class="formula">Stochastic encoder: p<sub>encoder</sub>(h | x) = p<sub>model</sub>(h | x)<br>Stochastic decoder: p<sub>decoder</sub>(x | h) = p<sub>model</sub>(x | h)</div>
<h4>1. Working</h4>
<ul>
<li>The decoder outputs the <b>parameters of a distribution</b> over x:
<ul><li>real-valued x: Gaussian mean, so −log p becomes <b>MSE</b>;</li><li>binary x: Bernoulli probabilities via sigmoid, so −log p becomes <b>cross-entropy</b>;</li><li>categorical x: softmax.</li></ul></li>
<li><b>Training objective</b> (maximum likelihood): <div class="formula">L = − log p<sub>decoder</sub>(x | h)</div></li>
<li>Thus ordinary AE losses are special cases of the likelihood view (links to MLE in Unit 1).</li>
</ul>
<h4>2. Variational autoencoder (the main stochastic AE)</h4>
<ol>
<li>Encoder outputs <b>μ(x)</b> and <b>σ(x)</b> for each latent dimension: q(z|x) = N(μ, σ²).</li>
<li><b>Reparameterisation trick:</b> <div class="formula">z = μ + σ · ε,  ε ~ N(0, I)</div> moves randomness outside so backprop flows through μ and σ.</li>
<li>Decoder p(x|z) reconstructs x̂.</li>
<li>Loss: <div class="formula">L = reconstruction(x, x̂) + KL( q(z|x) ‖ N(0, I) )</div> KL keeps the latent space smooth and centred.</li>
<li><b>Generation:</b> sample z ~ N(0, I) and decode to get new data.</li>
</ol>
<h4>3. Deterministic vs stochastic</h4>
<table>
<tr><th>Deterministic AE</th><th>Stochastic AE</th></tr>
<tr><td>h = f(x), one point</td><td>h ~ p(h|x), a distribution</td></tr>
<tr><td>Loss ‖x − r‖²</td><td>−log p(x|h) (+ KL)</td></tr>
<tr><td>Cannot generate</td><td>Can sample new data</td></tr>
</table>
<h4>Example</h4>
<p>A VAE trained on faces: moving z slightly gives the same person with a different smile or pose; random z gives brand-new realistic faces.</p>
<h4>Advantages / limitations</h4>
<ul><li>+ Generative, smooth latent space, models uncertainty, more robust.</li><li>− VAE outputs are often blurry; training needs careful balancing of KL and reconstruction.</li></ul>
<p><b>Conclusion:</b> making the encoder and decoder probabilistic turns an AE from a compressor into a generative model, the VAE.</p>`,
  hi: `<p><b>Definition:</b> <b>Stochastic autoencoder</b> mein encoder aur decoder fixed function nahi, balki <b>probability distributions</b> hote hain. Encoder mein noise daala jaata hai, toh same x se har baar thoda alag code aa sakta hai.</p>
<div class="formula">Stochastic encoder: p<sub>encoder</sub>(h | x)<br>Stochastic decoder: p<sub>decoder</sub>(x | h)</div>
<h4>1. Kaam kaise karta hai</h4>
<ul>
<li>Decoder seedha x nahi, x ki <b>distribution ke parameters</b> deta hai:
<ul><li>real values: Gaussian ka mean, toh −log p = <b>MSE</b>;</li><li>binary: sigmoid se Bernoulli probability, toh −log p = <b>cross-entropy</b>.</li></ul></li>
<li><b>Training:</b> <div class="formula">L = − log p<sub>decoder</sub>(x | h)</div> yaani maximum likelihood (Unit 1 ka MLE).</li>
<li>Matlab normal AE ke loss bhi isi likelihood view ke special cases hain.</li>
</ul>
<h4>2. VAE: sabse famous stochastic AE</h4>
<ol>
<li>Encoder ek point nahi, <b>μ aur σ</b> deta hai (ek "baadal").</li>
<li><b>Reparameterisation trick:</b> <div class="formula">z = μ + σ · ε,  ε ~ N(0, I)</div> randomness bahar nikal di, toh backprop μ aur σ tak pahunch jaata hai.</li>
<li>Decoder z se x̂ banata hai.</li>
<li>Loss: <div class="formula">L = reconstruction + KL( q(z|x) ‖ N(0, I) )</div> KL baadal ko normal shape mein rakhta hai, latent space smooth.</li>
<li><b>Naya data:</b> z ~ N(0, I) sample karo, decoder se nayi image.</li>
</ol>
<h4>3. Table</h4>
<table>
<tr><th>Deterministic</th><th>Stochastic</th></tr>
<tr><td>h = f(x), ek point</td><td>h ~ p(h|x), distribution</td></tr>
<tr><td>‖x − r‖²</td><td>−log p(x|h) (+ KL)</td></tr>
<tr><td>Generate nahi kar sakta</td><td>Naya data bana sakta</td></tr>
</table>
<h4>Desi example</h4>
<p>Normal AE kehta hai "yeh chehra = point (2, 3)". VAE kehta hai "yeh chehra (2, 3) ke aas-paas ±0.5 mein hai". Us area se thoda alag point uthao toh wahi insaan, alag muskaan. Jaise mummy har baar dal banati hain: recipe same (μ), par namak-mirch thoda upar-neeche (σ), har baar thodi alag par pehchaani hui.</p>
<h4>Fayde / nuksaan</h4>
<ul><li>+ Generative, smooth latent space, uncertainty model karta hai.</li><li>− VAE ki images thodi dhundhli; KL aur reconstruction ka balance mushkil.</li></ul>
<p><b>Conclusion:</b> encoder-decoder ko probabilistic banao, AE compressor se generator (VAE) ban jaata hai.</p>`,
  keys: ["p_encoder(h|x)", "p_decoder(x|h)", "−log p_decoder(x|h)", "Gaussian → MSE, Bernoulli → cross-entropy", "noise injection", "VAE", "z = μ + σε", "KL divergence"],
  draw: "x → encoder → (μ, σ) → z = μ + σ·ε (ε ~ N(0,1)) → decoder → x̂, loss = reconstruction + KL.",
  fig: "unit5.html#q5",
  num: false
},
{
  id: "U5-12",
  unit: 5,
  topic: "Denoising autoencoder",
  q: "Explain the denoising autoencoder. How does it learn robust features?",
  alt: [
    "What is a denoising autoencoder?",
    "How can autoencoders be used for image denoising?",
    "Explain the corruption process in a denoising autoencoder."
  ],
  marks: [2, 4],
  priority: "high",
  prob: 55,
  diff: 2,
  pyq: [],
  why: "Most popular regularized AE and a common application ('image denoising'); a likely Part A/B question though not yet asked alone.",
  short: "A DAE corrupts input x into x̃ and is trained to reconstruct the clean x, minimising L(x, g(f(x̃))); it learns robust features and removes noise.",
  en: `<p><b>Definition:</b> A <b>denoising autoencoder (DAE)</b> is a regularized AE that receives a <b>corrupted</b> input x̃ and is trained to output the <b>clean</b> original x.</p>
<div class="formula">x̃ ~ C(x̃ | x),   L = L(x, g(f(x̃))) = ‖x − g(f(x̃))‖²</div>
<h4>Corruption process C</h4>
<ul>
<li><b>Gaussian noise:</b> x̃ = x + N(0, σ²).</li>
<li><b>Masking noise:</b> randomly set a fraction (e.g. 25%) of inputs to 0.</li>
<li><b>Salt-and-pepper:</b> random pixels set to 0 or 1.</li>
</ul>
<h4>Working steps</h4>
<ol>
<li>Take a clean sample x.</li>
<li>Corrupt it to x̃ (fresh noise each epoch).</li>
<li>Encode h = f(x̃), decode r = g(h).</li>
<li>Compare r with the <b>clean</b> x, backpropagate, update.</li>
</ol>
<h4>Why it learns robust features</h4>
<ul>
<li>Copying is useless because the input is noisy and the target is clean, so the identity cannot reach zero loss.</li>
<li>To undo noise it must learn the <b>structure / manifold</b> of the data and project corrupted points back onto it.</li>
<li>Works even with an overcomplete code.</li>
</ul>
<h4>Example</h4>
<p>Train on MNIST with 30% pixels masked; at test time a scratched digit goes in and a clean digit comes out. Same idea cleans old photos, medical scans and noisy audio.</p>
<h4>Advantages / limitations</h4>
<ul><li>+ Simple, cheap, robust features, good pre-training.</li><li>− Noise type/level must match the real noise; heavy noise blurs outputs.</li></ul>
<p><b>Conclusion:</b> "noisy in, clean out" forces the DAE to learn what real data looks like.</p>`,
  hi: `<p><b>Definition:</b> <b>Denoising AE (DAE)</b> ek regularized AE hai jisko input mein <b>kharab (noisy)</b> x̃ diya jaata hai aur output mein <b>saaf</b> original x maanga jaata hai.</p>
<div class="formula">x̃ ~ C(x̃ | x),   L = ‖x − g(f(x̃))‖²</div>
<h4>Noise kaise daalte hain</h4>
<ul>
<li><b>Gaussian noise:</b> x̃ = x + N(0, σ²).</li>
<li><b>Masking:</b> random 25% inputs ko 0 kar do.</li>
<li><b>Salt-and-pepper:</b> random pixels kaale ya safed.</li>
</ul>
<h4>Steps</h4>
<ol>
<li>Saaf sample x lo.</li>
<li>Usme noise daal ke x̃ banao (har epoch naya noise).</li>
<li>h = f(x̃), r = g(h).</li>
<li>r ko <b>saaf</b> x se compare karo, backprop, update.</li>
</ol>
<h4>Robust features kyun</h4>
<ul>
<li>Copy karne ka fayda hi nahi, kyunki input ganda hai aur target saaf. Identity se loss zero nahi hoga.</li>
<li>Noise hatane ke liye usko samajhna padega ki asli data kaisa dikhta hai (data ka manifold), aur kharab point ko wapas us pe laana padega.</li>
<li>Code bada (overcomplete) ho toh bhi kaam karta hai.</li>
</ul>
<h4>Desi example</h4>
<p>Dadi ki purani kharoch wali shaadi ki photo studio mein do, saaf photo wapas milti hai. Studio wale bhaiya ko pata hai chehra, saree, background normally kaise dikhte hain, isliye kharoch hata paate hain. DAE bhi yahi seekhta hai. MNIST pe 30% pixels mita ke train karo, test pe kharab digit do, saaf digit milega.</p>
<h4>Fayde / nuksaan</h4>
<ul><li>+ Simple, sasta, robust features, achha pre-training.</li><li>− Noise ka type/level asli noise jaisa hona chahiye; zyada noise se output dhundhla.</li></ul>
<p><b>Conclusion:</b> "ganda andar, saaf bahar" DAE ko asli data ki samajh sikhata hai.</p>`,
  keys: ["corrupted input x̃", "clean target x", "L(x, g(f(x̃)))", "Gaussian / masking noise", "data manifold", "robust features", "image denoising"],
  draw: "Clean x → add noise → x̃ → encoder → h → decoder → r; loss arrow between r and clean x.",
  fig: "unit5.html#q3",
  num: false
},
{
  id: "U5-13",
  unit: 5,
  topic: "Contractive autoencoder",
  q: "Explain the contractive autoencoder (CAE) and its Jacobian penalty.",
  alt: [
    "What is a contractive autoencoder?",
    "What does the Frobenius norm of the Jacobian represent in a CAE?",
    "How does a CAE learn features that are robust to small input changes?"
  ],
  marks: [2, 4, 10],
  priority: "high",
  prob: 50,
  diff: 4,
  pyq: [],
  why: "Named syllabus sub-topic never asked so far; due for a Part A or B.",
  short: "A regularized AE that adds λ‖∂f(x)/∂x‖²_F (Frobenius norm of the encoder Jacobian) to the loss, making the code insensitive to small input changes.",
  en: `<p><b>Definition:</b> A <b>contractive autoencoder (CAE)</b> is a regularized AE whose penalty is the squared <b>Frobenius norm of the Jacobian of the encoder</b>, i.e. how much the code h changes when x changes slightly.</p>
<div class="formula">L = L(x, g(f(x))) + λ ‖ J<sub>f</sub>(x) ‖²<sub>F</sub>,   ‖J<sub>f</sub>(x)‖²<sub>F</sub> = Σ<sub>i</sub> Σ<sub>j</sub> ( ∂h<sub>j</sub> / ∂x<sub>i</sub> )²</div>
<p>For a sigmoid encoder h = σ(Wx + b) it has the closed form <div class="formula">‖J‖²<sub>F</sub> = Σ<sub>j</sub> [h<sub>j</sub>(1 − h<sub>j</sub>)]² Σ<sub>i</sub> W<sub>ji</sub>²</div></p>
<h4>1. Intuition: "contraction"</h4>
<ul>
<li>The penalty makes the encoder map a <b>neighbourhood of inputs</b> to a <b>smaller neighbourhood of codes</b>; small perturbations (noise, tiny shifts) barely change h.</li>
<li><b>Tug of war:</b> the reconstruction term wants h to change with x (to tell inputs apart); the penalty wants h to stay still.</li>
<li><b>Result:</b> h is sensitive only along directions in which real data varies (tangent to the <b>data manifold</b>) and insensitive in the other directions.</li>
</ul>
<h4>2. Role of λ</h4>
<ul><li>Too large: all inputs collapse to the same code (useless).</li><li>Too small: behaves like a plain AE.</li><li>Tune on validation data.</li></ul>
<h4>3. Working steps</h4>
<ol><li>Forward: h = f(x), r = g(h).</li><li>Compute reconstruction loss and the Jacobian norm of f at x.</li><li>Total loss = reconstruction + λ‖J‖², backpropagate, update.</li></ol>
<h4>4. CAE vs DAE (short)</h4>
<table>
<tr><th>CAE</th><th>DAE</th></tr>
<tr><td>Robustness by analytic Jacobian penalty</td><td>Robustness by adding noise to inputs</td></tr>
<tr><td>Makes the encoder h robust</td><td>Makes the whole reconstruction robust</td></tr>
<tr><td>No noise needed; costlier</td><td>Needs corruption; cheap</td></tr>
</table>
<h4>Example</h4>
<p>Handwritten "3" shifted by one pixel or slightly brighter keeps almost the same code, but a "3" vs an "8" gets very different codes.</p>
<h4>Advantages / limitations</h4>
<ul><li>+ Locally invariant, robust features; good for classification pre-training; captures manifold structure.</li><li>− Jacobian computation is expensive for large layers; extra hyper-parameter λ.</li></ul>
<p><b>Conclusion:</b> the CAE penalises ‖∂h/∂x‖² so the code ignores small irrelevant changes and follows only the true variations of the data.</p>`,
  hi: `<p><b>Definition:</b> <b>Contractive AE (CAE)</b> ek regularized AE hai jisme penalty hai encoder ke <b>Jacobian ka Frobenius norm</b>, yaani input thoda badalne pe code h kitna hilta hai.</p>
<div class="formula">L = L(x, g(f(x))) + λ ‖ J<sub>f</sub>(x) ‖²<sub>F</sub>,   ‖J‖²<sub>F</sub> = Σ<sub>i</sub> Σ<sub>j</sub> ( ∂h<sub>j</sub> / ∂x<sub>i</sub> )²</div>
<p>Frobenius norm = Jacobian matrix ke saare partial derivatives ka square karke jodna.</p>
<h4>1. "Contract" ka matlab</h4>
<ul>
<li>Input ke aas-paas ke points ko code mein aur paas-paas (chhote area mein) bhej do. Chhota noise ya thoda shift ho toh h lagbhag same.</li>
<li><b>Rassa-kashi:</b> reconstruction kehta hai "h ko x ke saath badlo, warna alag inputs pehchaanoge kaise"; penalty kehti hai "h mat hilao".</li>
<li><b>Nateeja:</b> h sirf un directions mein badalta hai jahan asli data badalta hai (<b>data manifold</b>), baaki directions (noise) ignore.</li>
</ul>
<h4>2. λ ka role</h4>
<ul><li>Bahut bada: sab inputs ka ek hi code, bekaar.</li><li>Bahut chhota: normal AE jaisa.</li><li>Validation se tune karo.</li></ul>
<h4>3. Steps</h4>
<ol><li>h = f(x), r = g(h).</li><li>Reconstruction loss + x pe Jacobian norm nikaalo.</li><li>Total = reconstruction + λ‖J‖², backprop, update.</li></ol>
<h4>4. CAE vs DAE</h4>
<table>
<tr><th>CAE</th><th>DAE</th></tr>
<tr><td>Formula (Jacobian) se robustness</td><td>Noise daal ke robustness</td></tr>
<tr><td>Encoder/code robust</td><td>Poora reconstruction robust</td></tr>
<tr><td>Noise nahi chahiye; mehnga</td><td>Noise chahiye; sasta</td></tr>
</table>
<h4>Desi example</h4>
<p>Tumhara dost chashma lagaye, topi pehne, ya kam roshni mein khada ho, tum phir bhi usko pehchaan lete ho: dimaag ka "code" nahi badalta. Par dost aur uska bhai alag dikhte hain toh code alag. CAE yahi sikhata hai: chhote badlaav pe stable, asli farak pe sensitive.</p>
<h4>Fayde / nuksaan</h4>
<ul><li>+ Robust, locally invariant features; manifold samajhta hai; pre-training mein achha.</li><li>− Badi layers mein Jacobian nikaalna mehnga; λ tune karna.</li></ul>
<p><b>Conclusion:</b> CAE ‖∂h/∂x‖² pe saza lagata hai, toh code faltu chhote badlaav ignore karke sirf asli variation follow karta hai.</p>`,
  keys: ["Jacobian of encoder", "Frobenius norm ‖∂f(x)/∂x‖²_F", "λ trade-off", "contraction", "locally invariant", "data manifold", "robust to small perturbations"],
  draw: "AE diagram with the penalty λ‖∂h/∂x‖²_F written on the encoder; optionally a curve (manifold) with arrows showing sensitivity along it and contraction across it.",
  fig: "unit5.html#q6",
  num: false
},
{
  id: "U5-14",
  unit: 5,
  topic: "Variational autoencoder",
  q: "Explain the variational autoencoder (VAE), the reparameterisation trick and the KL-divergence term.",
  alt: [
    "What is the reparameterisation trick?",
    "How does a VAE generate new data?",
    "Differentiate a standard autoencoder and a variational autoencoder."
  ],
  marks: [2, 4, 10],
  priority: "med",
  prob: 45,
  diff: 4,
  pyq: [],
  why: "Comes under 'stochastic encoders and decoders'; reparameterisation is a ready Part A, VAE a possible Part B.",
  short: "A VAE's encoder outputs μ and σ; z = μ + σε (ε ~ N(0,1)) lets gradients flow; loss = reconstruction + KL(q(z|x) ‖ N(0,I)); sampling z generates new data.",
  en: `<p><b>Definition:</b> A <b>variational autoencoder (VAE)</b> is a stochastic, generative autoencoder whose encoder outputs a <b>probability distribution</b> over the latent code instead of a single point, and whose latent space is pushed towards a standard normal so that new samples can be generated.</p>
<h4>1. Architecture</h4>
<ul>
<li><b>Encoder (recognition model)</b> q<sub>φ</sub>(z|x) = N(μ(x), σ²(x)): outputs vectors μ and log σ².</li>
<li><b>Sampling layer:</b> draws z from this Gaussian.</li>
<li><b>Decoder (generative model)</b> p<sub>θ</sub>(x|z): reconstructs x̂.</li>
</ul>
<h4>2. Reparameterisation trick</h4>
<div class="formula">z = μ + σ ⊙ ε,   ε ~ N(0, I)</div>
<p>Sampling is not differentiable. Writing z this way moves the randomness into ε, so z is a differentiable function of μ and σ and backpropagation can update the encoder.</p>
<h4>3. Loss (negative ELBO)</h4>
<div class="formula">L = − E<sub>q(z|x)</sub>[ log p(x|z) ] + KL( q(z|x) ‖ N(0, I) )</div>
<div class="formula">KL = − ½ Σ<sub>j</sub> ( 1 + log σ<sub>j</sub>² − μ<sub>j</sub>² − σ<sub>j</sub>² )</div>
<ul>
<li><b>Reconstruction term:</b> output must resemble input (MSE / BCE).</li>
<li><b>KL term:</b> keeps each q(z|x) close to N(0, I), so the latent space is <b>continuous and smooth</b> with no holes.</li>
</ul>
<h4>4. Generation</h4>
<ol><li>Sample z ~ N(0, I).</li><li>Pass through the decoder.</li><li>Get a new, realistic sample. Interpolating between two codes morphs one image into another.</li></ol>
<h4>5. AE vs VAE</h4>
<table>
<tr><th>Point</th><th>Standard AE</th><th>VAE</th></tr>
<tr><td>Code</td><td>Single point h</td><td>Distribution N(μ, σ²)</td></tr>
<tr><td>Loss</td><td>Reconstruction</td><td>Reconstruction + KL</td></tr>
<tr><td>Latent space</td><td>Irregular, gaps</td><td>Smooth, continuous</td></tr>
<tr><td>Generation</td><td>Poor</td><td>Good</td></tr>
</table>
<h4>Applications</h4>
<p>Generating faces/digits, drug-molecule design, data augmentation, anomaly detection using likelihood.</p>
<p><b>Limitations:</b> blurry outputs compared to GANs; balancing KL and reconstruction (posterior collapse).</p>
<p><b>Conclusion:</b> μ, σ + reparameterisation + KL make the VAE a trainable generative autoencoder.</p>`,
  hi: `<p><b>Definition:</b> <b>VAE</b> ek stochastic, generative AE hai. Iska encoder ek point nahi, ek <b>distribution</b> (μ, σ) deta hai, aur latent space ko standard normal jaisa rakha jaata hai taaki naya data bana sakein.</p>
<h4>1. Architecture</h4>
<ul>
<li><b>Encoder</b> q(z|x) = N(μ, σ²): μ aur log σ² ke vectors deta hai.</li>
<li><b>Sampling:</b> is Gaussian se z nikaalo.</li>
<li><b>Decoder</b> p(x|z): x̂ banata hai.</li>
</ul>
<h4>2. Reparameterisation trick</h4>
<div class="formula">z = μ + σ ⊙ ε,   ε ~ N(0, I)</div>
<p>Random sampling pe derivative nahi nikalta, backprop atak jaata. Toh randomness ko ε mein daal diya; ab z, μ aur σ ka simple function hai aur gradient encoder tak jaata hai. Jaise dice ka result alag rakh do, baaki calculation smooth.</p>
<h4>3. Loss</h4>
<div class="formula">L = reconstruction loss + KL( q(z|x) ‖ N(0, I) )</div>
<div class="formula">KL = − ½ Σ ( 1 + log σ² − μ² − σ² )</div>
<ul>
<li><b>Reconstruction:</b> output input jaisa ho.</li>
<li><b>KL:</b> har baadal ko N(0, I) ke paas rakho, taaki latent space mein gaddhe (holes) na hon, sab smooth.</li>
</ul>
<h4>4. Naya data</h4>
<ol><li>z ~ N(0, I) random lo.</li><li>Decoder se guzaaro.</li><li>Naya realistic sample. Do codes ke beech chalo toh ek chehra dheere-dheere doosre mein badalta hai.</li></ol>
<h4>5. AE vs VAE</h4>
<table>
<tr><th>Point</th><th>AE</th><th>VAE</th></tr>
<tr><td>Code</td><td>Ek point</td><td>Distribution</td></tr>
<tr><td>Loss</td><td>Reconstruction</td><td>Reconstruction + KL</td></tr>
<tr><td>Latent space</td><td>Toota-phoota</td><td>Smooth</td></tr>
<tr><td>Generation</td><td>Kharab</td><td>Achha</td></tr>
</table>
<h4>Desi example</h4>
<p>AE ek address yaad rakhta hai: "Sharma ji ka ghar = gali no. 3, ghar no. 7". VAE yaad rakhta hai "Sharma ji ka mohalla": us mohalle mein kahin bhi jao, Sharma ji jaisa ghar milega. Mohalle ke beech khaali plot nahi (KL), toh random jagah pe bhi ek achha ghar (naya sample) mil jaata hai.</p>
<p><b>Applications:</b> naye chehre/digits, dawai ke molecules, data augmentation, anomaly detection.</p>
<p><b>Limitations:</b> GAN se dhundhli images; KL aur reconstruction ka balance mushkil.</p>
<p><b>Conclusion:</b> μ, σ + reparameterisation + KL = trainable generative AE, yaani VAE.</p>`,
  keys: ["μ and σ", "reparameterisation z = μ + σε", "KL divergence", "ELBO", "smooth latent space", "sample z ~ N(0, I)", "generative"],
  draw: "x → encoder → μ, σ → z = μ + σ·ε → decoder → x̂, with loss = reconstruction + KL written below.",
  fig: "unit5.html#q5",
  num: false
},
{
  id: "U5-15",
  unit: 5,
  topic: "Sparse autoencoder",
  q: "Explain the sparse autoencoder and its sparsity penalty.",
  alt: [
    "What is a sparse autoencoder?",
    "How does the KL-divergence sparsity penalty work?",
    "How can an overcomplete autoencoder learn useful features using sparsity?"
  ],
  marks: [2, 4],
  priority: "med",
  prob: 45,
  diff: 3,
  pyq: [],
  why: "Main example of a regularized AE; likely as a Part A definition or within the regularized-AE answer.",
  short: "An autoencoder with an L1 or KL penalty on hidden activations so only a few hidden units are active for each input, giving sparse, specialised features.",
  en: `<p><b>Definition:</b> A <b>sparse autoencoder</b> is a regularized AE that adds a <b>sparsity penalty</b> on the hidden activations, so that for any input only a few hidden neurons are active (non-zero). The code may even be larger than the input.</p>
<h4>1. Loss</h4>
<div class="formula">L = L(x, g(f(x))) + λ Ω(h)</div>
<ul>
<li><b>L1 penalty:</b> <div class="formula">Ω(h) = Σ<sub>j</sub> |h<sub>j</sub>|</div></li>
<li><b>KL penalty:</b> let ρ̂<sub>j</sub> = (1/m) Σ<sub>i</sub> h<sub>j</sub>(x<sup>(i)</sup>) be the average activation of unit j and ρ a small target (e.g. 0.05): <div class="formula">Ω = Σ<sub>j</sub> [ ρ log(ρ/ρ̂<sub>j</sub>) + (1 − ρ) log((1 − ρ)/(1 − ρ̂<sub>j</sub>)) ]</div> It is 0 when ρ̂<sub>j</sub> = ρ and grows as ρ̂<sub>j</sub> moves away.</li>
</ul>
<h4>2. Why it works</h4>
<ul>
<li>Copying all inputs needs many active units; the penalty forbids that, so identity is blocked.</li>
<li>Each unit becomes a <b>specialist detector</b> (an edge, a stroke, a word topic).</li>
<li>Sparse codes are more interpretable and often better for classification.</li>
</ul>
<h4>3. Training</h4>
<ol><li>Forward pass, compute activations h.</li><li>Compute reconstruction loss + sparsity penalty.</li><li>Backprop (the KL term adds a gradient to each hidden unit), update.</li></ol>
<h4>Example</h4>
<p>A sparse AE on natural image patches learns Gabor-like edge detectors, similar to neurons in the visual cortex; each patch activates only a handful of them.</p>
<h4>Advantages / limitations</h4>
<ul><li>+ Allows overcomplete codes, interpretable features, good pre-training.</li><li>− Extra hyper-parameters λ and ρ; slower training.</li></ul>
<p><b>Conclusion:</b> sparsity, not size, stops copying and gives specialised features.</p>`,
  hi: `<p><b>Definition:</b> <b>Sparse AE</b> ek regularized AE hai jisme hidden activations pe <b>sparsity penalty</b> lagti hai, taaki har input pe sirf kuch hi neurons "on" hon, baaki 0 ke paas. Code input se bada bhi ho sakta hai.</p>
<h4>1. Loss</h4>
<div class="formula">L = L(x, g(f(x))) + λ Ω(h)</div>
<ul>
<li><b>L1:</b> <div class="formula">Ω(h) = Σ |h<sub>j</sub>|</div></li>
<li><b>KL penalty:</b> ρ̂<sub>j</sub> = neuron j ki average activation, ρ = chhota target (0.05). <div class="formula">Ω = Σ<sub>j</sub> [ ρ log(ρ/ρ̂<sub>j</sub>) + (1 − ρ) log((1 − ρ)/(1 − ρ̂<sub>j</sub>)) ]</div> ρ̂ = ρ ho toh 0, door jaaye toh badhta hai.</li>
</ul>
<h4>2. Kaam kyun karta hai</h4>
<ul>
<li>Sab copy karne ke liye bahut neurons on karne padenge; penalty mana karti hai, toh identity band.</li>
<li>Har neuron ek <b>specialist</b> ban jaata hai (edge, stroke, topic).</li>
<li>Sparse code samajhna aasaan, classification mein bhi achha.</li>
</ul>
<h4>3. Training</h4>
<ol><li>Forward, activations nikaalo.</li><li>Reconstruction + sparsity penalty.</li><li>Backprop, update.</li></ol>
<h4>Desi example</h4>
<p>Bade hospital mein har marij ke liye saare 100 doctor nahi aate: dil ka marij, toh sirf cardiologist aur 1–2 aur. Har doctor ek specialist hai. Sparse AE mein bhi har input pe sirf 2–4 "specialist" neurons jagte hain. Natural images pe train karo toh neurons edge detectors ban jaate hain, bilkul aankh ke visual cortex jaise.</p>
<h4>Fayde / nuksaan</h4>
<ul><li>+ Bada code chalega, interpretable features, achha pre-training.</li><li>− λ aur ρ tune karne padte hain; training slow.</li></ul>
<p><b>Conclusion:</b> size nahi, sparsity copy ko rokti hai aur specialist features deti hai.</p>`,
  keys: ["sparsity penalty", "L1 Σ|h_j|", "KL(ρ ‖ ρ̂_j)", "average activation ρ̂", "target ρ ≈ 0.05", "few active units", "overcomplete allowed"],
  draw: "Wide hidden layer with only a few neurons shaded (active) and the rest blank.",
  fig: "unit5.html#q3",
  num: false
},
{
  id: "U5-16",
  unit: 5,
  topic: "Overcomplete autoencoder",
  q: "What is an overcomplete autoencoder? Why does it need regularization? Compare it with an undercomplete autoencoder.",
  alt: [
    "Define overcomplete autoencoder.",
    "Differentiate undercomplete and overcomplete autoencoders."
  ],
  marks: [2, 4],
  priority: "med",
  prob: 45,
  diff: 2,
  pyq: [],
  why: "Natural counterpart of the undercomplete AE (asked in 7CAI 2025); good Part A or comparison.",
  short: "An autoencoder whose code dimension is equal to or larger than the input; without regularization it can learn the identity, so sparse/denoising/contractive penalties are used.",
  en: `<p><b>Definition:</b> An <b>overcomplete autoencoder</b> has a code dimension <b>equal to or greater than</b> the input dimension (dim h ≥ dim x).</p>
<h4>Problem</h4>
<ul>
<li>With enough units it can learn the <b>identity</b> g(f(x)) = x (even a linear encoder/decoder can), so reconstruction is perfect but features are useless.</li>
</ul>
<h4>Solution: regularization</h4>
<ul>
<li><b>Sparse:</b> L + λΣ|h<sub>j</sub>|, only a few units active.</li>
<li><b>Denoising:</b> L(x, g(f(x̃))), noisy input, clean target.</li>
<li><b>Contractive:</b> L + λ‖∂f/∂x‖²<sub>F</sub>.</li>
</ul>
<h4>Why use it at all?</h4>
<ul><li>A larger code can represent richer, more specialised features (many detectors).</li><li>Sparse overcomplete codes are often more linearly separable for classifiers.</li></ul>
<table>
<tr><th>Point</th><th>Undercomplete</th><th>Overcomplete</th></tr>
<tr><td>Code size</td><td>dim h &lt; dim x</td><td>dim h ≥ dim x</td></tr>
<tr><td>Identity risk</td><td>Low (bottleneck)</td><td>High without regularization</td></tr>
<tr><td>Needs penalty?</td><td>No (optional)</td><td>Yes</td></tr>
<tr><td>Features</td><td>Compressed, dense</td><td>Rich, sparse</td></tr>
<tr><td>Use</td><td>Dimensionality reduction</td><td>Feature learning, denoising</td></tr>
</table>
<p><b>Example:</b> 784 → 1000 → 784 with an L1 sparsity penalty learns 1000 stroke detectors, only ~20 active per digit.</p>
<p><b>Conclusion:</b> overcomplete AEs are powerful only when regularization stops them from copying.</p>`,
  hi: `<p><b>Definition:</b> <b>Overcomplete AE</b> mein code ka size input ke <b>barabar ya usse bada</b> hota hai (dim h ≥ dim x).</p>
<h4>Problem</h4>
<ul><li>Itni jagah hai ki woh seedha copy (identity g(f(x)) = x) kar lega. Output perfect, par features bekaar.</li></ul>
<h4>Solution: regularization</h4>
<ul>
<li><b>Sparse:</b> kam neurons on.</li>
<li><b>Denoising:</b> ganda input, saaf target.</li>
<li><b>Contractive:</b> Jacobian penalty.</li>
</ul>
<h4>Phir use kyun karein?</h4>
<ul><li>Bada code zyada aur specialised features rakh sakta hai.</li><li>Sparse overcomplete code classifier ke liye aksar aasaan (linearly separable).</li></ul>
<table>
<tr><th>Point</th><th>Undercomplete</th><th>Overcomplete</th></tr>
<tr><td>Code size</td><td>Input se chhota</td><td>Barabar ya bada</td></tr>
<tr><td>Copy ka khatra</td><td>Kam</td><td>Zyada (bina penalty)</td></tr>
<tr><td>Penalty chahiye?</td><td>Nahi</td><td>Haan</td></tr>
<tr><td>Features</td><td>Compressed</td><td>Rich, sparse</td></tr>
<tr><td>Use</td><td>Dim. reduction</td><td>Feature learning, denoising</td></tr>
</table>
<h4>Desi example</h4>
<p>Exam mein agar answer sheet 20 page ki ho aur question 1 page ka, toh student poora textbook copy kar dega (identity). Teacher rule lagaye "har extra line pe marks katenge" (penalty), tab student sochke likhega. Badi sheet = overcomplete, rule = regularization. Jaise 784 → 1000 → 784 AE mein 1000 stroke detectors bante hain, har digit pe sirf ~20 active.</p>
<p><b>Conclusion:</b> overcomplete AE tabhi kaam ka hai jab regularization usko copy karne se roke.</p>`,
  keys: ["dim h ≥ dim x", "identity function risk", "needs regularization", "sparse/denoising/contractive", "rich features"],
  draw: "AE with a middle layer wider than the input, labelled 'needs λΩ'.",
  fig: "unit5.html#q2",
  num: false
},
{
  id: "U5-17",
  unit: 5,
  topic: "Autoencoder vs PCA",
  q: "Compare autoencoders with PCA for dimensionality reduction. When does an autoencoder become equivalent to PCA?",
  alt: [
    "Autoencoder vs PCA.",
    "Why is an autoencoder called a non-linear generalisation of PCA?"
  ],
  marks: [2, 4],
  priority: "med",
  prob: 45,
  diff: 3,
  pyq: [],
  why: "Classic link stated in the undercomplete-AE theory and useful for B7-type design and curse-of-dimensionality answers.",
  short: "PCA is a linear projection; an undercomplete AE with a linear decoder and MSE learns the PCA subspace, while non-linear layers make it a more powerful non-linear PCA.",
  en: `<p><b>PCA</b> projects data onto the top-k orthogonal directions of maximum variance (eigenvectors of the covariance matrix). An <b>autoencoder</b> learns encoder f and decoder g by minimising reconstruction error.</p>
<h4>Equivalence</h4>
<p>If the AE is <b>undercomplete</b>, the encoder and decoder are <b>linear</b> and the loss is <b>MSE</b>, it learns the <b>same subspace as PCA</b> (the k principal components, though not necessarily orthogonal axes). With non-linear activations it becomes a <b>non-linear generalisation of PCA</b>.</p>
<table>
<tr><th>Point</th><th>PCA</th><th>Autoencoder</th></tr>
<tr><td>Mapping</td><td>Linear</td><td>Linear or non-linear</td></tr>
<tr><td>Solution</td><td>Closed form (eigen-decomposition / SVD)</td><td>Iterative (backprop, gradient descent)</td></tr>
<tr><td>Components</td><td>Orthogonal, ordered by variance</td><td>Not necessarily orthogonal or ordered</td></tr>
<tr><td>Captures curved manifolds</td><td>No</td><td>Yes</td></tr>
<tr><td>Data needed</td><td>Works with little data</td><td>Needs more data</td></tr>
<tr><td>Compute</td><td>Fast</td><td>Slower, GPU helpful</td></tr>
<tr><td>Interpretability</td><td>High</td><td>Lower</td></tr>
<tr><td>Hyper-parameters</td><td>Only k</td><td>Layers, units, lr, epochs</td></tr>
<tr><td>Extensions</td><td>Kernel PCA</td><td>Denoising, sparse, VAE, convolutional</td></tr>
</table>
<p><b>Example:</b> on a "Swiss roll" (2-D sheet curled in 3-D), PCA squashes layers together, while a non-linear AE can unroll it into 2-D. On MNIST, a 2-D AE code separates digits far better than the first 2 PCs.</p>
<p><b>Conclusion:</b> use PCA for small, near-linear data; use an AE when structure is non-linear and data is plentiful.</p>`,
  hi: `<p><b>PCA</b> data ko un k orthogonal directions pe project karta hai jahan variance sabse zyada hai (covariance matrix ke eigenvectors). <b>Autoencoder</b> encoder f aur decoder g ko reconstruction error kam karke seekhta hai.</p>
<h4>Kab dono same?</h4>
<p>AE <b>undercomplete</b> ho, encoder-decoder <b>linear</b> hon aur loss <b>MSE</b> ho, toh AE wahi subspace seekhta hai jo PCA deta hai. Non-linear activations laga do toh AE <b>non-linear PCA</b> ban jaata hai, zyada powerful.</p>
<table>
<tr><th>Point</th><th>PCA</th><th>Autoencoder</th></tr>
<tr><td>Mapping</td><td>Sirf linear</td><td>Linear ya non-linear</td></tr>
<tr><td>Solution</td><td>Formula se (eigen / SVD)</td><td>Backprop se dheere-dheere</td></tr>
<tr><td>Components</td><td>Orthogonal, variance order mein</td><td>Zaroori nahi</td></tr>
<tr><td>Mude hue patterns</td><td>Nahi pakadta</td><td>Pakadta hai</td></tr>
<tr><td>Data</td><td>Kam data chalega</td><td>Zyada data chahiye</td></tr>
<tr><td>Speed</td><td>Fast</td><td>Slow, GPU</td></tr>
<tr><td>Samajhna</td><td>Aasaan</td><td>Mushkil</td></tr>
</table>
<h4>Desi example</h4>
<p>Ek lipti hui chatai (Swiss roll) socho. PCA usko upar se torch maar ke parchhai banata hai: saari parten ek-doosre pe chadh jaati hain. AE chatai ko khol ke zameen pe bichha deta hai, har point apni jagah pe. MNIST pe bhi 2-D AE code digits ko PCA ke 2 components se kaafi better alag karta hai.</p>
<p><b>Conclusion:</b> chhota, seedha (linear) data: PCA. Zyada data, tedha-medha structure: AE.</p>`,
  keys: ["PCA linear", "linear AE + MSE = PCA subspace", "non-linear generalisation", "eigen-decomposition vs backprop", "orthogonal components", "manifold"],
  draw: "Optional: Swiss-roll sketch: PCA projection overlapping vs AE unrolling.",
  fig: "unit5.html#q2",
  num: false
},
{
  id: "U5-18",
  unit: 5,
  topic: "Denoising vs contractive autoencoder",
  q: "Differentiate between denoising and contractive autoencoders.",
  alt: [
    "How does a contractive autoencoder differ from a denoising autoencoder?",
    "Compare sparse, denoising and contractive autoencoders."
  ],
  marks: [2, 4],
  priority: "med",
  prob: 35,
  diff: 3,
  pyq: [],
  why: "Comparison-style question RTU likes; derived from two named sub-topics.",
  short: "DAE gains robustness by reconstructing clean x from noisy x̃; CAE gains it analytically by penalising the encoder Jacobian ‖∂h/∂x‖², needing no noise.",
  en: `<p>Both are <b>regularized autoencoders</b> that learn features robust to small changes in the input, but by different routes.</p>
<ul>
<li><b>DAE:</b> <div class="formula">L = L(x, g(f(x̃))),  x̃ = noisy x</div></li>
<li><b>CAE:</b> <div class="formula">L = L(x, g(f(x))) + λ‖∂f(x)/∂x‖²<sub>F</sub></div></li>
</ul>
<table>
<tr><th>Point</th><th>Denoising AE</th><th>Contractive AE</th></tr>
<tr><td>How robustness is achieved</td><td>Empirically: corrupt input, reconstruct clean</td><td>Analytically: penalty on encoder Jacobian</td></tr>
<tr><td>What becomes robust</td><td>The whole reconstruction g(f(x))</td><td>The encoder / code h = f(x)</td></tr>
<tr><td>Noise needed?</td><td>Yes (Gaussian, masking)</td><td>No</td></tr>
<tr><td>Hyper-parameters</td><td>Noise type and level</td><td>λ</td></tr>
<tr><td>Computation</td><td>Cheap</td><td>Expensive (Jacobian)</td></tr>
<tr><td>Robust to</td><td>Large, specific corruptions</td><td>Infinitesimal (small) perturbations</td></tr>
<tr><td>Direct use</td><td>Image/audio denoising</td><td>Robust features for classifiers</td></tr>
</table>
<p><b>Link:</b> for small Gaussian noise, a DAE behaves similarly to a contractive penalty on the full reconstruction, so the two ideas are closely related.</p>
<p><b>Sparse AE</b> (for a three-way question): penalises activations (Σ|h|), giving few active units, rather than robustness.</p>
<p><b>Example:</b> a DAE removes scratches from photos; a CAE gives the same code for a digit shifted by one pixel.</p>
<p><b>Conclusion:</b> DAE = robustness by noise; CAE = robustness by derivative penalty.</p>`,
  hi: `<p>Dono <b>regularized AE</b> hain aur dono input ke chhote badlaav se na ghabrane wale features seekhte hain, bas raasta alag hai.</p>
<ul>
<li><b>DAE:</b> <div class="formula">L = L(x, g(f(x̃)))</div> ganda input, saaf target.</li>
<li><b>CAE:</b> <div class="formula">L = L(x, g(f(x))) + λ‖∂f(x)/∂x‖²<sub>F</sub></div> derivative pe saza.</li>
</ul>
<table>
<tr><th>Point</th><th>Denoising</th><th>Contractive</th></tr>
<tr><td>Robustness kaise</td><td>Practically: noise daal ke</td><td>Formula se: Jacobian penalty</td></tr>
<tr><td>Kya robust hota</td><td>Poora output g(f(x))</td><td>Sirf code h</td></tr>
<tr><td>Noise chahiye?</td><td>Haan</td><td>Nahi</td></tr>
<tr><td>Tune karna</td><td>Noise type/level</td><td>λ</td></tr>
<tr><td>Kharcha</td><td>Sasta</td><td>Mehnga</td></tr>
<tr><td>Kis cheez se robust</td><td>Badi specific corruption</td><td>Bahut chhote badlaav</td></tr>
<tr><td>Use</td><td>Photo/audio saaf karna</td><td>Classifier ke liye robust features</td></tr>
</table>
<p><b>Rishta:</b> chhote Gaussian noise ke saath DAE lagbhag contractive penalty jaisa hi behave karta hai.</p>
<p><b>Sparse AE</b> (teeno compare karne ho toh): activations pe penalty, kam neurons on; robustness nahi, specialisation.</p>
<h4>Desi example</h4>
<p>Cricket coach do tareeke se batsman ko strong banata hai. DAE coach: practice mein jaan-boojh ke geeli ball, kharab pitch deta hai (noise), taaki match mein kuch bhi aaye, khel sake. CAE coach: rule banata hai "chhoti si swing pe apna stance mat badlo" (derivative penalty). Dono ka result: stable batsman.</p>
<p><b>Conclusion:</b> DAE = noise se robustness; CAE = derivative penalty se robustness.</p>`,
  keys: ["noise vs Jacobian penalty", "L(x, g(f(x̃)))", "λ‖∂f/∂x‖²_F", "robust reconstruction vs robust code", "cheap vs expensive"],
  draw: "Two mini flows: DAE (x → +noise → AE → compare with x) and CAE (x → AE with λ‖J‖² on encoder).",
  fig: "unit5.html#q6",
  num: false
},
{
  id: "U5-19",
  unit: 5,
  topic: "Limitations of autoencoders",
  q: "What are the limitations of autoencoders?",
  alt: [
    "Discuss the advantages and disadvantages of autoencoders.",
    "Why might an autoencoder fail to learn useful features?"
  ],
  marks: [2, 4],
  priority: "med",
  prob: 30,
  diff: 2,
  pyq: [],
  why: "Common add-on to any AE question ('advantages/limitations'); rarely a standalone question.",
  short: "They may learn the identity, are data-specific and lossy, give blurry reconstructions, need tuning of code size/penalties, and their latent features are hard to interpret.",
  en: `<p>Autoencoders are powerful unsupervised learners, but they have important <b>limitations</b>.</p>
<h4>Limitations</h4>
<ul>
<li><b>Identity / memorisation:</b> with too large a code or too much capacity they copy the input and learn nothing useful (needs bottleneck or regularization).</li>
<li><b>Data-specific:</b> an AE trained on faces compresses faces well but not landscapes; it does not generalise like JPEG/MP3.</li>
<li><b>Lossy and blurry:</b> MSE averages possibilities, so reconstructions (and VAE samples) look blurry.</li>
<li><b>Hyper-parameter sensitive:</b> code size, depth, λ, noise level and sparsity target must be tuned.</li>
<li><b>Reconstruction ≠ usefulness:</b> a low reconstruction error does not guarantee features good for a downstream task.</li>
<li><b>Anomaly detection issues:</b> threshold choice is hard; a well-generalising AE may reconstruct anomalies too; training data must be clean.</li>
<li><b>Interpretability:</b> latent dimensions are usually not human-meaningful (unlike PCA components).</li>
<li><b>Compute and data:</b> need more data and training time than PCA.</li>
<li><b>Latent space gaps:</b> a plain AE's code space is irregular, so it cannot generate new data (fixed by VAE).</li>
</ul>
<h4>Advantages (for balance)</h4>
<ul><li>No labels needed; non-linear; flexible (denoising, anomaly detection, generation, pre-training).</li></ul>
<h4>Mitigations</h4>
<table>
<tr><th>Problem</th><th>Fix</th></tr>
<tr><td>Identity</td><td>Bottleneck, sparse/denoising/contractive</td></tr>
<tr><td>Blurry output</td><td>Perceptual loss, conv AEs, GANs</td></tr>
<tr><td>No generation</td><td>VAE</td></tr>
<tr><td>Threshold</td><td>Percentile on validation data</td></tr>
</table>
<p><b>Conclusion:</b> autoencoders work best with careful design, regularization and enough data from the target domain.</p>`,
  hi: `<p>AE kaafi powerful hain, par inki kuch <b>kamiyan</b> bhi hain.</p>
<h4>Limitations</h4>
<ul>
<li><b>Ratta / identity:</b> code bada ya capacity zyada ho toh seedha copy kar leta hai, kuch nahi seekhta.</li>
<li><b>Data-specific:</b> chehron pe train hua AE chehre achhe compress karega, pahaadon ki photo nahi. JPEG/MP3 jaisa general nahi.</li>
<li><b>Lossy aur dhundhla:</b> MSE average le leta hai, isliye output (aur VAE samples) blur dikhte hain.</li>
<li><b>Tuning ka jhanjhat:</b> code size, depth, λ, noise level, ρ sab set karne padte hain.</li>
<li><b>Achha copy ≠ achhe features:</b> reconstruction error kam hai iska matlab ye nahi ki features classification mein bhi achhe honge.</li>
<li><b>Anomaly detection mein:</b> threshold mushkil; kabhi anomaly ko bhi achha copy kar leta hai; training data saaf chahiye.</li>
<li><b>Samajhna mushkil:</b> latent numbers ka koi seedha matlab nahi hota.</li>
<li><b>Data aur compute:</b> PCA se zyada data aur time.</li>
<li><b>Latent space mein gaddhe:</b> normal AE se naya data nahi banta (VAE chahiye).</li>
</ul>
<h4>Fayde bhi</h4>
<ul><li>Labels nahi chahiye, non-linear, kai kaam (denoising, anomaly, generation, pre-training).</li></ul>
<h4>Ilaaj</h4>
<table>
<tr><th>Problem</th><th>Fix</th></tr>
<tr><td>Identity</td><td>Bottleneck ya penalty</td></tr>
<tr><td>Blur</td><td>Conv AE, perceptual loss, GAN</td></tr>
<tr><td>Generation nahi</td><td>VAE</td></tr>
<tr><td>Threshold</td><td>Validation ka percentile</td></tr>
</table>
<h4>Desi example</h4>
<p>Ek darzi jo sirf kurte silta aaya hai, uska naap ka "shortcut" kurte ke liye perfect hai, par usse lehenga silwaoge toh gadbad (data-specific). Aur agar woh har kapde ki hubahu photocopy kare toh kuch naya nahi seekhta (identity).</p>
<p><b>Conclusion:</b> sahi design, regularization aur domain ka kaafi data ho tabhi AE best kaam karta hai.</p>`,
  keys: ["identity / memorisation", "data-specific", "lossy, blurry", "hyper-parameter tuning", "threshold problem", "poor interpretability", "irregular latent space"],
  draw: "",
  fig: "",
  num: false
},
{
  id: "U5-20",
  unit: 5,
  topic: "Convolutional autoencoder",
  q: "Explain the convolutional autoencoder briefly.",
  alt: [
    "Why are convolutional autoencoders preferred for images?",
    "How is a decoder built using transposed convolution / upsampling?"
  ],
  marks: [2, 4],
  priority: "med",
  prob: 30,
  diff: 3,
  pyq: [],
  why: "Bridges Unit 3 (CNNs) and Unit 5; could appear as a Part A or within image-denoising answers.",
  short: "An autoencoder whose encoder uses convolution + pooling and whose decoder uses upsampling / transposed convolution, preserving spatial structure of images with far fewer parameters.",
  en: `<p><b>Definition:</b> A <b>convolutional autoencoder (CAE/ConvAE)</b> replaces dense layers with <b>convolutional layers</b>: the encoder downsamples an image into a compact feature map and the decoder upsamples it back to the original size.</p>
<h4>Architecture (MNIST example)</h4>
<table>
<tr><th>Stage</th><th>Layer</th><th>Output shape</th></tr>
<tr><td>Input</td><td>Image</td><td>28×28×1</td></tr>
<tr><td>Encoder</td><td>Conv 3×3, 16 filters, ReLU + MaxPool 2×2</td><td>14×14×16</td></tr>
<tr><td>Encoder</td><td>Conv 3×3, 8 filters, ReLU + MaxPool 2×2</td><td>7×7×8 (code, 392 values)</td></tr>
<tr><td>Decoder</td><td>Transposed conv / UpSampling 2×2 + Conv 16</td><td>14×14×16</td></tr>
<tr><td>Decoder</td><td>Transposed conv / UpSampling 2×2 + Conv 1, sigmoid</td><td>28×28×1</td></tr>
</table>
<h4>Why for images</h4>
<ul>
<li>Preserves <b>spatial structure</b> (neighbouring pixels) instead of flattening.</li>
<li><b>Parameter sharing</b> and local connectivity: far fewer weights than a dense AE.</li>
<li>Learns edges, textures, parts hierarchically; sharper reconstructions.</li>
</ul>
<h4>Training</h4>
<p>Same as any AE: minimise ‖x − r‖² or BCE with Adam, input = target.</p>
<h4>Applications</h4>
<p>Image denoising (convolutional DAE), image compression, medical image anomaly detection, colourisation, super-resolution, segmentation-style encoder–decoders (U-Net).</p>
<p><b>Conclusion:</b> a ConvAE is the image-friendly autoencoder: conv/pool to encode, upsample/transposed-conv to decode.</p>`,
  hi: `<p><b>Definition:</b> <b>Convolutional AE</b> mein dense layers ki jagah <b>conv layers</b> hoti hain. Encoder image ko chhota feature map banata hai (conv + pooling), decoder usko wapas bada karta hai (upsampling / transposed conv).</p>
<h4>Architecture (MNIST)</h4>
<table>
<tr><th>Stage</th><th>Layer</th><th>Shape</th></tr>
<tr><td>Input</td><td>Image</td><td>28×28×1</td></tr>
<tr><td>Encoder</td><td>Conv 16 filters + MaxPool</td><td>14×14×16</td></tr>
<tr><td>Encoder</td><td>Conv 8 filters + MaxPool</td><td>7×7×8 (code, 392 values)</td></tr>
<tr><td>Decoder</td><td>UpSampling / transposed conv + Conv 16</td><td>14×14×16</td></tr>
<tr><td>Decoder</td><td>UpSampling + Conv 1, sigmoid</td><td>28×28×1</td></tr>
</table>
<h4>Images ke liye kyun</h4>
<ul>
<li>Image ko flatten nahi karta, pixels ka <b>pados (spatial structure)</b> bacha rehta hai.</li>
<li><b>Parameter sharing</b>: dense AE se bahut kam weights.</li>
<li>Edges, textures, parts step-by-step seekhta hai; output zyada sharp.</li>
</ul>
<h4>Training</h4>
<p>Normal AE jaisa: ‖x − r‖² ya BCE, Adam, input = target.</p>
<h4>Desi example</h4>
<p>Rangoli ki photo ko line-by-line ek lambi list mein tod doge (dense AE) toh pattern ka sense kho jaata hai. Conv AE chhote-chhote 3×3 tukdon mein pattern dekhta hai, isliye design samajh ke wapas sundar rangoli bana deta hai.</p>
<h4>Applications</h4>
<p>Photo denoising, compression, medical image anomaly, black-and-white photo colour karna, super-resolution, U-Net jaise encoder–decoder.</p>
<p><b>Conclusion:</b> ConvAE = images wala AE: conv/pool se encode, upsample/transposed conv se decode.</p>`,
  keys: ["convolution + pooling encoder", "upsampling / transposed convolution decoder", "spatial structure", "parameter sharing", "fewer parameters", "image denoising"],
  draw: "Funnel of shrinking feature maps 28×28 → 14×14 → 7×7 then growing 14×14 → 28×28.",
  fig: "",
  num: false
},
{
  id: "U5-21",
  unit: 5,
  topic: "Feature learning and pre-training",
  q: "How are autoencoders used for unsupervised feature learning and pre-training of deep networks?",
  alt: [
    "Explain stacked autoencoders and greedy layer-wise pre-training.",
    "How can an autoencoder be used as an example of unsupervised training of a neural network?"
  ],
  marks: [4, 10],
  priority: "med",
  prob: 30,
  diff: 3,
  pyq: ["8AID 2025 C2", "7CAI 2025 B7"],
  why: "Autoencoders are a standard example for 'how an unsupervised NN is trained' (8AID 2025 C2, 7CAI 2025 B7); stacked pre-training is a derived topic.",
  short: "Train autoencoders on unlabelled data, keep the encoders as feature extractors, stack them layer by layer, then fine-tune the whole network with a small labelled set.",
  en: `<p><b>Idea:</b> labelled data is scarce but unlabelled data is plentiful. An autoencoder learns useful features from <b>unlabelled</b> data; its encoder can then initialise or feed a supervised model.</p>
<h4>1. Feature learning</h4>
<ul><li>Train an AE (often denoising or sparse) on X → X.</li><li>Use h = f(x) as input features for a classifier, SVM or clustering.</li></ul>
<h4>2. Stacked autoencoder + greedy layer-wise pre-training</h4>
<ol>
<li>Train AE-1 on x; keep its encoder → features h<sub>1</sub>.</li>
<li>Train AE-2 on h<sub>1</sub>; keep its encoder → h<sub>2</sub>.</li>
<li>Repeat for more layers (each trained one at a time, "greedy").</li>
<li>Stack all encoders, add an output (softmax) layer.</li>
<li><b>Fine-tune</b> the whole network with backpropagation on the small labelled set.</li>
</ol>
<h4>3. Why it helps</h4>
<ul>
<li>Weights start in a good region instead of random → faster convergence, better generalisation.</li>
<li>Historically (2006–2010, Hinton, Bengio) it made deep networks trainable before ReLU, batch-norm and good initialisation.</li>
<li>Acts as a regularizer when labels are few.</li>
</ul>
<h4>4. Example</h4>
<p>A hospital has 1 lakh unlabelled X-rays and only 2,000 labelled ones. A convolutional DAE is trained on all 1 lakh images; its encoder is then fine-tuned with the 2,000 labels for pneumonia detection, giving higher accuracy than training from scratch.</p>
<h4>5. Today</h4>
<p>Largely replaced by better initialisation and self-supervised methods, but masked autoencoders (MAE for vision, BERT's masked-language model) are modern descendants of the same idea.</p>
<p><b>Advantages:</b> uses unlabelled data, better initialisation. <b>Limitations:</b> extra training stages; features may not be optimal for the final task.</p>
<p><b>Conclusion:</b> autoencoders turn unlabelled data into a head start for supervised deep networks.</p>`,
  hi: `<p><b>Idea:</b> labelled data kam aur mehnga hota hai, unlabelled data bahut. AE bina label ke data se achhe features seekh leta hai; phir uska encoder supervised model ki shuruaat ban jaata hai.</p>
<h4>1. Feature learning</h4>
<ul><li>AE ko X → X pe train karo (aksar denoising/sparse).</li><li>h = f(x) ko classifier/SVM/clustering ka input bana do.</li></ul>
<h4>2. Stacked AE + greedy layer-wise pre-training</h4>
<ol>
<li>AE-1 ko x pe train karo, encoder rakho → h<sub>1</sub>.</li>
<li>AE-2 ko h<sub>1</sub> pe train karo → h<sub>2</sub>.</li>
<li>Aise ek-ek layer train karte jao ("greedy").</li>
<li>Saare encoders jod do, upar softmax layer lagao.</li>
<li>Labelled data se poore network ko <b>fine-tune</b> karo.</li>
</ol>
<h4>3. Fayda kyun</h4>
<ul>
<li>Weights random ki jagah achhi jagah se shuru → jaldi converge, better generalisation.</li>
<li>2006–2010 mein (Hinton, Bengio) isi se deep networks train ho paaye, ReLU/batch-norm se pehle.</li>
<li>Labels kam hon toh regularizer jaisa kaam.</li>
</ul>
<h4>4. Desi example</h4>
<p>Hospital ke paas 1 lakh X-rays bina label ke, sirf 2,000 doctor ne label kiye. Pehle saari 1 lakh pe AE train karo (X-ray "kaisa dikhta hai" seekh liya), phir 2,000 labels se pneumonia detection fine-tune. Jaise naya doctor pehle hazaaron reports dekh ke aankh banata hai, phir senior thode cases pe sikhata hai.</p>
<h4>5. Aaj kal</h4>
<p>Ab achhi initialisation aur self-supervised learning aa gayi, par masked autoencoders (vision MAE, BERT) isi idea ke naye roop hain.</p>
<p><b>Fayde:</b> unlabelled data ka use, achhi shuruaat. <b>Nuksaan:</b> extra training stages; features final task ke liye best ho zaroori nahi.</p>
<p><b>Conclusion:</b> AE unlabelled data ko supervised network ke liye "head start" bana deta hai.</p>`,
  keys: ["unlabelled data", "feature extraction h = f(x)", "stacked autoencoder", "greedy layer-wise pre-training", "fine-tuning", "better initialisation"],
  draw: "Stack: AE-1 (x→h1), AE-2 (h1→h2), then stacked encoders + softmax being fine-tuned.",
  fig: "",
  num: false
},
{
  id: "U5-22",
  unit: 5,
  topic: "Designing an autoencoder for dimensionality reduction",
  q: "An autoencoder has the architecture 100 → 50 → 10 → 50 → 100 (fully connected, with biases). Find the number of trainable parameters and the compression ratio.",
  alt: [
    "Calculate the parameters of the encoder and decoder of a given autoencoder.",
    "What is the compression ratio of an autoencoder?"
  ],
  marks: [2, 4],
  priority: "low",
  prob: 25,
  diff: 2,
  pyq: ["8AID 2025 B7"],
  why: "Numerical extension of the 'design an AE' question (8AID 2025 B7); simple counting only.",
  short: "Params per dense layer = in×out + out; total = 5050 + 510 + 550 + 5100 = 11,210; compression ratio = 100/10 = 10.",
  en: `<p><b>Rule:</b> a fully connected layer with n<sub>in</sub> inputs and n<sub>out</sub> outputs has</p>
<div class="formula">parameters = n<sub>in</sub> × n<sub>out</sub> + n<sub>out</sub>  (weights + biases)</div>
<h4>Solution</h4>
<table>
<tr><th>Layer</th><th>Part</th><th>Calculation</th><th>Parameters</th></tr>
<tr><td>100 → 50</td><td>Encoder</td><td>100×50 + 50</td><td>5,050</td></tr>
<tr><td>50 → 10</td><td>Encoder (code)</td><td>50×10 + 10</td><td>510</td></tr>
<tr><td>10 → 50</td><td>Decoder</td><td>10×50 + 50</td><td>550</td></tr>
<tr><td>50 → 100</td><td>Decoder (output)</td><td>50×100 + 100</td><td>5,100</td></tr>
<tr><td colspan="3"><b>Total</b></td><td><b>11,210</b></td></tr>
</table>
<ul>
<li>Encoder parameters = 5,050 + 510 = <b>5,560</b>.</li>
<li>Decoder parameters = 550 + 5,100 = <b>5,650</b>.</li>
<li><b>Compression ratio</b> = input dim / code dim = 100 / 10 = <b>10 : 1</b>.</li>
</ul>
<h4>Note on tied weights</h4>
<p>If the decoder uses W<sup>T</sup> of the encoder (tied weights), only biases are new in the decoder: 50 + 100 = 150, so total = 5,560 + 150 = <b>5,710</b>.</p>
<p><b>Conclusion:</b> total 11,210 parameters; the 10-unit code compresses the data 10 times.</p>`,
  hi: `<p><b>Rule:</b> dense layer ke parameters = (inputs × outputs) + outputs. Pehla hissa weights, doosra bias (har output neuron ka ek).</p>
<div class="formula">parameters = n<sub>in</sub> × n<sub>out</sub> + n<sub>out</sub></div>
<h4>Solution step by step</h4>
<table>
<tr><th>Layer</th><th>Part</th><th>Hisaab</th><th>Parameters</th></tr>
<tr><td>100 → 50</td><td>Encoder</td><td>100×50 + 50</td><td>5,050</td></tr>
<tr><td>50 → 10</td><td>Code</td><td>50×10 + 10</td><td>510</td></tr>
<tr><td>10 → 50</td><td>Decoder</td><td>10×50 + 50</td><td>550</td></tr>
<tr><td>50 → 100</td><td>Output</td><td>50×100 + 100</td><td>5,100</td></tr>
<tr><td colspan="3"><b>Total</b></td><td><b>11,210</b></td></tr>
</table>
<ul>
<li>Encoder = 5,050 + 510 = <b>5,560</b>.</li>
<li>Decoder = 550 + 5,100 = <b>5,650</b>.</li>
<li><b>Compression ratio</b> = 100 / 10 = <b>10 : 1</b>, yaani data 10 guna chhota.</li>
</ul>
<h4>Tied weights (bonus)</h4>
<p>Agar decoder encoder ka hi W<sup>T</sup> use kare, toh decoder mein sirf bias naye: 50 + 100 = 150. Total = 5,560 + 150 = <b>5,710</b>.</p>
<p><b>Desi trick:</b> har layer ko "kitne taar (weights) + har bulb ka ek switch (bias)" socho. 100 bulb se 50 bulb tak har ek ko joda toh 5,000 taar, aur 50 switch: 5,050.</p>
<p><b>Conclusion:</b> total 11,210 parameters, compression 10 guna.</p>`,
  keys: ["in×out + out", "encoder 5,560", "decoder 5,650", "total 11,210", "compression ratio 10:1", "tied weights"],
  draw: "Hourglass labelled 100–50–10–50–100 with parameter counts on each arrow.",
  fig: "unit5.html#q4",
  num: true
},
{
  id: "U5-23",
  unit: 5,
  topic: "Anomaly detection with autoencoders",
  q: "Numerical: An autoencoder trained on normal data has validation reconstruction errors with mean 0.01 and standard deviation 0.005. For x1 = [0.5, 0.8, 0.2, 0.6] the output is [0.4, 0.8, 0.3, 0.6]; for x2 = [0.9, 0.1, 0.7, 0.3] the output is [0.5, 0.4, 0.6, 0.7]. Using MSE and threshold μ + 3σ, classify each sample.",
  alt: [
    "Compute the reconstruction error of a sample and decide whether it is an anomaly.",
    "How is the anomaly threshold chosen? Illustrate with numbers."
  ],
  marks: [4],
  priority: "low",
  prob: 25,
  diff: 2,
  pyq: ["8AID 2025 C5"],
  why: "Numerical form of the anomaly-detection part of 8AID 2025 C5; easy marks if it comes.",
  short: "Threshold = 0.01 + 3(0.005) = 0.025; MSE(x1) = 0.005 (normal), MSE(x2) = 0.105 (anomaly).",
  en: `<p><b>Formulae:</b></p>
<div class="formula">MSE = (1/n) Σ<sub>i</sub> (x<sub>i</sub> − r<sub>i</sub>)²,    T = μ + 3σ</div>
<h4>Step 1: threshold</h4>
<p>T = 0.01 + 3 × 0.005 = 0.01 + 0.015 = <b>0.025</b></p>
<h4>Step 2: sample x1</h4>
<table>
<tr><th>i</th><th>x</th><th>r</th><th>x − r</th><th>(x − r)²</th></tr>
<tr><td>1</td><td>0.5</td><td>0.4</td><td>0.1</td><td>0.01</td></tr>
<tr><td>2</td><td>0.8</td><td>0.8</td><td>0</td><td>0</td></tr>
<tr><td>3</td><td>0.2</td><td>0.3</td><td>−0.1</td><td>0.01</td></tr>
<tr><td>4</td><td>0.6</td><td>0.6</td><td>0</td><td>0</td></tr>
</table>
<p>MSE = 0.02 / 4 = <b>0.005</b> &lt; 0.025 → <b>Normal</b>.</p>
<h4>Step 3: sample x2</h4>
<table>
<tr><th>i</th><th>x</th><th>r</th><th>x − r</th><th>(x − r)²</th></tr>
<tr><td>1</td><td>0.9</td><td>0.5</td><td>0.4</td><td>0.16</td></tr>
<tr><td>2</td><td>0.1</td><td>0.4</td><td>−0.3</td><td>0.09</td></tr>
<tr><td>3</td><td>0.7</td><td>0.6</td><td>0.1</td><td>0.01</td></tr>
<tr><td>4</td><td>0.3</td><td>0.7</td><td>−0.4</td><td>0.16</td></tr>
</table>
<p>MSE = 0.42 / 4 = <b>0.105</b> &gt; 0.025 → <b>Anomaly</b>.</p>
<h4>Interpretation</h4>
<p>x2's error is about 4× the threshold: the AE, having seen only normal patterns, cannot rebuild it. Features 1 and 4 contribute most, pointing to where the abnormality lies.</p>
<p><b>Conclusion:</b> x1 is normal (0.005), x2 is an anomaly (0.105) against threshold 0.025.</p>`,
  hi: `<p><b>Formula:</b></p>
<div class="formula">MSE = (1/n) Σ (x<sub>i</sub> − r<sub>i</sub>)²,    T = μ + 3σ</div>
<h4>Step 1: threshold</h4>
<p>T = 0.01 + 3 × 0.005 = <b>0.025</b>. Yeh "normal ki hadd" hai.</p>
<h4>Step 2: x1</h4>
<table>
<tr><th>i</th><th>x</th><th>r</th><th>x − r</th><th>square</th></tr>
<tr><td>1</td><td>0.5</td><td>0.4</td><td>0.1</td><td>0.01</td></tr>
<tr><td>2</td><td>0.8</td><td>0.8</td><td>0</td><td>0</td></tr>
<tr><td>3</td><td>0.2</td><td>0.3</td><td>−0.1</td><td>0.01</td></tr>
<tr><td>4</td><td>0.6</td><td>0.6</td><td>0</td><td>0</td></tr>
</table>
<p>MSE = 0.02 / 4 = <b>0.005</b>, jo 0.025 se kam → <b>Normal</b>.</p>
<h4>Step 3: x2</h4>
<table>
<tr><th>i</th><th>x</th><th>r</th><th>x − r</th><th>square</th></tr>
<tr><td>1</td><td>0.9</td><td>0.5</td><td>0.4</td><td>0.16</td></tr>
<tr><td>2</td><td>0.1</td><td>0.4</td><td>−0.3</td><td>0.09</td></tr>
<tr><td>3</td><td>0.7</td><td>0.6</td><td>0.1</td><td>0.01</td></tr>
<tr><td>4</td><td>0.3</td><td>0.7</td><td>−0.4</td><td>0.16</td></tr>
</table>
<p>MSE = 0.42 / 4 = <b>0.105</b>, jo 0.025 se zyada → <b>Anomaly</b>.</p>
<h4>Matlab</h4>
<p>x2 ka error threshold ka lagbhag 4 guna hai: AE ne aisa pattern kabhi dekha hi nahi. Feature 1 aur 4 ka error sabse zyada, toh gadbad wahin hai.</p>
<p><b>Desi trick:</b> jaise thermometer: normal body temp 98.6 ± thoda. 103 aaya toh "bukhaar" (anomaly). Yahan threshold 0.025 hai, x2 ka "bukhaar" 0.105.</p>
<p><b>Conclusion:</b> x1 normal (0.005), x2 anomaly (0.105), threshold 0.025.</p>`,
  keys: ["MSE = (1/n) Σ (x − r)²", "threshold μ + 3σ = 0.025", "x1 MSE 0.005 normal", "x2 MSE 0.105 anomaly"],
  draw: "Error number line with T = 0.025 marked, x1 at 0.005 (left) and x2 at 0.105 (right).",
  fig: "unit5.html#q1",
  num: true
},
{
  id: "U5-24",
  unit: 5,
  topic: "Autoencoders in recommendation systems",
  q: "How are autoencoders used in recommendation systems?",
  alt: [
    "Explain AutoRec / collaborative filtering with autoencoders."
  ],
  marks: [2, 4],
  priority: "low",
  prob: 20,
  diff: 3,
  pyq: [],
  why: "Listed among AE applications; unlikely alone but can be an 'explain any one application' choice.",
  short: "The AE reconstructs a sparse user–item rating vector from its observed entries; predicted values for unrated items are used as recommendations (e.g. AutoRec).",
  en: `<p><b>Idea:</b> each user (or item) is a long, mostly empty <b>rating vector</b>. An autoencoder learns to reconstruct it; the reconstructed values at the empty positions are the <b>predicted ratings</b>.</p>
<h4>Working (AutoRec style)</h4>
<ol>
<li><b>Input:</b> user u's rating vector r<sub>u</sub> ∈ R<sup>n</sup> (n items; unknown entries set to 0).</li>
<li><b>Encoder:</b> h = σ(W r<sub>u</sub> + b) compresses tastes into a small latent vector (e.g. "likes action, dislikes horror").</li>
<li><b>Decoder:</b> r̂<sub>u</sub> = g(W′ h + b′) outputs a full rating vector.</li>
<li><b>Loss only on observed ratings:</b> <div class="formula">L = Σ<sub>observed (u,i)</sub> (r<sub>ui</sub> − r̂<sub>ui</sub>)² + λ‖W‖²</div></li>
<li><b>Recommend:</b> rank the unrated items by r̂<sub>ui</sub> and show the top-k.</li>
</ol>
<h4>Variants</h4>
<ul><li>Denoising AE (randomly drop known ratings during training) for robustness.</li><li>VAE-based collaborative filtering (Mult-VAE) for implicit feedback (clicks, views).</li></ul>
<h4>Example</h4>
<p>On a movie app a user rated 5 of 5,000 films. The AE fills in all 5,000; the top predicted unrated films become "Recommended for you".</p>
<p><b>Advantages:</b> captures non-linear user–item patterns, handles sparsity. <b>Limitations:</b> cold start for brand-new users, needs a lot of interaction data.</p>
<p><b>Conclusion:</b> reconstruction of missing ratings turns an autoencoder into a collaborative-filtering recommender.</p>`,
  hi: `<p><b>Idea:</b> har user ka ek lamba <b>rating vector</b> hota hai jisme zyada tar khaali jagah hoti hai (movies jo dekhi nahi). AE isko reconstruct karna seekhta hai; khaali jagah pe jo number aata hai wahi <b>predicted rating</b> hai.</p>
<h4>Kaam kaise (AutoRec)</h4>
<ol>
<li><b>Input:</b> user ka rating vector (n movies, unknown = 0).</li>
<li><b>Encoder:</b> chhota latent vector h, jaise "action pasand, horror nahi".</li>
<li><b>Decoder:</b> poora rating vector r̂ wapas.</li>
<li><b>Loss sirf jo ratings pata hain un pe:</b> <div class="formula">L = Σ<sub>observed</sub> (r<sub>ui</sub> − r̂<sub>ui</sub>)² + λ‖W‖²</div></li>
<li><b>Recommend:</b> jo movies nahi dekhi, unko r̂ ke hisaab se sort karo, top-k dikhao.</li>
</ol>
<h4>Variants</h4>
<ul><li>Denoising AE: training mein kuch known ratings chhupa do, robust banega.</li><li>VAE-based (Mult-VAE): clicks/views jaise implicit data ke liye.</li></ul>
<h4>Desi example</h4>
<p>Hotstar pe tumne 5000 mein se sirf 5 movies rate ki: "3 Idiots" 5 star, "Dangal" 5 star. AE samajh jaata hai tumhe Aamir/feel-good drama pasand hai, aur "Taare Zameen Par" ka predicted rating 4.8 deta hai. Wahi "Recommended for you" mein aati hai. Jaise padosan aunty tumhari pasand jaan ke naye serial suggest karti hain.</p>
<p><b>Fayde:</b> non-linear pasand-napasand pakadta hai, sparse data chalega. <b>Nuksaan:</b> naye user ka cold start, bahut interaction data chahiye.</p>
<p><b>Conclusion:</b> missing ratings ko reconstruct karke AE ek recommender ban jaata hai.</p>`,
  keys: ["user–item rating vector", "reconstruct missing ratings", "loss on observed entries only", "AutoRec", "collaborative filtering", "top-k recommendation"],
  draw: "Sparse rating vector → encoder → latent tastes → decoder → full predicted vector with new values highlighted.",
  fig: "",
  num: false
},
{
  id: "U5-25",
  unit: 5,
  topic: "Autoencoders for data compression",
  q: "How can autoencoders be used for data compression? How do they differ from standard compression methods like JPEG?",
  alt: [
    "Explain image compression using autoencoders."
  ],
  marks: [2, 4],
  priority: "low",
  prob: 20,
  diff: 2,
  pyq: [],
  why: "Named application; usually appears only as one line inside an applications answer.",
  short: "The encoder maps data to a small code that is stored or transmitted, and the decoder reconstructs it; compression is learned, lossy and specific to the training data.",
  en: `<p><b>Idea:</b> the <b>encoder</b> acts as a compressor and the <b>decoder</b> as a decompressor. Only the small code h is stored or sent.</p>
<h4>Steps</h4>
<ol>
<li>Train an undercomplete (usually convolutional) AE on images of the target domain.</li>
<li><b>Sender:</b> h = f(x), optionally quantise h to fewer bits, and transmit/store it.</li>
<li><b>Receiver:</b> r = g(h) reconstructs the image.</li>
<li>Trade-off: smaller code = higher compression ratio = more distortion (rate–distortion trade-off).</li>
</ol>
<div class="formula">Compression ratio = size of x / size of h   (e.g. 784 / 32 ≈ 24.5)</div>
<h4>AE vs JPEG</h4>
<table>
<tr><th>Point</th><th>Autoencoder</th><th>JPEG / standard codec</th></tr>
<tr><td>Design</td><td>Learned from data</td><td>Hand-designed (DCT + quantisation)</td></tr>
<tr><td>Generality</td><td>Data-specific (works on what it was trained on)</td><td>Works on any image</td></tr>
<tr><td>Loss</td><td>Lossy</td><td>Lossy (JPEG) / lossless (PNG, ZIP)</td></tr>
<tr><td>Quality at very low bit-rate</td><td>Can be better (keeps semantic content)</td><td>Blocky artefacts</td></tr>
<tr><td>Cost</td><td>Needs a neural network to decode</td><td>Very fast, everywhere</td></tr>
</table>
<p><b>Example:</b> a satellite sends 32-number codes of cloud images instead of full images, saving bandwidth; the ground station decodes them. Modern learned codecs build on this.</p>
<p><b>Conclusion:</b> autoencoders give learned, domain-specific lossy compression, strongest where bandwidth is tight and data is homogeneous.</p>`,
  hi: `<p><b>Idea:</b> <b>encoder</b> = compressor, <b>decoder</b> = decompressor. Sirf chhota code h save ya send hota hai.</p>
<h4>Steps</h4>
<ol>
<li>Usi type ke data (jaise chehre, satellite images) pe undercomplete (aksar convolutional) AE train karo.</li>
<li><b>Bhejne wala:</b> h = f(x), chaaho toh kam bits mein round karo, phir bhejo.</li>
<li><b>Lene wala:</b> r = g(h) se image wapas.</li>
<li>Code jitna chhota, compression utna zyada, par quality utni kam (rate–distortion trade-off).</li>
</ol>
<div class="formula">Compression ratio = x ka size / h ka size  (jaise 784 / 32 ≈ 24.5)</div>
<h4>AE vs JPEG</h4>
<table>
<tr><th>Point</th><th>Autoencoder</th><th>JPEG</th></tr>
<tr><td>Kaise bana</td><td>Data se seekha</td><td>Insaan ne design kiya (DCT)</td></tr>
<tr><td>Kis pe chalega</td><td>Sirf jis type pe train hua</td><td>Har image pe</td></tr>
<tr><td>Loss</td><td>Lossy</td><td>Lossy (JPEG) / lossless (PNG, ZIP)</td></tr>
<tr><td>Bahut kam bits pe</td><td>Matlab bacha leta hai</td><td>Dabbe-dabbe (blocky) dikhne lagta</td></tr>
<tr><td>Speed</td><td>Neural network chahiye</td><td>Bahut fast, har jagah</td></tr>
</table>
<h4>Desi example</h4>
<p>Telegram ke zamane mein lambi baat ko chhote code words mein bhejte the ("PAHUNCH GAYA SAKUSHAL"), aur samne wala poori baat samajh leta tha kyunki dono ko context pata tha. AE bhi aisa hi: sender aur receiver dono ne same type ka data dekha hai, isliye 32 numbers se poori image ban jaati hai. Satellite bhi badal ki poori photo ki jagah 32 numbers bhej ke bandwidth bachata hai.</p>
<p><b>Conclusion:</b> AE = seekha hua, domain-specific lossy compression; jahan bandwidth kam aur data ek jaisa ho wahan best.</p>`,
  keys: ["encoder = compressor", "decoder = decompressor", "compression ratio", "lossy", "data-specific", "rate–distortion trade-off"],
  draw: "Sender: x → encoder → small code h → channel → receiver: decoder → r.",
  fig: "unit5.html#q4",
  num: false
}
);
