window.QB = window.QB || [];
window.QB.push(
{
  id: "U1-01",
  unit: 1,
  topic: "Backpropagation algorithm",
  q: "Explain the backpropagation algorithm and derive the weight update rule for a multilayer perceptron.",
  alt: [
    "Define backpropagation.",
    "Explain the backpropagation algorithm with its steps.",
    "Derive the weight update rule for the output and hidden layers of an MLP using the chain rule.",
    "Explain forward pass and backward pass in training a neural network.",
    "What are the advantages and limitations of backpropagation?"
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 95,
  diff: 4,
  pyq: ["8AID 2025 A5", "8AID 2024 A2", "7CAI 2025 B1", "8AID 2025 B4"],
  why: "Asked in all 3 papers (definition, algorithm, derivation, numerical); the single most repeated Unit 1 topic.",
  short: "Backpropagation computes the gradient of the loss w.r.t. every weight using the chain rule, from output to input; gradient descent then updates the weights.",
  en: `<p><b>Definition:</b> Backpropagation (backward propagation of errors; popularised by Rumelhart, Hinton and Williams, 1986) is a supervised learning algorithm that trains a neural network by computing the gradient of the loss with respect to every weight using the <b>chain rule</b>, layer by layer from the output back to the input. Gradient descent then uses these gradients to update the weights.</p>
<h4>Steps of the algorithm</h4>
<ol>
<li><b>Initialise</b> weights and biases with small random values; choose learning rate η.</li>
<li><b>Forward pass:</b> for every layer compute net = Σ wᵢxᵢ + b and output o = f(net) until the final output is obtained.</li>
<li><b>Compute loss:</b> e.g. E = ½ Σₖ (tₖ − oₖ)² (or cross-entropy).</li>
<li><b>Backward pass:</b> compute the error term δ of each neuron, starting at the output layer.</li>
<li><b>Update weights:</b> Δw = η · δ · (input to that weight); w ← w + Δw.</li>
<li><b>Repeat</b> for all samples over many epochs until the loss converges.</li>
</ol>
<h4>Derivation (MLP, sigmoid units, E = ½ Σₖ (tₖ − oₖ)²)</h4>
<p>Gradient descent rule: Δw = −η ∂E/∂w. For sigmoid, σ′(net) = o(1 − o).</p>
<p><b>(a) Hidden → output weight wⱼₖ</b> (netₖ = Σⱼ wⱼₖ hⱼ, oₖ = σ(netₖ))</p>
<div class="formula">∂E/∂wⱼₖ = (∂E/∂oₖ)(∂oₖ/∂netₖ)(∂netₖ/∂wⱼₖ) = −(tₖ − oₖ) · oₖ(1 − oₖ) · hⱼ</div>
<div class="formula">δₖ = (tₖ − oₖ) oₖ(1 − oₖ) &nbsp;⇒&nbsp; Δwⱼₖ = η δₖ hⱼ</div>
<p><b>(b) Input → hidden weight wᵢⱼ</b> (netⱼ = Σᵢ wᵢⱼ xᵢ, hⱼ = σ(netⱼ)). hⱼ affects every output k, so we sum over k:</p>
<div class="formula">∂E/∂wᵢⱼ = [Σₖ (−δₖ) wⱼₖ] · hⱼ(1 − hⱼ) · xᵢ</div>
<div class="formula">δⱼ = hⱼ(1 − hⱼ) Σₖ wⱼₖ δₖ &nbsp;⇒&nbsp; Δwᵢⱼ = η δⱼ xᵢ</div>
<p><b>General rule:</b> w_new = w_old + η × δ(receiving neuron) × input(carried by that weight). Biases are updated the same way with input = 1.</p>
<h4>Forward vs backward pass</h4>
<table>
<tr><th>Forward pass</th><th>Backward pass</th></tr>
<tr><td>Input → output</td><td>Output → input</td></tr>
<tr><td>Computes activations and loss</td><td>Computes δ and gradients by chain rule</td></tr>
<tr><td>Stores intermediate values</td><td>Reuses stored values (efficient)</td></tr>
</table>
<h4>Example</h4>
<p>A 2-3-1 network predicting pass/fail: output 0.62 for target 1. The error 0.38 is converted to δ at the output, sent back through w to the three hidden neurons, and every weight is nudged so that the next output is closer to 1.</p>
<h4>Advantages</h4>
<ul><li>Efficient: one forward + one backward pass gives all gradients.</li><li>Works for any differentiable architecture (MLP, CNN, RNN via BPTT).</li><li>Simple, general, the basis of all modern DL training.</li></ul>
<h4>Limitations</h4>
<ul><li>Vanishing / exploding gradients in very deep nets (sigmoid/tanh).</li><li>Can get stuck in local minima or saddle points.</li><li>Needs labelled data and differentiable activations; sensitive to learning rate and initialisation.</li></ul>
<p><b>Conclusion:</b> Backpropagation + gradient descent is the engine that lets deep networks learn from their errors.</p>`,
  hi: `<p><b>Definition:</b> Backpropagation ka matlab hai "error ko peeche ki taraf bhejna". Network ne output diya, woh galat nikla. Ab har weight se poochna hai ki "is galti mein tumhara kitna haath hai?" Yeh hisaab <b>chain rule</b> se output layer se input layer ki taraf hota hai. Phir gradient descent har weight ko thoda sa sahi direction mein badal deta hai.</p>
<h4>Steps (yaad rakho: I-F-L-B-U-R)</h4>
<ol>
<li><b>Initialise:</b> weights chhote random numbers, learning rate η choose karo.</li>
<li><b>Forward pass:</b> har layer mein net = Σ wx + b, phir o = f(net).</li>
<li><b>Loss:</b> E = ½ Σ (t − o)² se galti naapo.</li>
<li><b>Backward pass:</b> output se shuru karke har neuron ka δ (error term) nikalo.</li>
<li><b>Update:</b> Δw = η · δ · input, w = w + Δw.</li>
<li><b>Repeat:</b> saare samples, kai epochs tak, jab tak loss kam na ho jaaye.</li>
</ol>
<h4>Derivation short mein</h4>
<p>Rule: Δw = −η ∂E/∂w. Sigmoid ka derivative = o(1 − o).</p>
<div class="formula">Output layer: δₖ = (tₖ − oₖ) oₖ(1 − oₖ), Δwⱼₖ = η δₖ hⱼ</div>
<div class="formula">Hidden layer: δⱼ = hⱼ(1 − hⱼ) Σₖ wⱼₖ δₖ, Δwᵢⱼ = η δⱼ xᵢ</div>
<p>Hidden neuron ka δ isliye Σ se aata hai kyunki woh <b>saare</b> output neurons ko affect karta hai, toh sabki galti ka hissa usko milta hai (weight ke proportion mein).</p>
<h4>Forward vs Backward</h4>
<ul><li>Forward: input → output, answer aur loss nikalta hai.</li><li>Backward: output → input, gradient (galti ka hissa) baant-ta hai.</li></ul>
<h4>Desi example</h4>
<p>Shaadi ka khaana kharab hua. Caterer peeche se check karta hai: serving → cooking → masala → sabzi kharidna. Jiski jitni galti, usko utna sudhaar ka instruction. Agli shaadi mein sab thoda behtar. Yahi backprop hai: galti peeche jaati hai, har level apna hissa sudhaarta hai.</p>
<h4>Fayde / Kamiyan</h4>
<ul><li>✔ Fast aur general, har differentiable network pe chalta hai.</li><li>✘ Deep network mein vanishing/exploding gradient, local minima, labelled data chahiye, η ke prati sensitive.</li></ul>
<p><b>Ek line:</b> Backprop = chain rule se gradient nikalna + gradient descent se weight sudhaarna.</p>`,
  keys: ["chain rule", "forward pass", "backward pass", "error term δ", "gradient descent", "Δw = η δ x", "learning rate", "epoch", "sigmoid derivative o(1−o)"],
  draw: "3-layer network (input-hidden-output) with a forward arrow on top and a backward error arrow below, labelled δ and ∂E/∂w.",
  fig: "unit1.html#q1",
  num: false
},
{
  id: "U1-02",
  unit: 1,
  topic: "Curse of dimensionality",
  q: "What is the curse of dimensionality? Given a high-dimensional dataset, how would you address it using deep learning techniques?",
  alt: [
    "Define the curse of dimensionality.",
    "Explain the problems caused by high-dimensional data.",
    "How does deep learning overcome the curse of dimensionality?",
    "Why does k-NN perform poorly in high dimensions?"
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 92,
  diff: 2,
  pyq: ["8AID 2025 A2", "8AID 2025 B1", "8AID 2024 A4"],
  why: "Asked in both 8AID papers, once as Part A and once as a 4-mark design question.",
  short: "As features grow, space volume grows exponentially, data becomes sparse, distances lose meaning, and models need exponentially more data and overfit.",
  en: `<p><b>Definition:</b> The curse of dimensionality (term coined by Richard Bellman) is the set of problems that arise when the number of features (dimensions) d becomes very large. The volume of the feature space grows exponentially with d, so a fixed amount of data becomes <b>sparse</b> and a model needs exponentially more samples to generalise.</p>
<h4>Problems caused</h4>
<ul>
<li><b>Data sparsity:</b> with 10 bins per feature, d features need 10ᵈ cells (1-D: 10, 2-D: 100, 3-D: 1000, 10-D: 10¹⁰).</li>
<li><b>Distances lose meaning:</b> nearest and farthest points become almost equally far, so k-NN, clustering and kernel methods fail.</li>
<li><b>Overfitting:</b> many features + few samples → the model memorises noise.</li>
<li><b>Computation and memory</b> cost explode; parameters grow with d.</li>
<li><b>Hughes phenomenon:</b> beyond a point, adding features lowers accuracy.</li>
</ul>
<div class="formula">Samples needed ∝ kᵈ (k = resolution per dimension, d = number of dimensions)</div>
<h4>How deep learning addresses it</h4>
<ol>
<li><b>Representation learning:</b> hidden layers learn compact, task-relevant features automatically; data lies on a low-dimensional manifold and the network learns that manifold.</li>
<li><b>Autoencoders:</b> a bottleneck layer compresses d inputs to a small code (non-linear PCA).</li>
<li><b>CNNs:</b> local connectivity and parameter sharing reduce parameters drastically; pooling shrinks spatial size.</li>
<li><b>Embeddings:</b> huge one-hot vectors (e.g. 50,000 words) mapped to dense vectors (e.g. 300-D).</li>
<li><b>Regularisation:</b> dropout, L1 (sparse weights = feature selection), L2, early stopping.</li>
<li><b>Data augmentation</b> and transfer learning increase effective data; PCA / feature selection as preprocessing.</li>
<li><b>Distributed representations and depth:</b> deep nets reuse features hierarchically, so they generalise to unseen regions without needing a sample in every cell.</li>
</ol>
<h4>Example</h4>
<p>A 100×100 RGB image has 30,000 dimensions. A fully connected layer with 1000 units needs 30 million weights, but a CNN with 64 filters of 3×3×3 needs only 1,728 weights + 64 biases, and pooling then reduces the size further.</p>
<h4>Conclusion</h4>
<p>High dimensions make data sparse; deep learning fights this by learning low-dimensional representations and sharing parameters.</p>`,
  hi: `<p><b>Definition:</b> Jab features (columns/dimensions) bahut zyada ho jaate hain, toh feature space ka size exponentially badhta hai. Data utna hi rehta hai, toh space "khaali-khaali" ho jaata hai (<b>sparse</b>). Model ko pattern seekhne ke liye bahut zyada data chahiye. Isi ko <b>curse of dimensionality</b> kehte hain (Bellman ka term).</p>
<h4>Problems</h4>
<ul>
<li><b>Sparsity:</b> har feature ke 10 bins hon toh d features ke liye 10ᵈ cells. 3 points 1-D mein 30% bharte hain, 3-D mein sirf 0.3%.</li>
<li><b>Distance bekaar:</b> sabse paas waala aur sabse door waala point lagbhag barabar door, toh k-NN fail.</li>
<li><b>Overfitting:</b> features zyada, samples kam → model ratta maarta hai.</li>
<li><b>Computation</b> aur memory bahut badh jaati hai.</li>
<li><b>Hughes phenomenon:</b> ek limit ke baad features badhao toh accuracy girti hai.</li>
</ul>
<h4>Deep learning ka ilaaj</h4>
<ol>
<li><b>Representation learning:</b> hidden layers khud chhote, kaam ke features seekh leti hain.</li>
<li><b>Autoencoder:</b> bottleneck layer data ko compress karti hai.</li>
<li><b>CNN:</b> parameter sharing + local connection = kam weights; pooling se size chhota.</li>
<li><b>Embeddings:</b> 50,000 size ka one-hot → 300 size ka dense vector.</li>
<li><b>Regularisation:</b> dropout, L1, L2, early stopping.</li>
<li><b>Data augmentation / transfer learning:</b> data badhao ya pehle se trained model use karo.</li>
</ol>
<h4>Desi example</h4>
<p>Mele mein khoya bachcha: ek seedhi gali (1-D) mein dhoondhna aasan, poore maidan (2-D) mein mushkil, aur 10 manzil ke mall (3-D+) mein bahut mushkil, jab ki clues utne hi hain. Dimensions badhe, mehnat exponentially badhi.</p>
<p><b>Ek line:</b> Zyada dimensions = sparse data; DL compact representation seekh ke aur parameters share karke isse bachata hai.</p>`,
  keys: ["Bellman", "sparsity", "exponential growth 10ᵈ", "distance concentration", "Hughes phenomenon", "overfitting", "autoencoder", "embedding", "parameter sharing", "representation learning", "manifold"],
  draw: "Three boxes: a 1-D line with 10 cells, a 2-D grid with 100 cells and a 3-D cube with 1000 cells, each containing the same 3 points.",
  fig: "unit1.html#q2",
  num: false
},
{
  id: "U1-03",
  unit: 1,
  topic: "Multilayer perceptron",
  q: "Explain the multilayer perceptron (MLP). Design a simple neural network with three layers for binary classification and explain its working.",
  alt: [
    "Define a multilayer perceptron.",
    "Design a 3-layer neural network for binary classification.",
    "Explain the architecture of an MLP with a neat diagram.",
    "How does an MLP overcome the limitation of a single-layer perceptron?",
    "What is the role of the input, hidden and output layers?"
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 85,
  diff: 3,
  pyq: ["8AID 2025 B2", "7CAI 2025 A1"],
  why: "Asked in two papers (design question 2025, definition 7CAI 2025); central model of the unit.",
  short: "An MLP is a fully connected feed-forward network with an input layer, one or more non-linear hidden layers and an output layer, trained by backpropagation.",
  en: `<p><b>Definition:</b> A multilayer perceptron (MLP) is a fully connected feed-forward neural network with an <b>input layer</b>, one or more <b>hidden layers</b> using non-linear activation, and an <b>output layer</b>. Each neuron computes a = f(Σ wx + b). It is trained with backpropagation and, unlike a single perceptron, can learn non-linear decision boundaries such as XOR.</p>
<h4>Layers and roles</h4>
<ul>
<li><b>Input layer:</b> one node per feature; no computation.</li>
<li><b>Hidden layer(s):</b> learn non-linear combinations of features (ReLU/tanh).</li>
<li><b>Output layer:</b> gives the prediction; activation depends on the task (sigmoid, softmax, linear).</li>
</ul>
<h4>Design: 3-layer network for binary classification</h4>
<p>Problem: predict whether a student passes (1) or fails (0) from hours studied and attendance.</p>
<table>
<tr><th>Layer</th><th>Neurons</th><th>Activation</th><th>Reason</th></tr>
<tr><td>Input</td><td>2</td><td>none</td><td>two features</td></tr>
<tr><td>Hidden</td><td>3 (or 4–16)</td><td>ReLU</td><td>non-linearity, no saturation for z &gt; 0</td></tr>
<tr><td>Output</td><td>1</td><td>Sigmoid</td><td>probability P(y=1) in (0,1)</td></tr>
</table>
<div class="formula">h = ReLU(W₁x + b₁), ŷ = σ(W₂h + b₂)</div>
<div class="formula">Loss (binary cross-entropy): L = −[y log ŷ + (1 − y) log(1 − ŷ)]</div>
<ul><li><b>Optimiser:</b> SGD or Adam, η = 0.01.</li><li><b>Decision rule:</b> ŷ ≥ 0.5 → class 1, else class 0.</li><li><b>Parameters:</b> (2×3 + 3) + (3×1 + 1) = 13.</li></ul>
<h4>Working</h4>
<ol>
<li>Normalise the inputs; initialise weights randomly (He initialisation for ReLU).</li>
<li>Forward pass gives ŷ.</li>
<li>BCE loss compares ŷ with y.</li>
<li>Backpropagation computes gradients; the optimiser updates W₁, b₁, W₂, b₂.</li>
<li>Repeat over epochs with mini-batches; monitor validation loss (early stopping).</li>
<li>Evaluate on test data with accuracy, precision, recall, F1.</li>
</ol>
<h4>Why MLP beats a single perceptron</h4>
<p>A perceptron draws only one straight line. Hidden layers transform the input space so that classes become linearly separable (e.g. XOR needs 2 hidden units).</p>
<h4>Applications and limitations</h4>
<ul><li>Applications: spam detection, credit scoring, medical diagnosis, tabular data.</li><li>Limitations: many parameters for images (no weight sharing), ignores spatial/sequential structure, can overfit, needs tuning.</li></ul>
<p><b>Conclusion:</b> An MLP with a ReLU hidden layer, sigmoid output and BCE loss is the standard design for binary classification.</p>`,
  hi: `<p><b>MLP kya hai:</b> Ek fully connected feed-forward network jismein <b>input layer</b>, kam se kam ek <b>hidden layer</b> (non-linear activation ke saath) aur ek <b>output layer</b> hoti hai. Har neuron karta hai a = f(Σwx + b). Training backprop se hoti hai. Single perceptron sirf seedhi line kheench sakta hai, MLP curve wali boundary bhi (jaise XOR).</p>
<h4>Layers ka kaam</h4>
<ul><li><b>Input:</b> har feature ka ek node, sirf data aage bhejna.</li><li><b>Hidden:</b> "dimaag", features ke combinations seekhta hai (ReLU).</li><li><b>Output:</b> final jawab; binary ke liye sigmoid.</li></ul>
<h4>Design (student pass/fail)</h4>
<table>
<tr><th>Layer</th><th>Neurons</th><th>Activation</th></tr>
<tr><td>Input</td><td>2 (padhai ke ghante, attendance)</td><td>—</td></tr>
<tr><td>Hidden</td><td>3</td><td>ReLU</td></tr>
<tr><td>Output</td><td>1</td><td>Sigmoid</td></tr>
</table>
<div class="formula">h = ReLU(W₁x + b₁), ŷ = σ(W₂h + b₂)</div>
<div class="formula">BCE: L = −[y log ŷ + (1 − y) log(1 − ŷ)]</div>
<p>Optimiser Adam/SGD, η = 0.01. ŷ ≥ 0.5 toh Pass, warna Fail. Total parameters = 9 + 4 = 13.</p>
<h4>Kaam kaise karta hai</h4>
<ol><li>Input normalise karo, weights random.</li><li>Forward pass se ŷ.</li><li>BCE loss se galti.</li><li>Backprop se gradient, optimiser se update.</li><li>Kai epochs repeat, validation loss pe nazar.</li><li>Test data pe accuracy, precision, recall.</li></ol>
<h4>Desi example</h4>
<p>Bank loan approval: inputs = salary, CIBIL score. Hidden layer combos seekhti hai jaise "salary kam par CIBIL bahut achha". Output: approve hone ka chance 0.83 → loan pass.</p>
<p><b>Kamiyan:</b> images ke liye bahut zyada weights, sequence/spatial structure nahi samajhta, overfit ho sakta hai.</p>
<p><b>Ek line:</b> ReLU hidden + sigmoid output + BCE loss = binary classification ka standard MLP.</p>`,
  keys: ["input layer", "hidden layer", "output layer", "fully connected", "ReLU", "sigmoid output", "binary cross-entropy", "threshold 0.5", "backpropagation", "non-linear decision boundary"],
  draw: "2-3-1 network: two input circles, three hidden circles (ReLU), one output circle (sigmoid) with all connections and labels W₁,b₁ and W₂,b₂.",
  fig: "unit1.html#q4",
  num: false
},
{
  id: "U1-04",
  unit: 1,
  topic: "Stochastic gradient descent",
  q: "Explain Stochastic Gradient Descent (SGD). Compare it with batch and mini-batch gradient descent.",
  alt: [
    "Explain the concept of stochastic gradient descent.",
    "Differentiate between batch, stochastic and mini-batch gradient descent.",
    "Write the SGD algorithm.",
    "Why is SGD preferred for training deep networks?"
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 80,
  diff: 2,
  pyq: ["8AID 2025 A9"],
  why: "Asked in 2025 Part A; also the optimiser behind every backprop question, so a 4/10-mark version is very likely.",
  short: "SGD updates weights using the gradient of one randomly chosen sample at a time: w ← w − η∇Lᵢ(w). Fast and memory-light but noisy.",
  en: `<p><b>Gradient descent</b> minimises a loss L(w) by moving the weights opposite to the gradient:</p>
<div class="formula">w ← w − η · ∂L/∂w &nbsp; (η = learning rate)</div>
<p><b>Stochastic Gradient Descent (SGD)</b> estimates this gradient from <b>one randomly chosen training example</b> and updates the weights immediately, instead of waiting for the whole dataset.</p>
<div class="formula">for each shuffled sample i: w ← w − η ∇Lᵢ(w)</div>
<h4>Algorithm</h4>
<ol>
<li>Initialise w randomly; choose η and number of epochs.</li>
<li>Shuffle the training set at the start of each epoch.</li>
<li>For each sample: forward pass → loss → gradient (backprop) → update w.</li>
<li>Repeat for several epochs; optionally decay η.</li>
</ol>
<h4>Comparison</h4>
<table>
<tr><th>Point</th><th>Batch GD</th><th>Stochastic GD</th><th>Mini-batch GD</th></tr>
<tr><td>Data per update</td><td>Whole dataset (N)</td><td>1 sample</td><td>B samples (32–256)</td></tr>
<tr><td>Updates per epoch</td><td>1</td><td>N</td><td>N / B</td></tr>
<tr><td>Path</td><td>Smooth</td><td>Noisy, zig-zag</td><td>Fairly smooth</td></tr>
<tr><td>Speed / memory</td><td>Slow, high memory</td><td>Fast, low memory</td><td>Best balance, GPU friendly</td></tr>
<tr><td>Local minima / saddle</td><td>Can get stuck</td><td>Noise helps escape</td><td>Some escape</td></tr>
<tr><td>Convergence</td><td>Exact gradient, stable</td><td>Fluctuates near minimum</td><td>Stable with decay</td></tr>
</table>
<h4>Why SGD for deep learning</h4>
<ul>
<li>Datasets have millions of samples; computing the full gradient per step is too expensive.</li>
<li>The cost per update does not grow with N.</li>
<li>Noise acts as a regulariser and helps escape saddle points.</li>
<li>Supports online learning on streaming data.</li>
</ul>
<h4>Limitations and fixes</h4>
<ul>
<li>Noisy updates → use mini-batches and learning-rate decay.</li>
<li>Same η for all parameters, slow in ravines → Momentum, Nesterov, AdaGrad, RMSProp, Adam.</li>
</ul>
<h4>Example</h4>
<p>Training on 60,000 MNIST images: batch GD makes 1 update per epoch; SGD makes 60,000; mini-batch with B = 64 makes about 938 well-averaged updates.</p>
<p><b>Conclusion:</b> In practice "SGD" usually means mini-batch SGD, the workhorse optimiser of deep learning.</p>`,
  hi: `<p><b>Gradient descent:</b> loss kam karne ke liye weight ko gradient ki ulti direction mein thoda khiskaao: w ← w − η ∂L/∂w.</p>
<p><b>SGD:</b> poore dataset ka gradient nikalne ki jagah <b>ek random sample</b> ka gradient lo aur turant weight update kar do.</p>
<div class="formula">har sample i ke liye: w ← w − η ∇Lᵢ(w)</div>
<h4>Algorithm</h4>
<ol><li>w random, η choose.</li><li>Har epoch mein data shuffle.</li><li>Har sample: forward → loss → gradient → update.</li><li>Kai epochs repeat, η dheere-dheere kam.</li></ol>
<h4>Teeno ka farak</h4>
<table>
<tr><th>Point</th><th>Batch</th><th>SGD</th><th>Mini-batch</th></tr>
<tr><td>Ek update mein data</td><td>poora</td><td>1 sample</td><td>32–256</td></tr>
<tr><td>Raasta</td><td>smooth</td><td>hilta-dulta</td><td>thoda smooth</td></tr>
<tr><td>Speed/memory</td><td>slow, zyada memory</td><td>fast, kam memory</td><td>best balance</td></tr>
</table>
<h4>DL mein SGD kyun</h4>
<ul><li>Lakhon samples, har step pe poora gradient mehenga.</li><li>Noise ek tarah ka regulariser, saddle point se nikalne mein madad.</li><li>Online/streaming data pe chal jaata hai.</li></ul>
<h4>Kamiyan</h4>
<p>Noisy updates aur sabke liye same η. Ilaaj: mini-batch, learning-rate decay, Momentum, Adam.</p>
<h4>Desi example</h4>
<p>Teacher 60 copies check kar raha hai. Batch GD: saari copies padh ke ek baar class ko feedback. SGD: har copy padhte hi us bachche ko turant feedback, jaldi hai par thoda random. Mini-batch: 8-8 copies ka group, dono ka fayda.</p>
<p><b>Ek line:</b> Practice mein "SGD" = mini-batch SGD, deep learning ka main optimiser.</p>`,
  keys: ["gradient", "learning rate η", "one random sample", "noisy updates", "batch GD", "mini-batch", "epoch", "shuffle", "escape saddle points", "learning-rate decay"],
  draw: "Contour ellipses with a smooth path (batch GD) and a zig-zag path (SGD) both reaching the minimum.",
  fig: "unit1.html#q3",
  num: false
},
{
  id: "U1-05",
  unit: 1,
  topic: "Learning algorithms",
  q: "Differentiate between supervised, unsupervised and reinforcement learning with examples.",
  alt: [
    "Differentiate between supervised and unsupervised training of neural networks.",
    "State one difference between supervised and unsupervised learning.",
    "What are the types of learning in machine learning?",
    "Explain semi-supervised and self-supervised learning."
  ],
  marks: [2, 4],
  priority: "must",
  prob: 80,
  diff: 1,
  pyq: ["8AID 2025 A4", "7CAI 2025 A9"],
  why: "Supervised vs unsupervised appeared as Part A in two papers; it is the 'types of learning' sub-topic of learning algorithms.",
  short: "Supervised learning trains on labelled pairs (x, y) to predict y; unsupervised learning uses only x to find structure such as clusters or compressed codes.",
  en: `<p><b>Learning paradigms</b> differ in what feedback the learning algorithm receives during training.</p>
<table>
<tr><th>Point</th><th>Supervised</th><th>Unsupervised</th><th>Reinforcement</th></tr>
<tr><td>Data</td><td>Labelled pairs (x, y)</td><td>Only inputs x</td><td>States, actions, rewards</td></tr>
<tr><td>Goal</td><td>Learn mapping x → y</td><td>Find hidden structure / density p(x)</td><td>Learn a policy maximising cumulative reward</td></tr>
<tr><td>Feedback</td><td>Correct answer per sample</td><td>None</td><td>Delayed scalar reward</td></tr>
<tr><td>Loss in NN</td><td>Cross-entropy, MSE vs label</td><td>Reconstruction error, energy, likelihood</td><td>Negative expected return</td></tr>
<tr><td>Tasks</td><td>Classification, regression</td><td>Clustering, dimensionality reduction, generation</td><td>Control, games, robotics</td></tr>
<tr><td>NN examples</td><td>MLP, CNN classifier, LSTM tagger</td><td>Autoencoder, RBM, GAN, SOM</td><td>Deep Q-Network, policy gradient</td></tr>
<tr><td>Real example</td><td>Spam detection</td><td>Customer segmentation</td><td>AlphaGo, self-driving</td></tr>
</table>
<h4>Other forms</h4>
<ul>
<li><b>Semi-supervised:</b> few labelled + many unlabelled samples (e.g. medical images with a few doctor labels).</li>
<li><b>Self-supervised:</b> labels created from the data itself (predict the masked word, as in BERT).</li>
</ul>
<h4>Training of neural networks</h4>
<ul>
<li><b>Supervised:</b> forward pass → compare with label → backprop the error.</li>
<li><b>Unsupervised:</b> e.g. an autoencoder minimises ‖x − x̂‖²; an RBM uses contrastive divergence; used for pre-training and feature learning.</li>
</ul>
<p><b>Conclusion:</b> The key difference is the presence (supervised), absence (unsupervised) or delayed form (reinforcement) of the target signal.</p>`,
  hi: `<p><b>Simple farak:</b> training ke time algorithm ko kya "feedback" milta hai.</p>
<table>
<tr><th>Point</th><th>Supervised</th><th>Unsupervised</th><th>Reinforcement</th></tr>
<tr><td>Data</td><td>label ke saath (x, y)</td><td>sirf x</td><td>state, action, reward</td></tr>
<tr><td>Goal</td><td>x se y predict</td><td>chhupa pattern/group</td><td>zyada se zyada reward</td></tr>
<tr><td>Example</td><td>spam detection</td><td>customer groups banana</td><td>game khelna, robot</td></tr>
<tr><td>NN</td><td>MLP, CNN</td><td>Autoencoder, RBM, GAN</td><td>DQN</td></tr>
</table>
<h4>Aur types</h4>
<ul><li><b>Semi-supervised:</b> thode labelled + bahut saare bina label ke.</li><li><b>Self-supervised:</b> data khud label bana leta hai (sentence ka chhupa word guess karo).</li></ul>
<h4>NN training mein</h4>
<ul><li>Supervised: output ko label se compare karo, error backprop karo.</li><li>Unsupervised: autoencoder input ko hi wapas banata hai, galti = ‖x − x̂‖².</li></ul>
<h4>Desi example</h4>
<p>Supervised = tuition teacher har sawaal ka sahi answer batata hai. Unsupervised = bina answer key ke khud notes ko topic-wise groups mein baant-na. Reinforcement = cycle chalana seekhna: gire toh "minus", chal gaye toh "plus", koi step-by-step answer nahi.</p>
<p><b>Ek line:</b> Label hai → supervised, label nahi → unsupervised, reward hai → reinforcement.</p>`,
  keys: ["labelled data", "unlabelled data", "reward", "classification", "regression", "clustering", "dimensionality reduction", "autoencoder", "semi-supervised", "self-supervised"],
  draw: "Three columns: labelled points with a decision line (supervised), unlabelled points forming clusters (unsupervised), agent–environment loop with reward (RL).",
  fig: "unit1.html#q9",
  num: false
}
);
window.QB.push(
{
  id: "U1-06",
  unit: 1,
  topic: "Deep feed-forward networks",
  q: "Explain the hidden units used in deep feed-forward networks (sigmoid, tanh, ReLU, Leaky ReLU). Why is a non-linear activation needed?",
  alt: [
    "Name two activation functions used in neural networks.",
    "Explain popular activation functions.",
    "Discuss the effect of different activation functions on network performance with an example.",
    "What problem does Leaky ReLU solve compared to ReLU?",
    "Why can't we use only linear activations in hidden layers?"
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 80,
  diff: 2,
  pyq: ["8AID 2025 A3", "8AID 2025 B3", "8AID 2024 A5", "7CAI 2025 A2"],
  why: "Activation functions were asked in all 3 papers; the main detailed answer lives in Unit 2, this is the Unit 1 'hidden units' view.",
  short: "Hidden units apply non-linear activations, e.g. ReLU f(z) = max(0, z) and sigmoid σ(z) = 1/(1 + e⁻ᶻ), letting the network learn non-linear functions.",
  en: `<p><b>Definition:</b> A hidden unit computes z = wᵀx + b and then applies a non-linear activation g(z). The choice of g decides how well and how fast a deep feed-forward network learns.</p>
<h4>Why non-linearity is needed</h4>
<p>Without g, two layers give W₂(W₁x) = (W₂W₁)x, which is still one linear layer. Any depth would collapse to a linear model that cannot solve XOR. Non-linear activations let the network approximate any function (universal approximation).</p>
<h4>Common hidden units</h4>
<table>
<tr><th>Unit</th><th>Formula</th><th>Range</th><th>Derivative</th><th>Pros / cons</th></tr>
<tr><td>Sigmoid</td><td>1/(1 + e⁻ᶻ)</td><td>(0, 1)</td><td>σ(1 − σ), max 0.25</td><td>Smooth, probabilistic; saturates → vanishing gradient, not zero-centred</td></tr>
<tr><td>Tanh</td><td>(eᶻ − e⁻ᶻ)/(eᶻ + e⁻ᶻ)</td><td>(−1, 1)</td><td>1 − tanh², max 1</td><td>Zero-centred; still saturates</td></tr>
<tr><td>ReLU</td><td>max(0, z)</td><td>[0, ∞)</td><td>1 if z &gt; 0 else 0</td><td>Fast, no saturation for z &gt; 0, sparse; "dying ReLU"</td></tr>
<tr><td>Leaky ReLU</td><td>z if z &gt; 0 else αz (α ≈ 0.01)</td><td>(−∞, ∞)</td><td>1 or α</td><td>Fixes dying ReLU (small gradient for z &lt; 0)</td></tr>
<tr><td>ELU</td><td>z if z &gt; 0 else α(eᶻ − 1)</td><td>(−α, ∞)</td><td>smooth</td><td>Mean closer to zero; costlier</td></tr>
</table>
<h4>Effect on performance (example)</h4>
<p>A 10-layer MLP on MNIST with sigmoid hidden units trains very slowly because each layer multiplies the gradient by at most 0.25, so early layers barely learn. Replacing sigmoid with ReLU keeps the gradient at 1 for active units and the same network reaches high accuracy in far fewer epochs. If many ReLU units die (always z &lt; 0, e.g. with a large η), Leaky ReLU restores learning.</p>
<h4>Guidelines</h4>
<ul>
<li>Default hidden unit: ReLU (or Leaky ReLU / ELU).</li>
<li>Tanh for RNN hidden states; sigmoid for gates and binary outputs.</li>
<li>Use He initialisation with ReLU, Xavier with tanh.</li>
</ul>
<p><b>Conclusion:</b> Non-linear hidden units give depth its power; ReLU-family units avoid vanishing gradients and are the modern default.</p>`,
  hi: `<p><b>Hidden unit:</b> har hidden neuron pehle z = wᵀx + b nikalta hai, phir ek non-linear function g(z) lagata hai. Yahi g "activation function" hai.</p>
<h4>Non-linearity kyun zaroori</h4>
<p>Bina activation ke W₂(W₁x) = (W₂W₁)x, yaani 100 layers bhi ek hi linear layer ke barabar. Woh XOR jaisa simple non-linear problem bhi solve nahi kar sakta. Activation lagao, tabhi network curves aur complex patterns seekhta hai.</p>
<h4>Main activations</h4>
<ul>
<li><b>Sigmoid:</b> 1/(1+e⁻ᶻ), output 0 se 1. Derivative max 0.25, isliye deep network mein gradient gayab (vanishing).</li>
<li><b>Tanh:</b> output −1 se 1, zero-centred, par yeh bhi saturate hota hai.</li>
<li><b>ReLU:</b> max(0, z). Fast, positive side gradient 1. Problem: "dying ReLU", negative side hamesha 0.</li>
<li><b>Leaky ReLU:</b> negative side pe αz (α = 0.01), toh neuron kabhi poora nahi marta. (7CAI A2 ka answer yahi hai.)</li>
<li><b>ELU:</b> negative side smooth curve, mean zero ke paas.</li>
</ul>
<h4>Performance pe asar</h4>
<p>10 layer ka sigmoid network MNIST pe bahut dheere seekhta hai kyunki har layer gradient ko 0.25 se guna karti hai. ReLU lagao toh gradient 1 rehta hai, training jaldi aur accuracy zyada. Agar bahut saare ReLU mar jaayein toh Leaky ReLU use karo.</p>
<h4>Desi example</h4>
<p>ReLU = darwaaza jo sirf andar ki taraf khulta hai: positive signal jaane do, negative band. Leaky ReLU = darwaaze mein chhoti si jhiri, thodi si hawa (gradient) negative side se bhi aati rahti hai.</p>
<p><b>Ek line:</b> Hidden layers mein default ReLU; sigmoid/tanh sirf jahaan range chahiye (gates, output).</p>`,
  keys: ["non-linearity", "sigmoid", "tanh", "ReLU max(0,z)", "Leaky ReLU", "ELU", "saturation", "vanishing gradient", "dying ReLU", "zero-centred"],
  draw: "Small graphs of sigmoid (S-curve 0 to 1), tanh (S-curve −1 to 1), ReLU (flat then 45° line) and Leaky ReLU (slight negative slope).",
  fig: "unit2.html#q3",
  num: false
},
{
  id: "U1-07",
  unit: 1,
  topic: "Backpropagation algorithm",
  q: "Numerical: compute the backpropagation weight update for a single-layer perceptron / single sigmoid neuron for given inputs, weights, target and learning rate.",
  alt: [
    "Illustrate the backpropagation weight update for a single-layer perceptron with an example.",
    "Given x, w, b, t and η, find the updated weights after one iteration.",
    "Apply the delta rule to a sigmoid neuron and show that the error decreases."
  ],
  marks: [4, 10],
  priority: "must",
  prob: 75,
  diff: 3,
  pyq: ["8AID 2025 B4"],
  why: "Asked as a 4-mark numerical in 2025; may reappear with new numbers. Optional for a theory-first student but easy marks if the steps are memorised.",
  short: "Perceptron rule: w ← w + η(t − o)x. Sigmoid delta rule: δ = (t − o)·o(1 − o), w ← w + η δ x.",
  en: `<p><b>Method (memorise these 5 steps):</b> (1) net = Σ wᵢxᵢ + b; (2) o = f(net); (3) error = t − o; (4) δ / gradient; (5) w_new = w_old + Δw; then check that the error fell.</p>
<h4>Numerical 1: perceptron with step activation</h4>
<p><b>Given:</b> x₁ = 1, x₂ = 1, w₁ = 0.5, w₂ = −0.4, b = −0.2, target t = 1, η = 0.1, o = 1 if net ≥ 0 else 0.</p>
<pre>net = 0.5(1) + (−0.4)(1) + (−0.2) = −0.1
o   = step(−0.1) = 0          error = t − o = 1
Rule: w ← w + η (t − o) x
w₁ = 0.5  + 0.1 × 1 × 1 = 0.6
w₂ = −0.4 + 0.1 × 1 × 1 = −0.3
b  = −0.2 + 0.1 × 1     = −0.1
Check: net = 0.6 − 0.3 − 0.1 = 0.2 ≥ 0 → o = 1 = t ✔</pre>
<h4>Numerical 2: sigmoid neuron, gradient descent (delta rule)</h4>
<p><b>Given:</b> x₁ = 1, x₂ = 0.5, w₁ = 0.4, w₂ = 0.6, b = 0, t = 1, η = 0.5, σ(z) = 1/(1 + e⁻ᶻ), E = ½(t − o)².</p>
<pre>Forward:  net = 0.4(1) + 0.6(0.5) + 0 = 0.7
          o   = 1/(1 + e^−0.7) = 1/1.4966 = 0.6682
          t − o = 0.3318,  E = ½(0.3318)² = 0.0550
Backward: δ = (t − o) · o(1 − o) = 0.3318 × 0.6682 × 0.3318 = 0.0736
Update:   Δw₁ = η δ x₁ = 0.5 × 0.0736 × 1   = 0.0368 → w₁ = 0.4368
          Δw₂ = η δ x₂ = 0.5 × 0.0736 × 0.5 = 0.0184 → w₂ = 0.6184
          Δb  = η δ    = 0.0368              → b  = 0.0368
Check:    net = 0.4368 + 0.3092 + 0.0368 = 0.7828 → o = 0.6863
          error 0.3318 → 0.3137 (E 0.0550 → 0.0492) ✔</pre>
<h4>Why the formula works</h4>
<div class="formula">∂E/∂wᵢ = ∂E/∂o · ∂o/∂net · ∂net/∂wᵢ = −(t − o) · o(1 − o) · xᵢ</div>
<div class="formula">Δwᵢ = −η ∂E/∂wᵢ = η (t − o) o(1 − o) xᵢ = η δ xᵢ</div>
<h4>If a hidden layer is given (10-mark version)</h4>
<ul>
<li>Output: δₖ = (tₖ − oₖ) oₖ(1 − oₖ); Δwⱼₖ = η δₖ hⱼ.</li>
<li>Hidden: δⱼ = hⱼ(1 − hⱼ) Σₖ wⱼₖ δₖ (use the OLD wⱼₖ); Δwᵢⱼ = η δⱼ xᵢ.</li>
<li>Update all weights only after all δ values are computed.</li>
</ul>
<h4>Common mistakes</h4>
<ul><li>Forgetting the bias update (input = 1).</li><li>Using the sign wrongly: with error (t − o) the update is +η δ x.</li><li>Rounding too early: keep 4 decimals.</li></ul>
<p><b>Conclusion:</b> One iteration moves the output towards the target; repeating over epochs drives the error to a minimum.</p>`,
  hi: `<p><b>Tarika (5 steps ratt lo):</b> (1) net = Σwx + b, (2) o = f(net), (3) error = t − o, (4) δ nikaalo, (5) naya w = purana w + Δw. Aakhir mein "check" line likho ki error kam hua.</p>
<h4>Sawaal 1: perceptron (step function)</h4>
<pre>x₁=1, x₂=1, w₁=0.5, w₂=−0.4, b=−0.2, t=1, η=0.1
net = 0.5 − 0.4 − 0.2 = −0.1 → o = 0, error = 1
w₁ = 0.5 + 0.1×1×1 = 0.6
w₂ = −0.4 + 0.1×1×1 = −0.3
b  = −0.2 + 0.1×1 = −0.1
Check: net = 0.2 → o = 1 ✔</pre>
<h4>Sawaal 2: sigmoid neuron</h4>
<pre>x₁=1, x₂=0.5, w₁=0.4, w₂=0.6, b=0, t=1, η=0.5
net = 0.7, o = 1/(1+e^−0.7) = 0.6682, t − o = 0.3318
δ = 0.3318 × 0.6682 × 0.3318 = 0.0736
w₁ = 0.4 + 0.5×0.0736×1   = 0.4368
w₂ = 0.6 + 0.5×0.0736×0.5 = 0.6184
b  = 0 + 0.5×0.0736       = 0.0368
Check: net = 0.7828, o = 0.6863 → error 0.3318 se 0.3137 ✔</pre>
<h4>Formula kahaan se aaya</h4>
<div class="formula">Δw = η (t − o) · o(1 − o) · x = η δ x</div>
<p>(t − o) = kitni galti, o(1 − o) = sigmoid ka slope, x = us weight ka input. Teeno multiply = us weight ki "zimmedari".</p>
<h4>Hidden layer ho toh</h4>
<ul><li>Pehle output δ, phir hidden δⱼ = hⱼ(1 − hⱼ) Σ wⱼₖ δₖ (purane weights se).</li><li>Saare δ nikalne ke baad hi weights update karo.</li></ul>
<h4>Galtiyan jo mat karna</h4>
<ul><li>Bias update bhoolna (bias ka input = 1).</li><li>Sign ulta karna.</li><li>Beech mein zyada round off karna; 4 decimal rakho.</li></ul>
<h4>Desi example</h4>
<p>Dukaandaar chai mein cheeni daal raha hai (weight). Customer bola "thodi kam meethi hai" (error). Agli baar thodi si cheeni badhao (Δw = η × error × input). Ek-do baar mein perfect chai.</p>`,
  keys: ["net = Σwx + b", "step / sigmoid activation", "error t − o", "δ = (t − o)o(1 − o)", "Δw = η δ x", "bias update", "learning rate", "check error decreased"],
  draw: "Single neuron: x₁, x₂ and bias 1 with weights w₁, w₂, b feeding Σ → f → o, with t − o shown at the output.",
  fig: "unit1.html#q1",
  num: true
},
{
  id: "U1-08",
  unit: 1,
  topic: "Deep feed-forward networks",
  q: "What is a deep feed-forward network? Explain its structure and why hidden layers are needed, using the XOR problem.",
  alt: [
    "Define a deep feedforward network.",
    "How does a feed-forward network learn XOR?",
    "Differentiate between a feed-forward network and a recurrent network.",
    "Explain the design decisions of a deep feed-forward network (cost function, output units, hidden units, architecture)."
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 72,
  diff: 3,
  pyq: ["7CAI 2025 A8"],
  why: "Asked as Part A in 7CAI 2025; it is a named syllabus heading, so a 4/10-mark version with XOR is likely.",
  short: "A deep feed-forward network approximates y = f*(x) by passing information only forward through several hidden layers, f(x) = f³(f²(f¹(x))), with no feedback loops.",
  en: `<p><b>Definition:</b> A deep feed-forward network (DFN), also called a multilayer perceptron, approximates some function y = f*(x) by learning parameters θ of a mapping y = f(x; θ). Information flows <b>only forward</b> from input through hidden layers to output; there are no feedback connections (those make it recurrent).</p>
<div class="formula">f(x) = f⁽³⁾(f⁽²⁾(f⁽¹⁾(x))) — the length of this chain is the depth</div>
<h4>Structure</h4>
<ul>
<li><b>Input layer</b> receives x.</li>
<li><b>Hidden layers</b>: their desired outputs are not given in the data; the learning algorithm decides what they compute. h = g(Wx + b).</li>
<li><b>Output layer</b> produces ŷ (linear, sigmoid or softmax).</li>
<li><b>Width</b> = units per layer; <b>depth</b> = number of layers.</li>
</ul>
<h4>Design decisions (Goodfellow)</h4>
<ol><li>Cost function (usually negative log-likelihood / cross-entropy).</li><li>Output units (linear, sigmoid, softmax).</li><li>Hidden units (ReLU default).</li><li>Architecture (depth, width, connections).</li><li>Training by gradient-based learning + backpropagation.</li></ol>
<h4>XOR: why hidden layers are needed</h4>
<table><tr><th>x₁</th><th>x₂</th><th>XOR</th></tr><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></table>
<p>No single straight line separates the 1s from the 0s, so a linear model or single perceptron fails. Goodfellow's solution with 2 ReLU hidden units:</p>
<div class="formula">h = max(0, Wᵀx + c), W = [[1,1],[1,1]], c = [0, −1]; y = wᵀh, w = [1, −2]</div>
<pre>x = (0,0): h = (0,0)  → y = 0
x = (0,1): h = (1,0)  → y = 1
x = (1,0): h = (1,0)  → y = 1
x = (1,1): h = (2,1)  → y = 2 − 2 = 0 ✔</pre>
<p>The hidden layer maps (0,1) and (1,0) to the same point, making the problem linearly separable.</p>
<h4>Feed-forward vs recurrent</h4>
<table><tr><th>Feed-forward</th><th>Recurrent</th></tr><tr><td>No loops, one pass</td><td>Loops carry hidden state</td></tr><tr><td>Fixed-size input</td><td>Sequences of any length</td></tr><tr><td>Trained by backprop</td><td>Trained by BPTT</td></tr></table>
<h4>Applications</h4>
<p>Tabular classification/regression, the dense layers at the end of CNNs, recommender systems.</p>
<p><b>Conclusion:</b> Depth with non-linear hidden units lets a feed-forward network build a non-linear function as a chain of simple functions.</p>`,
  hi: `<p><b>Definition:</b> Deep feed-forward network (DFN / MLP) ek function y = f*(x) ko approximate karta hai. Data sirf <b>aage</b> jaata hai: input → hidden layers → output. Koi loop ya feedback nahi (loop ho toh RNN ban jaata hai).</p>
<div class="formula">f(x) = f⁽³⁾(f⁽²⁾(f⁽¹⁾(x))) — kitne function chain mein, utni depth</div>
<h4>Structure</h4>
<ul><li><b>Input layer:</b> x aata hai.</li><li><b>Hidden layers:</b> inka sahi output data mein nahi diya hota, network khud decide karta hai ki yeh kya seekhein. h = g(Wx + b).</li><li><b>Output layer:</b> final ŷ (linear / sigmoid / softmax).</li><li>Width = ek layer mein neurons, depth = layers ki sankhya.</li></ul>
<h4>Design ke faisle</h4>
<p>Cost function (cross-entropy), output unit, hidden unit (ReLU), architecture (kitni layers, kitne neurons), training (gradient descent + backprop).</p>
<h4>XOR wala example</h4>
<p>XOR: (0,0)→0, (0,1)→1, (1,0)→1, (1,1)→0. Ek seedhi line se 1 aur 0 alag nahi hote, toh perceptron fail. 2 ReLU hidden units lagao:</p>
<pre>h = max(0, Wᵀx + c), W = [[1,1],[1,1]], c = [0,−1], y = h₁ − 2h₂
(0,0) → h=(0,0) → 0
(0,1) → h=(1,0) → 1
(1,0) → h=(1,0) → 1
(1,1) → h=(2,1) → 0 ✔</pre>
<p>Hidden layer ne (0,1) aur (1,0) ko ek hi jagah pahuncha diya, ab ek line se kaam ho gaya.</p>
<h4>FFN vs RNN</h4>
<ul><li>FFN: loop nahi, fixed size input, backprop.</li><li>RNN: loop se memory, sequence input, BPTT.</li></ul>
<h4>Desi example</h4>
<p>Halwai ki dukaan pe jalebi: maida ghola → shape di → tali → chaashni. Har step agle ko deta hai, peeche kabhi nahi jaata. Yahi feed-forward. Beech ke steps (hidden) customer ko nahi dikhte, par asli kamaal wahi karte hain.</p>
<p><b>Ek line:</b> Non-linear hidden layers ki chain se DFN complex function bana leta hai.</p>`,
  keys: ["f(x) = f³(f²(f¹(x)))", "no feedback", "hidden layers", "depth", "width", "XOR", "linearly separable", "ReLU hidden units", "cost function", "output units"],
  draw: "XOR plot on a 2×2 grid showing that no single line separates the classes, plus a 2-2-1 network (x₁, x₂ → h₁, h₂ → y).",
  fig: "unit1.html#q6",
  num: false
},
{
  id: "U1-09",
  unit: 1,
  topic: "Backpropagation algorithm",
  q: "What are vanishing and exploding gradients? Why do they occur during backpropagation and how can they be solved?",
  alt: [
    "Define the vanishing gradient problem.",
    "Why is it difficult to train very deep networks?",
    "How do ReLU, batch normalisation and residual connections help with vanishing gradients?",
    "What is gradient clipping?"
  ],
  marks: [2, 4, 10],
  priority: "high",
  prob: 62,
  diff: 3,
  pyq: [],
  why: "Not asked directly but due: it underlies the LReLU (7CAI A2), ResNet (8AID 2025 C3) and LSTM questions and is the standard 'limitation of backprop'.",
  short: "In deep nets, gradients multiplied layer by layer become tiny (vanishing) or huge (exploding), so early layers stop learning or training diverges.",
  en: `<p><b>Definition:</b> During backpropagation the gradient for an early layer is a product of many terms (one per later layer). If these terms are mostly &lt; 1 the gradient shrinks exponentially (<b>vanishing gradient</b>); if mostly &gt; 1 it grows exponentially (<b>exploding gradient</b>).</p>
<div class="formula">∂L/∂h₁ = ∂L/∂h_L · Π (l = 2 … L) [ W_l · g′(z_l) ]</div>
<h4>Causes</h4>
<ul>
<li>Sigmoid derivative ≤ 0.25 and tanh saturates: 10 sigmoid layers → gradient scaled by at most 0.25¹⁰ ≈ 10⁻⁶.</li>
<li>Poor weight initialisation (too small → vanish, too large → explode).</li>
<li>Very deep networks and long RNN sequences (BPTT multiplies the same W many times).</li>
</ul>
<h4>Symptoms</h4>
<table><tr><th>Vanishing</th><th>Exploding</th></tr>
<tr><td>Early layers' weights barely change</td><td>Weights change wildly</td></tr>
<tr><td>Loss stalls on a plateau</td><td>Loss becomes NaN / oscillates</td></tr>
<tr><td>Long-range dependencies not learned</td><td>Numerical overflow</td></tr></table>
<h4>Solutions</h4>
<ol>
<li><b>ReLU / Leaky ReLU / ELU</b>: derivative 1 for positive inputs.</li>
<li><b>Proper initialisation</b>: Xavier/Glorot (Var = 2/(n_in + n_out)) for tanh; He (Var = 2/n_in) for ReLU.</li>
<li><b>Batch normalisation</b>: keeps activations in a healthy range.</li>
<li><b>Residual (skip) connections</b> (ResNet): y = F(x) + x gives the gradient a direct path.</li>
<li><b>LSTM / GRU gates</b> for sequences (additive cell state).</li>
<li><b>Gradient clipping</b> for exploding: if ‖g‖ &gt; τ, g ← τ g/‖g‖.</li>
<li>Smaller learning rate, weight regularisation, adaptive optimisers.</li>
</ol>
<h4>Example</h4>
<p>Before 2010, 8–10 layer sigmoid networks could not be trained well. ReLU (AlexNet, 2012) and residual connections (ResNet-152, 2015) made very deep networks trainable.</p>
<p><b>Conclusion:</b> Vanishing/exploding gradients are the main obstacle to depth, solved by better activations, initialisation, normalisation, skip connections and clipping.</p>`,
  hi: `<p><b>Kya hai:</b> Backprop mein shuru wali layer ka gradient = baad ki saari layers ke terms ka <b>guna</b>. Agar har term 1 se chhota → gradient ghat-te ghat-te zero (<b>vanishing</b>). Agar 1 se bada → gradient phat jaata hai (<b>exploding</b>).</p>
<div class="formula">∂L/∂h₁ = ∂L/∂h_L · Π [W_l · g′(z_l)]</div>
<h4>Kyun hota hai</h4>
<ul><li>Sigmoid ka derivative max 0.25. 10 layers: 0.25¹⁰ ≈ 0.000001. Pehli layer ko lagbhag kuch nahi milta.</li><li>Galat initialisation: weights bahut chhote ya bahut bade.</li><li>Bahut deep network ya lambi RNN sequence.</li></ul>
<h4>Pehchaan</h4>
<ul><li>Vanishing: shuru ki layers seekhti hi nahi, loss atak jaata hai.</li><li>Exploding: loss NaN, weights pagal ho jaate hain.</li></ul>
<h4>Ilaaj</h4>
<ol><li>ReLU / Leaky ReLU (slope 1).</li><li>Xavier ya He initialisation.</li><li>Batch normalisation.</li><li>Residual connection (ResNet): y = F(x) + x, gradient ke liye seedhi sadak.</li><li>LSTM/GRU sequences ke liye.</li><li>Gradient clipping: gradient ek limit se bada ho toh chhota kar do.</li><li>Chhota learning rate.</li></ol>
<h4>Desi example</h4>
<p>"Chinese whispers" / telephone game: 10 bachche line mein. Pehla message bolta hai, har bachcha thoda dheere bolta hai. Aakhri tak message gayab (vanishing). Agar har bachcha thoda zor se bole toh aakhir tak cheekh ban jaati hai (exploding). ResNet = pehla bachcha message ek chit pe likh ke seedha aakhri ko bhi de deta hai.</p>
<p><b>Ek line:</b> Deep network ki sabse badi rukawat; ReLU, sahi init, BatchNorm, skip connection aur clipping se hal.</p>`,
  keys: ["product of derivatives", "sigmoid derivative 0.25", "saturation", "exploding gradient", "ReLU", "Xavier / He initialisation", "batch normalisation", "residual connection", "gradient clipping", "LSTM"],
  draw: "Chain of layers with gradient arrows getting thinner towards the input (vanishing), and a skip connection arrow bypassing two layers.",
  fig: "unit4.html#q6",
  num: false
},
{
  id: "U1-10",
  unit: 1,
  topic: "Backpropagation variants",
  q: "Explain the optimisation variants used with backpropagation: Momentum, Nesterov accelerated gradient, AdaGrad, RMSProp and Adam.",
  alt: [
    "What is momentum in gradient descent?",
    "Explain the Adam optimiser.",
    "Compare AdaGrad, RMSProp and Adam.",
    "What are adaptive learning-rate methods?"
  ],
  marks: [2, 4, 10],
  priority: "high",
  prob: 60,
  diff: 4,
  pyq: [],
  why: "Never asked directly but the syllabus says 'backpropagation and its variants' and the 2025 SGD question invites it; due for a 4/10-mark appearance.",
  short: "Momentum adds a fraction of the previous update; AdaGrad/RMSProp scale η per parameter by past squared gradients; Adam combines momentum with RMSProp.",
  en: `<p><b>Need:</b> Plain SGD uses one fixed learning rate for all weights, zig-zags across narrow valleys and slows on plateaus. Variants change the update rule to converge faster and more stably. (g = ∇L(w), η = learning rate.)</p>
<h4>1. Momentum</h4>
<div class="formula">v ← βv + η g; &nbsp; w ← w − v &nbsp; (β ≈ 0.9)</div>
<p>Accumulates a velocity in consistent directions and damps oscillation, like a ball rolling downhill.</p>
<h4>2. Nesterov Accelerated Gradient (NAG)</h4>
<div class="formula">v ← βv + η ∇L(w − βv); &nbsp; w ← w − v</div>
<p>Computes the gradient at the look-ahead position, so it corrects before overshooting.</p>
<h4>3. AdaGrad (Duchi et al., 2011)</h4>
<div class="formula">G ← G + g²; &nbsp; w ← w − η g / (√G + ε)</div>
<p>Per-parameter learning rate: large steps for rare features, small for frequent ones. Good for sparse data (NLP). Drawback: G only grows, so the step size decays to almost zero.</p>
<h4>4. RMSProp (Hinton, 2012)</h4>
<div class="formula">E[g²] ← ρE[g²] + (1 − ρ)g²; &nbsp; w ← w − η g / (√E[g²] + ε) &nbsp; (ρ ≈ 0.9)</div>
<p>Uses an exponential moving average instead of a sum, so learning does not stop. Works well for RNNs.</p>
<h4>5. Adam (Kingma and Ba, 2014)</h4>
<div class="formula">m ← β₁m + (1 − β₁)g; &nbsp; v ← β₂v + (1 − β₂)g²</div>
<div class="formula">m̂ = m/(1 − β₁ᵗ), v̂ = v/(1 − β₂ᵗ); &nbsp; w ← w − η m̂ / (√v̂ + ε)</div>
<p>Defaults: β₁ = 0.9, β₂ = 0.999, ε = 10⁻⁸, η = 0.001. Momentum + RMSProp with bias correction; the default optimiser in DL.</p>
<h4>Comparison</h4>
<table>
<tr><th>Method</th><th>Uses past gradients (1st moment)</th><th>Adaptive per-parameter η</th><th>Main benefit</th><th>Weakness</th></tr>
<tr><td>SGD</td><td>No</td><td>No</td><td>Simple, generalises well</td><td>Slow, zig-zag</td></tr>
<tr><td>Momentum / NAG</td><td>Yes</td><td>No</td><td>Faster, less oscillation</td><td>Extra hyper-parameter β</td></tr>
<tr><td>AdaGrad</td><td>No</td><td>Yes (sum of g²)</td><td>Sparse features</td><td>η decays to zero</td></tr>
<tr><td>RMSProp</td><td>No</td><td>Yes (moving avg)</td><td>Non-stationary problems</td><td>Needs tuning of ρ</td></tr>
<tr><td>Adam</td><td>Yes</td><td>Yes</td><td>Fast, robust default</td><td>Sometimes generalises worse than SGD+momentum</td></tr>
</table>
<p><b>Conclusion:</b> Momentum fixes direction, adaptive methods fix step size, and Adam does both.</p>`,
  hi: `<p><b>Zaroorat kyun:</b> Normal SGD sab weights ke liye ek hi η use karta hai, patli ghaati mein zig-zag karta hai, aur flat jagah pe dheere chalta hai. Isliye improved versions aaye. (g = gradient.)</p>
<h4>1. Momentum</h4>
<div class="formula">v = βv + ηg, w = w − v (β ≈ 0.9)</div>
<p>Pichhle steps ki "speed" yaad rakhta hai. Same direction mein tez, zig-zag kam.</p>
<h4>2. Nesterov (NAG)</h4>
<p>Pehle "aage jhaank ke" (w − βv pe) gradient nikalta hai, phir chalta hai. Overshoot kam.</p>
<h4>3. AdaGrad</h4>
<div class="formula">G = G + g², w = w − η g/(√G + ε)</div>
<p>Har weight ka apna η. Rare features ko bada step. Problem: G badhta hi rehta hai, toh step zero ho jaata hai.</p>
<h4>4. RMSProp</h4>
<div class="formula">E[g²] = 0.9E[g²] + 0.1g², w = w − η g/(√E[g²] + ε)</div>
<p>Sum ki jagah moving average, toh learning rukti nahi.</p>
<h4>5. Adam</h4>
<div class="formula">m = β₁m + (1−β₁)g, v = β₂v + (1−β₂)g², w = w − η m̂/(√v̂ + ε)</div>
<p>Momentum + RMSProp + bias correction. β₁ = 0.9, β₂ = 0.999, η = 0.001. Sabse popular default.</p>
<h4>Ek nazar mein</h4>
<ul><li>Momentum/NAG = direction sudhaarte hain.</li><li>AdaGrad/RMSProp = step size sudhaarte hain.</li><li>Adam = dono.</li></ul>
<h4>Desi example</h4>
<p>Scooty se ghaat (pahadi raasta) utarna. SGD = har mod pe brake-accelerator jhatke se. Momentum = scooty ki speed bani rehti hai, jhatke kam. AdaGrad/RMSProp = ubad-khabad raaste pe dheere, saaf raaste pe tez. Adam = experienced driver jo dono kaam saath karta hai.</p>
<p><b>Ek line:</b> Adam = Momentum + RMSProp, deep learning ka default optimiser.</p>`,
  keys: ["momentum β = 0.9", "velocity", "Nesterov look-ahead", "AdaGrad accumulated g²", "RMSProp moving average", "Adam β₁ = 0.9, β₂ = 0.999", "bias correction", "adaptive learning rate", "ε"],
  draw: "Contour plot: zig-zag SGD path versus a smoother momentum/Adam path to the minimum.",
  fig: "unit1.html#q3",
  num: false
}
);
window.QB.push(
{
  id: "U1-11",
  unit: 1,
  topic: "Maximum likelihood estimation",
  q: "What is Maximum Likelihood Estimation (MLE)? Explain with an example and show how it is used in deep learning (link to cross-entropy and MSE).",
  alt: [
    "Define maximum likelihood estimation.",
    "Why do we use log-likelihood instead of likelihood?",
    "Show that minimising cross-entropy is equivalent to maximising likelihood.",
    "Show that MSE corresponds to MLE under Gaussian noise.",
    "What are the properties of the maximum likelihood estimator?"
  ],
  marks: [2, 4, 10],
  priority: "high",
  prob: 58,
  diff: 4,
  pyq: [],
  why: "Named syllabus sub-topic never asked yet — a core concept that is due.",
  short: "MLE chooses parameters θ that make the observed data most probable: θ_ML = argmax_θ Σᵢ log p(xᵢ; θ).",
  en: `<p><b>Definition:</b> Maximum Likelihood Estimation is a method of estimating the parameters θ of a probabilistic model by choosing the values under which the observed data is <b>most probable</b>.</p>
<h4>Formulation</h4>
<p>For i.i.d. data X = {x₁, …, xₘ}:</p>
<div class="formula">L(θ) = Πᵢ p(xᵢ; θ) &nbsp;&nbsp; θ_ML = argmax_θ Πᵢ p(xᵢ; θ) = argmax_θ Σᵢ log p(xᵢ; θ)</div>
<ul>
<li><b>Why log:</b> a product of many small probabilities underflows; log turns it into a sum, is monotonic (argmax unchanged) and is easier to differentiate.</li>
<li>Equivalently, MLE minimises the KL divergence between the data distribution and the model distribution.</li>
</ul>
<h4>Worked example (coin)</h4>
<pre>10 tosses: 7 Heads, 3 Tails. Find p = P(Head).
L(p) = p⁷ (1 − p)³
log L = 7 log p + 3 log(1 − p)
d/dp: 7/p − 3/(1 − p) = 0 → 7(1 − p) = 3p → p = 0.7</pre>
<h4>Steps to apply MLE</h4>
<ol><li>Choose a model p(x; θ).</li><li>Write the likelihood of all data.</li><li>Take log.</li><li>Differentiate and set to zero (or use gradient descent).</li><li>Solve for θ.</li></ol>
<h4>Link to deep learning</h4>
<ul>
<li>Training a neural network = conditional MLE: θ = argmax Σᵢ log p(yᵢ | xᵢ; θ), i.e. minimise the <b>negative log-likelihood (NLL)</b>.</li>
<li><b>Classification:</b> with a sigmoid/softmax output, NLL = <b>cross-entropy</b>: −Σ y log ŷ.</li>
<li><b>Regression:</b> if p(y | x) = N(y; ŷ, σ²), then −log p = (y − ŷ)²/(2σ²) + const, so maximising likelihood = minimising <b>MSE</b>.</li>
</ul>
<table><tr><th>Output distribution</th><th>Output unit</th><th>NLL becomes</th></tr>
<tr><td>Gaussian</td><td>Linear</td><td>MSE</td></tr>
<tr><td>Bernoulli</td><td>Sigmoid</td><td>Binary cross-entropy</td></tr>
<tr><td>Categorical</td><td>Softmax</td><td>Categorical cross-entropy</td></tr></table>
<h4>Properties</h4>
<ul><li><b>Consistent:</b> θ_ML → true θ as data grows.</li><li><b>Efficient:</b> lowest variance among consistent estimators for large m.</li><li><b>Limitation:</b> overfits with small data; fix by adding a prior (MAP) = regularisation.</li></ul>
<p><b>Conclusion:</b> Every cross-entropy or MSE loss in deep learning is really maximum likelihood estimation in disguise.</p>`,
  hi: `<p><b>MLE kya hai:</b> Data dekh ke ulta sochna: "kaunsa parameter θ hota toh yeh data aane ka chance sabse zyada hota?" Wahi θ choose karo.</p>
<div class="formula">θ_ML = argmax Σᵢ log p(xᵢ; θ)</div>
<h4>Log kyun</h4>
<ul><li>Bahut saari chhoti probabilities ka guna computer mein zero ho jaata hai (underflow).</li><li>Log se guna → jod, aur maximum wahi rehta hai.</li><li>Derivative lena aasaan.</li></ul>
<h4>Coin ka example</h4>
<pre>10 toss mein 7 Head.
L(p) = p⁷(1−p)³ → log L = 7 log p + 3 log(1−p)
derivative = 0 → p = 7/10 = 0.7</pre>
<p>Matlab data ke hisaab se sabse believable answer: coin 70% head deta hai.</p>
<h4>Steps</h4>
<p>Model choose → likelihood likho → log lo → differentiate karke 0 → θ nikaalo.</p>
<h4>Deep learning se rishta</h4>
<ul>
<li>Network train karna = negative log-likelihood (NLL) kam karna = MLE.</li>
<li>Classification (sigmoid/softmax): NLL = <b>cross-entropy</b>.</li>
<li>Regression (Gaussian noise maan ke): NLL = <b>MSE</b>.</li>
</ul>
<h4>Properties</h4>
<ul><li>Data badhao toh sahi θ ke paas pahunchta hai (consistent).</li><li>Kam data pe overfit, isliye prior jod ke MAP / regularisation.</li></ul>
<h4>Desi example</h4>
<p>Mohalle mein 10 mein se 8 ghar ke bahar Diwali ki lights lagi hain. Sabse likely explanation: "Diwali aa rahi hai". Jo explanation dekhe gaye data ko sabse achhe se samjhaaye, wahi MLE ka answer.</p>
<p><b>Ek line:</b> Cross-entropy ya MSE minimise karna = asal mein MLE karna.</p>`,
  keys: ["likelihood L(θ) = Πp(xᵢ;θ)", "log-likelihood", "argmax", "i.i.d.", "negative log-likelihood", "cross-entropy", "MSE under Gaussian noise", "consistency", "MAP / prior"],
  draw: "Curve of log-likelihood vs p for the coin example with its peak at p = 0.7.",
  fig: "unit1.html#q5",
  num: false
},
{
  id: "U1-12",
  unit: 1,
  topic: "Backpropagation variants",
  q: "Explain the variants of the backpropagation algorithm.",
  alt: [
    "What are the different modes of backpropagation training?",
    "Differentiate between online (stochastic) and batch backpropagation.",
    "List the improvements made to standard backpropagation."
  ],
  marks: [4, 10],
  priority: "high",
  prob: 55,
  diff: 3,
  pyq: [],
  why: "The syllabus literally says 'backpropagation algorithm and its variants'; a likely 4-mark follow-up to the backprop question.",
  short: "Variants differ in how much data each update uses (batch, stochastic, mini-batch), in the update rule (momentum, NAG, AdaGrad, RMSProp, Adam) and in structure (BPTT).",
  en: `<p><b>Standard backpropagation</b> computes gradients by the chain rule and updates weights with w ← w − η ∂E/∂w. Its variants change <b>when</b> the update happens, <b>how</b> the step is computed, or <b>what structure</b> the gradient flows through.</p>
<h4>A. By amount of data per update</h4>
<ul>
<li><b>Batch (offline) backprop:</b> accumulate gradients over all N samples, then update once per epoch. Stable but slow and memory-heavy.</li>
<li><b>Stochastic (online) backprop:</b> update after every sample. Fast, noisy, can escape shallow minima.</li>
<li><b>Mini-batch backprop:</b> update after B samples (32–256). Standard choice; exploits GPU parallelism.</li>
</ul>
<h4>B. By update rule</h4>
<ul>
<li><b>Backprop with momentum:</b> Δw(t) = −η ∂E/∂w + α Δw(t − 1); reduces oscillation.</li>
<li><b>Nesterov:</b> gradient at the look-ahead point.</li>
<li><b>Adaptive learning rate:</b> AdaGrad, RMSProp, Adam scale the step for each weight.</li>
<li><b>Learning-rate schedules:</b> step decay, exponential decay, warm-up.</li>
<li><b>Resilient backprop (Rprop):</b> uses only the sign of the gradient with an adaptive step per weight.</li>
<li><b>Second-order ideas:</b> Newton / quasi-Newton (L-BFGS), conjugate gradient, Levenberg–Marquardt, using curvature; expensive for large nets.</li>
</ul>
<h4>C. By structure</h4>
<ul>
<li><b>Backpropagation Through Time (BPTT):</b> unfold an RNN over time steps and backprop through the unrolled graph; truncated BPTT limits the steps.</li>
<li><b>Backprop in CNNs:</b> gradients summed over shared filter weights.</li>
</ul>
<h4>Comparison of modes</h4>
<table><tr><th>Mode</th><th>Update frequency</th><th>Noise</th><th>Use</th></tr>
<tr><td>Batch</td><td>Once per epoch</td><td>None</td><td>Small datasets</td></tr>
<tr><td>Stochastic</td><td>Every sample</td><td>High</td><td>Online / streaming</td></tr>
<tr><td>Mini-batch</td><td>Every B samples</td><td>Moderate</td><td>Deep learning default</td></tr></table>
<p><b>Example:</b> ImageNet models are trained with mini-batch backprop (e.g. B = 256) plus momentum 0.9 and step learning-rate decay.</p>
<p><b>Conclusion:</b> All variants keep the same chain-rule gradient; they only change how the gradient is used, making training faster and more stable.</p>`,
  hi: `<p><b>Basic backprop:</b> chain rule se gradient, phir w = w − η ∂E/∂w. Iske "variants" mein teen cheezein badalti hain: <b>kab</b> update, <b>kaise</b> step, aur <b>kis structure</b> mein.</p>
<h4>A. Data ke hisaab se</h4>
<ul><li><b>Batch:</b> saare samples ke baad ek update. Stable par slow.</li><li><b>Stochastic (online):</b> har sample ke baad update. Fast par noisy.</li><li><b>Mini-batch:</b> 32–256 samples ke baad update. Sabse zyada use hota hai.</li></ul>
<h4>B. Update rule ke hisaab se</h4>
<ul>
<li><b>Momentum:</b> Δw(t) = −η ∂E/∂w + α Δw(t−1), pichhla step yaad.</li>
<li><b>Nesterov:</b> aage jhaank ke gradient.</li>
<li><b>AdaGrad, RMSProp, Adam:</b> har weight ka apna η.</li>
<li><b>Learning-rate schedule:</b> dheere-dheere η kam.</li>
<li><b>Rprop:</b> sirf gradient ka sign use karta hai.</li>
<li><b>Second-order (Newton, L-BFGS, Levenberg–Marquardt):</b> curvature use, par bade network ke liye mehenga.</li>
</ul>
<h4>C. Structure ke hisaab se</h4>
<ul><li><b>BPTT:</b> RNN ko time mein khol ke backprop.</li><li><b>CNN backprop:</b> shared filter ke gradients jod diye jaate hain.</li></ul>
<h4>Desi example</h4>
<p>Gym trainer: Batch = mahine ke end mein ek baar diet badle. Stochastic = har meal ke baad badle. Mini-batch = har hafte badle (best). Momentum = pichhle hafte ka trend bhi dekhe. Adam = har body part ke liye alag plan.</p>
<p><b>Ek line:</b> Gradient wahi chain rule wala; variants sirf usko use karne ka tareeka smart banate hain.</p>`,
  keys: ["batch backprop", "online / stochastic", "mini-batch", "momentum term α", "adaptive learning rate", "Rprop", "second-order methods", "BPTT", "learning-rate schedule"],
  draw: "Tree diagram: Backprop variants → (data: batch / stochastic / mini-batch), (rule: momentum, NAG, AdaGrad, RMSProp, Adam), (structure: BPTT, CNN).",
  fig: "unit1.html#q1",
  num: false
},
{
  id: "U1-13",
  unit: 1,
  topic: "Neural networks and perceptron",
  q: "Explain the perceptron, its learning rule and its limitation.",
  alt: [
    "What is a perceptron? Draw its model.",
    "State the perceptron convergence theorem.",
    "Why can't a single-layer perceptron solve XOR?",
    "Differentiate between a perceptron and a multilayer perceptron."
  ],
  marks: [2, 4],
  priority: "high",
  prob: 55,
  diff: 2,
  pyq: [],
  why: "Not asked directly, but the 2025 B4 numerical is built on it and the MLP definition (7CAI A1) needs it.",
  short: "A perceptron computes y = step(Σwᵢxᵢ + b) and learns by wᵢ ← wᵢ + η(t − y)xᵢ; it can only separate linearly separable classes (fails on XOR).",
  en: `<p><b>Definition:</b> The perceptron (Frank Rosenblatt, 1958) is the simplest artificial neuron and a binary linear classifier. It multiplies inputs by weights, adds a bias and passes the sum through a step (threshold) function.</p>
<div class="formula">y = step(Σᵢ wᵢxᵢ + b), &nbsp; step(z) = 1 if z ≥ 0 else 0</div>
<h4>Learning rule</h4>
<div class="formula">wᵢ ← wᵢ + η (t − y) xᵢ, &nbsp; b ← b + η (t − y)</div>
<ul><li>Weights change only when the prediction is wrong (t ≠ y).</li><li>If y = 0 but t = 1, weights move towards x; if y = 1 but t = 0, away from x.</li></ul>
<h4>Training steps</h4>
<ol><li>Initialise w, b (zero or small random).</li><li>For each sample compute y.</li><li>Update with the rule if wrong.</li><li>Repeat epochs until no errors.</li></ol>
<h4>Perceptron convergence theorem</h4>
<p>If the data is linearly separable, the rule finds a separating hyperplane in a finite number of updates.</p>
<h4>Limitation</h4>
<p>It draws only one straight line (hyperplane) wᵀx + b = 0, so it solves AND, OR but <b>not XOR</b> (Minsky and Papert, 1969). On non-separable data it never converges. Its step output is not differentiable, so it cannot be trained by gradient-based backprop.</p>
<h4>Perceptron vs MLP</h4>
<table><tr><th>Perceptron</th><th>MLP</th></tr><tr><td>Single layer, step activation</td><td>Hidden layers, differentiable activations</td></tr><tr><td>Linear boundary only</td><td>Non-linear boundaries</td></tr><tr><td>Perceptron rule</td><td>Backpropagation</td></tr></table>
<p><b>Example:</b> AND gate with w₁ = w₂ = 1, b = −1.5: only (1,1) gives net = 0.5 ≥ 0 → 1.</p>
<p><b>Conclusion:</b> The perceptron is the building block of neural networks; stacking it with non-linear activations gives the MLP.</p>`,
  hi: `<p><b>Perceptron:</b> sabse simple neuron (Rosenblatt, 1958). Inputs ko weights se guna karo, jodo, bias add karo, aur threshold ke paar gaya toh 1, warna 0.</p>
<div class="formula">y = step(Σ wᵢxᵢ + b)</div>
<h4>Seekhne ka rule</h4>
<div class="formula">wᵢ = wᵢ + η (t − y) xᵢ, b = b + η (t − y)</div>
<p>Sahi answer diya toh kuch mat badlo. Galat diya toh weights ko sahi direction mein thoda khiskaao.</p>
<h4>Convergence theorem</h4>
<p>Agar data ek seedhi line se alag ho sakta hai (linearly separable), toh perceptron finite steps mein woh line dhoondh lega.</p>
<h4>Kami</h4>
<ul><li>Sirf seedhi line: AND, OR solve, <b>XOR nahi</b> (Minsky–Papert, 1969).</li><li>Step function ka derivative nahi, toh backprop nahi chal sakta.</li><li>Ilaaj: hidden layer daalo = MLP.</li></ul>
<h4>Example</h4>
<p>AND gate: w₁ = w₂ = 1, b = −1.5. Sirf (1,1) pe net = 0.5 → output 1, baaki sab 0.</p>
<h4>Desi example</h4>
<p>Cricket match dekhne jaaun? Inputs: chhutti hai (+0.6), dost saath (+0.5), kal exam (−0.9). Weighted sum 0 se upar → jao. Ek baar daant padi (galat decision) toh "kal exam" ka weight aur negative kar do. Yahi learning rule.</p>
<p><b>Ek line:</b> Perceptron = linear classifier; layers jodo toh MLP banta hai.</p>`,
  keys: ["Rosenblatt 1958", "weighted sum + bias", "step function", "learning rule w ← w + η(t − y)x", "convergence theorem", "linearly separable", "XOR limitation", "Minsky and Papert"],
  draw: "Perceptron: inputs x₁…xₙ with weights → Σ (with bias) → step function → output y.",
  fig: "unit1.html#q7",
  num: false
},
{
  id: "U1-14",
  unit: 1,
  topic: "Overfitting and underfitting",
  q: "Explain overfitting and underfitting. What is the bias–variance trade-off and how can overfitting be controlled?",
  alt: [
    "Differentiate between overfitting and underfitting.",
    "What is model capacity?",
    "Explain the bias–variance trade-off with a diagram.",
    "How do regularisation and early stopping reduce overfitting?"
  ],
  marks: [2, 4, 10],
  priority: "high",
  prob: 55,
  diff: 2,
  pyq: [],
  why: "Core ML concept behind every 'regularisation / dropout' question (8AID 2025 B6, 7CAI 2025 B3); likely as Part A or 4 marks.",
  short: "Overfitting: low training error, high test error (memorises noise). Underfitting: high error on both (model too simple). Balance via capacity and regularisation.",
  en: `<p><b>Generalisation</b> is a model's ability to perform well on unseen data. Two failures:</p>
<ul>
<li><b>Underfitting:</b> the model is too simple (low capacity) to capture the pattern; training and test error are both high. <b>High bias.</b></li>
<li><b>Overfitting:</b> the model is too complex and memorises noise in the training data; training error is low but test error is high. <b>High variance.</b></li>
</ul>
<h4>Comparison</h4>
<table><tr><th>Point</th><th>Underfitting</th><th>Good fit</th><th>Overfitting</th></tr>
<tr><td>Training error</td><td>High</td><td>Low</td><td>Very low</td></tr>
<tr><td>Test error</td><td>High</td><td>Low</td><td>High</td></tr>
<tr><td>Bias / variance</td><td>High bias</td><td>Balanced</td><td>High variance</td></tr>
<tr><td>Cause</td><td>Too few parameters, too few epochs</td><td>—</td><td>Too many parameters, too little data, too many epochs</td></tr></table>
<h4>Bias–variance trade-off</h4>
<div class="formula">Expected test error = Bias² + Variance + Irreducible noise (σ²)</div>
<ul><li><b>Bias:</b> error from wrong assumptions (model too simple).</li><li><b>Variance:</b> error from sensitivity to the particular training set.</li><li>Increasing capacity lowers bias but raises variance; the best model sits at the minimum of the U-shaped test-error curve.</li></ul>
<h4>Controlling overfitting</h4>
<ol>
<li>More data / data augmentation.</li>
<li><b>L2 (weight decay):</b> add λΣw² to the loss; <b>L1:</b> add λΣ|w| (sparse weights).</li>
<li><b>Dropout:</b> randomly switch off units (p ≈ 0.5) during training.</li>
<li><b>Early stopping:</b> stop when validation loss starts rising.</li>
<li>Reduce model size; batch normalisation; ensembles; cross-validation for tuning.</li>
</ol>
<h4>Fixing underfitting</h4>
<p>Bigger/deeper model, better features, train longer, lower regularisation.</p>
<h4>Example</h4>
<p>Fitting 10 noisy points: a straight line underfits, a degree-3 curve fits well, a degree-9 polynomial passes through every point but swings wildly between them (overfits).</p>
<p><b>Conclusion:</b> Good deep learning aims at the sweet spot of capacity, using regularisation and validation monitoring.</p>`,
  hi: `<p><b>Generalisation:</b> naye (unseen) data pe achha perform karna. Do galtiyan ho sakti hain:</p>
<ul><li><b>Underfitting:</b> model bahut simple, pattern hi nahi pakad paaya. Train aur test dono pe error zyada. (High bias)</li><li><b>Overfitting:</b> model ne training data ratt liya, noise bhi. Train pe error kam, test pe zyada. (High variance)</li></ul>
<h4>Bias–variance</h4>
<div class="formula">Test error = Bias² + Variance + Noise</div>
<ul><li>Bias = galat assumption (bahut simple model).</li><li>Variance = training data badalte hi model badal jaana.</li><li>Complexity badhao → bias kam, variance zyada. Beech ka sweet spot chahiye.</li></ul>
<h4>Overfitting kaise roke</h4>
<ol><li>Zyada data / augmentation (image ghumao, flip karo).</li><li>L2 (weight decay) ya L1 regularisation.</li><li>Dropout: training mein random neurons band.</li><li>Early stopping: validation loss badhne lage toh ruk jao.</li><li>Chhota model, BatchNorm, ensemble.</li></ol>
<h4>Underfitting kaise theek kare</h4>
<p>Bada model, achhe features, zyada epochs, kam regularisation.</p>
<h4>Desi example</h4>
<p>Exam ki taiyari: <b>Underfitting</b> = sirf chapter ke naam padhe, kuch nahi aata. <b>Overfitting</b> = pichhle saal ka paper word-by-word ratt liya; same sawaal aaye toh full marks, thoda twist aaya toh zero. <b>Good fit</b> = concept samjha, kisi bhi tarah ka sawaal solve.</p>
<p><b>Ek line:</b> Na ratta, na adhoora; regularisation aur validation se balance.</p>`,
  keys: ["generalisation", "underfitting high bias", "overfitting high variance", "model capacity", "Bias² + Variance + noise", "L1 / L2 regularisation", "dropout", "early stopping", "data augmentation", "validation set"],
  draw: "U-shaped test-error curve and falling training-error curve against model complexity, with underfit, sweet spot and overfit regions marked.",
  fig: "",
  num: false
},
{
  id: "U1-15",
  unit: 1,
  topic: "Learning rate, epochs and loss functions",
  q: "What is a loss function? Explain common loss functions used in neural networks (MSE, MAE, binary and categorical cross-entropy, hinge).",
  alt: [
    "Differentiate between a loss function and a cost function.",
    "Which loss function is used for binary classification and why?",
    "Compare MSE and cross-entropy loss.",
    "Define the cross-entropy loss."
  ],
  marks: [2, 4, 10],
  priority: "high",
  prob: 50,
  diff: 2,
  pyq: [],
  why: "Named in the syllabus ('loss functions') and needed in the 2025 B2 design answer; likely Part A or 4 marks.",
  short: "A loss function measures the error between prediction ŷ and target y for one sample; the cost is its average over the dataset. E.g. MSE, cross-entropy.",
  en: `<p><b>Definition:</b> A <b>loss function</b> L(y, ŷ) measures how wrong the prediction ŷ is for one sample. The <b>cost function</b> J(θ) is the average loss over the training set (plus any regularisation). Training minimises J by gradient descent.</p>
<div class="formula">J(θ) = (1/N) Σᵢ L(yᵢ, ŷᵢ) + λ R(θ)</div>
<h4>Regression losses</h4>
<ul>
<li><b>MSE:</b> (1/N) Σ (y − ŷ)². Penalises large errors heavily; = MLE under Gaussian noise; sensitive to outliers.</li>
<li><b>MAE:</b> (1/N) Σ |y − ŷ|. Robust to outliers; gradient constant.</li>
<li><b>Huber:</b> MSE for small errors, MAE for large errors.</li>
</ul>
<h4>Classification losses</h4>
<ul>
<li><b>Binary cross-entropy:</b> −[y log ŷ + (1 − y) log(1 − ŷ)] with sigmoid output.</li>
<li><b>Categorical cross-entropy:</b> −Σₖ yₖ log ŷₖ with softmax output (one-hot y).</li>
<li><b>Hinge loss</b> (SVM): max(0, 1 − y·ŷ), y ∈ {−1, +1}.</li>
<li><b>KL divergence:</b> Σ p log(p/q), used in VAEs.</li>
</ul>
<h4>Comparison</h4>
<table><tr><th>Loss</th><th>Task</th><th>Output unit</th><th>Note</th></tr>
<tr><td>MSE</td><td>Regression</td><td>Linear</td><td>Outlier-sensitive</td></tr>
<tr><td>MAE</td><td>Regression</td><td>Linear</td><td>Robust</td></tr>
<tr><td>BCE</td><td>Binary class</td><td>Sigmoid</td><td>= Bernoulli NLL</td></tr>
<tr><td>CCE</td><td>Multi-class</td><td>Softmax</td><td>= Categorical NLL</td></tr>
<tr><td>Hinge</td><td>Margin classification</td><td>Linear</td><td>Max-margin</td></tr></table>
<h4>Why cross-entropy over MSE for classification</h4>
<p>With a sigmoid output, MSE's gradient contains σ′(z), which is near zero when the unit saturates, so learning stalls even when the answer is badly wrong. Cross-entropy's log cancels the exponential, giving gradient (ŷ − y): large error → large gradient.</p>
<h4>Example</h4>
<p>True label y = 1, prediction ŷ = 0.9 → BCE = −log 0.9 = 0.105; ŷ = 0.1 → BCE = −log 0.1 = 2.303. A confident wrong answer is punished heavily.</p>
<p><b>Conclusion:</b> Choose the loss from the output distribution: MSE for regression, cross-entropy for classification.</p>`,
  hi: `<p><b>Loss function:</b> ek sample pe prediction kitna galat hai, yeh number batata hai. <b>Cost function</b> = saare samples ka average loss (+ regularisation). Training ka matlab = cost ko kam karna.</p>
<h4>Regression ke liye</h4>
<ul><li><b>MSE:</b> (y − ŷ)² ka average. Badi galti ko bahut saza; outlier se pareshaan.</li><li><b>MAE:</b> |y − ŷ| ka average. Outlier se kam asar.</li><li><b>Huber:</b> dono ka mix.</li></ul>
<h4>Classification ke liye</h4>
<ul><li><b>Binary cross-entropy:</b> −[y log ŷ + (1−y) log(1−ŷ)], sigmoid ke saath.</li><li><b>Categorical cross-entropy:</b> −Σ y log ŷ, softmax ke saath.</li><li><b>Hinge:</b> max(0, 1 − yŷ), SVM style.</li><li><b>KL divergence:</b> do distributions ka farak (VAE).</li></ul>
<h4>Classification mein MSE kyun nahi</h4>
<p>Sigmoid saturate hote hi MSE ka gradient lagbhag zero, toh galat answer pe bhi model nahi seekhta. Cross-entropy ka gradient simply (ŷ − y), galti badi toh gradient bada.</p>
<h4>Example</h4>
<p>y = 1: ŷ = 0.9 → loss 0.105 (chhota). ŷ = 0.1 → loss 2.303 (bahut bada). Over-confident galti pe bhaari saza.</p>
<h4>Desi example</h4>
<p>Dart game: MSE = teer centre se jitna door, uske square jitne penalty points, bahut door gaya toh bahut zyada saza. MAE = seedha distance jitne points. Cross-entropy = quiz show jahaan "100% pakka" bol ke galat answer diya toh sabse zyada paise katte hain.</p>
<p><b>Ek line:</b> Regression → MSE/MAE; classification → cross-entropy.</p>`,
  keys: ["loss vs cost", "MSE", "MAE", "Huber", "binary cross-entropy", "categorical cross-entropy", "softmax", "hinge loss", "KL divergence", "saturation of sigmoid with MSE"],
  draw: "Plot of −log(ŷ) for y = 1 rising steeply as ŷ → 0, beside a parabola for MSE.",
  fig: "",
  num: false
}
);
window.QB.push(
{
  id: "U1-16",
  unit: 1,
  topic: "Learning rate, epochs and loss functions",
  q: "Explain learning rate, epoch, batch size and iteration. What is the effect of a too high or too low learning rate?",
  alt: [
    "Define learning rate.",
    "Differentiate between epoch, batch and iteration.",
    "What is learning-rate decay / scheduling?",
    "How do you choose the number of epochs?"
  ],
  marks: [2, 4],
  priority: "high",
  prob: 50,
  diff: 1,
  pyq: [],
  why: "Explicitly named in the syllabus; easy Part A material often asked as a definition.",
  short: "Learning rate η is the step size of weight updates; an epoch is one full pass over the training data; an iteration is one update on one batch.",
  en: `<p><b>Learning rate (η):</b> a hyper-parameter that sets the size of each weight update in gradient descent: w ← w − η ∂L/∂w. Typical values: 0.1 to 0.0001 (Adam default 0.001).</p>
<h4>Effect of η</h4>
<table><tr><th>η too small</th><th>η just right</th><th>η too large</th></tr>
<tr><td>Very slow convergence; may stall in plateaus or poor local minima</td><td>Loss falls steadily to a good minimum</td><td>Overshoots the minimum, oscillates or diverges (loss → NaN)</td></tr></table>
<h4>Learning-rate schedules</h4>
<ul><li><b>Step decay:</b> divide η by 10 every few epochs.</li><li><b>Exponential decay:</b> η_t = η₀ e^(−kt).</li><li><b>Warm-up, cosine annealing, reduce-on-plateau.</b></li><li>Adaptive optimisers (Adam, RMSProp) scale η per parameter.</li></ul>
<h4>Epoch, batch, iteration</h4>
<ul>
<li><b>Epoch:</b> one complete pass of the entire training set through the network.</li>
<li><b>Batch size (B):</b> number of samples used to compute one gradient update.</li>
<li><b>Iteration (step):</b> one weight update = one batch processed.</li>
</ul>
<div class="formula">Iterations per epoch = ⌈N / B⌉</div>
<p><b>Example:</b> N = 10,000 images, B = 100 → 100 iterations per epoch; 20 epochs = 2,000 updates.</p>
<h4>Choosing epochs</h4>
<p>Too few epochs → underfitting; too many → overfitting. Use a validation set and <b>early stopping</b> (stop when validation loss stops improving for a few epochs).</p>
<p><b>Conclusion:</b> η, batch size and epochs are the key training hyper-parameters; η is usually the most important one to tune.</p>`,
  hi: `<p><b>Learning rate (η):</b> har update mein weight kitna badle, uska "step size". w = w − η × gradient. Aam taur pe 0.1 se 0.0001 (Adam mein 0.001).</p>
<h4>η ka asar</h4>
<ul><li><b>Bahut chhota:</b> bahut dheere seekhta hai, atak sakta hai.</li><li><b>Sahi:</b> loss aaram se neeche aata hai.</li><li><b>Bahut bada:</b> minimum ke upar se kood jaata hai, loss upar-neeche ya NaN.</li></ul>
<h4>Schedule</h4>
<p>Shuru mein bada η, baad mein chhota: step decay, exponential decay, warm-up, cosine. Adam khud har weight ke liye adjust karta hai.</p>
<h4>Epoch, batch, iteration</h4>
<ul><li><b>Epoch:</b> poora training data ek baar network se guzra.</li><li><b>Batch size:</b> ek update ke liye kitne samples.</li><li><b>Iteration:</b> ek update = ek batch.</li></ul>
<div class="formula">Iterations per epoch = N / B</div>
<p>Example: 10,000 images, batch 100 → har epoch mein 100 iterations.</p>
<h4>Kitne epochs</h4>
<p>Kam epochs → underfit, zyada → overfit. Validation loss dekho, badhne lage toh early stopping.</p>
<h4>Desi example</h4>
<p>Kitaab padhna: poori kitaab ek baar padhi = 1 epoch. Ek baar mein 10 page padh ke notes banaye = batch size 10. Har baar notes update kiye = 1 iteration. Learning rate = har baar notes kitne zyada badalte ho; bahut zyada badloge toh confuse, bahut kam toh kuch naya nahi seekhoge.</p>
<p><b>Ek line:</b> η = step size; epoch = poora data ek baar; iteration = ek batch ka update.</p>`,
  keys: ["learning rate η", "step size", "divergence / oscillation", "slow convergence", "learning-rate decay", "epoch", "batch size", "iteration = N/B", "early stopping"],
  draw: "Three loss-vs-epoch curves: too small η (slow), good η (smooth drop), too large η (zig-zag/diverging).",
  fig: "unit1.html#q3",
  num: false
},
{
  id: "U1-17",
  unit: 1,
  topic: "Learning algorithms",
  q: "What is a learning algorithm? Explain the Task (T), Performance measure (P) and Experience (E) with examples.",
  alt: [
    "Give Tom Mitchell's definition of machine learning.",
    "Explain different types of tasks a learning algorithm can perform.",
    "What performance measures are used to evaluate learning algorithms?"
  ],
  marks: [2, 4],
  priority: "med",
  prob: 45,
  diff: 1,
  pyq: [],
  why: "First named sub-topic of the unit, never asked yet; easy Part A / 4-mark question.",
  short: "A program learns from experience E with respect to task T and performance measure P if its performance at T, measured by P, improves with E (Mitchell).",
  en: `<p><b>Definition (Tom Mitchell, 1997):</b> "A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E."</p>
<h4>Task (T)</h4>
<p>What the system must do with an example x:</p>
<ul><li>Classification (spam / not spam), regression (house price), transcription (speech → text), machine translation, anomaly detection, synthesis/sampling (generate images), denoising, density estimation.</li></ul>
<h4>Performance measure (P)</h4>
<ul><li>Accuracy / error rate for classification; precision, recall, F1.</li><li>MSE / MAE for regression.</li><li>Log-likelihood for density estimation; BLEU for translation; WER for speech.</li><li>Measured on a separate <b>test set</b> to check generalisation.</li></ul>
<h4>Experience (E)</h4>
<ul><li><b>Supervised:</b> dataset with labels (x, y).</li><li><b>Unsupervised:</b> dataset without labels.</li><li><b>Reinforcement:</b> interaction with an environment and rewards.</li></ul>
<h4>Examples</h4>
<table><tr><th>System</th><th>T</th><th>P</th><th>E</th></tr>
<tr><td>Spam filter</td><td>Classify emails</td><td>% correctly classified</td><td>Emails labelled spam/ham</td></tr>
<tr><td>Chess program</td><td>Play chess</td><td>% games won</td><td>Games played against itself</td></tr>
<tr><td>Handwriting recogniser</td><td>Recognise digits</td><td>Accuracy</td><td>MNIST labelled images</td></tr></table>
<p><b>Deep learning algorithms</b> follow the same scheme: MLP, CNN, RNN/LSTM, autoencoders, GANs, transformers.</p>
<p><b>Conclusion:</b> Any learning algorithm can be described precisely by stating its T, P and E.</p>`,
  hi: `<p><b>Mitchell ki definition:</b> Koi program experience E se task T ke liye "seekh raha hai" agar uski performance P, task T pe, E badhne ke saath behtar hoti jaaye.</p>
<h4>Task (T) — kaam kya hai</h4>
<p>Classification, regression, speech → text, translation, anomaly detection, nayi image banana, denoising.</p>
<h4>Performance (P) — naapenge kaise</h4>
<p>Accuracy, precision, recall, F1; regression mein MSE; translation mein BLEU; speech mein WER. Hamesha alag <b>test set</b> pe naapo.</p>
<h4>Experience (E) — seekhega kisse</h4>
<p>Labelled data (supervised), bina label data (unsupervised), ya reward (reinforcement).</p>
<h4>Examples</h4>
<ul><li>Spam filter: T = email classify, P = % sahi, E = labelled emails.</li><li>Chess: T = chess khelna, P = % jeet, E = khud se khele games.</li></ul>
<h4>Desi example</h4>
<p>Mummy ke haath ki roti seekhna: T = gol roti banana, P = kitni roti gol aur bina jale bani, E = roz ki practice. Har din P behtar → aap "seekh" rahe ho.</p>
<p><b>Ek line:</b> Kisi bhi learning algorithm ko T, P, E bata ke clearly define kar sakte hain.</p>`,
  keys: ["Tom Mitchell", "task T", "performance measure P", "experience E", "classification / regression", "accuracy", "test set", "supervised / unsupervised / reinforcement"],
  draw: "",
  fig: "unit1.html#q9",
  num: false
},
{
  id: "U1-18",
  unit: 1,
  topic: "Building an ML algorithm",
  q: "Explain the components of building a machine learning algorithm and the steps of a deep learning pipeline.",
  alt: [
    "What are the four components of a machine learning algorithm?",
    "Explain the end-to-end workflow of building a deep learning model.",
    "How are dataset, model, cost function and optimiser combined to build a learning algorithm?"
  ],
  marks: [4, 10],
  priority: "med",
  prob: 45,
  diff: 2,
  pyq: [],
  why: "Named syllabus sub-topic never asked yet; the 2025 C4 speech pipeline question shows examiners like 'pipeline' answers.",
  short: "An ML algorithm combines a dataset, a model family, a cost function and an optimisation procedure that finds the parameters minimising the cost.",
  en: `<p><b>Recipe (Goodfellow et al.):</b> nearly every machine learning / deep learning algorithm is built by combining four components. Changing any one gives a new algorithm.</p>
<h4>The four components</h4>
<ol>
<li><b>Dataset:</b> examples X (and labels y), split into training, validation and test sets.</li>
<li><b>Model:</b> a family of functions ŷ = f(x; θ), e.g. linear regression, MLP, CNN.</li>
<li><b>Cost function:</b> J(θ), usually negative log-likelihood (cross-entropy / MSE) plus regularisation λ‖θ‖².</li>
<li><b>Optimisation procedure:</b> finds θ* = argmin J(θ): closed-form (normal equations) or iterative (gradient descent, SGD, Adam).</li>
</ol>
<div class="formula">Example: linear regression = data (X, y) + model ŷ = wᵀx + b + cost MSE + optimiser normal equations / GD</div>
<h4>Practical DL pipeline</h4>
<ol>
<li><b>Problem definition:</b> task, metric, success criteria.</li>
<li><b>Data collection and labelling.</b></li>
<li><b>Preprocessing:</b> cleaning, missing values, normalisation, encoding, augmentation, train/val/test split.</li>
<li><b>Model selection / architecture design:</b> layers, units, activations.</li>
<li><b>Training:</b> choose loss, optimiser, learning rate, batch size, epochs; run backprop.</li>
<li><b>Validation and hyper-parameter tuning:</b> early stopping, regularisation, grid/random search.</li>
<li><b>Evaluation on test set:</b> accuracy, precision, recall, F1, confusion matrix.</li>
<li><b>Deployment and monitoring:</b> serve the model, watch for data drift, retrain.</li>
</ol>
<h4>Example: house-price predictor</h4>
<table><tr><th>Component</th><th>Choice</th></tr>
<tr><td>Dataset</td><td>Past sales: area, rooms, location → price</td></tr>
<tr><td>Model</td><td>MLP with 2 hidden layers, linear output</td></tr>
<tr><td>Cost</td><td>MSE + L2</td></tr>
<tr><td>Optimiser</td><td>Adam, η = 0.001</td></tr></table>
<h4>Why this view helps</h4>
<ul><li>Shows that DL is not a separate magic: it uses the same recipe with a deeper model.</li><li>Non-linear models make J non-convex, so iterative gradient-based optimisation is required.</li></ul>
<p><b>Conclusion:</b> Dataset + model + cost + optimiser, wrapped in a careful pipeline, is how every learning system is built.</p>`,
  hi: `<p><b>Recipe:</b> Har ML/DL algorithm char cheezon ko jod ke banta hai. Inmein se ek bhi badlo, naya algorithm ban jaata hai.</p>
<h4>Char components</h4>
<ol><li><b>Dataset:</b> X (aur y), train/validation/test mein baanto.</li><li><b>Model:</b> function ŷ = f(x; θ), jaise linear regression, MLP, CNN.</li><li><b>Cost function:</b> galti naapne ka tareeka (MSE, cross-entropy) + regularisation.</li><li><b>Optimiser:</b> θ dhoondhne ka tareeka (gradient descent, SGD, Adam).</li></ol>
<h4>Pipeline (step-by-step)</h4>
<ol><li>Problem samjho, metric decide karo.</li><li>Data ikattha karo, label lagao.</li><li>Preprocessing: safai, normalise, augmentation, split.</li><li>Model design: layers, neurons, activation.</li><li>Training: loss, optimiser, η, batch, epochs.</li><li>Validation + tuning: early stopping, regularisation.</li><li>Test set pe evaluation: accuracy, F1, confusion matrix.</li><li>Deploy karo, monitor karo, zaroorat ho toh retrain.</li></ol>
<h4>Example: ghar ki keemat</h4>
<p>Data = purani sales (area, kamre, location); model = MLP; cost = MSE; optimiser = Adam.</p>
<h4>Desi example</h4>
<p>Biryani banana: chawal-masale = dataset, handi = model, chakh ke dekhna = cost function, aanch kam-zyada karna = optimiser. Pipeline = shopping → saaf-safai → marinate → pakana → chakhna → parosna → feedback lena.</p>
<p><b>Ek line:</b> Data + model + cost + optimiser = learning algorithm.</p>`,
  keys: ["dataset", "model f(x; θ)", "cost function", "optimisation procedure", "regularisation", "train/validation/test split", "preprocessing", "evaluation metrics", "deployment"],
  draw: "Flowchart: Data → Preprocess → Model → Loss → Optimiser (loop back to Model) → Evaluate → Deploy.",
  fig: "unit1.html#q8",
  num: false
},
{
  id: "U1-19",
  unit: 1,
  topic: "Deep feed-forward networks",
  q: "Explain output units and cost functions in deep feed-forward networks (linear, sigmoid, softmax).",
  alt: [
    "Which output unit and loss would you use for regression, binary and multi-class classification?",
    "Explain the softmax function.",
    "Why is the cost function of a neural network usually the negative log-likelihood?"
  ],
  marks: [2, 4, 10],
  priority: "med",
  prob: 40,
  diff: 3,
  pyq: [],
  why: "A named part of 'deep feed-forward networks' in the standard text; not asked yet but a natural 4-mark question.",
  short: "Linear output with MSE for regression, sigmoid with binary cross-entropy for two classes, softmax with categorical cross-entropy for many classes.",
  en: `<p><b>Idea:</b> In a deep feed-forward network the hidden layers produce features h; the <b>output unit</b> turns h into a prediction, and the <b>cost function</b> compares it with the target. Both are chosen together from the distribution of y, using maximum likelihood (cost = negative log-likelihood).</p>
<div class="formula">J(θ) = −E[log p_model(y | x)]</div>
<h4>1. Linear units (regression)</h4>
<div class="formula">ŷ = Wᵀh + b</div>
<p>Output = mean of a Gaussian; NLL = <b>MSE</b>. Does not saturate, so works well with gradient descent.</p>
<h4>2. Sigmoid units (binary classification)</h4>
<div class="formula">ŷ = σ(wᵀh + b) = 1/(1 + e⁻ᶻ) = P(y = 1 | x)</div>
<p>Bernoulli output; NLL = <b>binary cross-entropy</b>. The log in the loss undoes the exp in the sigmoid, so gradients stay large when the answer is wrong.</p>
<h4>3. Softmax units (multi-class)</h4>
<div class="formula">softmax(z)ᵢ = e^(zᵢ) / Σⱼ e^(zⱼ)</div>
<p>Outputs are positive and sum to 1 → a probability distribution over k classes; NLL = <b>categorical cross-entropy</b> −Σ yᵢ log ŷᵢ. Gradient w.r.t. z is simply ŷ − y.</p>
<h4>Summary table</h4>
<table><tr><th>Task</th><th>Output unit</th><th>Distribution</th><th>Cost</th></tr>
<tr><td>Regression</td><td>Linear</td><td>Gaussian</td><td>MSE</td></tr>
<tr><td>Binary classification</td><td>Sigmoid</td><td>Bernoulli</td><td>BCE</td></tr>
<tr><td>Multi-class</td><td>Softmax</td><td>Categorical (Multinoulli)</td><td>CCE</td></tr>
<tr><td>Multi-label</td><td>Several sigmoids</td><td>Independent Bernoullis</td><td>Sum of BCE</td></tr></table>
<h4>Example</h4>
<p>Three classes (cat, dog, cow): logits z = [2.0, 1.0, 0.1] → softmax = [0.66, 0.24, 0.10]. If the true class is cat, loss = −ln 0.66 = 0.42.</p>
<h4>Why MSE with sigmoid/softmax is a bad pair</h4>
<p>Saturated outputs give tiny gradients with MSE, so training is slow; cross-entropy avoids this.</p>
<p><b>Conclusion:</b> Match the output unit to the target distribution and use its negative log-likelihood as the cost.</p>`,
  hi: `<p><b>Idea:</b> Hidden layers features h banati hain. <b>Output unit</b> unse final answer banata hai, aur <b>cost function</b> us answer ko target se compare karta hai. Dono ko saath mein y ke type ke hisaab se chuno; cost = negative log-likelihood (MLE).</p>
<h4>1. Linear output (regression)</h4>
<p>ŷ = Wᵀh + b, cost = MSE. Saturate nahi hota.</p>
<h4>2. Sigmoid output (do class)</h4>
<p>ŷ = 1/(1 + e⁻ᶻ) = P(y = 1). Cost = binary cross-entropy. Log aur exp ek-doosre ko cancel karte hain, gradient achha rehta hai.</p>
<h4>3. Softmax output (kai class)</h4>
<div class="formula">softmax(z)ᵢ = e^(zᵢ) / Σ e^(zⱼ)</div>
<p>Saare outputs positive aur total 1, yaani probability. Cost = categorical cross-entropy. Gradient = ŷ − y, bahut simple.</p>
<h4>Yaad rakhne ki table</h4>
<ul><li>Regression → Linear + MSE</li><li>Binary → Sigmoid + BCE</li><li>Multi-class → Softmax + CCE</li><li>Multi-label → har label pe sigmoid + BCE</li></ul>
<h4>Example</h4>
<p>Teen class (billi, kutta, gaay): logits [2.0, 1.0, 0.1] → softmax [0.66, 0.24, 0.10]. Sahi answer billi hai, toh loss = −ln 0.66 = 0.42.</p>
<h4>Desi example</h4>
<p>Election result: softmax = har party ka vote share, sab milake 100%. Sigmoid = sirf "yeh candidate jeetega ya nahi" ka chance. Linear = "kitne vote milenge" ka seedha number.</p>
<p><b>Ek line:</b> Target ka type dekho, sahi output unit lagao, aur uska NLL cost banao.</p>`,
  keys: ["output unit", "linear unit + MSE", "sigmoid + binary cross-entropy", "softmax", "categorical cross-entropy", "negative log-likelihood", "Gaussian / Bernoulli / Multinoulli", "saturation"],
  draw: "Final layer box showing three options: linear → ŷ, sigmoid → P(y=1), softmax → [p₁…pₖ] summing to 1.",
  fig: "unit1.html#q6",
  num: false
},
{
  id: "U1-20",
  unit: 1,
  topic: "Deep feed-forward networks",
  q: "State the universal approximation theorem. Why are deeper networks preferred over a single wide hidden layer?",
  alt: [
    "What is the universal approximation theorem?",
    "Explain the role of depth in neural networks.",
    "Width vs depth of a neural network."
  ],
  marks: [2, 4],
  priority: "med",
  prob: 40,
  diff: 3,
  pyq: [],
  why: "Part of the deep feed-forward networks theory; overlaps with Unit 2 width/depth; good Part A candidate.",
  short: "A feed-forward network with one hidden layer of enough non-linear units can approximate any continuous function on a compact domain to any accuracy.",
  en: `<p><b>Universal approximation theorem (Cybenko 1989; Hornik 1991):</b> A feed-forward network with a linear output layer and at least one hidden layer with a suitable non-linear ("squashing", later also ReLU) activation can approximate any continuous function on a closed, bounded subset of ℝⁿ to any desired accuracy, provided it has enough hidden units.</p>
<h4>What it says and does not say</h4>
<ul>
<li>✔ A large enough MLP is able to <b>represent</b> the function.</li>
<li>✘ It does not guarantee that training will <b>find</b> the right weights.</li>
<li>✘ The required number of units may be <b>exponentially</b> large.</li>
<li>✘ It says nothing about generalisation to unseen data.</li>
</ul>
<h4>Why depth helps</h4>
<ul>
<li><b>Exponential efficiency:</b> some functions need exponentially many units in a shallow net but only polynomially many in a deep net (e.g. piecewise-linear regions of ReLU nets grow exponentially with depth).</li>
<li><b>Hierarchical features:</b> edges → shapes → parts → objects; each layer reuses the previous one.</li>
<li><b>Better generalisation</b> in practice with fewer parameters.</li>
</ul>
<table><tr><th>Shallow, wide</th><th>Deep, narrower</th></tr>
<tr><td>Can approximate anything in theory</td><td>Same power with far fewer units</td></tr>
<tr><td>Many parameters, memorises</td><td>Compositional features, generalises</td></tr>
<tr><td>Easy to train</td><td>Needs ReLU, good init, BatchNorm, skip connections</td></tr></table>
<p><b>Example:</b> Image classifiers like VGG and ResNet use many layers rather than one huge hidden layer.</p>
<p><b>Conclusion:</b> One hidden layer is enough in principle; depth makes it practical.</p>`,
  hi: `<p><b>Theorem:</b> Ek hidden layer waala feed-forward network (non-linear activation ke saath), agar usmein kaafi neurons hon, toh kisi bhi continuous function ko jitna chaho utna accurately approximate kar sakta hai (Cybenko 1989, Hornik 1991).</p>
<h4>Kya kehta hai, kya nahi</h4>
<ul><li>✔ Network mein function ko represent karne ki <b>taakat</b> hai.</li><li>✘ Training sahi weights dhoondh hi legi, iski guarantee nahi.</li><li>✘ Neurons exponentially zyada lag sakte hain.</li><li>✘ Naye data pe achha chalega, yeh nahi kehta.</li></ul>
<h4>Depth kyun better</h4>
<ul><li>Deep network wahi kaam bahut kam neurons mein kar leta hai.</li><li>Layer-by-layer features: edge → shape → part → object.</li><li>Practice mein generalisation achha.</li></ul>
<h4>Desi example</h4>
<p>Ek hi bahut bada godown (wide shallow) mein saara saamaan bikhra hai, sab kuch hai par dhoondhna mushkil. Multi-storey mall (deep): ground floor grocery, first floor kapde, second floor electronics; har floor pichhle pe build karta hai, kam jagah mein zyada organised.</p>
<p><b>Ek line:</b> Ek hidden layer theory mein kaafi, par depth practice mein efficient.</p>`,
  keys: ["Cybenko 1989", "Hornik", "one hidden layer", "any continuous function", "enough hidden units", "representation vs learnability", "depth efficiency", "hierarchical features"],
  draw: "",
  fig: "unit2.html#q6",
  num: false
}
);
window.QB.push(
{
  id: "U1-21",
  unit: 1,
  topic: "Gradient-based learning",
  q: "Explain gradient-based learning in neural networks. What are the challenges of optimising deep networks (non-convexity, local minima, saddle points, plateaus)?",
  alt: [
    "What is gradient descent? Write its update rule.",
    "Why is the cost function of a neural network non-convex?",
    "Differentiate between local minima and saddle points.",
    "What is a computational graph and how is the chain rule applied on it?"
  ],
  marks: [2, 4, 10],
  priority: "med",
  prob: 40,
  diff: 3,
  pyq: [],
  why: "Named syllabus heading ('gradient-based learning') not yet asked; overlaps with SGD/backprop answers, so moderate chance as its own question.",
  short: "Gradient-based learning trains a model by repeatedly moving parameters opposite to the gradient of the cost: θ ← θ − η∇J(θ), with gradients computed by backprop.",
  en: `<p><b>Definition:</b> Gradient-based learning finds the parameters θ that minimise a cost J(θ) by repeatedly taking small steps in the direction of steepest descent, the negative gradient. In neural networks the gradient is computed by backpropagation on a <b>computational graph</b>.</p>
<div class="formula">θ ← θ − η ∇θ J(θ)</div>
<h4>Key ideas</h4>
<ul>
<li><b>Gradient:</b> vector of partial derivatives; points to steepest increase.</li>
<li><b>Computational graph:</b> each node is an operation; forward pass computes values, backward pass applies the chain rule dz/dx = (dz/dy)(dy/dx) node by node.</li>
<li><b>Cost function:</b> usually negative log-likelihood (cross-entropy) so gradients are large and predictable.</li>
<li>Requires differentiable activations and cost.</li>
</ul>
<h4>Convex vs non-convex</h4>
<p>Linear/logistic regression have convex costs (one global minimum). Neural networks with hidden non-linear layers give a <b>non-convex</b> cost, so gradient descent gives no global guarantee and depends on initialisation.</p>
<h4>Challenges</h4>
<table><tr><th>Challenge</th><th>Meaning</th><th>Remedy</th></tr>
<tr><td>Local minima</td><td>Point lower than neighbours but not the lowest</td><td>In large nets most local minima are nearly as good; SGD noise</td></tr>
<tr><td>Saddle points</td><td>Gradient zero, minimum in one direction, maximum in another; very common in high dimensions</td><td>SGD noise, momentum, Adam</td></tr>
<tr><td>Plateaus / flat regions</td><td>Gradient almost zero for a long time</td><td>Momentum, adaptive η, good init</td></tr>
<tr><td>Ill-conditioning / ravines</td><td>Steep in one direction, flat in another → zig-zag</td><td>Momentum, RMSProp, BatchNorm</td></tr>
<tr><td>Cliffs and exploding gradients</td><td>Huge gradient jumps parameters far</td><td>Gradient clipping</td></tr>
<tr><td>Vanishing gradients</td><td>Early layers learn slowly</td><td>ReLU, residual connections</td></tr>
<tr><td>Inexact gradients</td><td>Mini-batch estimates are noisy</td><td>Larger batch, learning-rate decay</td></tr></table>
<h4>Example</h4>
<p>For J(w) = (w − 3)², ∇J = 2(w − 3). Starting at w = 0 with η = 0.1: w₁ = 0 − 0.1 × (−6) = 0.6, w₂ = 0.6 − 0.1 × (−4.8) = 1.08, … moving towards the minimum at w = 3.</p>
<p><b>Conclusion:</b> Gradient-based learning is simple and scalable; most of deep learning's tricks exist to make it work on non-convex, high-dimensional costs.</p>`,
  hi: `<p><b>Definition:</b> Cost J(θ) ko kam karne ke liye parameters ko baar-baar gradient ki ulti disha (sabse tez dhalaan) mein thoda khiskaana. Neural network mein gradient backprop se nikalta hai, jo <b>computational graph</b> pe chain rule lagata hai.</p>
<div class="formula">θ = θ − η ∇J(θ)</div>
<h4>Main baatein</h4>
<ul><li>Gradient = sabse tez chadhaai ki disha; isliye minus lagaate hain.</li><li>Computational graph: har operation ek node; forward mein values, backward mein chain rule.</li><li>Activation aur cost differentiable hone chahiye.</li></ul>
<h4>Convex vs non-convex</h4>
<p>Linear/logistic regression ka cost ek katori jaisa (convex), ek hi minimum. Neural network ka cost pahadi ilaaka (non-convex): kai gaddhe, saddle, flat maidaan. Isliye initialisation pe depend karta hai.</p>
<h4>Challenges</h4>
<ul><li><b>Local minima:</b> chhota gaddha, sabse gehra nahi. Bade network mein zyada problem nahi.</li><li><b>Saddle point:</b> ghode ki kaathi jaisa, ek taraf neeche ek taraf upar; gradient zero. High dimension mein bahut common.</li><li><b>Plateau:</b> flat maidaan, gradient lagbhag zero, training ruki si.</li><li><b>Ravine:</b> ek taraf steep, doosri flat → zig-zag. Momentum/RMSProp.</li><li><b>Cliff / exploding:</b> gradient clipping.</li><li><b>Vanishing:</b> ReLU, ResNet.</li></ul>
<h4>Chhota example</h4>
<p>J(w) = (w − 3)², η = 0.1, w = 0 se shuru: w = 0.6 → 1.08 → … → 3 ki taraf.</p>
<h4>Desi example</h4>
<p>Dhund (fog) mein pahad se gaon (valley) tak utarna: sirf pairon ke neeche dhalaan dikhti hai. Kabhi chhote gaddhe mein phans jaoge (local minimum), kabhi samtal maidaan mein ghoomte rahoge (plateau). Momentum = bhaagte hue utarna, chhote gaddhe paar ho jaate hain.</p>
<p><b>Ek line:</b> Gradient ki ulti disha mein chhote kadam; deep learning ki saari tricks isko non-convex surface pe kaam karwane ke liye hain.</p>`,
  keys: ["gradient", "θ ← θ − η∇J", "computational graph", "chain rule", "non-convex cost", "local minima", "saddle points", "plateaus", "ill-conditioning", "gradient clipping"],
  draw: "Loss surface sketch marking a global minimum, a local minimum, a saddle point and a plateau.",
  fig: "unit1.html#q3",
  num: false
},
{
  id: "U1-22",
  unit: 1,
  topic: "Neural networks and perceptron",
  q: "What is an artificial neural network? Explain the model of an artificial neuron and compare it with a biological neuron.",
  alt: [
    "Draw and explain the McCulloch–Pitts / artificial neuron model.",
    "Compare biological and artificial neurons.",
    "What are weights and biases in a neural network?"
  ],
  marks: [2, 4],
  priority: "med",
  prob: 35,
  diff: 1,
  pyq: [],
  why: "'Neural networks' is a syllabus item; basic definition questions appear occasionally as Part A.",
  short: "An artificial neural network is layers of connected neurons, each computing y = f(Σwᵢxᵢ + b), that learn weights from data to map inputs to outputs.",
  en: `<p><b>Definition:</b> An artificial neural network (ANN) is a computational model inspired by the brain, made of layers of simple connected units (neurons). Each connection has a weight; the network learns by adjusting these weights from data.</p>
<h4>Model of an artificial neuron</h4>
<div class="formula">z = Σᵢ wᵢxᵢ + b, &nbsp; y = f(z)</div>
<ul>
<li><b>Inputs xᵢ:</b> features or outputs of previous neurons.</li>
<li><b>Weights wᵢ:</b> importance of each input (learned).</li>
<li><b>Bias b:</b> shifts the activation threshold.</li>
<li><b>Summation:</b> weighted sum z.</li>
<li><b>Activation f:</b> step, sigmoid, tanh, ReLU.</li>
</ul>
<p>McCulloch and Pitts (1943) proposed the first binary threshold neuron; Rosenblatt (1958) added learning (perceptron).</p>
<h4>Biological vs artificial neuron</h4>
<table><tr><th>Biological</th><th>Artificial</th></tr>
<tr><td>Dendrites receive signals</td><td>Inputs xᵢ</td></tr>
<tr><td>Synapse strength</td><td>Weights wᵢ</td></tr>
<tr><td>Cell body (soma) integrates</td><td>Summation Σ wx + b</td></tr>
<tr><td>Fires if threshold crossed</td><td>Activation function</td></tr>
<tr><td>Axon carries output</td><td>Output y</td></tr>
<tr><td>~86 billion neurons, slow, parallel, low power</td><td>Far fewer units, fast, needs much energy and data</td></tr></table>
<h4>Types of ANN</h4>
<p>Feed-forward (MLP), convolutional (CNN), recurrent (RNN/LSTM), autoencoders, RBMs.</p>
<h4>Applications</h4>
<p>Image recognition, speech, translation, recommendation, medical diagnosis.</p>
<p><b>Conclusion:</b> An ANN is many weighted-sum-plus-activation neurons whose weights are learned from data.</p>`,
  hi: `<p><b>ANN kya hai:</b> Dimaag se inspire hua model jismein bahut saare chhote "neurons" layers mein jude hote hain. Har connection ka ek weight hota hai, aur network data se yeh weights seekhta hai.</p>
<h4>Ek neuron ka model</h4>
<div class="formula">z = Σ wᵢxᵢ + b, y = f(z)</div>
<ul><li>Inputs x = features.</li><li>Weights w = har input ki ahmiyat.</li><li>Bias b = threshold aage-peeche karna.</li><li>Σ = sab jodo.</li><li>f = activation (step, sigmoid, ReLU).</li></ul>
<p>McCulloch–Pitts (1943) ne pehla neuron model diya; Rosenblatt (1958) ne usko seekhna sikhaya (perceptron).</p>
<h4>Biological vs Artificial</h4>
<ul><li>Dendrites ↔ inputs</li><li>Synapse ki strength ↔ weights</li><li>Soma (cell body) ↔ summation</li><li>Threshold pe fire ↔ activation</li><li>Axon ↔ output</li></ul>
<p>Insaani dimaag mein lagbhag 86 billion neurons, bahut kam power mein kaam; ANN ko bahut data aur bijli chahiye.</p>
<h4>Desi example</h4>
<p>Panchayat ka faisla: har panch (input) ki raay, par sarpanch ki baat ka weight zyada. Sabki raay weight ke saath jodo, ek limit paar hui toh "haan" (activation). Kai panchayatein mil ke zila ka faisla = multi-layer network.</p>
<p><b>Ek line:</b> ANN = weighted sum + activation waale neurons ka jaal, jo weights data se seekhta hai.</p>`,
  keys: ["artificial neuron", "weights", "bias", "weighted sum", "activation function", "McCulloch–Pitts 1943", "dendrite / synapse / axon", "layers"],
  draw: "Biological neuron (dendrites, soma, axon) beside an artificial neuron (inputs, weights, Σ, f, output) with matching labels.",
  fig: "unit1.html#q7",
  num: false
},
{
  id: "U1-23",
  unit: 1,
  topic: "Maximum likelihood estimation",
  q: "Differentiate between Maximum Likelihood Estimation (MLE) and Maximum A Posteriori (MAP) estimation. How does MAP relate to regularisation?",
  alt: [
    "What is MAP estimation?",
    "Show that L2 regularisation corresponds to a Gaussian prior.",
    "Explain Bayesian vs frequentist estimation of parameters."
  ],
  marks: [2, 4],
  priority: "med",
  prob: 32,
  diff: 4,
  pyq: [],
  why: "Natural extension of the MLE sub-topic; rarely asked at RTU level but useful for a 10-mark MLE answer.",
  short: "MLE maximises p(data | θ); MAP maximises p(θ | data) ∝ p(data | θ) p(θ), adding a prior. A Gaussian prior gives L2, a Laplace prior gives L1 regularisation.",
  en: `<p><b>MLE</b> picks θ that maximises the likelihood of the data alone. <b>MAP</b> (Maximum A Posteriori) uses Bayes' rule and also includes prior belief p(θ) about the parameters.</p>
<div class="formula">θ_MLE = argmax_θ log p(X | θ)</div>
<div class="formula">θ_MAP = argmax_θ p(θ | X) = argmax_θ [ log p(X | θ) + log p(θ) ]</div>
<h4>Link to regularisation</h4>
<ul>
<li><b>Gaussian prior</b> θ ~ N(0, σ²): log p(θ) = −‖θ‖²/(2σ²) + const → MAP adds an <b>L2 penalty (weight decay)</b> λ‖θ‖².</li>
<li><b>Laplace prior:</b> log p(θ) ∝ −|θ| → <b>L1 penalty</b>, giving sparse weights.</li>
<li>So regularised training = MAP estimation.</li>
</ul>
<h4>Comparison</h4>
<table><tr><th>Point</th><th>MLE</th><th>MAP</th></tr>
<tr><td>Maximises</td><td>p(X | θ)</td><td>p(X | θ) p(θ)</td></tr>
<tr><td>Prior</td><td>Not used</td><td>Used</td></tr>
<tr><td>Small data</td><td>Overfits</td><td>Prior prevents extreme values</td></tr>
<tr><td>Large data</td><td>Same as MAP</td><td>Prior's effect fades</td></tr>
<tr><td>In DL</td><td>Plain cross-entropy / MSE</td><td>Loss + L2/L1 regularisation</td></tr></table>
<h4>Example</h4>
<p>3 tosses, 3 heads: MLE gives p = 1 (predicts tails are impossible). With a prior that coins are usually fair (Beta(2,2)), MAP gives p = (3 + 1)/(3 + 2) = 0.8, a more sensible value.</p>
<p><b>Conclusion:</b> MAP = MLE + prior; in deep learning that prior appears as weight-decay regularisation.</p>`,
  hi: `<p><b>MLE:</b> sirf data dekho, jo θ data ko sabse zyada probable banaye woh lo. <b>MAP:</b> data ke saath-saath pehle se maujood vishwas (prior p(θ)) bhi jodo (Bayes rule).</p>
<div class="formula">θ_MAP = argmax [log p(X | θ) + log p(θ)]</div>
<h4>Regularisation se rishta</h4>
<ul><li>Gaussian prior → L2 penalty (weight decay).</li><li>Laplace prior → L1 penalty (sparse weights).</li><li>Matlab regularisation lagake training karna = MAP karna.</li></ul>
<h4>Farak</h4>
<ul><li>MLE: prior nahi, kam data pe overfit.</li><li>MAP: prior hai, extreme values se bachata hai.</li><li>Bahut zyada data ho toh dono lagbhag same.</li></ul>
<h4>Example</h4>
<p>Coin 3 baar uchhala, 3 head. MLE bolega p = 1 (tail kabhi nahi aayega!). MAP (prior: coin aam taur pe fair hota hai, Beta(2,2)) bolega p = 4/5 = 0.8, zyada samajhdaar.</p>
<h4>Desi example</h4>
<p>Naya ladka class mein pehle 2 test mein 100/100 laaya. Sirf data dekho (MLE) toh "yeh hamesha 100 laayega". Teacher ka anubhav (prior) kehta hai "zyada tar bachche 70–90 ke beech", toh woh 90 ke aas-paas expect karega (MAP).</p>
<p><b>Ek line:</b> MAP = MLE + prior; DL mein prior = L2/L1 regularisation.</p>`,
  keys: ["Bayes' rule", "prior p(θ)", "posterior", "argmax log p(X|θ) + log p(θ)", "Gaussian prior = L2", "Laplace prior = L1", "weight decay", "overfitting on small data"],
  draw: "",
  fig: "unit1.html#q5",
  num: false
},
{
  id: "U1-24",
  unit: 1,
  topic: "Building an ML algorithm",
  q: "Differentiate between parameters and hyper-parameters. Explain the role of training, validation and test sets and cross-validation.",
  alt: [
    "What are hyper-parameters in a neural network? Give examples.",
    "Why do we need a validation set?",
    "Explain k-fold cross-validation."
  ],
  marks: [2, 4],
  priority: "med",
  prob: 30,
  diff: 1,
  pyq: [],
  why: "Supporting concept for 'building a machine learning algorithm'; possible Part A definition.",
  short: "Parameters (weights, biases) are learned from data; hyper-parameters (learning rate, epochs, layers, batch size) are set before training and tuned on a validation set.",
  en: `<p><b>Parameters</b> are the internal values the model learns from data during training (weights W and biases b). <b>Hyper-parameters</b> are settings chosen by the designer before training that control the learning process and the model's capacity.</p>
<table><tr><th>Point</th><th>Parameters</th><th>Hyper-parameters</th></tr>
<tr><td>Set by</td><td>Learning algorithm (backprop)</td><td>Designer / search</td></tr>
<tr><td>Examples</td><td>Weights, biases</td><td>Learning rate, batch size, epochs, number of layers/units, activation, dropout rate, λ</td></tr>
<tr><td>Tuned using</td><td>Training set</td><td>Validation set</td></tr></table>
<h4>Data splits</h4>
<ul>
<li><b>Training set (≈ 70–80%):</b> used to learn parameters.</li>
<li><b>Validation set (≈ 10–15%):</b> used to choose hyper-parameters and for early stopping; prevents tuning on the test data.</li>
<li><b>Test set (≈ 10–15%):</b> used once at the end to estimate generalisation error.</li>
</ul>
<h4>k-fold cross-validation</h4>
<p>Split the data into k folds; train on k − 1 folds and validate on the remaining one; repeat k times and average. Useful for small datasets (k = 5 or 10).</p>
<h4>Hyper-parameter search</h4>
<p>Manual tuning, grid search, random search, Bayesian optimisation.</p>
<p><b>Example:</b> An MLP for MNIST: parameters = ~100k weights; hyper-parameters = η = 0.001, batch 64, 2 hidden layers of 128 units, 20 epochs.</p>
<p><b>Conclusion:</b> The model learns parameters; we choose hyper-parameters, judged on validation data, and report results on unseen test data.</p>`,
  hi: `<p><b>Parameters:</b> jo model khud data se seekhta hai (weights, biases). <b>Hyper-parameters:</b> jo hum training se pehle khud set karte hain (learning rate, batch size, epochs, layers, neurons, dropout rate).</p>
<h4>Farak</h4>
<ul><li>Parameters → backprop se seekhe jaate hain, training set pe.</li><li>Hyper-parameters → hum chunte hain, validation set dekh ke.</li></ul>
<h4>Data ke teen hisse</h4>
<ul><li><b>Training (70–80%):</b> weights seekhne ke liye.</li><li><b>Validation (10–15%):</b> hyper-parameter tune karne aur early stopping ke liye.</li><li><b>Test (10–15%):</b> aakhir mein ek baar, asli performance check.</li></ul>
<h4>k-fold cross-validation</h4>
<p>Data ko k hisson mein baanto; k − 1 pe train, 1 pe check; k baar ghuma ke average lo. Kam data mein kaam ka.</p>
<h4>Desi example</h4>
<p>Board exam ki taiyari: textbook ke sawaal = training set, school ke pre-board = validation set (inse padhai ka tareeka adjust karte ho), asli board exam = test set (sirf ek baar). Padhai ke ghante aur timetable = hyper-parameters; jo dimaag mein concepts bane = parameters.</p>
<p><b>Ek line:</b> Parameters model seekhta hai, hyper-parameters hum set karte hain.</p>`,
  keys: ["parameters = weights, biases", "hyper-parameters", "learning rate, batch size, epochs", "training set", "validation set", "test set", "k-fold cross-validation", "grid / random search"],
  draw: "",
  fig: "unit1.html#q8",
  num: false
},
{
  id: "U1-25",
  unit: 1,
  topic: "Gradient-based learning",
  q: "Why is weight initialisation important? Explain zero, random, Xavier (Glorot) and He initialisation.",
  alt: [
    "Why should weights not be initialised to zero?",
    "What is symmetry breaking in neural networks?"
  ],
  marks: [2, 4],
  priority: "low",
  prob: 20,
  diff: 3,
  pyq: [],
  why: "Minor, derived topic of gradient-based learning in deep feed-forward networks; low chance but supports vanishing-gradient answers.",
  short: "Weights must be small, random and well-scaled to break symmetry and keep gradients stable; Xavier suits tanh/sigmoid, He suits ReLU.",
  en: `<p><b>Why it matters:</b> Gradient-based training of a non-convex network starts from the initial weights. Bad initial values cause symmetric neurons, vanishing or exploding activations and slow or failed training.</p>
<h4>Methods</h4>
<ul>
<li><b>Zero (or constant) initialisation:</b> every hidden unit computes the same output and receives the same gradient, so they stay identical forever (<b>symmetry problem</b>). Only biases may start at zero.</li>
<li><b>Small random (e.g. N(0, 0.01)):</b> breaks symmetry, but in deep nets activations shrink layer by layer → vanishing gradients; too large → saturation / explosion.</li>
<li><b>Xavier / Glorot (2010):</b> keeps the variance of activations equal across layers for tanh/sigmoid.</li>
</ul>
<div class="formula">Var(w) = 2 / (n_in + n_out) &nbsp; (uniform: ±√(6/(n_in + n_out)))</div>
<ul><li><b>He / Kaiming (2015):</b> for ReLU, which zeroes half the inputs.</li></ul>
<div class="formula">Var(w) = 2 / n_in</div>
<table><tr><th>Method</th><th>Best with</th><th>Problem solved</th></tr>
<tr><td>Zero</td><td>Biases only</td><td>—</td></tr>
<tr><td>Small random</td><td>Shallow nets</td><td>Symmetry</td></tr>
<tr><td>Xavier</td><td>tanh, sigmoid</td><td>Variance preservation</td></tr>
<tr><td>He</td><td>ReLU, Leaky ReLU</td><td>Variance preservation with ReLU</td></tr></table>
<p><b>Example:</b> A layer with n_in = 256 ReLU inputs: He gives standard deviation √(2/256) ≈ 0.088.</p>
<p><b>Conclusion:</b> Random, properly scaled initialisation breaks symmetry and keeps gradients healthy from the first step.</p>`,
  hi: `<p><b>Kyun zaroori:</b> Training initial weights se shuru hoti hai. Galat shuruaat = saare neurons ek jaise, ya gradient gayab/phat jaana.</p>
<h4>Tareeke</h4>
<ul>
<li><b>Zero init:</b> saare hidden neurons same output, same gradient → hamesha same rahenge (symmetry problem). Sirf bias zero rakh sakte ho.</li>
<li><b>Chhote random:</b> symmetry tootti hai, par deep network mein signal layer-dar-layer chhota → vanishing.</li>
<li><b>Xavier/Glorot:</b> Var(w) = 2/(n_in + n_out), tanh/sigmoid ke liye.</li>
<li><b>He:</b> Var(w) = 2/n_in, ReLU ke liye (ReLU aadhe inputs zero kar deta hai, isliye 2 ka factor).</li>
</ul>
<p>Example: 256 inputs wali ReLU layer: He se std = √(2/256) ≈ 0.088.</p>
<h4>Desi example</h4>
<p>Cricket team ke 11 khiladiyon ko bilkul same training doge (zero init) toh sab ek jaise khelenge, koi bowler-batsman alag nahi banega. Thoda alag-alag shuruaat do (random) toh har koi apna role seekhta hai. Xavier/He = har khiladi ko uski capacity ke hisaab se sahi matra ki shuruaati training.</p>
<p><b>Ek line:</b> Random + sahi scale = symmetry tooti aur gradient healthy.</p>`,
  keys: ["symmetry breaking", "zero initialisation problem", "small random weights", "Xavier / Glorot 2/(n_in + n_out)", "He 2/n_in", "variance preservation", "vanishing / exploding"],
  draw: "",
  fig: "",
  num: false
}
);
