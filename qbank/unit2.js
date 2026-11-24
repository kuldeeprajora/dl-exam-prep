window.QB = window.QB || [];
window.QB.push(
{
  id: "U2-01",
  unit: 2,
  topic: "Activation functions",
  q: "What are activation functions? Explain the popular activation functions (sigmoid, tanh, ReLU, Leaky ReLU, ELU, PReLU, softmax) with their formulas, graphs, advantages and limitations.",
  alt: [
    "Explain any two activation functions.",
    "What are the popular activation functions used in neural networks?",
    "Why is a non-linear activation function needed in a neural network?",
    "Compare sigmoid, tanh and ReLU activation functions."
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 92,
  diff: 3,
  pyq: ["8AID 2025 A3", "8AID 2024 A5", "8AID 2025 B3", "7CAI 2025 A2"],
  why: "Asked in all 3 papers (A3 2025, A5 2024, LReLU in 7CAI); named syllabus sub-topic with a long list of functions.",
  short: "An activation function adds non-linearity to a neuron's output, e.g. Sigmoid σ(z)=1/(1+e^−z) gives (0,1); ReLU f(z)=max(0,z) is fast and avoids vanishing gradients.",
  en: `<p><b>Activation function:</b> a function f applied to the weighted sum of a neuron, a = f(z) where z = Σ wᵢxᵢ + b. It decides how strongly the neuron "fires" and, most importantly, adds <b>non-linearity</b>. Without it, any stack of layers collapses into one linear layer (W₂(W₁x) = Wx), so the network could only learn straight-line boundaries.</p>
<h4>Desirable properties</h4>
<ul>
<li>Non-linear, differentiable (almost everywhere) so backprop works.</li>
<li>Non-saturating gradient (avoids vanishing gradients).</li>
<li>Zero-centred output (faster convergence), cheap to compute.</li>
</ul>
<h4>Popular activation functions</h4>
<table>
<tr><th>Function</th><th>Formula</th><th>Range</th><th>Derivative</th><th>Notes</th></tr>
<tr><td>Sigmoid</td><td>σ(z) = 1/(1+e<sup>−z</sup>)</td><td>(0, 1)</td><td>σ(1−σ), max 0.25</td><td>Probability output; saturates, not zero-centred</td></tr>
<tr><td>Tanh</td><td>(e<sup>z</sup>−e<sup>−z</sup>)/(e<sup>z</sup>+e<sup>−z</sup>)</td><td>(−1, 1)</td><td>1 − tanh², max 1</td><td>Zero-centred; still saturates</td></tr>
<tr><td>ReLU</td><td>max(0, z)</td><td>[0, ∞)</td><td>1 if z&gt;0, else 0</td><td>Fast, sparse, no saturation for z&gt;0; "dying ReLU"</td></tr>
<tr><td>Leaky ReLU</td><td>z if z&gt;0, αz otherwise (α≈0.01)</td><td>(−∞, ∞)</td><td>1 or α</td><td>Fixes dying ReLU</td></tr>
<tr><td>PReLU</td><td>same as LReLU, α is <b>learned</b></td><td>(−∞, ∞)</td><td>1 or α</td><td>Adapts slope per channel</td></tr>
<tr><td>ELU</td><td>z if z&gt;0, α(e<sup>z</sup>−1) otherwise</td><td>(−α, ∞)</td><td>1 or f(z)+α</td><td>Smooth, mean near 0; costlier (exp)</td></tr>
<tr><td>Softmax</td><td>e<sup>zᵢ</sup> / Σⱼ e<sup>zⱼ</sup></td><td>(0,1), sums to 1</td><td>pᵢ(δᵢⱼ − pⱼ)</td><td>Multi-class output layer</td></tr>
</table>
<h4>Working (one neuron)</h4>
<ol>
<li>Compute z = w·x + b, e.g. z = −2.</li>
<li>Apply f: sigmoid gives 0.119, tanh gives −0.964, ReLU gives 0, Leaky ReLU gives −0.02, ELU (α=1) gives −0.865.</li>
<li>During backprop the gradient is multiplied by f′(z): ReLU passes 0 here (neuron silent), Leaky ReLU passes 0.01.</li>
</ol>
<h4>Where to use</h4>
<ul>
<li><b>Hidden layers:</b> ReLU by default; Leaky ReLU / PReLU / ELU if many neurons die.</li>
<li><b>Output layer:</b> sigmoid for binary classification, softmax for multi-class, linear (identity) for regression.</li>
<li><b>RNN/LSTM gates:</b> sigmoid for gates, tanh for cell candidate.</li>
</ul>
<h4>Example</h4>
<p>Image classifier for 10 digits (MNIST): hidden layers use ReLU, output layer uses softmax to give 10 class probabilities.</p>
<h4>Limitations</h4>
<ul>
<li>Sigmoid/tanh: vanishing gradient in deep nets, exp is costly.</li>
<li>ReLU: dead neurons, unbounded output.</li>
</ul>
<p><b>Conclusion:</b> activation functions give a neural network its non-linear power; the choice (ReLU family inside, sigmoid/softmax at output) strongly affects training speed and accuracy.</p>`,
  hi: `<p><b>Activation function</b> woh function hai jo neuron ke weighted sum z = Σ wᵢxᵢ + b par lagta hai: a = f(z). Ye decide karta hai neuron kitna "fire" karega. Sabse important kaam: <b>non-linearity</b> dena. Agar activation na ho to 10 layer bhi lagao, sab mil ke ek hi linear layer ban jaati hain (W₂W₁x = Wx), aur network sirf seedhi line wali boundary seekh paata.</p>
<h4>Achhe activation mein kya hona chahiye</h4>
<ul>
<li>Non-linear aur differentiable, taaki backprop chal sake.</li>
<li>Gradient jaldi zero na ho (saturate na kare).</li>
<li>Output zero-centred ho to training fast; compute sasta ho.</li>
</ul>
<h4>Main functions ek nazar mein</h4>
<table>
<tr><th>Function</th><th>Formula</th><th>Range</th><th>Yaad rakho</th></tr>
<tr><td>Sigmoid</td><td>1/(1+e<sup>−z</sup>)</td><td>(0,1)</td><td>Probability deta hai; derivative max 0.25, isliye vanishing gradient</td></tr>
<tr><td>Tanh</td><td>(e<sup>z</sup>−e<sup>−z</sup>)/(e<sup>z</sup>+e<sup>−z</sup>)</td><td>(−1,1)</td><td>Zero-centred, par bade |z| par flat</td></tr>
<tr><td>ReLU</td><td>max(0,z)</td><td>[0,∞)</td><td>Fast aur simple; negative side pe gradient 0, "dying ReLU"</td></tr>
<tr><td>Leaky ReLU</td><td>z ya 0.01z</td><td>(−∞,∞)</td><td>Negative side pe chhota slope, neuron marta nahi</td></tr>
<tr><td>PReLU</td><td>z ya αz, α seekha jaata hai</td><td>(−∞,∞)</td><td>Slope bhi training se aata hai</td></tr>
<tr><td>ELU</td><td>z ya α(e<sup>z</sup>−1)</td><td>(−α,∞)</td><td>Smooth curve, mean zero ke paas</td></tr>
<tr><td>Softmax</td><td>e<sup>zᵢ</sup>/Σe<sup>zⱼ</sup></td><td>(0,1), total 1</td><td>Multi-class output layer</td></tr>
</table>
<h4>Ek neuron pe kaam kaise hota hai</h4>
<ol>
<li>z nikalo, maan lo z = −2.</li>
<li>Sigmoid 0.119 dega, tanh −0.964, ReLU 0, Leaky ReLU −0.02, ELU −0.865.</li>
<li>Backprop mein gradient f′(z) se multiply hota hai: ReLU yahan 0 bhejega (neuron chup), Leaky ReLU 0.01 bhejega.</li>
</ol>
<h4>Kahan kaunsa lagana hai</h4>
<ul>
<li>Hidden layers: default ReLU; neurons mar rahe hon to Leaky ReLU/PReLU/ELU.</li>
<li>Output: binary ke liye sigmoid, multi-class ke liye softmax, regression ke liye linear.</li>
<li>LSTM gates: sigmoid; cell candidate: tanh.</li>
</ul>
<h4>Desi example</h4>
<p>Socho neuron ek chaiwala hai. Sigmoid wala chaiwala order ko 0 se 1 ke beech "kitna pakka" mein badalta hai. ReLU wala bolta hai: "order negative hai to chai nahi (0), positive hai to utni hi chai." Leaky ReLU wala negative order pe bhi thoda sa (1%) dhyan deta hai, taaki dukaan band na ho jaaye.</p>
<h4>Limitations</h4>
<ul>
<li>Sigmoid/tanh: deep network mein gradient gayab, exp mehnga.</li>
<li>ReLU: dead neurons, output ki koi upper limit nahi.</li>
</ul>
<p><b>Conclusion:</b> activation function hi network ko non-linear "dimaag" deta hai; andar ReLU family aur bahar sigmoid/softmax, yahi standard combo hai.</p>`,
  keys: ["non-linearity", "sigmoid", "tanh", "ReLU", "Leaky ReLU", "ELU", "softmax", "vanishing gradient", "dying ReLU", "zero-centred"],
  draw: "Graphs of sigmoid (S-curve 0 to 1), tanh (S-curve −1 to 1), ReLU (hinge at 0), Leaky ReLU (small negative slope).",
  fig: "unit2.html#q3",
  num: false
},
{
  id: "U2-02",
  unit: 2,
  topic: "Supervised vs unsupervised training of neural networks",
  q: "How is an unsupervised neural network trained? Explain the approaches to unsupervised training of neural networks with examples.",
  alt: [
    "Explain unsupervised training in neural networks.",
    "Describe two approaches to unsupervised training of neural networks with examples.",
    "How can a neural network learn without labels?"
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 92,
  diff: 3,
  pyq: ["8AID 2025 C2", "8AID 2024 A6", "7CAI 2025 B7"],
  why: "Asked in all 3 papers, including a 10-mark Part C in 2025.",
  short: "Unsupervised training learns from unlabelled data by optimising a self-made objective, e.g. an autoencoder minimises reconstruction error; an RBM learns p(x) via contrastive divergence.",
  en: `<p><b>Unsupervised training</b> means training a neural network on <b>unlabelled data</b> (only x, no y). Since there is no correct answer, the network optimises an objective built from the data itself: <b>reconstructing</b> the input, <b>modelling its probability distribution</b>, or <b>grouping</b> similar inputs.</p>
<h4>Approaches</h4>
<ol>
<li><b>Reconstruction-based (Autoencoders):</b> encoder h = f(Wx + b), decoder x̂ = g(W′h + b′). Loss is the reconstruction error, trained by backprop + SGD with the input as its own target.
<div class="formula">L = ‖x − x̂‖²</div>
Example: compress 784-pixel MNIST digits to a 32-number code.</li>
<li><b>Energy-based / probabilistic (RBM, DBN):</b> learn p(v) by lowering the energy of real data. Trained with <b>Contrastive Divergence</b>:
<div class="formula">ΔW = η(⟨v hᵀ⟩<sub>data</sub> − ⟨v hᵀ⟩<sub>recon</sub>)</div>
Example: RBM on movie ratings for recommendation.</li>
<li><b>Competitive learning (Self-Organising Map, Kohonen):</b> the winning neuron (closest weight vector) and its neighbours move towards the input:
<div class="formula">w ← w + η·h(t)·(x − w)</div>
Example: grouping customers into segments on a 2-D map.</li>
<li><b>Hebbian learning:</b> "neurons that fire together wire together", Δw = η·x·y.</li>
<li><b>Generative / self-supervised:</b> GANs (generator vs discriminator), VAEs, and pretext tasks such as predicting a masked word (BERT).</li>
</ol>
<h4>Steps of training (autoencoder example)</h4>
<ol>
<li>Collect unlabelled data, normalise it (pixels 0–1).</li>
<li>Build network 784 → 128 → 32 → 128 → 784.</li>
<li>Forward pass: x → code h → x̂.</li>
<li>Compute L = mean(x − x̂)².</li>
<li>Backpropagate and update weights (SGD/Adam); repeat for many epochs until the loss stops falling.</li>
<li>Use the encoder's code h for clustering, visualisation, anomaly detection, or as pre-trained weights.</li>
</ol>
<h4>Greedy layer-wise pre-training</h4>
<p>Train one RBM/autoencoder layer at a time on the output of the previous layer, stack them into a deep network, then fine-tune with a few labels. This gave the 2006 breakthrough in training deep nets (Hinton).</p>
<h4>Supervised vs unsupervised (quick)</h4>
<table>
<tr><th>Point</th><th>Supervised</th><th>Unsupervised</th></tr>
<tr><td>Data</td><td>(x, y) labelled</td><td>x only</td></tr>
<tr><td>Loss</td><td>prediction vs label</td><td>reconstruction / energy / distance</td></tr>
<tr><td>Output</td><td>class or value</td><td>representation, clusters, samples</td></tr>
</table>
<h4>Applications</h4>
<p>Dimensionality reduction, clustering, anomaly/fraud detection, pre-training deep nets, recommendation, data generation.</p>
<p><b>Conclusion:</b> unsupervised training lets a network learn useful structure from cheap unlabelled data by reconstructing, modelling or clustering it.</p>`,
  hi: `<p><b>Unsupervised training</b> ka matlab: network ko sirf input x milta hai, label y nahi. Koi teacher nahi bata raha "sahi jawab ye hai". Isliye network data se hi apna target banata hai: input ko <b>wapas banana</b> (reconstruct), data ka <b>probability distribution</b> seekhna, ya similar cheezon ko <b>group</b> karna.</p>
<h4>Main tareeke</h4>
<ol>
<li><b>Autoencoder (reconstruction):</b> encoder input ko chhota code h banata hai, decoder usse x̂ wapas banata hai. Loss = ‖x − x̂‖². Input hi target hai, normal backprop se train.<br>Example: MNIST ki 784 pixel image ko 32 number mein compress karna.</li>
<li><b>RBM / energy-based:</b> real data ki energy kam karo, fake ki zyada. Contrastive Divergence se: ΔW = η(⟨vhᵀ⟩<sub>data</sub> − ⟨vhᵀ⟩<sub>recon</sub>).<br>Example: Netflix jaisi movie ratings se recommendation.</li>
<li><b>Competitive learning (SOM):</b> jo neuron input ke sabse paas hai wo "winner"; winner aur uske padosi input ki taraf khisakte hain: w ← w + η(x − w).<br>Example: customers ko segments mein baantna.</li>
<li><b>Hebbian:</b> "saath fire karo, saath judo", Δw = η·x·y.</li>
<li><b>Generative/self-supervised:</b> GAN, VAE, ya BERT jaisa masked word predict karna.</li>
</ol>
<h4>Training ke steps (autoencoder)</h4>
<ol>
<li>Bina label ka data lo, normalise karo.</li>
<li>Network banao 784 → 128 → 32 → 128 → 784.</li>
<li>Forward: x → h → x̂.</li>
<li>Loss nikaalo: mean(x − x̂)².</li>
<li>Backprop + Adam se weights update, kai epochs tak.</li>
<li>Code h ko clustering, anomaly detection ya pre-training mein use karo.</li>
</ol>
<h4>Greedy layer-wise pre-training</h4>
<p>Ek-ek layer ko alag train karo (RBM ya AE), freeze karo, upar agli layer lagao, end mein thode labels se fine-tune. 2006 mein Hinton ne isi se deep nets train karna possible kiya.</p>
<h4>Supervised vs unsupervised</h4>
<table>
<tr><th>Point</th><th>Supervised</th><th>Unsupervised</th></tr>
<tr><td>Data</td><td>(x, y)</td><td>sirf x</td></tr>
<tr><td>Loss</td><td>prediction vs label</td><td>reconstruction / energy / distance</td></tr>
<tr><td>Output</td><td>class ya value</td><td>features, clusters, naye samples</td></tr>
</table>
<h4>Desi example</h4>
<p>Kirana dukaan wale ko koi nahi batata ki kaunsa customer "regular" hai, phir bhi woh khud dekh ke groups bana leta hai: roz doodh lene wale, mahine ka ration lene wale, kabhi-kabhi aane wale. Yahi unsupervised learning hai.</p>
<h4>Applications</h4>
<p>Dimensionality reduction, clustering, fraud/anomaly detection, deep net pre-training, recommendation, data generation.</p>
<p><b>Conclusion:</b> bina label ke bhi network reconstruct, model ya cluster karke data ka structure seekh leta hai.</p>`,
  keys: ["unlabelled data", "autoencoder", "reconstruction error", "RBM", "contrastive divergence", "self-organising map", "Hebbian learning", "greedy layer-wise pre-training", "fine-tuning"],
  draw: "Autoencoder block diagram x → encoder → code h → decoder → x̂, plus the stacked layer-wise pre-training figure.",
  fig: "unit2.html#q1",
  num: false
},
{
  id: "U2-03",
  unit: 2,
  topic: "Restricted Boltzmann Machines",
  q: "What is a Restricted Boltzmann Machine (RBM)? Explain its architecture and working.",
  alt: [
    "Define RBMs.",
    "Explain the architecture of an RBM with a neat diagram.",
    "Why is a Boltzmann machine called 'restricted'?",
    "How is an RBM trained?"
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 90,
  diff: 4,
  pyq: ["8AID 2025 A6", "8AID 2024 A7", "7CAI 2025 B2"],
  why: "Asked in all 3 papers (twice as Part A, once as 4-mark B2).",
  short: "An RBM is a two-layer generative energy-based network (visible + hidden units) with symmetric connections only between layers, trained by contrastive divergence to learn p(v).",
  en: `<p><b>Restricted Boltzmann Machine (RBM):</b> a two-layer, undirected, <b>generative stochastic</b> neural network that learns a probability distribution over its inputs. Proposed by Smolensky (1986, "Harmonium") and made practical by Hinton with contrastive divergence (2002).</p>
<h4>Architecture</h4>
<ul>
<li><b>Visible layer v</b> (m units): holds the input, e.g. pixels; bias a.</li>
<li><b>Hidden layer h</b> (n units): binary feature detectors; bias b.</li>
<li><b>Weights W</b> (m × n): symmetric, every visible unit linked to every hidden unit.</li>
<li><b>"Restricted":</b> no visible–visible and no hidden–hidden connections, so it is a <b>bipartite graph</b>. A full Boltzmann machine allows all links and is very slow to train.</li>
</ul>
<h4>Energy function and probability</h4>
<div class="formula">E(v, h) = − Σᵢ aᵢvᵢ − Σⱼ bⱼhⱼ − Σᵢ Σⱼ vᵢ wᵢⱼ hⱼ</div>
<div class="formula">p(v, h) = e<sup>−E(v,h)</sup> / Z,  Z = Σ<sub>v,h</sub> e<sup>−E(v,h)</sup></div>
<p>Low energy means high probability. Because of the restriction, units in one layer are conditionally independent given the other layer:</p>
<div class="formula">p(hⱼ = 1 | v) = σ(bⱼ + Σᵢ vᵢwᵢⱼ)<br>p(vᵢ = 1 | h) = σ(aᵢ + Σⱼ wᵢⱼhⱼ)</div>
<h4>Working / training (Contrastive Divergence, CD-1)</h4>
<ol>
<li><b>Positive phase:</b> clamp a training vector v⁰, compute p(h|v⁰), sample h⁰.</li>
<li><b>Reconstruction:</b> sample v¹ from p(v|h⁰).</li>
<li><b>Negative phase:</b> compute p(h|v¹) to get h¹.</li>
<li><b>Update:</b>
<div class="formula">ΔW = η(v⁰h⁰ᵀ − v¹h¹ᵀ),  Δa = η(v⁰ − v¹),  Δb = η(h⁰ − h¹)</div></li>
<li>Repeat over mini-batches until reconstructions look like the data.</li>
</ol>
<p>This alternate sampling v → h → v is <b>Gibbs sampling</b>; CD-k runs k steps instead of running to equilibrium.</p>
<h4>Example</h4>
<p>Movie recommendation: visible units = movies a user liked; hidden units learn "genres" (action, romance). Feeding a user's likes activates the genres, and the reconstruction suggests unseen movies of the same genre (used in the Netflix Prize).</p>
<h4>RBM vs Autoencoder</h4>
<table>
<tr><th>RBM</th><th>Autoencoder</th></tr>
<tr><td>Stochastic, probabilistic</td><td>Deterministic</td></tr>
<tr><td>Undirected, shared W</td><td>Directed encoder + decoder</td></tr>
<tr><td>Trained by CD (approximate likelihood)</td><td>Trained by backprop on reconstruction error</td></tr>
</table>
<h4>Applications</h4>
<p>Feature learning, dimensionality reduction, collaborative filtering, pre-training Deep Belief Networks, topic modelling, denoising.</p>
<h4>Limitations</h4>
<p>Partition function Z is intractable; CD gives only approximate gradients; largely replaced today by VAEs/GANs.</p>
<p><b>Conclusion:</b> an RBM is a bipartite energy-based model that learns hidden features of data without labels and is the building block of DBNs.</p>`,
  hi: `<p><b>RBM</b> ek do-layer wala, undirected, <b>generative</b> aur <b>stochastic</b> (random) neural network hai jo input data ka probability distribution seekhta hai. Smolensky ne 1986 mein diya, Hinton ne 2002 mein contrastive divergence se isko practical banaya.</p>
<h4>Architecture</h4>
<ul>
<li><b>Visible layer v:</b> input yahan aata hai (jaise pixels), bias a.</li>
<li><b>Hidden layer h:</b> feature detectors (0/1), bias b.</li>
<li><b>Weights W:</b> har visible har hidden se juda, dono direction mein same weight (symmetric).</li>
<li><b>"Restricted" kyun:</b> visible-visible aur hidden-hidden koi connection nahi. Bas do groups ke beech links, yaani <b>bipartite graph</b>. Full Boltzmann machine mein sab se sab jude hote hain, isliye bahut slow.</li>
</ul>
<h4>Energy aur probability</h4>
<div class="formula">E(v, h) = − Σ aᵢvᵢ − Σ bⱼhⱼ − Σ Σ vᵢ wᵢⱼ hⱼ</div>
<div class="formula">p(v, h) = e<sup>−E</sup> / Z</div>
<p>Energy kam = probability zyada. Restriction ki wajah se ek layer di hui ho to dusri layer ke units independent hain:</p>
<div class="formula">p(hⱼ=1|v) = σ(bⱼ + Σ vᵢwᵢⱼ),  p(vᵢ=1|h) = σ(aᵢ + Σ wᵢⱼhⱼ)</div>
<h4>Training kaise hoti hai (CD-1)</h4>
<ol>
<li><b>Positive phase:</b> real data v⁰ daalo, h⁰ sample karo.</li>
<li><b>Reconstruction:</b> h⁰ se v¹ banao.</li>
<li><b>Negative phase:</b> v¹ se h¹ nikalo.</li>
<li><b>Update:</b> ΔW = η(v⁰h⁰ᵀ − v¹h¹ᵀ), biases bhi aise hi.</li>
<li>Mini-batches pe repeat karo jab tak reconstruction data jaisa na lage.</li>
</ol>
<p>Ye v → h → v aage-peeche sampling hi <b>Gibbs sampling</b> hai; CD-k mein k steps chalate hain.</p>
<h4>Desi example</h4>
<p>Socho tumhe kaunsi films pasand hain: Sholay, Gadar, KGF. RBM ka hidden unit samajh jaata hai "isko action pasand hai" aur reconstruction mein Pushpa bhi suggest kar deta hai. Netflix Prize mein yahi kaam RBM ne kiya tha.</p>
<h4>RBM vs Autoencoder</h4>
<table>
<tr><th>RBM</th><th>Autoencoder</th></tr>
<tr><td>Random/probabilistic</td><td>Deterministic</td></tr>
<tr><td>Ek hi shared W, undirected</td><td>Alag encoder-decoder</td></tr>
<tr><td>CD se training</td><td>Backprop se training</td></tr>
</table>
<h4>Applications aur limitations</h4>
<p>Feature learning, dimensionality reduction, recommendation, DBN pre-training, topic modelling. Problem: Z calculate karna almost impossible, CD sirf approximate gradient deta hai; aaj VAE/GAN zyada use hote hain.</p>
<p><b>Conclusion:</b> RBM ek bipartite energy-based model hai jo bina label ke hidden features seekhta hai aur DBN ki eent (building block) hai.</p>`,
  keys: ["visible layer", "hidden layer", "bipartite", "energy function", "partition function Z", "conditional independence", "contrastive divergence", "Gibbs sampling", "generative", "stochastic"],
  draw: "Two rows of circles: visible v₁–v₄ at bottom, hidden h₁–h₃ on top, every v joined to every h, no links within a row; label W, biases a and b.",
  fig: "unit2.html#q2",
  num: false
},
{
  id: "U2-04",
  unit: 2,
  topic: "Machine learning vs deep learning",
  q: "Differentiate between machine learning and deep learning. How does deep learning improve representation power?",
  alt: [
    "Compare ML and DL.",
    "What is the difference between machine learning and deep learning?",
    "Why does deep learning outperform traditional ML on large unstructured data?"
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 90,
  diff: 2,
  pyq: ["8AID 2024 A3", "7CAI 2025 C1", "8AID 2025 A1"],
  why: "Asked as 2024 A3 and as a 10-mark 7CAI C1; the DL definition (2025 A1) is a close variant.",
  short: "ML learns from hand-engineered features with shallow models; DL is a subset of ML using many-layer neural networks that learn features automatically from raw data, needing more data and GPUs.",
  en: `<p><b>Machine Learning (ML):</b> a branch of AI where algorithms learn patterns from data to make predictions without being explicitly programmed (e.g. decision tree, SVM, k-NN). <b>Deep Learning (DL):</b> a subset of ML that uses <b>neural networks with many hidden layers</b> to learn representations of data directly from raw input. Relation: AI ⊃ ML ⊃ DL.</p>
<h4>Comparison</h4>
<table>
<tr><th>Point</th><th>Machine Learning</th><th>Deep Learning</th></tr>
<tr><td>Features</td><td>Hand-crafted by experts (SIFT, HOG, MFCC)</td><td>Learned automatically, layer by layer</td></tr>
<tr><td>Model</td><td>Shallow: linear/logistic regression, SVM, trees</td><td>Deep networks: MLP, CNN, RNN, Transformer</td></tr>
<tr><td>Data needed</td><td>Works with small/medium data</td><td>Needs large data; performance keeps rising with data</td></tr>
<tr><td>Hardware</td><td>CPU is enough</td><td>GPU/TPU needed</td></tr>
<tr><td>Training time</td><td>Minutes–hours</td><td>Hours–weeks</td></tr>
<tr><td>Data type</td><td>Mostly structured/tabular</td><td>Unstructured: images, audio, text</td></tr>
<tr><td>Interpretability</td><td>Higher (trees, coefficients)</td><td>Low ("black box")</td></tr>
<tr><td>Problem solving</td><td>Split into parts (detect then classify)</td><td>End-to-end learning</td></tr>
<tr><td>Example</td><td>Spam filter with word counts + Naive Bayes</td><td>Face recognition with a CNN on raw pixels</td></tr>
</table>
<h4>How DL improves representation power</h4>
<ul>
<li><b>Hierarchical features:</b> each layer builds on the previous: pixels → edges → textures → parts → objects. Shallow ML has only one level of features.</li>
<li><b>Distributed representation:</b> n hidden units can encode up to 2ⁿ patterns, far more compact than one-hot or templates.</li>
<li><b>Depth efficiency:</b> some functions need exponentially many units in a shallow net but only polynomially many in a deep one.</li>
<li><b>Non-linear composition:</b> f(x) = f₃(f₂(f₁(x))) with non-linear activations models very complex boundaries.</li>
<li><b>Transferable features:</b> features learned on ImageNet help in medical imaging (transfer learning).</li>
</ul>
<h4>Performance vs data</h4>
<p>Classical ML accuracy plateaus as data grows; DL accuracy keeps improving, which is why DL wins with big data (e.g. AlexNet 2012 cut ImageNet top-5 error to 15.3% vs 26.2% for the best hand-crafted pipeline).</p>
<h4>When to prefer which</h4>
<ul>
<li>Small tabular dataset, need explanation: ML (e.g. gradient boosting for loan approval).</li>
<li>Large images/speech/text: DL.</li>
</ul>
<p><b>Conclusion:</b> DL is ML with deep neural networks that learn their own hierarchical features, giving far greater representation power at the cost of data, compute and interpretability.</p>`,
  hi: `<p><b>Machine Learning</b> AI ki woh branch hai jisme algorithm data se pattern seekhta hai, bina har rule likhe (decision tree, SVM, k-NN). <b>Deep Learning</b> ML ka hi subset hai jisme <b>bahut saari hidden layers wale neural networks</b> raw data se khud features seekhte hain. Rishta: AI ⊃ ML ⊃ DL.</p>
<h4>Difference table</h4>
<table>
<tr><th>Point</th><th>ML</th><th>DL</th></tr>
<tr><td>Features</td><td>Expert haath se banata hai (HOG, MFCC)</td><td>Network khud seekhta hai</td></tr>
<tr><td>Model</td><td>Shallow: SVM, trees, regression</td><td>Deep: CNN, RNN, Transformer</td></tr>
<tr><td>Data</td><td>Kam data mein chal jaata</td><td>Bahut data chahiye</td></tr>
<tr><td>Hardware</td><td>CPU kaafi</td><td>GPU/TPU chahiye</td></tr>
<tr><td>Time</td><td>Minutes-hours</td><td>Hours-weeks</td></tr>
<tr><td>Data type</td><td>Tabular</td><td>Image, audio, text</td></tr>
<tr><td>Samajhna</td><td>Asaan</td><td>Black box</td></tr>
<tr><td>Approach</td><td>Tukdon mein</td><td>End-to-end</td></tr>
</table>
<h4>DL representation power kaise badhata hai</h4>
<ul>
<li><b>Hierarchy:</b> pehli layer edges, agli shapes, phir aankh-naak, phir poora chehra. ML mein bas ek level ke features.</li>
<li><b>Distributed representation:</b> n hidden units 2ⁿ tak patterns encode kar sakte hain.</li>
<li><b>Depth efficiency:</b> jo function shallow net mein exponential neurons maange, deep net mein kam neurons mein ban jaata hai.</li>
<li><b>Composition:</b> f₃(f₂(f₁(x))), har step non-linear, to bahut complex boundary ban jaati hai.</li>
<li><b>Transfer:</b> ImageNet pe seekhe features X-ray mein bhi kaam aate hain.</li>
</ul>
<h4>Data vs performance</h4>
<p>ML ki accuracy ek point ke baad ruk jaati hai, DL ki data badhne ke saath badhti rehti hai. 2012 mein AlexNet ne ImageNet top-5 error 15.3% kar diya jab best purana tareeka 26.2% pe tha.</p>
<h4>Desi example</h4>
<p>ML aise hai jaise mummy sabzi wale ko list de: "laal, gol, chikna = tamatar" (features hum batate hain). DL aise hai jaise bachcha hazaar baar sabzi mandi jaake khud pehchanna seekh le, koi list nahi chahiye.</p>
<h4>Kab kya</h4>
<p>Chhota tabular data aur explanation chahiye: ML (loan approval). Bada image/speech/text data: DL.</p>
<p><b>Conclusion:</b> DL = deep neural networks wala ML jo apne features khud seekhta hai; power zyada, par data, compute aur black-box ki keemat pe.</p>`,
  keys: ["subset of ML", "feature engineering", "hand-crafted features", "hierarchical representation", "end-to-end", "large data", "GPU", "black box", "distributed representation"],
  draw: "Nested circles AI ⊃ ML ⊃ DL, plus a graph of performance vs amount of data (ML plateaus, DL keeps rising).",
  fig: "unit2.html#q4",
  num: false
},
{
  id: "U2-05",
  unit: 2,
  topic: "Machine learning vs deep learning",
  q: "Define deep learning. Explain its scope and significance in artificial intelligence.",
  alt: [
    "Define deep learning and its significance in AI.",
    "What is the scope of deep learning?",
    "Why is deep learning important today?"
  ],
  marks: [2, 4],
  priority: "must",
  prob: 86,
  diff: 2,
  pyq: ["8AID 2025 A1", "8AID 2024 A1"],
  why: "Asked as Part A in both 8AID papers.",
  short: "Deep learning is a subset of ML that uses multi-layer neural networks to learn hierarchical features from raw data; it powers modern AI in vision, speech, NLP and healthcare.",
  en: `<p><b>Deep Learning (DL)</b> is a subset of machine learning that uses artificial neural networks with <b>multiple hidden layers</b> to automatically learn <b>hierarchical representations</b> of data, from low-level features to high-level concepts, and map raw input directly to output.</p>
<h4>Significance in AI</h4>
<ul>
<li><b>Automatic feature learning:</b> removes manual feature engineering.</li>
<li><b>State-of-the-art accuracy</b> on perception tasks: image recognition (beyond human-level top-5 on ImageNet with ResNet, 3.57%), speech recognition, translation.</li>
<li><b>Handles unstructured data</b> (images, audio, text), which is most of the world's data.</li>
<li><b>Scales with data and compute:</b> more data gives better models.</li>
<li><b>Generative power:</b> creates text, images, music (GPT, diffusion models).</li>
<li>Drives modern AI products: assistants, self-driving, recommendation.</li>
</ul>
<h4>Scope (where DL is used)</h4>
<table>
<tr><th>Area</th><th>Examples</th></tr>
<tr><td>Computer vision</td><td>Face unlock, object detection, medical scans</td></tr>
<tr><td>NLP</td><td>Machine translation, chatbots, sentiment analysis</td></tr>
<tr><td>Speech</td><td>Alexa/Siri, speech-to-text, voice cloning</td></tr>
<tr><td>Healthcare</td><td>Tumour detection, AlphaFold protein structure</td></tr>
<tr><td>Autonomous systems</td><td>Self-driving cars, drones, robotics</td></tr>
<tr><td>Finance &amp; business</td><td>Fraud detection, recommendation, forecasting</td></tr>
</table>
<h4>Limitations</h4>
<p>Needs large labelled data and GPUs, hard to interpret, can be biased or fooled by adversarial examples.</p>
<p><b>Conclusion:</b> DL is the main engine of today's AI because it learns features automatically and scales with data.</p>`,
  hi: `<p><b>Deep Learning</b> machine learning ka subset hai jisme <b>kai hidden layers</b> wale neural networks raw data se khud-ba-khud <b>layer-by-layer features</b> seekhte hain: neeche simple features, upar complex concepts.</p>
<h4>AI mein significance (kyun important)</h4>
<ul>
<li><b>Features khud seekhta hai:</b> manual feature engineering ki zaroorat nahi.</li>
<li><b>Best accuracy:</b> image recognition (ResNet ne ImageNet top-5 error 3.57% kiya, human level se behtar), speech, translation.</li>
<li><b>Unstructured data</b> (photo, awaaz, text) sambhal leta hai, jo duniya ka zyada data hai.</li>
<li><b>Data ke saath scale:</b> data badhao, model behtar.</li>
<li><b>Generate karta hai:</b> ChatGPT text, diffusion images.</li>
<li>Aaj ke AI products ka engine: assistants, self-driving, recommendations.</li>
</ul>
<h4>Scope</h4>
<table>
<tr><th>Area</th><th>Example</th></tr>
<tr><td>Vision</td><td>Face unlock, CCTV detection, X-ray</td></tr>
<tr><td>NLP</td><td>Google Translate, chatbot</td></tr>
<tr><td>Speech</td><td>Alexa, voice typing</td></tr>
<tr><td>Healthcare</td><td>Cancer detection, AlphaFold</td></tr>
<tr><td>Autonomous</td><td>Self-driving car, drone</td></tr>
<tr><td>Finance</td><td>UPI fraud detection, recommendation</td></tr>
</table>
<h4>Desi example</h4>
<p>Google Lens se hindi board ki photo lo aur turant English translation mil jaata hai: vision + NLP dono deep learning se.</p>
<h4>Limitations</h4>
<p>Bahut data aur GPU chahiye, samajhna mushkil (black box), bias ho sakta hai.</p>
<p><b>Conclusion:</b> DL aaj ke AI ka main engine hai kyunki ye features khud seekhta hai aur data ke saath behtar hota jaata hai.</p>`,
  keys: ["subset of ML", "multiple hidden layers", "hierarchical representation", "automatic feature learning", "unstructured data", "scalability", "computer vision", "NLP", "speech"],
  draw: "AI ⊃ ML ⊃ DL nested circles.",
  fig: "unit2.html#q4",
  num: false
},
{
  id: "U2-06",
  unit: 2,
  topic: "Supervised vs unsupervised training of neural networks",
  q: "Differentiate between supervised and unsupervised training of neural networks.",
  alt: [
    "Write one difference between supervised and unsupervised learning.",
    "Compare supervised and unsupervised learning with examples."
  ],
  marks: [2, 4],
  priority: "must",
  prob: 85,
  diff: 1,
  pyq: ["8AID 2025 A4", "7CAI 2025 A9", "8AID 2024 A6"],
  why: "Direct Part A in 8AID 2025 and 7CAI 2025; 2024 A6 is a close variant.",
  short: "Supervised training uses labelled (x, y) pairs and minimises prediction error against labels; unsupervised training uses only x and learns structure such as clusters or reconstructions.",
  en: `<p><b>Supervised training:</b> the network learns a mapping x → y from <b>labelled</b> examples; the loss compares the prediction with the true label. <b>Unsupervised training:</b> the network gets <b>only inputs x</b> and learns hidden structure (clusters, compressed codes, probability distribution) using a self-made objective.</p>
<table>
<tr><th>Point</th><th>Supervised</th><th>Unsupervised</th></tr>
<tr><td>Data</td><td>Labelled (x, y)</td><td>Unlabelled x</td></tr>
<tr><td>Goal</td><td>Predict label/value for new x</td><td>Discover structure / representation</td></tr>
<tr><td>Loss / signal</td><td>Cross-entropy, MSE vs target y</td><td>Reconstruction error, energy, cluster distance</td></tr>
<tr><td>Feedback</td><td>Direct "teacher" signal</td><td>No teacher; self-organised</td></tr>
<tr><td>Tasks</td><td>Classification, regression</td><td>Clustering, dimensionality reduction, density estimation, anomaly detection</td></tr>
<tr><td>Network examples</td><td>MLP, CNN classifier, LSTM tagger</td><td>Autoencoder, RBM, SOM, GAN</td></tr>
<tr><td>Labelling cost</td><td>High (human annotation)</td><td>Low (raw data is cheap)</td></tr>
<tr><td>Evaluation</td><td>Easy: accuracy on test labels</td><td>Harder: no ground truth</td></tr>
<tr><td>Example</td><td>CNN classifying X-rays as normal/pneumonia</td><td>Autoencoder flagging unusual credit-card transactions</td></tr>
</table>
<p><b>Link between them:</b> unsupervised pre-training (RBM/autoencoder) followed by supervised fine-tuning combines both; semi-supervised and self-supervised learning sit in between.</p>
<p><b>Conclusion:</b> the key difference is the presence of labels: supervised learns to predict, unsupervised learns to describe the data.</p>`,
  hi: `<p><b>Supervised:</b> network ko input ke saath sahi answer (label) bhi milta hai, aur loss prediction ko label se compare karta hai. <b>Unsupervised:</b> sirf input milta hai, network khud structure dhoondta hai: groups, compressed code, ya distribution.</p>
<table>
<tr><th>Point</th><th>Supervised</th><th>Unsupervised</th></tr>
<tr><td>Data</td><td>(x, y) label ke saath</td><td>Sirf x</td></tr>
<tr><td>Goal</td><td>Naye x ka y batana</td><td>Data ka hidden pattern</td></tr>
<tr><td>Loss</td><td>Cross-entropy, MSE</td><td>Reconstruction error, energy, distance</td></tr>
<tr><td>Teacher</td><td>Hai</td><td>Nahi</td></tr>
<tr><td>Tasks</td><td>Classification, regression</td><td>Clustering, compression, anomaly detection</td></tr>
<tr><td>Networks</td><td>MLP, CNN, LSTM</td><td>Autoencoder, RBM, SOM, GAN</td></tr>
<tr><td>Labelling kharcha</td><td>Zyada</td><td>Kam</td></tr>
<tr><td>Evaluation</td><td>Accuracy se asaan</td><td>Mushkil, ground truth nahi</td></tr>
</table>
<h4>Desi example</h4>
<p>Supervised = coaching class, jahan teacher har sawaal ka answer key deta hai. Unsupervised = hostel ka naya ladka jo bina kisi ke bataye khud samajh jaata hai ki kaun-kaun se log ek group mein ghoomte hain.</p>
<p>Dono ko mila bhi sakte hain: pehle unsupervised pre-training, phir thode labels se supervised fine-tuning.</p>
<p><b>Conclusion:</b> farq sirf label ka hai: supervised predict karna seekhta hai, unsupervised data ko samajhna.</p>`,
  keys: ["labelled data", "unlabelled data", "teacher signal", "classification", "clustering", "reconstruction", "autoencoder", "loss function"],
  draw: "",
  fig: "unit2.html#q1",
  num: false
},
{
  id: "U2-07",
  unit: 2,
  topic: "Deep learning applications",
  q: "Explain the applications of deep learning in various domains such as computer vision, NLP, speech recognition and healthcare.",
  alt: [
    "List the applications of deep learning.",
    "Write one major use of deep learning in computer vision.",
    "Explain how deep learning is used in healthcare / autonomous vehicles."
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 78,
  diff: 1,
  pyq: ["7CAI 2025 A6", "7CAI 2025 B6", "8AID 2024 A8"],
  why: "7CAI asked DL use in CV twice (A6, B6); 2024 A8 asked CNN applications; named syllabus sub-topic.",
  short: "Deep learning is used in image classification and face recognition, machine translation and chatbots, speech recognition, medical image diagnosis, self-driving cars and fraud detection.",
  en: `<p><b>Deep learning applications</b> are tasks where multi-layer neural networks learn directly from raw, high-dimensional data (pixels, audio, text) and reach human-level or better accuracy.</p>
<h4>1. Computer vision (CNNs, Vision Transformers)</h4>
<ul>
<li>Image classification (ResNet on ImageNet), object detection (YOLO, Faster R-CNN), segmentation (U-Net).</li>
<li>Face recognition: phone face unlock, airport DigiYatra.</li>
<li>OCR, number-plate reading, surveillance.</li>
</ul>
<h4>Computer vision tasks at a glance</h4>
<table>
<tr><th>Task</th><th>Network</th><th>Example</th></tr>
<tr><td>Image classification</td><td>ResNet, VGG</td><td>Sorting product photos into categories</td></tr>
<tr><td>Object detection</td><td>YOLO, Faster R-CNN</td><td>Spotting pedestrians for a self-driving car</td></tr>
<tr><td>Segmentation</td><td>U-Net, Mask R-CNN</td><td>Outlining a tumour in an MRI scan</td></tr>
<tr><td>Face recognition</td><td>FaceNet</td><td>Phone face unlock</td></tr>
</table>
<h4>Working of a typical DL application (steps)</h4>
<ol>
<li>Collect and label data (images, audio, text).</li>
<li>Preprocess: resize and normalise images, convert audio to spectrograms, tokenise text.</li>
<li>Choose an architecture (CNN, LSTM, Transformer) or a pre-trained model.</li>
<li>Train with a suitable loss (cross-entropy) using backprop and Adam on GPUs.</li>
<li>Evaluate on test data (accuracy, mAP, word error rate), then deploy and monitor.</li>
</ol>
<h4>2. Natural language processing (RNN, LSTM, Transformers)</h4>
<ul>
<li>Machine translation (Google Translate), chatbots/LLMs (ChatGPT), sentiment analysis, summarisation, question answering.</li>
</ul>
<h4>3. Speech and audio</h4>
<ul>
<li>Speech-to-text (CNN/LSTM/Transformer acoustic models), voice assistants (Alexa, Siri), text-to-speech (WaveNet), speaker identification.</li>
</ul>
<h4>4. Healthcare</h4>
<ul>
<li>Detecting diabetic retinopathy from retina images, tumours in MRI/CT, pneumonia in X-rays.</li>
<li>Protein structure prediction (AlphaFold 2), drug discovery.</li>
</ul>
<h4>5. Autonomous systems</h4>
<ul>
<li>Self-driving cars: lane, pedestrian and sign detection; drones; robot grasping; game playing (AlphaGo, deep RL).</li>
</ul>
<h4>6. Business and finance</h4>
<ul>
<li>Recommendation (YouTube, Netflix), fraud detection, stock/demand forecasting, customer-support bots.</li>
</ul>
<h4>7. Generative AI</h4>
<ul>
<li>Image generation (GANs, diffusion), deepfakes, music and code generation.</li>
</ul>
<h4>Summary table</h4>
<table>
<tr><th>Domain</th><th>Task</th><th>Typical model</th></tr>
<tr><td>Vision</td><td>Object detection</td><td>CNN (YOLO)</td></tr>
<tr><td>NLP</td><td>Translation</td><td>Transformer / seq2seq LSTM</td></tr>
<tr><td>Speech</td><td>Speech recognition</td><td>CNN + LSTM / Transformer</td></tr>
<tr><td>Healthcare</td><td>Tumour detection</td><td>CNN (U-Net)</td></tr>
<tr><td>Anomaly detection</td><td>Fraud</td><td>Autoencoder</td></tr>
</table>
<h4>Challenges</h4>
<p>Large labelled data, compute cost, lack of explainability, bias, privacy of medical data.</p>
<p><b>Conclusion:</b> deep learning powers almost every modern AI system that sees, listens, reads or generates.</p>`,
  hi: `<p><b>Deep learning applications</b> woh kaam hain jahan multi-layer neural networks raw data (photo, awaaz, text) se seedha seekh ke insaan jaisi ya usse behtar accuracy laate hain.</p>
<h4>1. Computer vision</h4>
<ul>
<li>Image classification (ResNet), object detection (YOLO), segmentation (U-Net).</li>
<li>Face recognition: phone ka face unlock, airport pe DigiYatra.</li>
<li>Number plate padhna (traffic challan), OCR.</li>
</ul>
<h4>Computer vision ke kaam ek nazar mein</h4>
<table>
<tr><th>Kaam</th><th>Network</th><th>Example</th></tr>
<tr><td>Image classification</td><td>ResNet, VGG</td><td>Flipkart pe product photos ki category</td></tr>
<tr><td>Object detection</td><td>YOLO, Faster R-CNN</td><td>Self-driving car ke liye pedestrian pehchanna</td></tr>
<tr><td>Segmentation</td><td>U-Net, Mask R-CNN</td><td>MRI mein tumour ki boundary</td></tr>
<tr><td>Face recognition</td><td>FaceNet</td><td>Phone ka face unlock</td></tr>
</table>
<h4>DL application kaam kaise karti hai (steps)</h4>
<ol>
<li>Data jama karo aur label lagao (photo, awaaz, text).</li>
<li>Preprocess: image resize/normalise, audio ka spectrogram, text ke tokens.</li>
<li>Architecture chuno (CNN, LSTM, Transformer) ya pre-trained model lo.</li>
<li>Cross-entropy loss ke saath backprop + Adam se GPU pe train karo.</li>
<li>Test data pe check karo (accuracy, mAP, word error rate), phir deploy karke nazar rakho.</li>
</ol>
<h4>2. NLP</h4>
<ul>
<li>Google Translate, ChatGPT, sentiment analysis (review positive ya negative), summarisation.</li>
</ul>
<h4>3. Speech</h4>
<ul>
<li>Voice typing, Alexa/Siri, text-to-speech, speaker identification.</li>
</ul>
<h4>4. Healthcare</h4>
<ul>
<li>Retina photo se diabetic retinopathy, X-ray se pneumonia, MRI mein tumour.</li>
<li>AlphaFold 2 se protein structure, drug discovery.</li>
</ul>
<h4>5. Autonomous systems</h4>
<ul>
<li>Self-driving car (lane, pedestrian, signboard pehchanna), drones, robots, AlphaGo.</li>
</ul>
<h4>6. Business/finance</h4>
<ul>
<li>YouTube/Netflix recommendation, UPI/credit card fraud detection, demand forecasting.</li>
</ul>
<h4>7. Generative AI</h4>
<ul>
<li>Image banana (diffusion, GAN), deepfake, music aur code generation.</li>
</ul>
<table>
<tr><th>Domain</th><th>Kaam</th><th>Model</th></tr>
<tr><td>Vision</td><td>Object detection</td><td>CNN</td></tr>
<tr><td>NLP</td><td>Translation</td><td>Transformer/LSTM</td></tr>
<tr><td>Speech</td><td>Speech-to-text</td><td>CNN + LSTM</td></tr>
<tr><td>Healthcare</td><td>Tumour detection</td><td>CNN</td></tr>
<tr><td>Fraud</td><td>Anomaly</td><td>Autoencoder</td></tr>
</table>
<h4>Desi example</h4>
<p>Ek din mein tum khud 5 baar DL use karte ho: phone face se unlock, Instagram reels ki recommendation, Google Maps traffic, voice se WhatsApp message, aur Paytm ka fraud check.</p>
<h4>Challenges</h4>
<p>Bahut data aur GPU, explain karna mushkil, bias, medical data ki privacy.</p>
<p><b>Conclusion:</b> jo bhi AI dekhta, sunta, padhta ya banata hai, uske peeche zyada-tar deep learning hai.</p>`,
  keys: ["computer vision", "object detection", "face recognition", "NLP", "machine translation", "speech recognition", "healthcare", "self-driving", "recommendation", "fraud detection"],
  draw: "Mind-map with 'Deep Learning' in the centre and branches: Vision, NLP, Speech, Healthcare, Autonomous, Finance, Generative.",
  fig: "unit2.html#q7",
  num: false
},
{
  id: "U2-08",
  unit: 2,
  topic: "Representation learning",
  q: "What is representation learning? Explain how deep learning automates feature engineering, with an example from image or speech processing.",
  alt: [
    "Explain hierarchical feature learning in deep networks.",
    "How does deep learning automate feature extraction?",
    "Explain representation learning with a neat diagram."
  ],
  marks: [4, 10],
  priority: "must",
  prob: 75,
  diff: 3,
  pyq: ["7CAI 2025 C2", "7CAI 2025 C1"],
  why: "10-mark 7CAI C2; also the second half of 7CAI C1 (representation power); named syllabus sub-topic.",
  short: "Representation learning lets a model automatically learn useful features from raw data, e.g. a CNN learns edges, then shapes, then objects, instead of hand-crafted features.",
  en: `<p><b>Representation learning</b> is a set of techniques that allow a model to <b>automatically discover the features (representations)</b> needed for a task from raw data, instead of relying on hand-engineered features. A good representation makes the downstream task (classification, clustering) easy, e.g. a linear classifier can separate the classes.</p>
<h4>Traditional pipeline vs DL pipeline</h4>
<table>
<tr><th>Traditional ML</th><th>Deep learning</th></tr>
<tr><td>Raw data → <b>hand-crafted features</b> (SIFT, HOG, MFCC) → classifier</td><td>Raw data → <b>learned features (many layers)</b> → classifier, trained end-to-end</td></tr>
<tr><td>Needs domain experts, time-consuming, may miss patterns</td><td>Automatic, data-driven, adapts to the task</td></tr>
</table>
<h4>Hierarchical features (key idea)</h4>
<ul>
<li>Layer 1: edges, colour blobs.</li>
<li>Layer 2: corners, textures, simple shapes.</li>
<li>Layer 3: object parts (eye, wheel).</li>
<li>Layer 4+: whole objects (face, car).</li>
</ul>
<div class="formula">h₁ = f(W₁x + b₁),  h₂ = f(W₂h₁ + b₂), …, ŷ = softmax(W<sub>L</sub>h<sub>L−1</sub>)</div>
<p>All W are learned by backprop, so the features are optimised for the final loss.</p>
<h4>Types of representation learning</h4>
<ul>
<li><b>Supervised:</b> CNN trained on labels; hidden layers become features.</li>
<li><b>Unsupervised:</b> autoencoders, RBMs learn compact codes.</li>
<li><b>Self-supervised:</b> pretext tasks (masked word in BERT, contrastive SimCLR).</li>
<li><b>Transfer learning:</b> reuse features learned on a big dataset (ImageNet) for a new task.</li>
</ul>
<h4>Example 1: image (face recognition)</h4>
<p>Old way: engineer computes HOG features then trains an SVM. DL way: a CNN gets raw pixels; early filters become edge detectors, deeper ones detect eyes and noses, and the final layer gives a 128-number face embedding (FaceNet) where photos of the same person lie close together.</p>
<h4>Example 2: speech</h4>
<p>Old: hand-designed MFCC features + HMM. DL: a CNN/LSTM on the raw spectrogram learns phoneme-like features, then words.</p>
<h4>Properties of good representations</h4>
<ul>
<li>Distributed and compact (few numbers, many concepts).</li>
<li>Disentangled: separate factors (pose, lighting, identity).</li>
<li>Invariant to small irrelevant changes (shift, noise).</li>
<li>Transferable to other tasks.</li>
</ul>
<h4>Advantages / limitations</h4>
<p>+ No manual effort, better accuracy, reusable features. − Needs lots of data and compute, features are hard to interpret.</p>
<p><b>Conclusion:</b> representation learning is why deep learning works: the network learns its own hierarchy of features, replacing manual feature engineering.</p>`,
  hi: `<p><b>Representation learning</b> ka matlab: model raw data se <b>khud features (representation) dhoondh leta hai</b>, insaan ko haath se features banane ki zaroorat nahi. Achha representation milne ke baad aage ka kaam (classification, clustering) aasaan ho jaata hai, kabhi-kabhi ek simple linear classifier bhi kaafi hota hai.</p>
<h4>Purana vs naya pipeline</h4>
<table>
<tr><th>Traditional ML</th><th>Deep learning</th></tr>
<tr><td>Raw data → expert ke banaye features (HOG, SIFT, MFCC) → classifier</td><td>Raw data → layers khud features seekhti hain → classifier, sab end-to-end</td></tr>
<tr><td>Expert chahiye, time lagta hai, pattern miss ho sakte</td><td>Automatic, data se seekhta, task ke hisaab se</td></tr>
</table>
<h4>Hierarchy (sabse important point)</h4>
<ul>
<li>Layer 1: edges, rang ke dhabbe.</li>
<li>Layer 2: corners, texture, simple shapes.</li>
<li>Layer 3: parts (aankh, pahiya).</li>
<li>Layer 4: poori cheez (chehra, car).</li>
</ul>
<div class="formula">h₁ = f(W₁x + b₁), h₂ = f(W₂h₁ + b₂), …</div>
<p>Saare W backprop se seekhe jaate hain, isliye features final task ke liye best bante hain.</p>
<h4>Types</h4>
<ul>
<li>Supervised: label se trained CNN.</li>
<li>Unsupervised: autoencoder, RBM.</li>
<li>Self-supervised: BERT ka masked word, SimCLR.</li>
<li>Transfer learning: ImageNet ke features naye kaam mein.</li>
</ul>
<h4>Example: face recognition</h4>
<p>Pehle engineer HOG nikalta tha phir SVM lagata tha. Ab CNN ko seedha photo do: pehli layers edges pakadti hain, beech ki aankh-naak, aur end mein 128 numbers ka "face code" (FaceNet) banta hai jisme ek hi insaan ki photos paas-paas hoti hain.</p>
<h4>Example: speech</h4>
<p>Pehle MFCC + HMM; ab spectrogram pe CNN/LSTM khud phoneme jaise features seekhta hai.</p>
<h4>Desi example</h4>
<p>Naya cricket fan pehle sirf "ball aayi, bat ghuma" dekhta hai (edges). Kuch match baad woh line-length samajhta hai (shapes), phir "ye googly hai" (parts), aur aakhir mein poori match strategy (object). Kisi ne rule book nahi di, dekh-dekh ke layers mein samajh bani: yahi representation learning hai.</p>
<h4>Achhe representation ki qualities</h4>
<p>Compact, disentangled (pose/light/identity alag), chhote badlav se na badle, dusre task mein bhi kaam aaye.</p>
<p><b>Fayde/nuksaan:</b> manual mehnat khatam, accuracy zyada; par data/compute zyada aur features samajhna mushkil.</p>
<p><b>Conclusion:</b> DL ki asli taakat yahi hai: network apne features ki hierarchy khud bana leta hai.</p>`,
  keys: ["automatic feature extraction", "hand-crafted features", "hierarchical features", "edges → parts → objects", "end-to-end", "embedding", "transfer learning", "self-supervised", "disentangled"],
  draw: "Raw pixels → L1 edges → L2 shapes/textures → L3 parts → L4 object, as a left-to-right chain of boxes.",
  fig: "unit2.html#q5",
  num: false
},
{
  id: "U2-09",
  unit: 2,
  topic: "Activation functions",
  q: "What problem does Leaky ReLU solve compared to ReLU? Explain the dying ReLU problem.",
  alt: [
    "Explain the dying ReLU problem and its solutions.",
    "Differentiate ReLU and Leaky ReLU.",
    "Why is ReLU preferred over sigmoid in hidden layers?"
  ],
  marks: [2, 4],
  priority: "must",
  prob: 74,
  diff: 2,
  pyq: ["7CAI 2025 A2"],
  why: "Direct 7CAI 2025 A2; ReLU family is the most-asked part of the activation topic.",
  short: "ReLU outputs 0 with zero gradient for negative inputs, so neurons can 'die'; Leaky ReLU gives a small slope αz (α≈0.01) for z<0, keeping gradients alive.",
  en: `<p><b>ReLU</b>: f(z) = max(0, z), derivative 1 for z &gt; 0 and 0 for z &lt; 0. It is fast and avoids saturation for positive inputs, so it is the default hidden-layer activation.</p>
<h4>Dying ReLU problem</h4>
<ul>
<li>If a neuron's weighted input z becomes negative for <b>all</b> training examples (often after a large gradient step or a big negative bias), its output is always 0 and its gradient is always 0.</li>
<li>Its weights never update again, so the neuron is permanently "dead". In bad cases up to 40% of a network's neurons can die, wasting capacity.</li>
<li>Causes: high learning rate, poor initialisation, large negative bias.</li>
</ul>
<h4>Leaky ReLU (the fix)</h4>
<div class="formula">f(z) = z if z &gt; 0;  f(z) = αz if z ≤ 0   (α ≈ 0.01)<br>f′(z) = 1 if z &gt; 0;  α if z ≤ 0</div>
<p>The small negative slope means the gradient is never exactly zero, so a "dead" neuron can recover.</p>
<table>
<tr><th>Point</th><th>ReLU</th><th>Leaky ReLU</th></tr>
<tr><td>Negative input</td><td>Output 0</td><td>Output αz (small negative)</td></tr>
<tr><td>Gradient for z&lt;0</td><td>0</td><td>α</td></tr>
<tr><td>Dying neurons</td><td>Possible</td><td>Avoided</td></tr>
<tr><td>Output mean</td><td>Positive</td><td>Closer to 0</td></tr>
<tr><td>Example z = −3</td><td>0</td><td>−0.03</td></tr>
</table>
<h4>Other fixes</h4>
<p>PReLU (α learned), ELU (smooth α(eᶻ−1)), lower learning rate, He initialisation, batch normalisation.</p>
<p><b>Conclusion:</b> Leaky ReLU keeps a tiny gradient for negative inputs, solving the dying ReLU problem while keeping ReLU's speed.</p>`,
  hi: `<p><b>ReLU</b>: f(z) = max(0, z). Positive pe gradient 1, negative pe 0. Fast hai aur positive side pe saturate nahi hota, isliye hidden layers ka default hai.</p>
<h4>Dying ReLU problem kya hai</h4>
<ul>
<li>Agar kisi neuron ka z <b>har</b> training example ke liye negative ho jaaye (bade gradient step ya bade negative bias ki wajah se), to output hamesha 0 aur gradient bhi hamesha 0.</li>
<li>Gradient 0 matlab weights kabhi update nahi honge; neuron hamesha ke liye "mar" gaya. Kabhi-kabhi 40% tak neurons mar jaate hain.</li>
<li>Wajah: zyada learning rate, kharab initialisation, bada negative bias.</li>
</ul>
<h4>Leaky ReLU (ilaaj)</h4>
<div class="formula">f(z) = z (z &gt; 0), αz (z ≤ 0), α ≈ 0.01</div>
<p>Negative side pe chhota sa slope, isliye gradient kabhi exactly zero nahi hota aur neuron wapas zinda ho sakta hai.</p>
<table>
<tr><th>Point</th><th>ReLU</th><th>Leaky ReLU</th></tr>
<tr><td>Negative input</td><td>0</td><td>αz</td></tr>
<tr><td>Gradient (z&lt;0)</td><td>0</td><td>α</td></tr>
<tr><td>Dead neuron</td><td>Ho sakta hai</td><td>Nahi</td></tr>
<tr><td>z = −3</td><td>0</td><td>−0.03</td></tr>
</table>
<h4>Desi example</h4>
<p>ReLU wala teacher negative marks wale student ko bilkul ignore kar deta hai, to woh student kabhi improve hi nahi karta (dead). Leaky ReLU wala teacher usko bhi thoda (1%) feedback deta hai, to dheere-dheere woh sudhar jaata hai.</p>
<h4>Aur solutions</h4>
<p>PReLU (α khud seekho), ELU, chhota learning rate, He initialisation, batch norm.</p>
<p><b>Conclusion:</b> Leaky ReLU negative input pe bhi chhota gradient deta hai, isliye dying ReLU khatam aur speed ReLU jaisi.</p>`,
  keys: ["max(0,z)", "dying ReLU", "zero gradient", "dead neuron", "Leaky ReLU", "α = 0.01", "PReLU", "ELU"],
  draw: "ReLU graph (flat 0 for z<0) next to Leaky ReLU graph (slight downward slope for z<0).",
  fig: "unit2.html#q3",
  num: false
},
{
  id: "U2-10",
  unit: 2,
  topic: "Activation functions",
  q: "Discuss the effect of different activation functions on the performance of a neural network with an example. How do you choose an activation function?",
  alt: [
    "How do activation functions affect training speed and accuracy?",
    "Guidelines for choosing activation functions for hidden and output layers.",
    "Which activation function would you use for binary, multi-class and regression outputs and why?"
  ],
  marks: [4, 10],
  priority: "must",
  prob: 72,
  diff: 3,
  pyq: ["8AID 2025 B3"],
  why: "Asked as 8AID 2025 B3; 'choosing activations' and 'effect on performance' are named in the syllabus.",
  short: "Activations affect gradient flow, speed and accuracy: sigmoid/tanh saturate and slow deep training; ReLU-family trains faster; output layer uses sigmoid, softmax or linear by task.",
  en: `<p>The <b>activation function</b> decides how signals and gradients flow through a network, so it directly affects <b>convergence speed, final accuracy, stability and computational cost</b>.</p>
<h4>Effects on performance</h4>
<ol>
<li><b>Gradient flow:</b> in backprop, each layer multiplies the gradient by f′(z). Sigmoid's f′ ≤ 0.25, so in 10 layers the gradient can shrink by 0.25¹⁰ ≈ 10⁻⁶ (<b>vanishing gradient</b>), and early layers stop learning. ReLU's f′ = 1 for z&gt;0 keeps gradients alive.</li>
<li><b>Convergence speed:</b> zero-centred outputs (tanh, ELU) give better-balanced weight updates than all-positive outputs (sigmoid). In the AlexNet paper (Krizhevsky et al., 2012) a 4-layer CNN with ReLU reached 25% training error on CIFAR-10 about 6× faster than the same net with tanh.</li>
<li><b>Sparsity:</b> ReLU outputs exact zeros, giving sparse, efficient representations.</li>
<li><b>Dead neurons:</b> ReLU may kill neurons; Leaky ReLU/PReLU/ELU avoid it.</li>
<li><b>Cost:</b> ReLU is a comparison; sigmoid, tanh, ELU need exponentials.</li>
<li><b>Output meaning:</b> wrong output activation gives wrong outputs (e.g. ReLU output cannot give probabilities).</li>
</ol>
<h4>Comparison</h4>
<table>
<tr><th>Activation</th><th>Speed</th><th>Vanishing gradient</th><th>Zero-centred</th><th>Typical use</th></tr>
<tr><td>Sigmoid</td><td>Slow</td><td>Severe</td><td>No</td><td>Binary output, gates</td></tr>
<tr><td>Tanh</td><td>Medium</td><td>Yes</td><td>Yes</td><td>RNN/LSTM hidden</td></tr>
<tr><td>ReLU</td><td>Fast</td><td>No (z&gt;0)</td><td>No</td><td>CNN/MLP hidden default</td></tr>
<tr><td>Leaky ReLU / PReLU</td><td>Fast</td><td>No</td><td>Nearly</td><td>When ReLU neurons die</td></tr>
<tr><td>ELU</td><td>Fast convergence</td><td>No</td><td>Nearly</td><td>Deep nets needing smooth output</td></tr>
<tr><td>Softmax</td><td>-</td><td>-</td><td>-</td><td>Multi-class output</td></tr>
</table>
<h4>Example</h4>
<p>Train a 10-hidden-layer MLP on MNIST. With sigmoid in every hidden layer, the loss barely falls for many epochs because the first layers receive tiny gradients; accuracy stays low. Replace with ReLU (He initialisation) and the same network reaches about 98% accuracy within a few epochs. Using softmax at the output gives class probabilities used by cross-entropy loss.</p>
<h4>How to choose</h4>
<ul>
<li><b>Hidden layers:</b> start with ReLU; if many dead neurons, try Leaky ReLU/PReLU/ELU (or GELU in Transformers).</li>
<li><b>RNN/LSTM:</b> tanh for states, sigmoid for gates.</li>
<li><b>Output:</b> binary → sigmoid + binary cross-entropy; multi-class → softmax + categorical cross-entropy; multi-label → sigmoid per class; regression → linear (identity).</li>
<li>Match initialisation: He for ReLU family, Xavier/Glorot for sigmoid/tanh.</li>
</ul>
<p><b>Conclusion:</b> ReLU-family activations in hidden layers and a task-matched output activation give the fastest, most accurate training.</p>`,
  hi: `<p><b>Activation function</b> tay karta hai ki signal aur gradient network mein kaise behenge, isliye ye seedha <b>training speed, accuracy, stability aur compute cost</b> ko affect karta hai.</p>
<h4>Performance pe asar</h4>
<ol>
<li><b>Gradient flow:</b> backprop mein har layer gradient ko f′(z) se multiply karti hai. Sigmoid ka f′ max 0.25, to 10 layer mein 0.25¹⁰ ≈ 10⁻⁶: gradient gayab (<b>vanishing gradient</b>), pehli layers seekhna band. ReLU ka f′ = 1 (z&gt;0), gradient zinda rehta hai.</li>
<li><b>Speed:</b> zero-centred output (tanh, ELU) se updates balanced. AlexNet paper mein ReLU wala 4-layer CNN CIFAR-10 pe tanh wale se lagbhag 6 guna jaldi 25% training error tak pahuncha.</li>
<li><b>Sparsity:</b> ReLU exact 0 deta hai, sparse aur efficient.</li>
<li><b>Dead neurons:</b> ReLU mein ho sakte hain; Leaky/PReLU/ELU se bachao.</li>
<li><b>Cost:</b> ReLU bas comparison; sigmoid/tanh/ELU mein exp.</li>
<li><b>Output ka matlab:</b> galat output activation = galat answer (ReLU se probability nahi milegi).</li>
</ol>
<table>
<tr><th>Activation</th><th>Speed</th><th>Vanishing</th><th>Kahan use</th></tr>
<tr><td>Sigmoid</td><td>Slow</td><td>Bahut</td><td>Binary output, gates</td></tr>
<tr><td>Tanh</td><td>Medium</td><td>Haan</td><td>RNN/LSTM</td></tr>
<tr><td>ReLU</td><td>Fast</td><td>Nahi</td><td>Hidden default</td></tr>
<tr><td>Leaky/PReLU</td><td>Fast</td><td>Nahi</td><td>Dead neurons ho to</td></tr>
<tr><td>ELU</td><td>Fast convergence</td><td>Nahi</td><td>Smooth chahiye to</td></tr>
<tr><td>Softmax</td><td>-</td><td>-</td><td>Multi-class output</td></tr>
</table>
<h4>Example</h4>
<p>MNIST pe 10 hidden layer ka MLP: sab layers sigmoid hon to kai epochs tak loss hilta hi nahi, kyunki pehli layers ko gradient milta hi nahi. Wahi network ReLU + He init ke saath kuch epochs mein ~98% accuracy pe pahunch jaata hai. Output pe softmax se 10 classes ki probability.</p>
<h4>Desi example</h4>
<p>Sigmoid wala network aisa hai jaise 10 logon ki "Chinese whisper" line: har insaan message ka sirf 25% aage bhejta hai, aakhri tak kuch nahi bachta. ReLU wala har insaan pura message aage bhejta hai (agar positive hai).</p>
<h4>Choose kaise karein</h4>
<ul>
<li>Hidden: ReLU se shuru; neurons mar rahe hon to Leaky ReLU/PReLU/ELU.</li>
<li>RNN/LSTM: tanh state ke liye, sigmoid gates ke liye.</li>
<li>Output: binary → sigmoid; multi-class → softmax; multi-label → har class pe sigmoid; regression → linear.</li>
<li>Init match karo: ReLU ke saath He, sigmoid/tanh ke saath Xavier.</li>
</ul>
<p><b>Conclusion:</b> andar ReLU family aur bahar task ke hisaab se output activation: yahi fast aur accurate training ka formula hai.</p>`,
  keys: ["gradient flow", "vanishing gradient", "convergence speed", "zero-centred", "sparsity", "dying ReLU", "output layer: sigmoid/softmax/linear", "He initialisation"],
  draw: "Table of activation vs use, or ReLU/sigmoid curves with the gradient region marked.",
  fig: "unit2.html#q3",
  num: false
},
{
  id: "U2-11",
  unit: 2,
  topic: "Deep learning applications",
  q: "Explain the use of deep networks in computer vision with a real-world example.",
  alt: [
    "Write one major use of deep learning in computer vision.",
    "How are deep neural networks used for image recognition / object detection?"
  ],
  marks: [2, 4],
  priority: "must",
  prob: 70,
  diff: 2,
  pyq: ["7CAI 2025 B6", "7CAI 2025 A6"],
  why: "Asked twice in 7CAI 2025 (A6 and B6).",
  short: "Deep CNNs recognise objects in images; e.g. self-driving cars use CNN-based detectors like YOLO to locate pedestrians, vehicles and traffic signs in real time.",
  en: `<p><b>Deep networks in computer vision</b> (mainly CNNs and Vision Transformers) take raw pixels and learn hierarchical visual features (edges → textures → parts → objects) to classify, detect, segment or generate images.</p>
<h4>Main vision tasks</h4>
<ul>
<li><b>Image classification:</b> one label per image (AlexNet, VGG, ResNet).</li>
<li><b>Object detection:</b> boxes + labels (YOLO, Faster R-CNN, SSD).</li>
<li><b>Segmentation:</b> label every pixel (U-Net, Mask R-CNN).</li>
<li><b>Face recognition/verification:</b> embeddings (FaceNet).</li>
<li><b>Generation/enhancement:</b> super-resolution, GANs, diffusion.</li>
</ul>
<h4>How it works (pipeline)</h4>
<ol>
<li>Input image (e.g. 224×224×3) is normalised.</li>
<li>Convolution + ReLU + pooling layers extract features.</li>
<li>Fully connected / detection head outputs class scores or boxes.</li>
<li>Softmax/sigmoid gives probabilities; trained with cross-entropy (plus box regression loss for detection).</li>
</ol>
<h4>Real-world example: self-driving car</h4>
<p>Cameras feed frames to a CNN detector (e.g. YOLO) that runs in real time (30+ frames/s) and outputs bounding boxes for pedestrians, cars, lanes and traffic lights. A segmentation network marks drivable road. These outputs go to the planning module, which brakes or steers. Tesla Autopilot and Waymo use such deep vision stacks.</p>
<h4>Other examples</h4>
<ul>
<li>Medical: CNN detecting diabetic retinopathy from retina photos with specialist-level accuracy.</li>
<li>Phone face unlock, Google Lens, number-plate recognition, crop-disease detection.</li>
</ul>
<p><b>Advantages:</b> high accuracy, end-to-end, no hand-crafted features. <b>Limitations:</b> large labelled datasets, GPU cost, adversarial attacks.</p>
<p><b>Conclusion:</b> deep CNNs are the backbone of modern computer vision, from phones to autonomous cars.</p>`,
  hi: `<p><b>Computer vision mein deep networks</b> (zyada-tar CNN, ab Vision Transformer bhi) raw pixels lete hain aur layer-by-layer features seekhte hain (edges → texture → parts → object), phir image ko classify, detect, segment ya generate karte hain.</p>
<h4>Main kaam</h4>
<ul>
<li><b>Classification:</b> poori image ka ek label (ResNet).</li>
<li><b>Object detection:</b> box + label (YOLO).</li>
<li><b>Segmentation:</b> har pixel ka label (U-Net).</li>
<li><b>Face recognition:</b> FaceNet embeddings.</li>
<li><b>Generation:</b> super-resolution, GAN, diffusion.</li>
</ul>
<h4>Kaam kaise hota hai</h4>
<ol>
<li>Image (224×224×3) normalise karo.</li>
<li>Convolution + ReLU + pooling se features.</li>
<li>Fully connected ya detection head se class/box.</li>
<li>Softmax se probability; cross-entropy se training.</li>
</ol>
<h4>Real example: self-driving car</h4>
<p>Car ke camera har frame CNN detector (YOLO) ko dete hain jo 30+ frame/sec pe pedestrian, gaadi, lane aur signal ke boxes banata hai. Segmentation network road ka chalne layak hissa batata hai. Ye sab planning module ko jaata hai jo brake ya steering decide karta hai. Tesla aur Waymo aise hi kaam karte hain.</p>
<h4>Desi examples</h4>
<ul>
<li>Delhi/Jaipur traffic cameras jo number plate padh ke e-challan bhejte hain.</li>
<li>Kisan app jo patte ki photo se fasal ki bimaari batata hai.</li>
<li>Retina photo se diabetic retinopathy detection.</li>
</ul>
<p><b>Fayde:</b> high accuracy, end-to-end. <b>Nuksaan:</b> bahut labelled data, GPU, adversarial attack.</p>
<p><b>Conclusion:</b> phone se lekar driverless car tak, computer vision ki reedh ki haddi deep CNN hai.</p>`,
  keys: ["CNN", "image classification", "object detection", "YOLO", "segmentation", "feature hierarchy", "self-driving car", "real time"],
  draw: "Image → [Conv+ReLU → Pool] × n → FC → Softmax/boxes, with a car-camera example label.",
  fig: "unit2.html#q7",
  num: false
},
{
  id: "U2-12",
  unit: 2,
  topic: "Machine learning vs deep learning",
  q: "Explain the types of machine learning (supervised, unsupervised, semi-supervised, self-supervised and reinforcement learning) with examples.",
  alt: [
    "What are the different types of machine learning?",
    "Differentiate supervised, unsupervised and reinforcement learning."
  ],
  marks: [2, 4],
  priority: "high",
  prob: 62,
  diff: 1,
  pyq: ["7CAI 2025 A9"],
  why: "7CAI A9 asked a supervised vs unsupervised learning difference; 'types of ML' is part of the ML vs DL sub-topic.",
  short: "Types of ML: supervised (labelled data, e.g. spam detection), unsupervised (unlabelled, e.g. clustering), semi/self-supervised (few or self-made labels) and reinforcement (learning from rewards, e.g. game-playing).",
  en: `<p><b>Machine learning</b> is learning patterns from data to make decisions without explicit programming. It is classified by the kind of feedback the learner gets.</p>
<table>
<tr><th>Type</th><th>Data / feedback</th><th>Goal</th><th>Example</th></tr>
<tr><td><b>Supervised</b></td><td>Labelled (x, y)</td><td>Learn mapping x → y (classification, regression)</td><td>Spam detection, house-price prediction, CNN image classifier</td></tr>
<tr><td><b>Unsupervised</b></td><td>Only x</td><td>Find structure: clusters, low-dim codes, density</td><td>Customer segmentation (k-means), autoencoder, PCA</td></tr>
<tr><td><b>Semi-supervised</b></td><td>Few labels + many unlabelled</td><td>Use unlabelled data to improve a supervised model</td><td>Classifying web pages with 1% labels; pseudo-labelling</td></tr>
<tr><td><b>Self-supervised</b></td><td>Labels created from the data itself</td><td>Learn general representations via a pretext task</td><td>BERT predicts masked words; GPT predicts next word</td></tr>
<tr><td><b>Reinforcement</b></td><td>Reward / penalty from environment</td><td>Learn a policy that maximises total reward</td><td>AlphaGo, robot walking, game agents</td></tr>
</table>
<h4>Where deep learning fits</h4>
<p>Deep networks can be used in every type: CNN (supervised), autoencoder/RBM (unsupervised), BERT (self-supervised), deep Q-network (reinforcement).</p>
<p><b>Conclusion:</b> the type of ML is decided by the supervision signal: labels, no labels, few labels, self-made labels, or rewards.</p>`,
  hi: `<p><b>Machine learning</b> = data se pattern seekh ke decision lena, bina har rule likhe. Iske types is baat se tay hote hain ki learner ko feedback kis tarah ka milta hai.</p>
<table>
<tr><th>Type</th><th>Data/feedback</th><th>Kaam</th><th>Example</th></tr>
<tr><td><b>Supervised</b></td><td>Label wala (x, y)</td><td>x se y predict</td><td>Spam detection, ghar ka price</td></tr>
<tr><td><b>Unsupervised</b></td><td>Sirf x</td><td>Groups/patterns dhoondhna</td><td>Customer segments, autoencoder</td></tr>
<tr><td><b>Semi-supervised</b></td><td>Thode label + bahut bina label</td><td>Bina label wale data se model sudhaarna</td><td>1% labelled web pages</td></tr>
<tr><td><b>Self-supervised</b></td><td>Data se khud label banana</td><td>General features seekhna</td><td>BERT masked word, GPT next word</td></tr>
<tr><td><b>Reinforcement</b></td><td>Reward/saza</td><td>Total reward maximise</td><td>AlphaGo, robot chalna</td></tr>
</table>
<h4>Desi example</h4>
<ul>
<li>Supervised: tuition teacher har sawaal ka answer batata hai.</li>
<li>Unsupervised: shaadi mein bina bataye pehchan lena kaun ladke wale hain, kaun ladki wale.</li>
<li>Semi-supervised: 5 sawaal solved mile, baaki 95 unhi ke pattern se khud karo.</li>
<li>Self-supervised: newspaper ke kuch shabd chhupa ke khud guess karna.</li>
<li>Reinforcement: cycle chalana seekhna: giro to saza, balance bane to reward.</li>
</ul>
<p>Deep learning sab mein use hota hai: CNN (supervised), autoencoder (unsupervised), BERT (self-supervised), DQN (reinforcement).</p>
<p><b>Conclusion:</b> type is baat se decide hota hai ki signal kya hai: label, no label, thode label, khud ke label, ya reward.</p>`,
  keys: ["supervised", "unsupervised", "semi-supervised", "self-supervised", "reinforcement learning", "labels", "reward", "policy"],
  draw: "Tree: ML → Supervised / Unsupervised / Semi / Self-supervised / Reinforcement with one example each.",
  fig: "unit2.html#q4",
  num: false
},
{
  id: "U2-13",
  unit: 2,
  topic: "Activation functions",
  q: "What is the vanishing gradient problem? How do activation functions like ReLU help to solve it?",
  alt: [
    "Explain the vanishing and exploding gradient problems and their remedies.",
    "Why do sigmoid and tanh cause vanishing gradients in deep networks?"
  ],
  marks: [2, 4],
  priority: "high",
  prob: 58,
  diff: 3,
  pyq: [],
  why: "Not asked directly yet but named in the activation-function syllabus and underlies 8AID 2025 B3; due.",
  short: "In deep nets, gradients are products of many small derivatives (sigmoid′ ≤ 0.25), so they shrink to near zero in early layers; ReLU (derivative 1), good initialisation, batch norm and residual links fix it.",
  en: `<p><b>Vanishing gradient problem:</b> during backpropagation the gradient reaching early layers becomes extremely small, so their weights barely change and the deep network learns very slowly or not at all.</p>
<h4>Why it happens</h4>
<div class="formula">∂L/∂W₁ = ∂L/∂a<sub>L</sub> · f′(z<sub>L</sub>)W<sub>L</sub> · … · f′(z₂)W₂ · f′(z₁) · x</div>
<ul>
<li>The chain rule multiplies one f′(z) per layer.</li>
<li>Sigmoid: f′ = σ(1−σ) ≤ 0.25; tanh: f′ ≤ 1 and near 0 when saturated (|z| large).</li>
<li>With 10 sigmoid layers: 0.25¹⁰ ≈ 9.5 × 10⁻⁷, so the first layer gets about a millionth of the signal.</li>
</ul>
<p><b>Exploding gradient</b> is the opposite: factors &gt; 1 (large weights) multiply to huge values, giving NaN losses; common in RNNs.</p>
<h4>Symptoms</h4>
<p>Loss stuck, early-layer weights unchanged, later layers learn while early ones do not.</p>
<h4>Solutions</h4>
<ul>
<li><b>ReLU family:</b> f′ = 1 for z&gt;0, so the product does not shrink (Leaky ReLU/ELU also keep gradient for z&lt;0).</li>
<li><b>Weight initialisation:</b> He (Var = 2/n<sub>in</sub>) for ReLU, Xavier (Var = 2/(n<sub>in</sub>+n<sub>out</sub>)) for tanh.</li>
<li><b>Batch normalisation:</b> keeps z in the non-saturated range.</li>
<li><b>Residual (skip) connections</b> (ResNet): gradient flows directly through identity paths.</li>
<li><b>LSTM/GRU gates</b> for recurrent nets; <b>gradient clipping</b> for exploding gradients.</li>
<li>Historically: greedy layer-wise pre-training (RBMs/autoencoders).</li>
</ul>
<p><b>Conclusion:</b> vanishing gradients come from multiplying small activation derivatives; ReLU-type activations plus good initialisation and skip connections let very deep networks train.</p>`,
  hi: `<p><b>Vanishing gradient problem:</b> backprop mein jab gradient pichhe ki (shuru ki) layers tak pahunchta hai to itna chhota ho jaata hai ki unke weights lagbhag badalte hi nahi. Deep network seekh hi nahi paata.</p>
<h4>Kyun hota hai</h4>
<div class="formula">∂L/∂W₁ = … · f′(z₃)W₃ · f′(z₂)W₂ · f′(z₁) · x</div>
<ul>
<li>Chain rule har layer ka ek f′(z) multiply karta hai.</li>
<li>Sigmoid ka f′ max 0.25; tanh saturate hone pe 0 ke paas.</li>
<li>10 sigmoid layer: 0.25¹⁰ ≈ 9.5 × 10⁻⁷, yaani pehli layer ko signal ka 10 lakhwa hissa milta hai.</li>
</ul>
<p><b>Exploding gradient</b> ulta hai: factors 1 se bade, multiply hoke bahut bade, loss NaN. RNN mein common.</p>
<h4>Pehchaan</h4>
<p>Loss atka hua, shuru ki layers ke weights same, sirf aakhri layers seekh rahi.</p>
<h4>Ilaaj</h4>
<ul>
<li><b>ReLU family:</b> z&gt;0 pe f′ = 1, product chhota nahi hota.</li>
<li><b>Initialisation:</b> ReLU ke saath He (Var = 2/n<sub>in</sub>), tanh ke saath Xavier.</li>
<li><b>Batch norm:</b> z ko saturate hone se bachata hai.</li>
<li><b>Skip connections (ResNet):</b> gradient ke liye seedha highway.</li>
<li><b>LSTM/GRU</b> RNN ke liye; <b>gradient clipping</b> exploding ke liye.</li>
<li>Purana tareeka: greedy layer-wise pre-training.</li>
</ul>
<h4>Desi example</h4>
<p>Gaon mein 10 logon ki chain se paani ki balti bhejo, har insaan sirf 25% paani aage deta hai. Aakhri tak ek boond bhi nahi bachti: yahi sigmoid ka vanishing gradient hai. ReLU wale log poori balti aage dete hain.</p>
<p><b>Conclusion:</b> chhote derivatives ka multiplication hi problem hai; ReLU, achha init aur skip connections se deep network train ho jaata hai.</p>`,
  keys: ["chain rule", "sigmoid derivative ≤ 0.25", "saturation", "early layers", "exploding gradient", "ReLU", "He/Xavier initialisation", "batch normalisation", "residual connections", "gradient clipping"],
  draw: "Chain of layers with gradient arrows getting thinner towards the input layer.",
  fig: "unit2.html#q3",
  num: false
},
{
  id: "U2-14",
  unit: 2,
  topic: "Width and depth of neural networks",
  q: "Explain the width and depth of a neural network. Why are deeper networks generally preferred over wide shallow networks?",
  alt: [
    "Differentiate between deep and shallow neural networks.",
    "What is meant by depth of a neural network?",
    "Explain the effect of width and depth on model capacity."
  ],
  marks: [2, 4],
  priority: "high",
  prob: 55,
  diff: 2,
  pyq: [],
  why: "Named syllabus sub-topic, never asked yet; due as a Part A or 4-mark question.",
  short: "Width = number of neurons in a layer; depth = number of layers. Depth lets networks build hierarchical features and represent complex functions with far fewer parameters than a very wide shallow net.",
  en: `<p><b>Width</b> of a neural network is the <b>number of neurons in a layer</b> (the largest hidden layer). <b>Depth</b> is the <b>number of layers</b> with learnable weights (hidden + output). A network with 784 inputs, two hidden layers of 512 and 10 outputs has depth 3 and width 512.</p>
<h4>Effect on capacity</h4>
<ul>
<li>More width or depth means more parameters and higher capacity (can fit more complex functions).</li>
<li>Parameters of a dense layer = n<sub>in</sub> × n<sub>out</sub> + n<sub>out</sub>. E.g. 784 → 100 → 10 has 784×100+100 + 100×10+10 = 79,510 parameters.</li>
<li><b>Universal approximation theorem</b> (Cybenko 1989, Hornik 1991): one hidden layer with enough neurons can approximate any continuous function, but it may need exponentially many neurons.</li>
</ul>
<h4>Why deep is preferred</h4>
<ul>
<li><b>Hierarchical features:</b> each layer reuses the previous one's features (edges → shapes → objects).</li>
<li><b>Parameter efficiency:</b> some functions need exponentially many units if shallow but polynomially many if deep.</li>
<li><b>Better generalisation</b> on images, speech, text in practice (VGG-16, ResNet-152).</li>
</ul>
<h4>Comparison</h4>
<table>
<tr><th>Point</th><th>Wide &amp; shallow</th><th>Deep &amp; narrow</th></tr>
<tr><td>Layers</td><td>1–2</td><td>Many</td></tr>
<tr><td>Feature hierarchy</td><td>No</td><td>Yes</td></tr>
<tr><td>Parameters for same power</td><td>Many</td><td>Fewer</td></tr>
<tr><td>Training difficulty</td><td>Easy</td><td>Vanishing gradients, needs ReLU/BN/skip links</td></tr>
<tr><td>Parallelism</td><td>High (fast per layer)</td><td>Sequential layers, slower inference</td></tr>
</table>
<h4>Too much of either</h4>
<p>Too wide/deep: overfitting, high memory and compute; too deep without care: vanishing gradients and degradation (solved by ResNet). Too small: underfitting. Practical models balance both (e.g. EfficientNet scales width, depth and resolution together).</p>
<p><b>Conclusion:</b> width gives more features per level, depth gives more levels of abstraction; depth is usually the more efficient way to add power.</p>`,
  hi: `<p><b>Width</b> = ek layer mein kitne neurons (sabse badi hidden layer). <b>Depth</b> = kitni layers jinke weights seekhe jaate hain. Jaise 784 input → 512 → 512 → 10 output: depth 3, width 512.</p>
<h4>Capacity pe asar</h4>
<ul>
<li>Width ya depth badhao to parameters aur capacity badhti hai.</li>
<li>Dense layer ke parameters = n<sub>in</sub> × n<sub>out</sub> + n<sub>out</sub>. 784 → 100 → 10 mein 79,510 parameters.</li>
<li><b>Universal approximation theorem:</b> ek hidden layer bhi kaafi neurons ke saath koi bhi continuous function bana sakti hai, par neurons exponentially zyada lag sakte hain.</li>
</ul>
<h4>Deep kyun behtar</h4>
<ul>
<li><b>Hierarchy:</b> har layer pichhli layer ke features reuse karti hai.</li>
<li><b>Kam parameters</b> mein wahi power.</li>
<li>Image, speech, text pe practically behtar (VGG, ResNet).</li>
</ul>
<table>
<tr><th>Point</th><th>Wide shallow</th><th>Deep narrow</th></tr>
<tr><td>Layers</td><td>1–2</td><td>Bahut</td></tr>
<tr><td>Hierarchy</td><td>Nahi</td><td>Haan</td></tr>
<tr><td>Parameters</td><td>Zyada</td><td>Kam</td></tr>
<tr><td>Training</td><td>Asaan</td><td>Vanishing gradient ka dhyan</td></tr>
</table>
<h4>Desi example</h4>
<p>Width = ek floor pe kitne mazdoor. Depth = building mein kitne floor. 1000 mazdoor ek hi floor pe khade karke 10 manzil ka kaam nahi hota; floor-by-floor (depth) banana zyada efficient hai, har floor pichhle pe tikta hai.</p>
<h4>Zyada ho jaaye to</h4>
<p>Overfitting, memory/compute zyada; bahut deep bina care ke to vanishing gradient. Bahut chhota to underfitting. EfficientNet dono ko balance karta hai.</p>
<p><b>Conclusion:</b> width = har level pe zyada features, depth = zyada levels of abstraction; power badhane ka efficient tareeka depth hai.</p>`,
  keys: ["width = neurons per layer", "depth = number of layers", "capacity", "universal approximation theorem", "hierarchical features", "parameter efficiency", "overfitting", "vanishing gradient"],
  draw: "Network diagram with an arrow across layers labelled 'depth' and an arrow down one layer labelled 'width'.",
  fig: "unit2.html#q6",
  num: false
},
{
  id: "U2-15",
  unit: 2,
  topic: "Supervised vs unsupervised training of neural networks",
  q: "Explain greedy layer-wise unsupervised pre-training of deep networks.",
  alt: [
    "What is unsupervised pre-training? Why was it important for deep learning?",
    "Explain pre-training followed by fine-tuning."
  ],
  marks: [2, 4],
  priority: "high",
  prob: 55,
  diff: 3,
  pyq: ["8AID 2025 C2", "7CAI 2025 B7"],
  why: "Core part of the 'how is an unsupervised NN trained' answers (8AID C2, 7CAI B7); likely as a standalone 4-mark question.",
  short: "Greedy layer-wise pre-training trains one layer at a time (as an RBM or autoencoder) on unlabelled data, stacks them, then fine-tunes the whole deep network with labels via backprop.",
  en: `<p><b>Greedy layer-wise pre-training</b> (Hinton et al. 2006; Bengio et al. 2007) trains a deep network <b>one layer at a time</b> using unsupervised learning, then fine-tunes the whole stack. "Greedy" because each layer is optimised on its own without considering later layers.</p>
<h4>Steps</h4>
<ol>
<li>Train layer 1 as an RBM (or autoencoder) on raw input x, giving features h₁.</li>
<li>Freeze layer 1; use h₁ as input to train layer 2, giving h₂.</li>
<li>Repeat for all hidden layers; each learns a higher-level representation.</li>
<li>Stack the layers (Deep Belief Network or stacked autoencoder) and add an output layer.</li>
<li><b>Fine-tune</b> all weights with backprop using labelled data (supervised).</li>
</ol>
<h4>Why it helps</h4>
<ul>
<li>Gives good <b>initial weights</b> near a good region, so training avoids poor local minima.</li>
<li>Reduces the vanishing gradient issue of deep sigmoid nets (2006 era).</li>
<li>Uses cheap <b>unlabelled</b> data; works as a regulariser when labels are few.</li>
</ul>
<h4>Example</h4>
<p>MNIST: 784 → 500 → 500 → 2000 RBMs pre-trained on all images, then fine-tuned with labels; this DBN reached about 1.25% error in 2006, beating standard backprop nets of that time.</p>
<h4>Today</h4>
<p>ReLU, batch norm, good initialisation and large labelled data made it less necessary; its idea lives on in self-supervised pre-training + fine-tuning (BERT, GPT).</p>
<p><b>Conclusion:</b> layer-wise pre-training builds a deep net layer by layer from unlabelled data and then fine-tunes it, the trick that restarted deep learning in 2006.</p>`,
  hi: `<p><b>Greedy layer-wise pre-training</b> mein deep network ko <b>ek-ek layer karke</b> unsupervised tareeke se train karte hain, phir poore network ko fine-tune karte hain. "Greedy" isliye kyunki har layer sirf apna best dekhti hai, aage ki layers ki fikar nahi.</p>
<h4>Steps</h4>
<ol>
<li>Layer 1 ko RBM/autoencoder ki tarah raw x pe train karo, features h₁ milenge.</li>
<li>Layer 1 freeze, h₁ ko input bana ke layer 2 train karo, h₂ milega.</li>
<li>Har hidden layer ke liye repeat; har layer upar ka concept seekhti hai.</li>
<li>Sab layers stack karo (DBN ya stacked AE), upar output layer lagao.</li>
<li>Labelled data se poore network ko backprop se <b>fine-tune</b> karo.</li>
</ol>
<h4>Fayda</h4>
<ul>
<li>Achhe <b>starting weights</b>, kharab local minima se bachav.</li>
<li>Purane sigmoid nets ka vanishing gradient kam.</li>
<li>Sasta unlabelled data use hota hai, labels kam hon to bhi chalega.</li>
</ul>
<h4>Example</h4>
<p>2006 mein MNIST pe 784 → 500 → 500 → 2000 RBMs pre-train karke fine-tune kiya, error ~1.25%, us time ke normal backprop nets se behtar.</p>
<h4>Desi example</h4>
<p>Building banate waqt pehle ground floor pakka karte ho, uske sukhne ke baad hi pehla floor, phir doosra. Aakhir mein poori building ki finishing (fine-tuning). Sab floor ek saath daaloge to building gir sakti hai.</p>
<h4>Aaj</h4>
<p>ReLU, batch norm, achha init aur bade datasets se iski zaroorat kam hui; par yahi idea BERT/GPT ke pre-training + fine-tuning mein zinda hai.</p>
<p><b>Conclusion:</b> layer-by-layer bina label ke banao, phir labels se fine-tune: isi trick ne 2006 mein deep learning ko wapas zinda kiya.</p>`,
  keys: ["one layer at a time", "RBM / autoencoder", "freeze", "stack", "Deep Belief Network", "fine-tuning", "initialisation", "unlabelled data"],
  draw: "Input → Layer 1 (RBM) → h₁ → Layer 2 → h₂ → … → fine-tune with labels.",
  fig: "unit2.html#q1",
  num: false
},
{
  id: "U2-16",
  unit: 2,
  topic: "Restricted Boltzmann Machines",
  q: "Explain contrastive divergence and Gibbs sampling used to train an RBM.",
  alt: [
    "How is an RBM trained? Explain the CD-k algorithm.",
    "What is Gibbs sampling? Why is it used in RBMs?"
  ],
  marks: [2, 4],
  priority: "high",
  prob: 55,
  diff: 4,
  pyq: ["7CAI 2025 B2"],
  why: "Training is part of the RBM 'working' asked in 7CAI B2; contrastive divergence and Gibbs sampling are named syllabus items.",
  short: "Gibbs sampling alternately samples h from p(h|v) and v from p(v|h); contrastive divergence runs only k such steps and updates ΔW = η(⟨vhᵀ⟩data − ⟨vhᵀ⟩recon).",
  en: `<p>The exact log-likelihood gradient of an RBM is</p>
<div class="formula">∂ log p(v)/∂wᵢⱼ = ⟨vᵢhⱼ⟩<sub>data</sub> − ⟨vᵢhⱼ⟩<sub>model</sub></div>
<p>The model term needs samples from the RBM's own distribution, which needs the intractable partition function Z. Gibbs sampling and contrastive divergence solve this.</p>
<h4>Gibbs sampling</h4>
<ul>
<li>A Markov Chain Monte Carlo method: sample each variable from its conditional given the others.</li>
<li>In an RBM, hidden units are independent given v (and vice versa), so a whole layer is sampled at once (<b>block Gibbs sampling</b>):
<div class="formula">hⱼ ~ p(hⱼ=1|v) = σ(bⱼ + Σᵢ vᵢwᵢⱼ)<br>vᵢ ~ p(vᵢ=1|h) = σ(aᵢ + Σⱼ wᵢⱼhⱼ)</div></li>
<li>Running v → h → v → h … for very many steps gives samples from the model distribution, but this is slow.</li>
</ul>
<h4>Contrastive Divergence (CD-k), Hinton 2002</h4>
<ol>
<li>Start the chain at a training example v⁰ (not random).</li>
<li>Sample h⁰ ~ p(h|v⁰) (positive phase).</li>
<li>Run k Gibbs steps (usually k = 1): v¹ ~ p(v|h⁰), h¹ from p(h|v¹) (negative phase).</li>
<li>Update:
<div class="formula">ΔW = η(v⁰h⁰ᵀ − v<sup>k</sup>h<sup>k</sup>ᵀ),  Δa = η(v⁰ − v<sup>k</sup>),  Δb = η(h⁰ − h<sup>k</sup>)</div></li>
<li>Repeat over mini-batches.</li>
</ol>
<p><b>Intuition:</b> raise the probability (lower the energy) of real data and lower the probability of the model's own reconstructions. When reconstructions match the data, the update becomes zero.</p>
<p>Variant: <b>Persistent CD</b> keeps the chain running across updates for better model samples.</p>
<p><b>Conclusion:</b> Gibbs sampling exploits the RBM's bipartite structure, and CD-k cuts it to a few steps, making RBM training fast and practical.</p>`,
  hi: `<p>RBM ka exact gradient:</p>
<div class="formula">∂ log p(v)/∂wᵢⱼ = ⟨vᵢhⱼ⟩<sub>data</sub> − ⟨vᵢhⱼ⟩<sub>model</sub></div>
<p>Pehla term data se aasaani se milta hai, par doosre (model) term ke liye RBM ke apne distribution se samples chahiye, jiske liye Z chahiye jo nikalna almost impossible hai. Iska jugaad: Gibbs sampling aur contrastive divergence.</p>
<h4>Gibbs sampling</h4>
<ul>
<li>MCMC tareeka: har variable ko baaki sab diye hue uske conditional se sample karo.</li>
<li>RBM mein v diya ho to saare h independent, isliye poori layer ek saath sample ho jaati hai (<b>block Gibbs</b>):
<div class="formula">hⱼ ~ σ(bⱼ + Σ vᵢwᵢⱼ),  vᵢ ~ σ(aᵢ + Σ wᵢⱼhⱼ)</div></li>
<li>v → h → v → h … bahut der chalao to model ke samples milte hain, par ye slow hai.</li>
</ul>
<h4>Contrastive Divergence (CD-k)</h4>
<ol>
<li>Chain ko random se nahi, real training example v⁰ se shuru karo.</li>
<li>h⁰ sample karo (positive phase).</li>
<li>Sirf k step (aksar k = 1) Gibbs chalao: v¹, phir h¹ (negative phase).</li>
<li>Update: ΔW = η(v⁰h⁰ᵀ − v<sup>k</sup>h<sup>k</sup>ᵀ), biases bhi aise hi.</li>
<li>Mini-batches pe repeat.</li>
</ol>
<p><b>Samjho:</b> real data ki energy neeche karo (probability upar), model ki apni banayi copy ki energy upar karo. Jab copy data jaisi ho jaaye, update zero ho jaata hai: training poori.</p>
<h4>Desi example</h4>
<p>Rangoli seekhne wala student: teacher ki rangoli (data) dekhta hai, apni copy banata hai (reconstruction), dono ka farq dekh ke apna haath sudhaarta hai. Poora din practice (full Gibbs) ki zaroorat nahi, ek-do baar copy karke farq dekhna (CD-1) bhi kaafi hai.</p>
<p>Variant: <b>Persistent CD</b> mein chain updates ke beech chalti rehti hai.</p>
<p><b>Conclusion:</b> Gibbs sampling RBM ke bipartite structure ka fayda uthata hai, aur CD-k usko kuch steps mein kaat ke training fast bana deta hai.</p>`,
  keys: ["positive phase", "negative phase", "Gibbs sampling", "block sampling", "Markov chain", "CD-1", "reconstruction", "ΔW = η(⟨vhᵀ⟩data − ⟨vhᵀ⟩recon)", "partition function"],
  draw: "v⁰ → h⁰ → v¹ → h¹ chain with arrows labelled p(h|v) and p(v|h).",
  fig: "unit2.html#q2",
  num: false
},
{
  id: "U2-17",
  unit: 2,
  topic: "Restricted Boltzmann Machines",
  q: "What is a Deep Belief Network (DBN)? Explain its architecture and training.",
  alt: [
    "How are RBMs stacked to form a Deep Belief Network?",
    "Differentiate between an RBM and a DBN."
  ],
  marks: [2, 4],
  priority: "high",
  prob: 50,
  diff: 3,
  pyq: [],
  why: "Named syllabus item under RBMs; never asked yet, due.",
  short: "A DBN is a deep generative model made by stacking RBMs; it is pre-trained greedily layer by layer with contrastive divergence and then fine-tuned with backprop.",
  en: `<p><b>Deep Belief Network (DBN)</b>: a deep generative probabilistic model formed by <b>stacking RBMs</b>, introduced by Hinton, Osindero and Teh (2006). It was the first deep architecture that could be trained effectively and sparked the deep learning revival.</p>
<h4>Architecture</h4>
<ul>
<li>One visible (input) layer and several hidden layers of binary stochastic units.</li>
<li><b>Top two layers</b> have undirected, symmetric connections (an RBM, "associative memory").</li>
<li><b>Lower layers</b> have directed top-down connections (a sigmoid belief network) used to generate data.</li>
<li>No connections within a layer.</li>
</ul>
<h4>Training</h4>
<ol>
<li><b>Pre-training (unsupervised, greedy):</b> train RBM-1 on input v with CD; its hidden activations become data for RBM-2; continue up the stack.</li>
<li><b>Fine-tuning:</b> for classification, add a softmax layer and train all weights with backprop on labelled data; for generation, use the wake-sleep algorithm.</li>
</ol>
<h4>RBM vs DBN</h4>
<table>
<tr><th>RBM</th><th>DBN</th></tr>
<tr><td>2 layers (visible + hidden)</td><td>Many layers</td></tr>
<tr><td>Fully undirected</td><td>Top 2 undirected, rest directed</td></tr>
<tr><td>Learns one level of features</td><td>Learns a hierarchy of features</td></tr>
<tr><td>Trained by CD</td><td>Layer-wise CD + fine-tuning</td></tr>
</table>
<h4>Applications</h4>
<p>Handwritten digit recognition (MNIST), early speech recognition acoustic models (2009–2012), dimensionality reduction, feature extraction.</p>
<p><b>Conclusion:</b> a DBN is a stack of RBMs trained greedily, the model that first proved deep networks could be trained.</p>`,
  hi: `<p><b>Deep Belief Network (DBN)</b> ek deep generative model hai jo <b>RBMs ko ek ke upar ek stack</b> karke banta hai. Hinton, Osindero aur Teh ne 2006 mein diya, aur isi se deep learning ka comeback hua.</p>
<h4>Architecture</h4>
<ul>
<li>Ek visible layer, upar kai hidden layers (binary random units).</li>
<li><b>Upar ki do layers</b> ke beech undirected connection (RBM, "associative memory").</li>
<li><b>Neeche ki layers</b> directed, upar se neeche (data generate karne ke liye).</li>
<li>Layer ke andar koi connection nahi.</li>
</ul>
<h4>Training</h4>
<ol>
<li><b>Pre-training:</b> RBM-1 ko input pe CD se train karo; uske hidden outputs RBM-2 ka data; aise hi upar tak.</li>
<li><b>Fine-tuning:</b> classification ke liye upar softmax lagao aur labels se backprop; generation ke liye wake-sleep algorithm.</li>
</ol>
<table>
<tr><th>RBM</th><th>DBN</th></tr>
<tr><td>2 layers</td><td>Bahut layers</td></tr>
<tr><td>Poora undirected</td><td>Upar 2 undirected, baaki directed</td></tr>
<tr><td>Ek level ke features</td><td>Features ki hierarchy</td></tr>
<tr><td>CD se</td><td>Layer-wise CD + fine-tune</td></tr>
</table>
<h4>Desi example</h4>
<p>DBN ek tiffin ka dabba hai: har dabba (RBM) alag se bharte ho (dal, sabzi, roti), phir sab ko ek ke upar ek jod ke poora tiffin (deep network) bana dete ho, aur aakhir mein dhakkan kas dete ho (fine-tuning).</p>
<h4>Applications</h4>
<p>MNIST digit recognition, 2009–2012 ke speech recognition models, dimensionality reduction, feature extraction.</p>
<p><b>Conclusion:</b> DBN = greedy tareeke se trained RBMs ka stack; isi ne pehli baar dikhaya ki deep networks train ho sakte hain.</p>`,
  keys: ["stacked RBMs", "generative model", "top two layers undirected", "directed lower layers", "greedy layer-wise", "contrastive divergence", "fine-tuning", "Hinton 2006"],
  draw: "Stack: v → h₁ → h₂ ↔ h₃, with directed arrows in the lower part and an undirected link between the top two layers.",
  fig: "unit2.html#q2",
  num: false
},
{
  id: "U2-18",
  unit: 2,
  topic: "Autoencoders (architecture)",
  q: "What is an autoencoder? Explain its basic architecture and applications.",
  alt: [
    "Write one application of autoencoders.",
    "Explain the encoder, code and decoder of an autoencoder.",
    "What are the applications of autoencoders?"
  ],
  marks: [2, 4],
  priority: "high",
  prob: 50,
  diff: 2,
  pyq: ["8AID 2024 A10", "7CAI 2025 A3"],
  why: "Autoencoder applications asked in 8AID 2024 A10 and 7CAI A3; listed under Unit 2 architectures (details in Unit 5).",
  short: "An autoencoder is an unsupervised network that encodes input x into a smaller code h and decodes it back to x̂, minimising reconstruction error; used for dimensionality reduction, denoising and anomaly detection.",
  en: `<p><b>Autoencoder (AE):</b> an unsupervised neural network trained to <b>reproduce its input at its output</b>. Forced through a narrow middle layer (bottleneck), it learns a compact representation of the data.</p>
<h4>Architecture</h4>
<ul>
<li><b>Encoder:</b> h = f(W<sub>e</sub>x + b<sub>e</sub>) compresses input to code.</li>
<li><b>Code / bottleneck (latent space):</b> h, smaller than x in an undercomplete AE.</li>
<li><b>Decoder:</b> x̂ = g(W<sub>d</sub>h + b<sub>d</sub>) reconstructs the input.</li>
<li><b>Loss:</b> <div class="formula">L(x, x̂) = ‖x − x̂‖²  (or binary cross-entropy)</div></li>
</ul>
<p>Example shape: 784 → 128 → 32 → 128 → 784 for MNIST.</p>
<h4>Main types (detail in Unit 5)</h4>
<p>Undercomplete, sparse, denoising, contractive, variational (VAE), stacked autoencoders.</p>
<h4>Applications</h4>
<ul>
<li>Dimensionality reduction / visualisation (non-linear PCA).</li>
<li><b>Anomaly detection:</b> train on normal data; a high reconstruction error flags fraud or machine faults.</li>
<li>Denoising images, image compression.</li>
<li>Feature learning and pre-training of deep nets.</li>
<li>Generation of new data (VAE), recommendation.</li>
</ul>
<p><b>Conclusion:</b> an autoencoder learns a compressed code of its input without labels, useful for compression, denoising and anomaly detection.</p>`,
  hi: `<p><b>Autoencoder</b> ek unsupervised neural network hai jo <b>input ko hi output pe wapas banana</b> seekhta hai. Beech mein patli layer (bottleneck) hoti hai, isliye usko data ka chhota, kaam ka summary seekhna padta hai.</p>
<h4>Architecture</h4>
<ul>
<li><b>Encoder:</b> h = f(W<sub>e</sub>x + b<sub>e</sub>), input ko compress karta hai.</li>
<li><b>Code/bottleneck:</b> h, x se chhota.</li>
<li><b>Decoder:</b> x̂ = g(W<sub>d</sub>h + b<sub>d</sub>), wapas input banata hai.</li>
<li><b>Loss:</b> ‖x − x̂‖².</li>
</ul>
<p>Jaise MNIST ke liye 784 → 128 → 32 → 128 → 784.</p>
<h4>Types (detail Unit 5 mein)</h4>
<p>Undercomplete, sparse, denoising, contractive, variational, stacked.</p>
<h4>Applications</h4>
<ul>
<li>Dimensionality reduction (non-linear PCA).</li>
<li><b>Anomaly detection:</b> sirf normal data pe train karo; reconstruction error zyada aaye to fraud/kharabi.</li>
<li>Photo ka noise hatana, compression.</li>
<li>Feature learning, pre-training.</li>
<li>Naya data banana (VAE).</li>
</ul>
<h4>Desi example</h4>
<p>Jaise lambi kahani ko dost ko 3 line mein WhatsApp karna (encoder), aur dost un 3 line se poori kahani wapas suna de (decoder). Agar kahani ajeeb ho (anomaly), to woh theek se wapas nahi suna paayega: error zyada.</p>
<p><b>Conclusion:</b> autoencoder bina label ke input ka compressed code seekhta hai; compression, denoising aur anomaly detection mein kaam aata hai.</p>`,
  keys: ["encoder", "decoder", "bottleneck / latent code", "reconstruction error", "unsupervised", "dimensionality reduction", "anomaly detection", "denoising"],
  draw: "Hourglass shape: input layer → smaller encoder layers → code → expanding decoder layers → output x̂.",
  fig: "",
  num: false
},
{
  id: "U2-19",
  unit: 2,
  topic: "Restricted Boltzmann Machines",
  q: "Write the energy function of an RBM and derive/explain its conditional probabilities p(h|v) and p(v|h). Compute them for a small RBM.",
  alt: [
    "Explain the energy-based model of an RBM.",
    "Why are hidden units conditionally independent given the visible units in an RBM?"
  ],
  marks: [2, 4],
  priority: "med",
  prob: 45,
  diff: 4,
  pyq: [],
  why: "Energy function and conditional probabilities are named syllabus items; could appear inside an RBM answer or as a small numerical.",
  short: "RBM energy E(v,h) = −aᵀv − bᵀh − vᵀWh, p(v,h) = e^−E/Z; conditionals are p(hⱼ=1|v) = σ(bⱼ + Σᵢvᵢwᵢⱼ) and p(vᵢ=1|h) = σ(aᵢ + Σⱼwᵢⱼhⱼ).",
  en: `<p>An RBM is an <b>energy-based model</b>: every joint configuration (v, h) gets a scalar energy; low energy means high probability.</p>
<h4>Energy function</h4>
<div class="formula">E(v, h) = − Σᵢ aᵢvᵢ − Σⱼ bⱼhⱼ − Σᵢ Σⱼ vᵢ wᵢⱼ hⱼ  =  −aᵀv − bᵀh − vᵀWh</div>
<div class="formula">p(v, h) = e<sup>−E(v,h)</sup> / Z,   Z = Σ<sub>v</sub> Σ<sub>h</sub> e<sup>−E(v,h)</sup>,   p(v) = Σ<sub>h</sub> p(v, h)</div>
<h4>Conditional probabilities</h4>
<p>Because there are no h–h links, the energy splits into separate terms for each hⱼ, so given v the hidden units are independent:</p>
<div class="formula">p(h | v) = Πⱼ p(hⱼ | v),   p(hⱼ = 1 | v) = σ(bⱼ + Σᵢ vᵢwᵢⱼ)</div>
<div class="formula">p(v | h) = Πᵢ p(vᵢ | h),   p(vᵢ = 1 | h) = σ(aᵢ + Σⱼ wᵢⱼhⱼ)</div>
<p>Derivation sketch: p(hⱼ=1|v) / p(hⱼ=0|v) = e<sup>bⱼ + Σᵢ vᵢwᵢⱼ</sup>, so p(hⱼ=1|v) = 1/(1 + e<sup>−(bⱼ + Σᵢ vᵢwᵢⱼ)</sup>) = σ(·).</p>
<h4>Worked example</h4>
<pre>RBM: 2 visible, 1 hidden.
a = (0.1, 0.2), b = −0.3, w₁ = 0.5, w₂ = −0.4
Take v = (1, 1), h = 1.

Energy:
aᵀv  = 0.1 + 0.2        = 0.3
bᵀh  = −0.3
vᵀWh = 0.5 − 0.4        = 0.1
E = −0.3 − (−0.3) − 0.1 = −0.1

p(h=1 | v=(1,1)) = σ(−0.3 + 0.5 − 0.4) = σ(−0.2) = 0.450
p(v₁=1 | h=1)    = σ(0.1 + 0.5)        = σ(0.6)  = 0.646
p(v₂=1 | h=1)    = σ(0.2 − 0.4)        = σ(−0.2) = 0.450</pre>
<p>(σ(z) = 1/(1+e<sup>−z</sup>); σ(0.6) = 1/1.549 = 0.646, σ(−0.2) = 1/2.221 = 0.450.)</p>
<p><b>Conclusion:</b> the bipartite energy function makes RBM conditionals simple sigmoids, which is what makes Gibbs sampling and CD training cheap.</p>`,
  hi: `<p>RBM ek <b>energy-based model</b> hai: har (v, h) combination ko ek energy number milta hai; energy kam = probability zyada (jaise ball neeche gaddhe mein rehna pasand karti hai).</p>
<h4>Energy function</h4>
<div class="formula">E(v, h) = −aᵀv − bᵀh − vᵀWh</div>
<div class="formula">p(v, h) = e<sup>−E</sup> / Z,  Z = saare (v,h) pe e<sup>−E</sup> ka sum</div>
<h4>Conditional probabilities</h4>
<p>Hidden-hidden link nahi hai, isliye energy har hⱼ ke alag tukdon mein toot jaati hai, aur v diya ho to saare h independent:</p>
<div class="formula">p(hⱼ=1|v) = σ(bⱼ + Σᵢ vᵢwᵢⱼ)<br>p(vᵢ=1|h) = σ(aᵢ + Σⱼ wᵢⱼhⱼ)</div>
<p>Short derivation: p(hⱼ=1|v)/p(hⱼ=0|v) = e<sup>bⱼ + Σ vᵢwᵢⱼ</sup>, isliye p(hⱼ=1|v) = sigmoid(·).</p>
<h4>Solved example</h4>
<pre>2 visible, 1 hidden: a = (0.1, 0.2), b = −0.3, w₁ = 0.5, w₂ = −0.4
v = (1, 1), h = 1

aᵀv = 0.3,  bᵀh = −0.3,  vᵀWh = 0.5 − 0.4 = 0.1
E = −0.3 + 0.3 − 0.1 = −0.1

p(h=1|v)  = σ(−0.3 + 0.5 − 0.4) = σ(−0.2) = 0.450
p(v₁=1|h) = σ(0.1 + 0.5) = σ(0.6) = 0.646
p(v₂=1|h) = σ(0.2 − 0.4) = σ(−0.2) = 0.450</pre>
<h4>Steps yaad rakho</h4>
<ol>
<li>Teen terms alag nikaalo: aᵀv, bᵀh, vᵀWh.</li>
<li>E = −(teeno ka sum).</li>
<li>Conditional ke liye bias + weighted sum lo, sigmoid lagao.</li>
</ol>
<h4>Desi example</h4>
<p>Energy ko "jhagda" samjho: v aur h jitna ek-doosre se match karte hain, utna kam jhagda (kam energy) aur utna zyada chance ki ye jodi saath dikhe.</p>
<p><b>Conclusion:</b> bipartite energy ki wajah se RBM ke conditionals simple sigmoid ban jaate hain, isliye Gibbs sampling aur CD training sasti hai.</p>`,
  keys: ["energy function", "E(v,h) = −aᵀv − bᵀh − vᵀWh", "partition function Z", "Boltzmann distribution", "conditional independence", "sigmoid", "p(h|v)", "p(v|h)"],
  draw: "Small RBM with v₁, v₂ and one hidden unit h, weights and biases labelled.",
  fig: "unit2.html#q2",
  num: true
},
{
  id: "U2-20",
  unit: 2,
  topic: "Activation functions",
  q: "Differentiate between sigmoid and tanh activation functions.",
  alt: [
    "Why is tanh preferred over sigmoid in hidden layers?",
    "Explain the sigmoid activation function with its derivative."
  ],
  marks: [2, 4],
  priority: "med",
  prob: 45,
  diff: 2,
  pyq: [],
  why: "A typical 'two activation functions' variant (8AID 2025 A3 style); not asked as a direct difference yet.",
  short: "Sigmoid maps to (0,1), is not zero-centred and has max derivative 0.25; tanh maps to (−1,1), is zero-centred with max derivative 1, so it trains faster, though both saturate.",
  en: `<p><b>Sigmoid</b> and <b>tanh</b> are S-shaped (squashing) activation functions; tanh is a scaled, shifted sigmoid: tanh(z) = 2σ(2z) − 1.</p>
<div class="formula">σ(z) = 1/(1 + e<sup>−z</sup>),  σ′(z) = σ(z)(1 − σ(z))<br>tanh(z) = (e<sup>z</sup> − e<sup>−z</sup>)/(e<sup>z</sup> + e<sup>−z</sup>),  tanh′(z) = 1 − tanh²(z)</div>
<table>
<tr><th>Point</th><th>Sigmoid</th><th>Tanh</th></tr>
<tr><td>Range</td><td>(0, 1)</td><td>(−1, 1)</td></tr>
<tr><td>Value at 0</td><td>0.5</td><td>0</td></tr>
<tr><td>Zero-centred</td><td>No (all outputs positive, zig-zag updates)</td><td>Yes (faster convergence)</td></tr>
<tr><td>Max derivative</td><td>0.25 (at z=0)</td><td>1 (at z=0)</td></tr>
<tr><td>Vanishing gradient</td><td>Severe</td><td>Less severe, still saturates</td></tr>
<tr><td>Typical use</td><td>Binary output, LSTM/GRU gates</td><td>Hidden layers of RNN/LSTM</td></tr>
<tr><td>Example z = 2</td><td>0.881</td><td>0.964</td></tr>
</table>
<p><b>Common:</b> both are smooth, differentiable, monotonic, use exponentials, and saturate for large |z|.</p>
<p><b>Conclusion:</b> tanh is usually better in hidden layers because it is zero-centred with stronger gradients; sigmoid is kept for probability outputs and gates.</p>`,
  hi: `<p><b>Sigmoid</b> aur <b>tanh</b> dono S-shape wale (squashing) functions hain. Tanh asal mein sigmoid ka hi bada aur khiska hua roop hai: tanh(z) = 2σ(2z) − 1.</p>
<div class="formula">σ(z) = 1/(1+e<sup>−z</sup>), σ′ = σ(1−σ)<br>tanh′ = 1 − tanh²</div>
<table>
<tr><th>Point</th><th>Sigmoid</th><th>Tanh</th></tr>
<tr><td>Range</td><td>(0,1)</td><td>(−1,1)</td></tr>
<tr><td>z=0 pe</td><td>0.5</td><td>0</td></tr>
<tr><td>Zero-centred</td><td>Nahi, sab output positive</td><td>Haan, training fast</td></tr>
<tr><td>Max derivative</td><td>0.25</td><td>1</td></tr>
<tr><td>Vanishing gradient</td><td>Zyada</td><td>Kam, par hota hai</td></tr>
<tr><td>Use</td><td>Binary output, gates</td><td>RNN/LSTM hidden</td></tr>
<tr><td>z = 2</td><td>0.881</td><td>0.964</td></tr>
</table>
<h4>Desi example</h4>
<p>Sigmoid ek "haan kitna pakka" meter hai: 0 (bilkul nahi) se 1 (pakka). Tanh ek "pasand-naapasand" meter hai: −1 (bilkul nafrat) se +1 (bahut pasand), aur 0 matlab neutral. Neutral point beech mein hone se tanh ke updates balanced rehte hain.</p>
<p>Dono smooth, differentiable hain, exp use karte hain, aur bade |z| pe flat (saturate) ho jaate hain.</p>
<p><b>Conclusion:</b> hidden layers mein tanh behtar (zero-centred, strong gradient); sigmoid probability output aur gates ke liye.</p>`,
  keys: ["range (0,1) vs (−1,1)", "zero-centred", "σ′ = σ(1−σ)", "max derivative 0.25 vs 1", "saturation", "vanishing gradient", "tanh(z) = 2σ(2z) − 1"],
  draw: "Both S-curves on one axis: sigmoid from 0 to 1 through 0.5, tanh from −1 to 1 through origin.",
  fig: "unit2.html#q3",
  num: false
},
{
  id: "U2-21",
  unit: 2,
  topic: "Activation functions",
  q: "Explain the softmax activation function. Compute softmax for a given vector of scores.",
  alt: [
    "Why is softmax used in the output layer of a multi-class classifier?",
    "Differentiate between sigmoid and softmax."
  ],
  marks: [2, 4],
  priority: "med",
  prob: 42,
  diff: 2,
  pyq: [],
  why: "Softmax is named in the activation list; a small calculation is a plausible Part A/B item.",
  short: "Softmax converts K raw scores into probabilities: pᵢ = e^zᵢ / Σⱼ e^zⱼ, each in (0,1) and summing to 1; used in multi-class output layers.",
  en: `<p><b>Softmax</b> is an output-layer activation that turns a vector of K real scores (logits) into a <b>probability distribution</b> over K classes.</p>
<div class="formula">softmax(z)ᵢ = e<sup>zᵢ</sup> / Σ<sub>j=1..K</sub> e<sup>zⱼ</sup></div>
<h4>Properties</h4>
<ul>
<li>Each output in (0, 1); outputs sum to 1.</li>
<li>Preserves order: largest score gets largest probability; exponent magnifies differences.</li>
<li>Invariant to adding a constant: softmax(z − max z) = softmax(z), used for numerical stability.</li>
<li>Paired with <b>categorical cross-entropy</b>: L = −Σ yᵢ log pᵢ; gradient ∂L/∂zᵢ = pᵢ − yᵢ (simple and stable).</li>
<li>For K = 2 it reduces to the sigmoid.</li>
</ul>
<h4>Worked example</h4>
<pre>Scores z = (2.0, 1.0, 0.1) for classes (cat, dog, bird)
e^2.0 = 7.389,  e^1.0 = 2.718,  e^0.1 = 1.105
Sum = 11.212
p(cat)  = 7.389 / 11.212 = 0.659
p(dog)  = 2.718 / 11.212 = 0.242
p(bird) = 1.105 / 11.212 = 0.099      (total = 1.000)
Prediction: cat. If true class is cat, loss = −ln 0.659 = 0.417</pre>
<h4>Sigmoid vs softmax</h4>
<table>
<tr><th>Sigmoid</th><th>Softmax</th></tr>
<tr><td>Each output independent</td><td>Outputs compete, sum to 1</td></tr>
<tr><td>Binary or multi-label</td><td>Multi-class (one correct class)</td></tr>
</table>
<p><b>Conclusion:</b> softmax gives normalised class probabilities and is the standard output for multi-class neural networks.</p>`,
  hi: `<p><b>Softmax</b> output layer ka activation hai jo K raw scores (logits) ko K classes ki <b>probabilities</b> mein badal deta hai.</p>
<div class="formula">pᵢ = e<sup>zᵢ</sup> / Σⱼ e<sup>zⱼ</sup></div>
<h4>Properties</h4>
<ul>
<li>Har output 0 aur 1 ke beech, sab ka total 1.</li>
<li>Bada score = badi probability; exp chhote farq ko bada kar deta hai.</li>
<li>Sab scores se same number ghatao to answer same: softmax(z − max z) numerical stability ke liye.</li>
<li>Cross-entropy ke saath: L = −Σ yᵢ log pᵢ, gradient pᵢ − yᵢ.</li>
<li>K = 2 pe ye sigmoid ban jaata hai.</li>
</ul>
<h4>Solved example</h4>
<pre>z = (2.0, 1.0, 0.1) for (cat, dog, bird)
e^2 = 7.389, e^1 = 2.718, e^0.1 = 1.105, sum = 11.212
p = (0.659, 0.242, 0.099), total = 1
Answer: cat. Loss (true = cat) = −ln 0.659 = 0.417</pre>
<h4>Steps</h4>
<ol>
<li>Har score ka e<sup>z</sup> nikaalo.</li>
<li>Sab ko jodo.</li>
<li>Har ek ko total se divide karo; check karo sum 1 hai.</li>
</ol>
<h4>Desi example</h4>
<p>Election ke vote share jaisa: har party ko kitne "points" mile (scores), softmax unko percentage mein badal deta hai jo total 100% hota hai, aur jiske points zyada uska share kaafi zyada.</p>
<table>
<tr><th>Sigmoid</th><th>Softmax</th></tr>
<tr><td>Har output alag</td><td>Outputs ka total 1</td></tr>
<tr><td>Binary / multi-label</td><td>Multi-class</td></tr>
</table>
<p><b>Conclusion:</b> multi-class network ke output pe softmax standard hai kyunki ye saaf probabilities deta hai.</p>`,
  keys: ["logits", "probability distribution", "sum to 1", "exponential", "categorical cross-entropy", "multi-class", "numerical stability"],
  draw: "",
  fig: "",
  num: true
},
{
  id: "U2-22",
  unit: 2,
  topic: "Activation functions",
  q: "Explain the ELU (Exponential Linear Unit) and PReLU (Parametric ReLU) activation functions. How do they improve on ReLU?",
  alt: [
    "Write short notes on ELU (written 'ERELU' in the syllabus) and PReLU.",
    "Compare ReLU, Leaky ReLU, PReLU and ELU."
  ],
  marks: [2, 4],
  priority: "med",
  prob: 40,
  diff: 2,
  pyq: [],
  why: "Both are named in the syllabus activation list but never asked yet.",
  short: "ELU: z for z>0, α(e^z − 1) otherwise, smooth with near-zero mean; PReLU: like Leaky ReLU but the negative slope α is learned. Both avoid dead neurons of ReLU.",
  en: `<p>Both are ReLU variants designed to keep a non-zero response for negative inputs, avoiding <b>dying ReLU</b> and pushing mean activations towards zero.</p>
<h4>ELU (Exponential Linear Unit), Clevert et al. 2015</h4>
<div class="formula">f(z) = z, if z &gt; 0;   f(z) = α(e<sup>z</sup> − 1), if z ≤ 0   (α ≈ 1)<br>f′(z) = 1 if z &gt; 0;  f(z) + α if z ≤ 0</div>
<ul>
<li>Smooth curve; saturates to −α for very negative z, which makes it robust to noise.</li>
<li>Negative outputs bring mean activation close to 0, so learning is faster.</li>
<li>Cost: needs an exponential. Example: z = −1, α = 1 gives e<sup>−1</sup> − 1 = −0.632.</li>
<li>The syllabus writes this as "ERELU".</li>
</ul>
<h4>PReLU (Parametric ReLU), He et al. 2015</h4>
<div class="formula">f(z) = z, if z &gt; 0;   f(z) = αz, if z ≤ 0,   α learned by backprop</div>
<ul>
<li>Generalises Leaky ReLU: α is a trainable parameter (per channel or shared), with gradient ∂L/∂α = Σ (∂L/∂f)·z for z ≤ 0.</li>
<li>Adds very few parameters; He et al. used it to reach 4.94% top-5 ImageNet error, the first reported result below human level (about 5.1%).</li>
<li>Risk: may overfit on small data.</li>
</ul>
<h4>Comparison</h4>
<table>
<tr><th>Function</th><th>Negative side</th><th>Learnable?</th><th>Smooth at 0?</th></tr>
<tr><td>ReLU</td><td>0</td><td>No</td><td>No</td></tr>
<tr><td>Leaky ReLU</td><td>0.01z</td><td>No</td><td>No</td></tr>
<tr><td>PReLU</td><td>αz</td><td>Yes (α)</td><td>No</td></tr>
<tr><td>ELU</td><td>α(e<sup>z</sup> − 1)</td><td>No (α fixed)</td><td>Yes (α = 1)</td></tr>
</table>
<p><b>Conclusion:</b> ELU gives smooth, zero-mean outputs and PReLU learns its own slope; both fix ReLU's dead neurons at a small extra cost.</p>`,
  hi: `<p>Dono ReLU ke sudhre hue roop hain: negative input pe bhi kuch output dete hain, taaki <b>dying ReLU</b> na ho aur average output zero ke paas rahe.</p>
<h4>ELU (Exponential Linear Unit)</h4>
<div class="formula">f(z) = z (z &gt; 0),  α(e<sup>z</sup> − 1) (z ≤ 0), α ≈ 1</div>
<ul>
<li>Smooth curve; bahut negative z pe −α pe ruk jaata hai, noise se kam pareshan.</li>
<li>Negative outputs se mean zero ke paas, learning fast.</li>
<li>Nuksaan: exp lagta hai. Example: z = −1 → −0.632.</li>
<li>Syllabus mein ise "ERELU" likha hai.</li>
</ul>
<h4>PReLU (Parametric ReLU)</h4>
<div class="formula">f(z) = z (z &gt; 0),  αz (z ≤ 0), α backprop se seekha jaata hai</div>
<ul>
<li>Leaky ReLU jaisa, par slope α fixed nahi, training se aata hai.</li>
<li>Bahut kam extra parameters; He et al. (2015) ne isse ImageNet pe 4.94% error laaya, human level se behtar.</li>
<li>Chhote data pe overfit ho sakta hai.</li>
</ul>
<table>
<tr><th>Function</th><th>Negative side</th><th>Seekhta hai?</th></tr>
<tr><td>ReLU</td><td>0</td><td>Nahi</td></tr>
<tr><td>Leaky ReLU</td><td>0.01z</td><td>Nahi</td></tr>
<tr><td>PReLU</td><td>αz</td><td>Haan</td></tr>
<tr><td>ELU</td><td>α(e<sup>z</sup>−1)</td><td>Nahi</td></tr>
</table>
<h4>Desi example</h4>
<p>Leaky ReLU = har ghaate pe fixed 1% commission. PReLU = commission ka rate dukaan khud experience se tay karti hai. ELU = ghaata badhta jaaye to bhi ek limit (−α) se zyada nuksaan nahi maana jaata.</p>
<p><b>Conclusion:</b> ELU smooth aur zero-mean output deta hai, PReLU apna slope khud seekhta hai; dono ReLU ke dead neurons theek karte hain.</p>`,
  keys: ["ELU", "α(e^z − 1)", "saturates to −α", "zero mean", "PReLU", "learnable slope α", "dying ReLU", "He et al. 2015"],
  draw: "ReLU, Leaky ReLU and ELU curves on one axis showing their different negative sides.",
  fig: "unit2.html#q3",
  num: false
},
{
  id: "U2-23",
  unit: 2,
  topic: "Representation learning",
  q: "Explain transfer learning and self-supervised learning as forms of representation learning.",
  alt: [
    "What is transfer learning? How does it help when data is limited?",
    "What is self-supervised learning? Give an example."
  ],
  marks: [2, 4],
  priority: "med",
  prob: 40,
  diff: 2,
  pyq: [],
  why: "Listed under representation learning in the syllabus; not asked yet.",
  short: "Transfer learning reuses features learned on a large dataset (e.g. ImageNet CNN) for a new task by fine-tuning; self-supervised learning creates labels from the data itself, e.g. BERT predicting masked words.",
  en: `<h4>Transfer learning</h4>
<p><b>Definition:</b> reusing a model (its learned representations) trained on a large source task for a different but related target task.</p>
<ol>
<li>Take a network pre-trained on a big dataset (e.g. ResNet-50 on ImageNet, 1.2 M images, 1000 classes).</li>
<li>Remove its final classification layer.</li>
<li><b>Feature extraction:</b> freeze the conv layers and train a new head; or <b>fine-tuning:</b> also update the upper layers with a small learning rate.</li>
</ol>
<p><b>Example:</b> a hospital has only 2,000 labelled chest X-rays; fine-tuning an ImageNet CNN gives far better accuracy than training from scratch, because early layers (edges, textures) are general.</p>
<p><b>Benefits:</b> less data, less training time, better accuracy. <b>Risk:</b> negative transfer if domains are very different.</p>
<h4>Self-supervised learning (SSL)</h4>
<p><b>Definition:</b> learning representations from <b>unlabelled data</b> by solving a <b>pretext task</b> whose labels come from the data itself.</p>
<ul>
<li><b>NLP:</b> BERT masks 15% of words and predicts them; GPT predicts the next word.</li>
<li><b>Vision:</b> contrastive learning (SimCLR): two augmented views of the same image should have similar embeddings; masked autoencoders (MAE) rebuild hidden patches; predicting image rotation.</li>
<li><b>Speech:</b> wav2vec 2.0 predicts masked audio segments.</li>
</ul>
<p>The learned encoder is then fine-tuned on a small labelled set (the downstream task).</p>
<table>
<tr><th>Point</th><th>Transfer learning</th><th>Self-supervised</th></tr>
<tr><td>Source of knowledge</td><td>A model trained on another (often labelled) task</td><td>Pretext task on unlabelled data</td></tr>
<tr><td>Labels needed</td><td>Source labels + few target labels</td><td>None for pre-training</td></tr>
<tr><td>Example</td><td>ImageNet CNN → X-ray classifier</td><td>BERT, SimCLR</td></tr>
</table>
<p><b>Conclusion:</b> both reuse learned representations so that new tasks need little labelled data; SSL is now how large foundation models are pre-trained, and transfer learning is how they are adapted.</p>`,
  hi: `<h4>Transfer learning</h4>
<p><b>Matlab:</b> ek bade task pe trained model ke seekhe hue features ko naye, milte-julte task mein reuse karna.</p>
<ol>
<li>ImageNet (12 lakh images, 1000 classes) pe trained ResNet-50 lo.</li>
<li>Uski aakhri classification layer hatao.</li>
<li><b>Feature extraction:</b> conv layers freeze, naya head train; ya <b>fine-tuning:</b> upar ki layers bhi chhote learning rate se update.</li>
</ol>
<p><b>Example:</b> hospital ke paas sirf 2,000 labelled X-rays hain; ImageNet CNN ko fine-tune karne se scratch se kahin behtar accuracy, kyunki shuru ki layers (edges, textures) har jagah kaam aati hain.</p>
<p><b>Fayde:</b> kam data, kam time, zyada accuracy. <b>Risk:</b> domain bahut alag ho to negative transfer.</p>
<h4>Self-supervised learning</h4>
<p><b>Matlab:</b> bina label ke data se, ek <b>pretext task</b> bana ke seekhna jiska label data khud deta hai.</p>
<ul>
<li>NLP: BERT 15% words chhupa ke guess karta hai; GPT agla word.</li>
<li>Vision: SimCLR mein ek hi photo ke do alag versions ke embeddings paas laana; MAE chhupe patches banana.</li>
<li>Speech: wav2vec 2.0.</li>
</ul>
<p>Phir is encoder ko thode labelled data pe fine-tune karte hain.</p>
<table>
<tr><th>Point</th><th>Transfer</th><th>Self-supervised</th></tr>
<tr><td>Gyaan kahan se</td><td>Doosre task ka trained model</td><td>Bina label data ka pretext task</td></tr>
<tr><td>Labels</td><td>Source labels + thode target</td><td>Pre-training mein zero</td></tr>
<tr><td>Example</td><td>ImageNet → X-ray</td><td>BERT, SimCLR</td></tr>
</table>
<h4>Desi example</h4>
<p>Transfer learning: jo cycle chalana jaanta hai woh scooty jaldi seekh leta hai (balance ka gyaan transfer). Self-supervised: akhbaar ke crossword mein khaali shabd bharte-bharte hindi ki samajh badhna, koi teacher nahi.</p>
<p><b>Conclusion:</b> dono seekhe hue representations reuse karte hain taaki naye task ke liye kam labels lagein; SSL se bade models pre-train hote hain aur transfer learning se adapt.</p>`,
  keys: ["pre-trained model", "fine-tuning", "feature extraction", "frozen layers", "ImageNet", "pretext task", "masked language modelling", "contrastive learning", "downstream task"],
  draw: "Pre-trained CNN (frozen conv blocks) → new classifier head for the target task.",
  fig: "unit2.html#q5",
  num: false
},
{
  id: "U2-24",
  unit: 2,
  topic: "Machine learning vs deep learning",
  q: "Give a brief history of deep learning. Why has deep learning become successful only recently?",
  alt: [
    "What factors led to the rise of deep learning?",
    "Explain the evolution of neural networks to deep learning."
  ],
  marks: [2, 4],
  priority: "med",
  prob: 35,
  diff: 1,
  pyq: [],
  why: "Part of 'definition, scope and significance' in the syllabus; a plausible 4-mark variant.",
  short: "From the perceptron (1958) and backprop (1986) to DBNs (2006) and AlexNet (2012); DL took off due to big data, GPUs, better algorithms (ReLU, dropout) and open frameworks.",
  en: `<h4>Timeline</h4>
<table>
<tr><th>Year</th><th>Milestone</th></tr>
<tr><td>1943</td><td>McCulloch–Pitts artificial neuron</td></tr>
<tr><td>1958</td><td>Rosenblatt's perceptron</td></tr>
<tr><td>1969</td><td>Minsky &amp; Papert show single-layer perceptron cannot solve XOR; first "AI winter"</td></tr>
<tr><td>1986</td><td>Backpropagation popularised by Rumelhart, Hinton &amp; Williams; multi-layer nets trainable</td></tr>
<tr><td>1997–1998</td><td>LSTM (Hochreiter &amp; Schmidhuber); LeNet-5 CNN for digit recognition (LeCun)</td></tr>
<tr><td>2006</td><td>Deep Belief Networks with greedy layer-wise pre-training (Hinton); term "deep learning" spreads</td></tr>
<tr><td>2012</td><td>AlexNet wins ImageNet (top-5 error 15.3% vs 26.2%) using GPUs, ReLU, dropout</td></tr>
<tr><td>2014–2015</td><td>GANs, VGG, GoogLeNet, ResNet (152 layers, 3.57% error)</td></tr>
<tr><td>2016</td><td>AlphaGo beats Lee Sedol</td></tr>
<tr><td>2017</td><td>Transformer ("Attention Is All You Need")</td></tr>
<tr><td>2018</td><td>BERT; Turing Award to Hinton, LeCun, Bengio</td></tr>
<tr><td>2020 onward</td><td>GPT-3, AlphaFold 2, ChatGPT (2022), diffusion image models</td></tr>
</table>
<h4>Why now (reasons for success)</h4>
<ul>
<li><b>Big data:</b> internet, smartphones, ImageNet-scale labelled datasets.</li>
<li><b>Compute:</b> GPUs/TPUs give massive parallel matrix operations.</li>
<li><b>Better algorithms:</b> ReLU, dropout, batch norm, Adam, good initialisation, residual connections solved vanishing gradients and overfitting.</li>
<li><b>Open-source frameworks:</b> TensorFlow, PyTorch, pre-trained models.</li>
<li><b>Investment and benchmarks:</b> industry funding and competitions (ImageNet) sped up progress.</li>
</ul>
<p><b>Conclusion:</b> the ideas are decades old, but data, GPUs and algorithmic tricks after 2006–2012 finally made deep networks practical.</p>`,
  hi: `<h4>Timeline</h4>
<table>
<tr><th>Saal</th><th>Kya hua</th></tr>
<tr><td>1943</td><td>McCulloch–Pitts neuron</td></tr>
<tr><td>1958</td><td>Rosenblatt ka perceptron</td></tr>
<tr><td>1969</td><td>Minsky–Papert: perceptron XOR nahi kar sakta; AI winter</td></tr>
<tr><td>1986</td><td>Backpropagation (Rumelhart, Hinton, Williams)</td></tr>
<tr><td>1997–98</td><td>LSTM; LeCun ka LeNet-5</td></tr>
<tr><td>2006</td><td>Hinton ke DBN, layer-wise pre-training</td></tr>
<tr><td>2012</td><td>AlexNet ne ImageNet jeeta: 15.3% vs 26.2% error, GPU + ReLU + dropout</td></tr>
<tr><td>2014–15</td><td>GAN, VGG, ResNet (152 layers, 3.57%)</td></tr>
<tr><td>2016</td><td>AlphaGo ne Lee Sedol ko haraya</td></tr>
<tr><td>2017</td><td>Transformer</td></tr>
<tr><td>2018</td><td>BERT; Hinton, LeCun, Bengio ko Turing Award</td></tr>
<tr><td>2020+</td><td>GPT-3, AlphaFold 2, ChatGPT (2022)</td></tr>
</table>
<h4>Ab hi kyun chala (why now)</h4>
<ul>
<li><b>Big data:</b> internet, smartphone, ImageNet jaise datasets.</li>
<li><b>Compute:</b> GPU/TPU se tez matrix calculation.</li>
<li><b>Better algorithms:</b> ReLU, dropout, batch norm, Adam, ResNet skip connections.</li>
<li><b>Open-source:</b> TensorFlow, PyTorch, pre-trained models free.</li>
<li><b>Paisa aur competitions:</b> companies ka investment, ImageNet challenge.</li>
</ul>
<h4>Desi example</h4>
<p>Recipe (neural network ka idea) dadi ke zamane se thi, par gas stove (GPU), pura ration (big data) aur pressure cooker (ReLU, dropout jaise tricks) ab aaye; isliye ab khana jaldi aur achha ban raha hai.</p>
<p><b>Conclusion:</b> idea purana hai, par data, GPU aur nayi tricks ne 2006–2012 ke baad deep networks ko practical banaya.</p>`,
  keys: ["perceptron 1958", "backpropagation 1986", "AI winter", "DBN 2006", "AlexNet 2012", "big data", "GPUs", "ReLU/dropout", "frameworks"],
  draw: "Timeline arrow from 1943 to 2022 with key milestones.",
  fig: "",
  num: false
},
{
  id: "U2-25",
  unit: 2,
  topic: "Restricted Boltzmann Machines",
  q: "Explain the applications of Restricted Boltzmann Machines and Deep Belief Networks. What are their limitations?",
  alt: [
    "How are RBMs used in recommendation systems?",
    "Where are RBMs used in practice?"
  ],
  marks: [2, 4],
  priority: "med",
  prob: 32,
  diff: 2,
  pyq: [],
  why: "RBM applications are a named syllabus item; could be the last part of an RBM question.",
  short: "RBMs are used for collaborative filtering (Netflix Prize), feature learning, dimensionality reduction, pre-training DBNs, topic modelling and denoising.",
  en: `<p><b>RBMs</b> learn a probability distribution over inputs and hidden features without labels, so they are used wherever compact features or generative modelling help.</p>
<h4>Applications</h4>
<ul>
<li><b>Collaborative filtering / recommendation:</b> visible units = a user's movie ratings; hidden units capture taste factors; reconstruction predicts unseen ratings. RBMs were part of the winning Netflix Prize ensemble (Salakhutdinov, Mnih &amp; Hinton 2007).</li>
<li><b>Feature learning and dimensionality reduction:</b> hidden activations act as compact features for a classifier; deep autoencoders pre-trained with RBMs (Hinton &amp; Salakhutdinov 2006) beat PCA.</li>
<li><b>Pre-training deep networks:</b> stacked into DBNs for digit recognition and early speech recognition.</li>
<li><b>Topic modelling:</b> Replicated Softmax RBM on word counts of documents.</li>
<li><b>Denoising / image completion:</b> Gibbs sampling fills in missing pixels.</li>
<li><b>Classification:</b> discriminative RBMs; anomaly detection using free energy (unusual inputs have high energy).</li>
</ul>
<h4>Example</h4>
<p>A user rated Sholay 5, Deewar 5 and DDLJ 1. The hidden "action/Amitabh" unit turns on, and reconstruction gives a high score to Zanjeer, so it is recommended.</p>
<h4>Limitations</h4>
<ul>
<li>Partition function Z intractable; likelihood cannot be measured easily.</li>
<li>CD gives biased, approximate gradients; hyper-parameters are tricky.</li>
<li>Binary units suit binary data; real data needs Gaussian–Bernoulli RBMs.</li>
<li>Largely replaced by autoencoders, VAEs, GANs and ReLU nets trained end-to-end.</li>
</ul>
<p><b>Conclusion:</b> RBMs are useful for recommendation, feature learning and pre-training, though modern models have overtaken them.</p>`,
  hi: `<p><b>RBM</b> bina label ke input ka distribution aur hidden features seekhta hai, isliye jahan chhote features ya generative model chahiye wahan use hota hai.</p>
<h4>Applications</h4>
<ul>
<li><b>Recommendation:</b> visible = user ki movie ratings, hidden = pasand ke factors; reconstruction se nayi movies ki rating. Netflix Prize jeetne wali team ke ensemble mein RBM tha (2007).</li>
<li><b>Feature learning / dimensionality reduction:</b> hidden activations ko classifier ke features ki tarah use; RBM se pre-trained deep autoencoder ne PCA ko haraya (2006).</li>
<li><b>Deep nets ka pre-training:</b> DBN banake digit aur speech recognition.</li>
<li><b>Topic modelling:</b> documents ke word counts pe Replicated Softmax RBM.</li>
<li><b>Denoising / image completion:</b> Gibbs sampling se gayab pixels bharna.</li>
<li><b>Anomaly detection:</b> ajeeb input ki free energy zyada.</li>
</ul>
<h4>Desi example</h4>
<p>Tumne Sholay 5, Deewar 5, DDLJ 1 star diye. RBM ka "action/Amitabh" hidden unit on hota hai aur reconstruction mein Zanjeer ko high score milta hai, to woh recommend hoti hai.</p>
<h4>Limitations</h4>
<ul>
<li>Z nikalna lagbhag impossible, likelihood naapna mushkil.</li>
<li>CD approximate gradient deta hai, tuning tricky.</li>
<li>Binary units; real-valued data ke liye Gaussian-Bernoulli RBM chahiye.</li>
<li>Aaj autoencoder, VAE, GAN ne jagah le li.</li>
</ul>
<p><b>Conclusion:</b> RBM recommendation, feature learning aur pre-training mein kaam ka hai, par aaj ke models aage nikal gaye.</p>`,
  keys: ["collaborative filtering", "Netflix Prize", "feature learning", "dimensionality reduction", "DBN pre-training", "topic modelling", "free energy", "intractable Z"],
  draw: "",
  fig: "unit2.html#q2",
  num: false
}
);
