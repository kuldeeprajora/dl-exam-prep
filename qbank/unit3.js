window.QB = window.QB || [];
window.QB.push(
{
  id: "U3-01",
  unit: 3,
  topic: "CNN architecture",
  q: "Describe the architecture and working of a Convolutional Neural Network (CNN) and its applications in computer vision tasks.",
  alt: [
    "Explain the architectural overview of a CNN with a neat diagram.",
    "Explain the different layers of a CNN (convolution, ReLU, pooling, fully connected, softmax).",
    "How does a CNN work? Explain with the help of an image-classification example.",
    "What is a CNN? Explain its building blocks."
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 92,
  diff: 4,
  pyq: ["8AID 2025 C1", "8AID 2024 A8", "7CAI 2025 A6", "7CAI 2025 B6"],
  why: "Full 10-marker in 8AID 2025 and CNN/CV applications asked in all three papers; the core question of Unit 3.",
  short: "A CNN is a deep network for images that uses learnable convolution filters, ReLU, pooling and fully connected + softmax layers to learn spatial features automatically.",
  en: `<p><b>Definition:</b> A <b>Convolutional Neural Network (CNN)</b> is a deep feed-forward neural network specialised for grid-like data such as images. Instead of full matrix multiplication it uses <b>convolution</b>: small learnable filters slide over the input and detect local patterns. Stacked layers learn a <b>hierarchy of features</b>: edges → textures → parts → whole objects.</p>
<h4>1. Architecture (layer by layer)</h4>
<ul>
<li><b>Input layer:</b> image tensor H × W × C, e.g. 32×32×3 for an RGB image.</li>
<li><b>Convolution layer:</b> K filters (e.g. 3×3 or 5×5, depth = C) slide over the input; each position gives a dot product + bias. Each filter produces one <b>feature map</b>. Hyper-parameters: filter size f, number of filters K, stride s, padding p.</li>
<li><b>Activation (ReLU):</b> f(x) = max(0, x) applied element-wise; adds non-linearity and avoids vanishing gradients.</li>
<li><b>Pooling layer:</b> max or average pooling (usually 2×2, stride 2) halves H and W, reduces computation and gives slight translation invariance. No learnable parameters.</li>
<li><b>Repeated blocks:</b> [Conv → ReLU → Pool] × N; deeper blocks learn more abstract features.</li>
<li><b>Flatten + Fully Connected (FC) layers:</b> convert the 3-D maps into a vector and combine all features for the decision.</li>
<li><b>Output layer:</b> softmax gives class probabilities (sigmoid for binary).</li>
</ul>
<h4>2. Key formulas</h4>
<div class="formula">Output size = ⌊(n − f + 2p) / s⌋ + 1</div>
<div class="formula">Conv parameters = K × (f × f × C + 1)</div>
<div class="formula">Softmax: P(class i) = e<sup>z<sub>i</sub></sup> / Σ<sub>j</sub> e<sup>z<sub>j</sub></sup></div>
<p>Example: n = 32, f = 5, p = 0, s = 1 → (32 − 5)/1 + 1 = 28, so 6 filters give 28×28×6; 2×2 max-pool → 14×14×6.</p>
<h4>3. Working (training)</h4>
<ol>
<li>Forward pass: image → conv/ReLU/pool blocks → FC → softmax probabilities.</li>
<li>Loss: cross-entropy L = − Σ y<sub>i</sub> log ŷ<sub>i</sub>.</li>
<li>Backpropagation computes gradients of the loss w.r.t. every filter weight and FC weight.</li>
<li>An optimiser (SGD with momentum / Adam) updates the weights: w ← w − η ∂L/∂w.</li>
<li>Repeat over many epochs; filters are <b>learned</b>, not hand-designed.</li>
</ol>
<h4>4. Applications in computer vision</h4>
<ul>
<li><b>Image classification:</b> ImageNet, cat vs dog (AlexNet, VGG, ResNet).</li>
<li><b>Object detection:</b> bounding boxes, e.g. YOLO, Faster R-CNN in CCTV and traffic cameras.</li>
<li><b>Semantic segmentation:</b> label every pixel, e.g. U-Net for tumour boundaries, road-scene parsing.</li>
<li><b>Face recognition:</b> phone face-unlock, attendance systems (FaceNet, DeepFace).</li>
<li><b>Medical imaging:</b> pneumonia from chest X-rays, diabetic retinopathy, MRI tumours.</li>
<li><b>Self-driving cars:</b> lane, pedestrian and traffic-sign detection.</li>
<li><b>Others:</b> OCR/handwriting (MNIST), image captioning (CNN + LSTM), style transfer.</li>
</ul>
<h4>5. Advantages and limitations</h4>
<ul>
<li>Advantages: automatic feature extraction, far fewer parameters than an MLP (parameter sharing), translation equivariance, state-of-the-art accuracy.</li>
<li>Limitations: needs large labelled data and GPUs, a black box, not rotation/scale invariant by design.</li>
</ul>
<p><b>Conclusion:</b> A CNN = feature extractor (conv + ReLU + pool) + classifier (FC + softmax), trained end-to-end by backpropagation; it is the backbone of modern computer vision.</p>`,
  hi: `<p><b>Definition:</b> <b>CNN (Convolutional Neural Network)</b> ek deep neural network hai jo khaas taur pe images jaise grid data ke liye bana hai. Yeh poori image ko ek saath multiply nahi karta, balki ek chhota <b>filter</b> (jaise 3×3) image ke upar slide karta hai aur har jagah check karta hai "yahan edge hai? curve hai?". Layers badhne ke saath features bhi upgrade hote hain: edges → texture → aankh/naak → poora chehra.</p>
<h4>1. Architecture (ek-ek layer)</h4>
<ul>
<li><b>Input layer:</b> photo ek tensor H × W × C hai, jaise 32×32×3 (RGB ke 3 channel).</li>
<li><b>Convolution layer:</b> K filters image pe slide karte hain, har position pe dot product + bias. Har filter ek <b>feature map</b> banata hai. Settings: filter size f, filters K, stride s, padding p.</li>
<li><b>ReLU:</b> max(0, x) – negative values zero, non-linearity aati hai, gradient nahi marta.</li>
<li><b>Pooling:</b> 2×2 max-pool photo ko aadha kar deta hai, important value rakhta hai. Koi weight nahi seekhna padta.</li>
<li><b>Repeat:</b> [Conv → ReLU → Pool] kai baar; gehri layers zyada "samajhdaar" features seekhti hain.</li>
<li><b>Flatten + FC:</b> 3-D maps ko ek lambi vector mein badal ke saare features milake decision.</li>
<li><b>Softmax output:</b> har class ki probability, jaise "billi 0.9, kutta 0.1".</li>
</ul>
<h4>2. Formulas (as-it-is likho)</h4>
<div class="formula">Output size = ⌊(n − f + 2p) / s⌋ + 1</div>
<div class="formula">Conv parameters = K × (f × f × C + 1)</div>
<div class="formula">Softmax: P(class i) = e<sup>z<sub>i</sub></sup> / Σ<sub>j</sub> e<sup>z<sub>j</sub></sup></div>
<p>Example: 32×32 image, 5×5 filter, p = 0, s = 1 → 28×28; 6 filters → 28×28×6; pool ke baad 14×14×6.</p>
<h4>3. Working (training kaise hoti hai)</h4>
<ol>
<li>Forward pass: image layers se guzar ke softmax tak.</li>
<li>Loss: cross-entropy – galti kitni hui.</li>
<li>Backpropagation se har filter weight ka gradient nikalo.</li>
<li>SGD/Adam se weights update: w ← w − η ∂L/∂w.</li>
<li>Kai epochs repeat – filters khud seekhte hain, humein design nahi karne padte.</li>
</ol>
<h4>4. Computer vision applications</h4>
<ul>
<li><b>Classification:</b> photo mein kya hai – cat vs dog, ImageNet.</li>
<li><b>Object detection:</b> YOLO se traffic camera mein gaadi/helmet ke bina rider ka box.</li>
<li><b>Segmentation:</b> har pixel ka label – U-Net se MRI mein tumour ka boundary.</li>
<li><b>Face recognition:</b> phone face-unlock, office/college attendance.</li>
<li><b>Medical imaging:</b> chest X-ray se pneumonia/TB detection.</li>
<li><b>Self-driving:</b> lane, pedestrian, traffic sign pehchaanna.</li>
<li><b>OCR:</b> handwritten digits, number-plate reading (FASTag/challan cameras).</li>
</ul>
<h4>5. Fayde aur kamiyan</h4>
<ul>
<li>Fayde: features khud seekhta hai, MLP se bahut kam parameters, object kahin bhi ho pakad leta hai.</li>
<li>Kamiyan: bahut data + GPU chahiye, black box hai, rotation/scale ke liye khud se robust nahi.</li>
</ul>
<p><b>Desi example:</b> Jaise chai-wala bhaiya regular customer ko door se pehchaan leta hai – pehle shape, phir chehra, phir "arre Sharma ji!". CNN bhi aise hi chhote features jod ke poori pehchaan banata hai.</p>
<p><b>Conclusion:</b> CNN = feature extractor (conv + ReLU + pool) + classifier (FC + softmax), backprop se end-to-end train hota hai.</p>`,
  keys: ["convolution", "filter/kernel", "feature map", "ReLU", "pooling", "stride", "padding", "flatten", "fully connected", "softmax", "backpropagation", "hierarchical features"],
  draw: "Pipeline: Input 32×32×3 → Conv+ReLU 28×28×6 → Pool 14×14×6 → Conv → Pool → Flatten → FC → Softmax, labelled 'feature extraction' and 'classification'.",
  fig: "unit3.html#q1",
  num: false
},
{
  id: "U3-02",
  unit: 3,
  topic: "Popular CNN architectures",
  q: "Compare AlexNet and ResNet in terms of design principles and performance on image recognition benchmarks.",
  alt: [
    "Differentiate between AlexNet and ResNet.",
    "How does ResNet overcome the limitations of AlexNet and other deep networks?",
    "Explain the evolution of CNN architectures from AlexNet to ResNet."
  ],
  marks: [4, 10],
  priority: "must",
  prob: 88,
  diff: 4,
  pyq: ["8AID 2025 C3", "7CAI 2025 C3"],
  why: "Asked as a 10-marker in 8AID 2025 and AlexNet alone in 7CAI 2025; syllabus names both architectures explicitly.",
  short: "AlexNet (2012): 8 layers, ReLU, dropout, 15.3% top-5 error. ResNet (2015): up to 152 layers with skip connections y = F(x) + x, 3.57% error.",
  en: `<p><b>Introduction:</b> AlexNet and ResNet are the two landmark winners of the ImageNet Large Scale Visual Recognition Challenge (ILSVRC). AlexNet (2012) proved deep CNNs work; ResNet (2015) showed how to make them <b>very</b> deep.</p>
<h4>1. AlexNet in brief</h4>
<ul>
<li>Krizhevsky, Sutskever &amp; Hinton, 2012; 8 learned layers (5 conv + 3 FC), ~60 million parameters.</li>
<li>Large early filters (11×11 stride 4, then 5×5, then 3×3), ReLU, overlapping max-pool, Local Response Normalisation (LRN).</li>
<li>Dropout 0.5 in FC6 and FC7, heavy data augmentation, trained on two GTX 580 GPUs.</li>
<li>Top-5 error 15.3% vs 26.2% for the runner-up.</li>
</ul>
<h4>2. ResNet in brief</h4>
<ul>
<li>He et al. (Microsoft Research), 2015; variants with 18/34/50/101/152 layers.</li>
<li>Key idea: <b>residual learning</b>. A block learns the residual F(x) and adds the input back through an identity shortcut.</li>
</ul>
<div class="formula">y = F(x, {W<sub>i</sub>}) + x</div>
<ul>
<li>Solves the <b>degradation problem</b> (deeper plain nets had higher training error) and eases vanishing gradients, since ∂y/∂x = ∂F/∂x + 1 always lets gradient flow back.</li>
<li>Batch normalisation after every conv, mostly 3×3 filters, 1×1–3×3–1×1 bottleneck blocks in ResNet-50+, global average pooling + one FC layer.</li>
<li>Ensemble top-5 error 3.57% (ILSVRC 2015 winner), below the ~5% human estimate.</li>
</ul>
<h4>3. Comparison table</h4>
<table>
<tr><th>Point</th><th>AlexNet (2012)</th><th>ResNet (2015)</th></tr>
<tr><td>Depth</td><td>8 layers (5 conv + 3 FC)</td><td>18 to 152 layers</td></tr>
<tr><td>Core idea</td><td>Scale up a plain CNN with ReLU, dropout, GPUs</td><td>Residual blocks with skip connections</td></tr>
<tr><td>Filter sizes</td><td>11×11, 5×5, 3×3</td><td>7×7 stem, then 3×3 and 1×1</td></tr>
<tr><td>Normalisation</td><td>LRN</td><td>Batch normalisation</td></tr>
<tr><td>Regularisation</td><td>Dropout + data augmentation</td><td>BN + weight decay + augmentation, no dropout</td></tr>
<tr><td>Classifier head</td><td>3 large FC layers (most of the 60M params)</td><td>Global average pooling + 1 FC</td></tr>
<tr><td>Parameters</td><td>~60 M</td><td>11.7 M (18), 25.6 M (50), ~60 M (152)</td></tr>
<tr><td>Vanishing gradient</td><td>Reduced by ReLU, but depth limited</td><td>Largely solved by identity shortcuts</td></tr>
<tr><td>ImageNet top-5 error</td><td>15.3%</td><td>3.57%</td></tr>
<tr><td>Use today</td><td>Historical milestone</td><td>Standard backbone for detection, segmentation, transfer learning</td></tr>
</table>
<h4>4. Design principles learned</h4>
<ul>
<li>AlexNet: depth + non-saturating activations + regularisation + GPU compute = big accuracy jump.</li>
<li>ResNet: going deeper needs an easy path for gradients; making identity mapping easy (F(x) = 0) means extra layers can never hurt.</li>
</ul>
<h4>5. Example</h4>
<p>A hospital building a chest X-ray classifier today would fine-tune a pretrained ResNet-50 rather than AlexNet: higher accuracy with fewer parameters.</p>
<p><b>Conclusion:</b> AlexNet started the deep-learning era in vision; ResNet's skip connections made very deep networks trainable and became the default CNN backbone.</p>`,
  hi: `<p><b>Intro:</b> AlexNet aur ResNet dono ImageNet (ILSVRC) competition ke champion hain. AlexNet (2012) ne dikhaya ki deep CNN kaam karta hai; ResNet (2015) ne dikhaya ki network ko <b>bahut gehra</b> kaise banayein.</p>
<h4>1. AlexNet short mein</h4>
<ul>
<li>Krizhevsky, Sutskever, Hinton – 2012; 8 layers (5 conv + 3 FC), ~60 million parameters.</li>
<li>Bade filters (11×11 stride 4, phir 5×5, 3×3), ReLU, overlapping max-pool, LRN.</li>
<li>Dropout 0.5, data augmentation, 2 GPUs pe training.</li>
<li>Top-5 error 15.3% – doosre number wala 26.2% pe tha. Seedha 11% ka jump!</li>
</ul>
<h4>2. ResNet short mein</h4>
<ul>
<li>He et al., Microsoft, 2015; 18/34/50/101/152 layers.</li>
<li>Main idea: <b>residual learning</b> – block poora H(x) nahi seekhta, sirf "kitna badlaav chahiye" F(x) seekhta hai aur input x ko wapas jod deta hai.</li>
</ul>
<div class="formula">y = F(x, {W<sub>i</sub>}) + x</div>
<ul>
<li>Plain network ko gehra karo toh training error badh jaata tha (degradation). Shortcut se gradient ka "+1" wala seedha raasta mil jaata hai, toh gradient marta nahi.</li>
<li>Har conv ke baad Batch Norm, zyada 3×3 filters, ResNet-50 se bottleneck 1×1–3×3–1×1, end mein global average pooling + ek FC.</li>
<li>Top-5 error sirf 3.57% – insaan (~5%) se bhi behtar.</li>
</ul>
<h4>3. Comparison table</h4>
<table>
<tr><th>Point</th><th>AlexNet</th><th>ResNet</th></tr>
<tr><td>Depth</td><td>8</td><td>18–152</td></tr>
<tr><td>Main idea</td><td>Plain CNN ko bada karo</td><td>Skip connection wale residual blocks</td></tr>
<tr><td>Filters</td><td>11×11, 5×5, 3×3</td><td>3×3 aur 1×1</td></tr>
<tr><td>Normalisation</td><td>LRN</td><td>Batch Norm</td></tr>
<tr><td>Regularisation</td><td>Dropout</td><td>BN + weight decay, dropout nahi</td></tr>
<tr><td>Head</td><td>3 bade FC</td><td>GAP + 1 FC</td></tr>
<tr><td>Params</td><td>~60 M</td><td>11.7 M (18), 25.6 M (50)</td></tr>
<tr><td>Top-5 error</td><td>15.3%</td><td>3.57%</td></tr>
<tr><td>Aaj kal</td><td>History lesson</td><td>Har jagah backbone (detection, transfer learning)</td></tr>
</table>
<h4>4. Design lesson</h4>
<ul>
<li>AlexNet: depth + ReLU + dropout + GPU = accuracy mein bada jump.</li>
<li>ResNet: gehra jaana hai toh gradient ke liye shortcut do; agar extra layer kaam ki nahi, toh F(x) = 0 seekh lo – nuksaan nahi hoga.</li>
</ul>
<p><b>Desi example:</b> AlexNet = pehli Rajdhani train jisne dikhaya fast train possible hai. ResNet = Delhi–Mumbai expressway pe flyover: 150 signal (layers) mein gradient atakta nahi, seedha flyover (skip connection) se nikal jaata hai.</p>
<p><b>Conclusion:</b> AlexNet ne deep learning ka daur shuru kiya, ResNet ne bahut gehre networks ko trainable banaya aur aaj ka default backbone hai.</p>`,
  keys: ["ILSVRC/ImageNet", "15.3% vs 3.57% top-5", "5 conv + 3 FC", "ReLU", "dropout", "LRN", "residual block", "skip connection y = F(x) + x", "degradation problem", "batch normalisation", "bottleneck", "global average pooling"],
  draw: "Comparison table + residual block: x → 3×3 conv+BN → ReLU → 3×3 conv+BN → (+) ← identity shortcut x → ReLU.",
  fig: "unit3.html#q2",
  num: false
},
{
  id: "U3-03",
  unit: 3,
  topic: "Popular CNN architectures",
  q: "Describe the architecture of AlexNet. How did it improve performance in the ImageNet competition compared to earlier models?",
  alt: [
    "Explain AlexNet architecture with a layer-wise diagram.",
    "What innovations did AlexNet introduce?",
    "Why is AlexNet considered a breakthrough in deep learning?"
  ],
  marks: [4, 10],
  priority: "must",
  prob: 82,
  diff: 4,
  pyq: ["7CAI 2025 C3", "8AID 2025 C3"],
  why: "Asked as a full 10-marker in 7CAI 2025 and as half of 8AID 2025 C3; 'AlexNet in detail' is a named syllabus item.",
  short: "AlexNet (2012) has 5 conv + 3 FC layers (~60M params); ReLU, dropout, data augmentation and GPU training cut ImageNet top-5 error to 15.3%.",
  en: `<p><b>Definition:</b> <b>AlexNet</b> is an 8-layer deep CNN by Alex Krizhevsky, Ilya Sutskever and Geoffrey Hinton that won the <b>ILSVRC 2012</b> ImageNet challenge (1.2 million training images, 1000 classes) with a top-5 error of <b>15.3%</b>, against 26.2% for the second-best method. It triggered the deep-learning revolution in computer vision.</p>
<h4>1. Architecture (5 conv + 3 FC, ~60 M parameters, ~650,000 neurons)</h4>
<table>
<tr><th>Layer</th><th>Configuration</th><th>Output</th></tr>
<tr><td>Input</td><td>RGB image (224 in paper, 227 effective)</td><td>227×227×3</td></tr>
<tr><td>Conv1</td><td>96 filters 11×11, stride 4, ReLU, LRN</td><td>55×55×96</td></tr>
<tr><td>MaxPool1</td><td>3×3, stride 2 (overlapping)</td><td>27×27×96</td></tr>
<tr><td>Conv2</td><td>256 filters 5×5, pad 2, ReLU, LRN</td><td>27×27×256</td></tr>
<tr><td>MaxPool2</td><td>3×3, stride 2</td><td>13×13×256</td></tr>
<tr><td>Conv3</td><td>384 filters 3×3, pad 1, ReLU</td><td>13×13×384</td></tr>
<tr><td>Conv4</td><td>384 filters 3×3, pad 1, ReLU</td><td>13×13×384</td></tr>
<tr><td>Conv5</td><td>256 filters 3×3, pad 1, ReLU</td><td>13×13×256</td></tr>
<tr><td>MaxPool3</td><td>3×3, stride 2</td><td>6×6×256 = 9216</td></tr>
<tr><td>FC6</td><td>4096 neurons, ReLU, dropout 0.5</td><td>4096</td></tr>
<tr><td>FC7</td><td>4096 neurons, ReLU, dropout 0.5</td><td>4096</td></tr>
<tr><td>FC8</td><td>1000 neurons, softmax</td><td>1000</td></tr>
</table>
<div class="formula">Conv1: (227 − 11)/4 + 1 = 55 &nbsp;|&nbsp; Pool1: (55 − 3)/2 + 1 = 27 &nbsp;|&nbsp; Pool3: (13 − 3)/2 + 1 = 6</div>
<h4>2. Improvements over earlier models (e.g. LeNet-5, hand-crafted SIFT + SVM)</h4>
<ul>
<li><b>ReLU activation</b> instead of tanh/sigmoid: non-saturating, trained about 6× faster (reported on CIFAR-10), reduces vanishing gradients.</li>
<li><b>Dropout (p = 0.5)</b> in FC6 and FC7: reduces overfitting of the huge FC layers.</li>
<li><b>Data augmentation:</b> random 224×224 crops from 256×256 images, horizontal flips and PCA-based colour (lighting) jitter.</li>
<li><b>GPU training:</b> model split across two GTX 580 GPUs (3 GB each), trained for about 5–6 days.</li>
<li><b>Overlapping max-pooling</b> (3×3, stride 2) slightly reduced error and overfitting.</li>
<li><b>Local Response Normalisation (LRN)</b> for lateral inhibition between channels.</li>
<li><b>Scale:</b> ~60 M parameters vs ~60 K in LeNet-5, trained with SGD (momentum 0.9, weight decay 0.0005, batch 128).</li>
</ul>
<h4>3. Impact on ImageNet</h4>
<ul>
<li>Error dropped from 26.2% to 15.3%, a ~10.9 percentage-point gap, the largest margin in the challenge's history.</li>
<li>After 2012 every ILSVRC winner was a deep CNN (ZFNet, VGG, GoogLeNet, ResNet).</li>
<li>Learned filters in Conv1 looked like edge and colour-blob detectors, proving automatic feature learning.</li>
</ul>
<h4>4. Limitations</h4>
<ul>
<li>Very large FC layers (FC6 alone ≈ 37.7 M weights) – memory heavy.</li>
<li>Large 11×11 filters and LRN were later dropped (VGG, ResNet use 3×3 and batch-norm).</li>
<li>Only 8 layers; deeper plain networks became hard to train.</li>
</ul>
<p><b>Conclusion:</b> AlexNet combined depth, ReLU, dropout, augmentation and GPUs to beat hand-crafted methods by a huge margin, making CNNs the standard for image recognition.</p>`,
  hi: `<p><b>Definition:</b> <b>AlexNet</b> ek 8-layer deep CNN hai (Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton) jisne <b>ILSVRC 2012</b> ImageNet competition jeeti – 12 lakh training images, 1000 classes. Top-5 error <b>15.3%</b>, jabki doosra best 26.2% pe tha. Yahin se computer vision mein deep learning ka boom shuru hua.</p>
<h4>1. Architecture (5 conv + 3 FC, ~60 M parameters)</h4>
<table>
<tr><th>Layer</th><th>Setting</th><th>Output</th></tr>
<tr><td>Input</td><td>RGB photo</td><td>227×227×3</td></tr>
<tr><td>Conv1</td><td>96 filters 11×11, stride 4, ReLU, LRN</td><td>55×55×96</td></tr>
<tr><td>Pool1</td><td>3×3, stride 2</td><td>27×27×96</td></tr>
<tr><td>Conv2</td><td>256 filters 5×5, pad 2</td><td>27×27×256</td></tr>
<tr><td>Pool2</td><td>3×3, stride 2</td><td>13×13×256</td></tr>
<tr><td>Conv3, Conv4</td><td>384 filters 3×3, pad 1</td><td>13×13×384</td></tr>
<tr><td>Conv5</td><td>256 filters 3×3, pad 1</td><td>13×13×256</td></tr>
<tr><td>Pool3</td><td>3×3, stride 2</td><td>6×6×256</td></tr>
<tr><td>FC6, FC7</td><td>4096 neurons, dropout 0.5</td><td>4096</td></tr>
<tr><td>FC8</td><td>1000 + softmax</td><td>1000</td></tr>
</table>
<div class="formula">Conv1: (227 − 11)/4 + 1 = 55 &nbsp;|&nbsp; Pool1: (55 − 3)/2 + 1 = 27 &nbsp;|&nbsp; Pool3: (13 − 3)/2 + 1 = 6</div>
<h4>2. Purane models se kya better kiya</h4>
<ul>
<li><b>ReLU:</b> tanh/sigmoid ki jagah – saturate nahi hota, ~6× fast training, vanishing gradient kam.</li>
<li><b>Dropout 0.5:</b> FC layers mein random neurons band – ratta (overfitting) kam.</li>
<li><b>Data augmentation:</b> 256×256 photo se random 224×224 crop, mirror flip, colour badalna – data "free mein" badh gaya.</li>
<li><b>GPU training:</b> 2 GTX 580 GPUs pe model baanta, ~5–6 din training.</li>
<li><b>Overlapping max-pool</b> (3×3, stride 2) – thoda error kam.</li>
<li><b>LRN</b> – channels ke beech normalisation.</li>
<li><b>Scale:</b> LeNet ke ~60 hazaar params vs AlexNet ke ~6 crore; SGD momentum 0.9, batch 128.</li>
</ul>
<h4>3. ImageNet pe asar</h4>
<ul>
<li>26.2% → 15.3%: itna bada gap pehle kabhi nahi aaya tha.</li>
<li>2012 ke baad har saal winner deep CNN hi raha (VGG, GoogLeNet, ResNet).</li>
<li>Conv1 ke filters khud edge aur colour detectors ban gaye – hand-made features ki zarurat khatam.</li>
</ul>
<h4>4. Kamiyan</h4>
<ul>
<li>FC layers bahut bhaari (sirf FC6 mein ~3.77 crore weights).</li>
<li>11×11 filters aur LRN baad mein hata diye gaye (3×3 aur batch-norm aaye).</li>
<li>Sirf 8 layers – aur gehra karna mushkil tha.</li>
</ul>
<p><b>Desi example:</b> Jaise 2011 World Cup ke baad Indian cricket mein fitness + data analytics aaya aur poora game badal gaya, waise hi AlexNet ne ReLU + dropout + GPU laake vision ka game badal diya.</p>
<p><b>Conclusion:</b> Depth + ReLU + dropout + augmentation + GPU = AlexNet ki jeet; isne CNN ko image recognition ka standard bana diya.</p>`,
  keys: ["ILSVRC 2012", "15.3% top-5 vs 26.2%", "5 conv + 3 FC", "60 million parameters", "11×11 stride 4", "ReLU", "dropout 0.5", "data augmentation", "2 GPUs", "overlapping max pooling", "LRN"],
  draw: "Block diagram 227×227×3 → C1 55×55×96 → P → C2 27×27×256 → P → C3 → C4 → C5 13×13 → P 6×6×256 → FC 4096 → FC 4096 → FC 1000 softmax.",
  fig: "unit3.html#q2",
  num: false
},
{
  id: "U3-04",
  unit: 3,
  topic: "Parameter sharing",
  q: "What is parameter sharing in CNNs? What is its purpose?",
  alt: [
    "Explain the concept of parameter sharing in CNNs.",
    "How does weight sharing reduce the number of parameters in a CNN? Explain with an example.",
    "Why do CNNs need fewer parameters than fully connected networks?"
  ],
  marks: [2, 4],
  priority: "must",
  prob: 90,
  diff: 2,
  pyq: ["8AID 2025 A7", "7CAI 2025 A4"],
  why: "Asked in Part A of both 8AID 2025 and 7CAI 2025; a guaranteed 2-marker.",
  short: "Parameter sharing: the same filter weights are reused at every image position, drastically reducing parameters and detecting a feature wherever it appears (translation equivariance).",
  en: `<p><b>Definition:</b> <b>Parameter (weight) sharing</b> means that one filter, i.e. the same set of weights and one bias, is applied at <b>every spatial position</b> of the input. All neurons of one feature map therefore share identical parameters. A 3×3 filter on a grey image has only 9 weights + 1 bias, whether the image is 28×28 or 1000×1000.</p>
<h4>Purpose / benefits</h4>
<ul>
<li><b>Fewer parameters:</b> less memory, faster training, less overfitting.</li>
<li><b>Translation equivariance:</b> an edge or eye is detected wherever it appears; if the input shifts, the feature map shifts the same way.</li>
<li><b>Handles any image size:</b> the filter simply slides further.</li>
<li><b>Statistical efficiency:</b> every image location provides training signal for the same filter.</li>
<li>Assumption: a feature useful in one part of the image is useful everywhere.</li>
</ul>
<div class="formula">Conv layer params = K × (f × f × C + 1) &nbsp; (independent of image size)</div>
<h4>Example: FC vs Conv</h4>
<p>Input 32×32×3 (3072 values), output 28×28×6 (4704 values).</p>
<ul>
<li>Fully connected: 3072 × 4704 + 4704 = <b>14,455,392</b> parameters.</li>
<li>Convolution: 6 filters of 5×5×3 → 6 × (75 + 1) = <b>456</b> parameters.</li>
</ul>
<p>That is about 31,700× fewer parameters for the same output size.</p>
<h4>Limitation</h4>
<p>When position matters (e.g. aligned face images where eyes are always at the top), full sharing can be relaxed with locally connected layers.</p>
<p><b>Conclusion:</b> Parameter sharing makes CNNs compact, data-efficient and position-independent feature detectors.</p>`,
  hi: `<p><b>Definition:</b> <b>Parameter sharing</b> ka matlab: ek hi filter (wahi weights + ek bias) poori image ki <b>har position</b> pe use hota hai. Ek feature map ke saare neurons same weights share karte hain. 3×3 filter mein sirf 9 weights + 1 bias – image 28×28 ho ya 1000×1000, farak nahi padta.</p>
<h4>Purpose / fayde</h4>
<ul>
<li><b>Kam parameters:</b> kam memory, fast training, kam overfitting.</li>
<li><b>Translation equivariance:</b> edge/aankh photo mein kahin bhi ho, wahi filter pakad lega; object khiska toh feature map bhi utna hi khiskega.</li>
<li><b>Koi bhi image size:</b> filter bas aur aage slide karega.</li>
<li><b>Data ka poora use:</b> image ki har jagah se same filter ko seekhne ka mauka milta hai.</li>
<li>Maanyata: jo feature ek jagah kaam ka hai, woh har jagah kaam ka hai.</li>
</ul>
<div class="formula">Conv layer params = K × (f × f × C + 1) &nbsp; (image size pe depend nahi)</div>
<h4>Example: FC vs Conv</h4>
<ul>
<li>Input 32×32×3, output 28×28×6.</li>
<li>FC: 3072 × 4704 + 4704 = <b>1,44,55,392</b> parameters.</li>
<li>Conv: 6 × (5×5×3 + 1) = <b>456</b> parameters. Lagbhag 31,700 guna kam!</li>
</ul>
<h4>Kami</h4>
<p>Jahan position important ho (jaise passport photo mein aankh hamesha upar), wahan locally connected layers better ho sakti hain.</p>
<p><b>Desi example:</b> Railway station pe ek hi metal detector design har gate pe lagaya – har gate ke liye naya machine design nahi kiya, aur chor kisi bhi gate se aaye, pakda jaayega.</p>
<p><b>Conclusion:</b> Parameter sharing CNN ko chhota, data-efficient aur position-independent banata hai.</p>`,
  keys: ["same weights at every position", "fewer parameters", "translation equivariance", "K × (f×f×C + 1)", "less overfitting", "independent of image size"],
  draw: "One 3×3 filter shown sliding over a grid at two positions with the same weights, plus FC (14.5M) vs conv (456) count.",
  fig: "unit3.html#q3",
  num: false
},
{
  id: "U3-05",
  unit: 3,
  topic: "Regularization in CNNs",
  q: "What is the purpose of regularization in CNNs? Discuss regularization techniques used in CNNs.",
  alt: [
    "Explain any two regularization techniques used in CNNs.",
    "Name one regularization technique in CNNs.",
    "How is overfitting controlled in convolutional neural networks?",
    "Explain dropout, L1/L2, data augmentation, batch normalization and early stopping."
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 85,
  diff: 3,
  pyq: ["7CAI 2025 B3", "7CAI 2025 A10", "8AID 2025 B6"],
  why: "Regularization asked in 7CAI 2025 (A10, B3) and dropout in 8AID 2025 B6; named syllabus sub-topic.",
  short: "Regularization reduces overfitting so a CNN generalises; techniques include dropout, L1/L2 weight decay, data augmentation, batch normalisation and early stopping.",
  en: `<p><b>Definition:</b> <b>Regularization</b> is any modification to the learning process that reduces <b>overfitting</b> (high training accuracy but low test accuracy) so the model generalises to unseen data. CNNs have millions of parameters and are often trained on limited images, so they overfit easily.</p>
<h4>1. Dropout</h4>
<ul>
<li>Each neuron is dropped with probability p (0.5 in FC layers, 0.1–0.3 for conv) in every training iteration; all neurons are used at test time.</li>
<li>Prevents co-adaptation; acts like an ensemble of many thinner networks.</li>
<li>Inverted dropout scales kept activations by 1/(1 − p) during training.</li>
</ul>
<h4>2. L2 and L1 regularization (weight penalty)</h4>
<div class="formula">L2: L = L<sub>0</sub> + λ Σ w<sup>2</sup> &nbsp;&nbsp;|&nbsp;&nbsp; L1: L = L<sub>0</sub> + λ Σ |w|</div>
<ul>
<li>L2 (weight decay) keeps weights small → smoother function; update w ← w − η(∂L<sub>0</sub>/∂w + 2λw).</li>
<li>L1 pushes many weights to exactly zero → sparse model.</li>
</ul>
<h4>3. Data augmentation</h4>
<ul>
<li>Create new training images by flips, rotations, random crops, zoom, translation, brightness/colour jitter, noise, cutout.</li>
<li>Very effective for CNNs: teaches invariance; AlexNet used crops, flips and PCA colour jitter.</li>
</ul>
<h4>4. Batch normalisation</h4>
<div class="formula">x̂ = (x − μ<sub>B</sub>) / √(σ<sub>B</sub><sup>2</sup> + ε), &nbsp; y = γ x̂ + β</div>
<ul><li>Stabilises and speeds up training; mini-batch noise gives a mild regularising effect.</li></ul>
<h4>5. Early stopping</h4>
<ul><li>Monitor validation loss; stop when it starts increasing and keep the best weights.</li></ul>
<h4>6. Architectural regularisers</h4>
<ul><li>Parameter sharing, pooling and global average pooling (instead of big FC layers) reduce parameters.</li></ul>
<h4>Comparison</h4>
<table>
<tr><th>Technique</th><th>Acts on</th><th>Main effect</th></tr>
<tr><td>Dropout</td><td>Activations</td><td>No co-adaptation, ensemble effect</td></tr>
<tr><td>L2 / L1</td><td>Weights (loss)</td><td>Small / sparse weights</td></tr>
<tr><td>Data augmentation</td><td>Data</td><td>More, varied samples</td></tr>
<tr><td>Batch norm</td><td>Layer inputs</td><td>Stable training, mild noise</td></tr>
<tr><td>Early stopping</td><td>Training time</td><td>Stops before memorising</td></tr>
</table>
<p><b>Example:</b> A leaf-disease CNN trained on 2,000 photos reaches 99% train but 75% test accuracy; adding flips/rotations, dropout 0.5 and early stopping brings test accuracy close to 90%.</p>
<p><b>Conclusion:</b> Regularization trades a little training accuracy for much better generalisation; in practice CNNs combine augmentation, weight decay, batch-norm and dropout.</p>`,
  hi: `<p><b>Definition:</b> <b>Regularization</b> = koi bhi tarika jo <b>overfitting</b> kam kare. Overfitting matlab model ne training data ka ratta maar liya (train pe 99%, test pe kam). CNN mein crore parameters hote hain aur images limited, isliye ratta maarna aasaan hai.</p>
<h4>1. Dropout</h4>
<ul>
<li>Har training step mein neurons ko probability p (FC mein 0.5) se random band karo; test pe sab on.</li>
<li>Koi neuron doosre pe depend nahi karta; kai chhote networks ka ensemble jaisa.</li>
<li>Inverted dropout: bache hue activations ko 1/(1 − p) se scale karo.</li>
</ul>
<h4>2. L2 aur L1</h4>
<div class="formula">L2: L = L<sub>0</sub> + λ Σ w<sup>2</sup> &nbsp;&nbsp;|&nbsp;&nbsp; L1: L = L<sub>0</sub> + λ Σ |w|</div>
<ul>
<li>L2 (weight decay): bade weights pe penalty → smooth model.</li>
<li>L1: kai weights bilkul zero → sparse model.</li>
</ul>
<h4>3. Data augmentation</h4>
<ul><li>Photo ko flip, rotate, crop, zoom, brightness change karke naye samples – CNN ke liye sabse powerful trick.</li></ul>
<h4>4. Batch normalisation</h4>
<div class="formula">x̂ = (x − μ<sub>B</sub>) / √(σ<sub>B</sub><sup>2</sup> + ε), &nbsp; y = γ x̂ + β</div>
<ul><li>Har layer ka input normalise – training stable aur fast, thoda regularising noise bhi.</li></ul>
<h4>5. Early stopping</h4>
<ul><li>Validation loss badhne lage toh training rok do, best weights rakh lo.</li></ul>
<h4>6. Architecture se</h4>
<ul><li>Parameter sharing, pooling, global average pooling – kam parameters, kam ratta.</li></ul>
<table>
<tr><th>Technique</th><th>Kis pe kaam</th><th>Asar</th></tr>
<tr><td>Dropout</td><td>Activations</td><td>Ensemble effect</td></tr>
<tr><td>L2 / L1</td><td>Weights</td><td>Chhote / sparse weights</td></tr>
<tr><td>Augmentation</td><td>Data</td><td>Zyada variety</td></tr>
<tr><td>Batch norm</td><td>Layer input</td><td>Stable training</td></tr>
<tr><td>Early stopping</td><td>Training time</td><td>Ratte se pehle stop</td></tr>
</table>
<p><b>Desi example:</b> Board exam ki taiyari – sirf ek guide ka ratta (overfitting) mat maaro; alag-alag publishers ke sawaal (augmentation), kabhi bina notes ke practice (dropout), aur jab mock test score girne lage toh ruk ke revise (early stopping).</p>
<p><b>Conclusion:</b> Regularization thodi training accuracy deke bahut behtar generalisation deta hai; practice mein augmentation + weight decay + BN + dropout saath use hote hain.</p>`,
  keys: ["overfitting", "generalisation", "dropout", "L2 weight decay λΣw²", "L1 sparsity", "data augmentation", "batch normalisation", "early stopping", "validation loss"],
  draw: "Train vs validation loss curve with the early-stopping point marked; optionally network before/after dropout.",
  fig: "unit3.html#q4",
  num: false
},
{
  id: "U3-06",
  unit: 3,
  topic: "Regularization in CNNs",
  q: "Explain how dropout can be used to prevent overfitting in deep networks. Provide an example.",
  alt: [
    "What is dropout? How does it work during training and testing?",
    "Explain inverted dropout with a numerical example.",
    "Why does dropout act like an ensemble of networks?"
  ],
  marks: [2, 4],
  priority: "must",
  prob: 80,
  diff: 3,
  pyq: ["8AID 2025 B6", "7CAI 2025 A10"],
  why: "Direct 4-marker in 8AID 2025 B6; also the standard answer for 7CAI 2025 A10.",
  short: "Dropout randomly switches off neurons with probability p during training so they cannot co-adapt; all neurons are used at test time, reducing overfitting.",
  en: `<p><b>Definition:</b> <b>Dropout</b> (Srivastava, Hinton et al., 2014) is a regularization technique in which, during each training iteration, every neuron in a layer is temporarily removed with probability <b>p</b> (the dropout rate), along with its connections. At test time no neuron is dropped.</p>
<h4>How it prevents overfitting</h4>
<ul>
<li><b>No co-adaptation:</b> a neuron cannot rely on specific other neurons being present, so each learns robust, independently useful features.</li>
<li><b>Ensemble effect:</b> each mini-batch trains a different thinned sub-network; testing with the full network approximates averaging 2<sup>n</sup> such networks.</li>
<li><b>Noise injection:</b> random masking adds noise, which discourages memorising training images.</li>
</ul>
<h4>Steps (inverted dropout)</h4>
<ol>
<li>For a layer with activations a, sample a mask m with m<sub>i</sub> ~ Bernoulli(1 − p).</li>
<li>Compute ã = (a ⊙ m) / (1 − p) during training.</li>
<li>Backpropagate only through kept neurons.</li>
<li>At test time use a directly (no mask, no scaling).</li>
</ol>
<div class="formula">ã = (a ⊙ m) / (1 − p), &nbsp; m<sub>i</sub> ~ Bernoulli(1 − p)</div>
<h4>Worked example (p = 0.5)</h4>
<pre>a       = [2, 4, 6, 8]
mask m  = [1, 0, 1, 0]
a ⊙ m   = [2, 0, 6, 0]
÷ (1 − 0.5) → [4, 0, 12, 0]   (training)
Test    = [2, 4, 6, 8]        (all neurons, no scaling)</pre>
<h4>Practical points</h4>
<ul>
<li>p ≈ 0.5 for FC layers (AlexNet FC6, FC7), 0.1–0.3 or spatial dropout for conv layers.</li>
<li>Training takes longer (noisier gradients); often less needed when batch-norm is used (ResNet uses none).</li>
</ul>
<p><b>Example:</b> A digit classifier with 98% train / 90% test accuracy reached ~97% test accuracy after adding dropout 0.5 before the output layer, because the gap between train and test shrank.</p>
<p><b>Conclusion:</b> Dropout is a cheap, effective regulariser that forces redundancy and approximates an ensemble.</p>`,
  hi: `<p><b>Definition:</b> <b>Dropout</b> ek regularization trick hai: har training step mein layer ke har neuron ko probability <b>p</b> se kuch der ke liye "band" kar do (uske connections ke saath). Test ke time koi neuron band nahi hota.</p>
<h4>Overfitting kaise rokta hai</h4>
<ul>
<li><b>Co-adaptation nahi:</b> koi neuron kisi ek doosre neuron ke bharose nahi reh sakta, sab khud strong features seekhte hain.</li>
<li><b>Ensemble effect:</b> har step mein alag chhota network train hota hai; test pe poora network = sab ka average.</li>
<li><b>Noise:</b> random masking se ratta maarna mushkil.</li>
</ul>
<h4>Steps (inverted dropout)</h4>
<ol>
<li>Mask m banao: har neuron 1 − p chance se on.</li>
<li>Training: ã = (a ⊙ m) / (1 − p).</li>
<li>Backprop sirf on neurons se.</li>
<li>Test: seedha a use karo, na mask na scaling.</li>
</ol>
<div class="formula">ã = (a ⊙ m) / (1 − p), &nbsp; m<sub>i</sub> ~ Bernoulli(1 − p)</div>
<h4>Example (p = 0.5)</h4>
<pre>a       = [2, 4, 6, 8]
mask m  = [1, 0, 1, 0]
a ⊙ m   = [2, 0, 6, 0]
÷ 0.5   → [4, 0, 12, 0]   (training)
Test    = [2, 4, 6, 8]</pre>
<h4>Practical baatein</h4>
<ul>
<li>FC layers mein p ≈ 0.5 (AlexNet), conv mein 0.1–0.3.</li>
<li>Training thodi slow; batch-norm ke saath aksar kam zarurat (ResNet mein dropout nahi).</li>
</ul>
<p><b>Desi example:</b> Gully cricket team mein captain har practice mein 2–3 star players ko random bench pe bitha deta hai. Baaki sab batting-bowling dono seekh jaate hain. Final match mein poori team khelti hai aur kisi ek pe depend nahi rehti.</p>
<p><b>Conclusion:</b> Dropout sasta aur asardaar regulariser hai jo redundancy laata hai aur ensemble jaisa kaam karta hai.</p>`,
  keys: ["drop probability p", "co-adaptation", "ensemble of thinned networks", "Bernoulli mask", "inverted dropout 1/(1−p)", "test time all neurons"],
  draw: "Two small networks side by side: (a) full network, (b) same network with crossed-out neurons after dropout p = 0.5.",
  fig: "unit3.html#q4",
  num: false
},
{
  id: "U3-07",
  unit: 3,
  topic: "Applications of CNNs",
  q: "What are the applications of CNNs? Explain how deep networks are used in computer vision with a real-world example.",
  alt: [
    "Mention any one major use of deep learning in computer vision.",
    "List applications of CNNs.",
    "Explain CNN applications: image classification, object detection, segmentation, face recognition, medical imaging, self-driving cars.",
    "Explain the use of deep networks in computer vision tasks with a real-world example."
  ],
  marks: [2, 4, 10],
  priority: "must",
  prob: 88,
  diff: 2,
  pyq: ["8AID 2024 A8", "7CAI 2025 A6", "7CAI 2025 B6", "8AID 2025 C1"],
  why: "Applications asked in all three papers (2-mark and 4-mark forms, and half of 8AID C1).",
  short: "CNN applications: image classification, object detection (YOLO), segmentation (U-Net), face recognition, medical image diagnosis, self-driving cars and OCR.",
  en: `<p><b>Introduction:</b> CNNs learn spatial features directly from pixels, so they power almost every modern <b>computer vision (CV)</b> system. The backbone (e.g. ResNet) extracts features; a task-specific head produces the output.</p>
<h4>1. Image classification</h4>
<ul><li>Assign one label to an image. Example: ImageNet (AlexNet, VGG, ResNet), plant-disease detection apps such as Plantix that identify crop disease from a leaf photo.</li></ul>
<h4>2. Object detection</h4>
<ul><li>Find what and where: class + bounding box. Models: R-CNN family (Faster R-CNN), YOLO, SSD. Example: CCTV/traffic cameras detecting helmet-less riders, number plates, crowds.</li></ul>
<h4>3. Image segmentation</h4>
<ul><li>Semantic segmentation labels every pixel (U-Net, FCN, DeepLab); instance segmentation separates objects (Mask R-CNN). Example: tumour boundary in MRI, road/sky/car pixels for autonomous driving.</li></ul>
<h4>4. Face recognition and verification</h4>
<ul><li>CNN maps a face to an embedding; distance between embeddings decides identity (FaceNet, DeepFace). Example: phone face-unlock, DigiYatra airport boarding, attendance systems.</li></ul>
<h4>5. Medical imaging</h4>
<ul><li>Pneumonia/TB from chest X-rays, diabetic retinopathy from retina scans, skin-cancer classification, cancer cells in histopathology slides.</li></ul>
<h4>6. Self-driving cars and ADAS</h4>
<ul><li>Lane detection, pedestrian and vehicle detection, traffic-sign recognition from camera frames in real time (Tesla Autopilot, Waymo).</li></ul>
<h4>7. Other applications</h4>
<ul>
<li>OCR and handwriting recognition (MNIST digits, Google Lens).</li>
<li>Image captioning (CNN encoder + LSTM/Transformer decoder).</li>
<li>Pose estimation, gesture recognition, video analysis, satellite imagery (crop/flood mapping).</li>
<li>Style transfer, super-resolution, image generation (GAN discriminators/generators).</li>
<li>Non-image: 1-D CNNs for audio spectrograms and text classification.</li>
</ul>
<h4>Real-world example in detail: chest X-ray screening</h4>
<ol>
<li>Collect labelled X-rays (normal / pneumonia).</li>
<li>Pre-process: resize to 224×224, normalise, augment (small rotations, flips).</li>
<li>Fine-tune an ImageNet-pretrained ResNet-50 (transfer learning) with a 2-class softmax.</li>
<li>Evaluate with accuracy, sensitivity, specificity, AUC; Grad-CAM heat-maps show where the model looks.</li>
<li>Deploy as a triage tool so radiologists see likely-positive cases first.</li>
</ol>
<table>
<tr><th>Task</th><th>Output</th><th>Typical model</th></tr>
<tr><td>Classification</td><td>One label</td><td>ResNet, VGG</td></tr>
<tr><td>Detection</td><td>Boxes + labels</td><td>YOLO, Faster R-CNN</td></tr>
<tr><td>Segmentation</td><td>Label per pixel</td><td>U-Net, Mask R-CNN</td></tr>
<tr><td>Face recognition</td><td>Identity embedding</td><td>FaceNet</td></tr>
</table>
<p><b>Limitations:</b> needs large labelled datasets, can be fooled by adversarial noise, may carry dataset bias.</p>
<p><b>Conclusion:</b> From phone cameras to hospitals to cars, CNNs are the standard engine of computer vision.</p>`,
  hi: `<p><b>Intro:</b> CNN pixels se seedha features seekhta hai, isliye aaj ka lagbhag har <b>computer vision</b> system CNN pe chalta hai. Backbone (jaise ResNet) features nikalta hai, upar task ke hisaab se "head" lagta hai.</p>
<h4>1. Image classification</h4>
<ul><li>Poori photo ko ek label. Jaise Plantix app – patte ki photo se fasal ki bimari batana.</li></ul>
<h4>2. Object detection</h4>
<ul><li>Kya hai aur kahan hai – box + label. YOLO, Faster R-CNN. Jaise traffic camera bina helmet wale rider ya number plate pakadta hai.</li></ul>
<h4>3. Segmentation</h4>
<ul><li>Har pixel ka label – U-Net se MRI mein tumour ka exact border; self-driving mein road/gaadi/aasmaan pixels.</li></ul>
<h4>4. Face recognition</h4>
<ul><li>Chehre ko ek number-vector (embedding) mein badlo, distance se pehchaan. Phone face-unlock, DigiYatra airport entry, attendance.</li></ul>
<h4>5. Medical imaging</h4>
<ul><li>X-ray se pneumonia/TB, aankh ke scan se diabetic retinopathy, skin cancer, slides mein cancer cells.</li></ul>
<h4>6. Self-driving cars</h4>
<ul><li>Lane, pedestrian, gaadi, traffic sign – real time camera frames se (Tesla, Waymo).</li></ul>
<h4>7. Aur bhi</h4>
<ul>
<li>OCR – handwriting, Google Lens se text copy.</li>
<li>Image captioning (CNN + LSTM).</li>
<li>Pose estimation, satellite images se fasal/baadh mapping.</li>
<li>Style transfer, super-resolution, GANs.</li>
<li>Audio spectrogram aur text ke liye 1-D CNN.</li>
</ul>
<h4>Real-world example: chest X-ray screening</h4>
<ol>
<li>Labelled X-rays (normal/pneumonia) jama karo.</li>
<li>224×224 resize, normalise, thoda rotate/flip augmentation.</li>
<li>ImageNet pe trained ResNet-50 ko fine-tune karo (transfer learning), 2-class softmax.</li>
<li>Accuracy, sensitivity, AUC se check; Grad-CAM se dekho model kahan dekh raha hai.</li>
<li>Hospital mein triage tool – doctor pehle risky cases dekhe.</li>
</ol>
<table>
<tr><th>Task</th><th>Output</th><th>Model</th></tr>
<tr><td>Classification</td><td>Ek label</td><td>ResNet</td></tr>
<tr><td>Detection</td><td>Box + label</td><td>YOLO</td></tr>
<tr><td>Segmentation</td><td>Har pixel label</td><td>U-Net</td></tr>
<tr><td>Face recognition</td><td>Embedding</td><td>FaceNet</td></tr>
</table>
<p><b>Kamiyan:</b> bahut labelled data chahiye, adversarial noise se dhokha kha sakta hai, data bias.</p>
<p><b>Conclusion:</b> Phone camera se hospital aur gaadi tak – CNN computer vision ka engine hai.</p>`,
  keys: ["image classification", "object detection (YOLO, Faster R-CNN)", "semantic segmentation (U-Net)", "face recognition (FaceNet)", "medical imaging", "self-driving cars", "OCR", "image captioning", "transfer learning"],
  draw: "Three small sketches of the same street photo: label 'car' (classification), boxes (detection), coloured pixel mask (segmentation).",
  fig: "unit3.html#q1",
  num: false
},
{
  id: "U3-08",
  unit: 3,
  topic: "Popular CNN architectures",
  q: "Explain the ResNet architecture in detail. How do residual (skip) connections solve the problem of training very deep networks?",
  alt: [
    "What is a residual block? Explain with a diagram.",
    "What is the degradation problem and how does ResNet solve it?",
    "Explain skip connections and the bottleneck block in ResNet."
  ],
  marks: [4, 10],
  priority: "high",
  prob: 65,
  diff: 4,
  pyq: ["8AID 2025 C3"],
  why: "ResNet is a named syllabus item and half of 8AID 2025 C3; a standalone ResNet question is a likely variant.",
  short: "ResNet uses residual blocks y = F(x) + x; identity skip connections let gradients flow directly, solving degradation and enabling 152-layer networks.",
  en: `<p><b>Definition:</b> <b>ResNet (Residual Network)</b>, proposed by Kaiming He et al. (Microsoft Research, 2015), is a very deep CNN built from <b>residual blocks</b> with <b>skip (shortcut) connections</b>. It won ILSVRC 2015 classification (3.57% top-5 error) and the 2015 COCO detection and segmentation tasks.</p>
<h4>1. Problem it solves</h4>
<ul>
<li><b>Vanishing/exploding gradients:</b> gradients shrink when multiplied through many layers.</li>
<li><b>Degradation problem:</b> a 56-layer plain network had <i>higher training error</i> than a 20-layer one on CIFAR-10. This is not overfitting; deep plain nets are simply hard to optimise. In theory a deeper net could copy the shallow net and set extra layers to identity, but solvers fail to learn identity.</li>
</ul>
<h4>2. Residual learning</h4>
<p>Instead of learning the desired mapping H(x) directly, stacked layers learn the residual F(x) = H(x) − x, and the block outputs:</p>
<div class="formula">y = F(x, {W<sub>i</sub>}) + x &nbsp;&nbsp; (projection when shapes differ: y = F(x) + W<sub>s</sub>x)</div>
<div class="formula">∂L/∂x = ∂L/∂y · (∂F/∂x + 1)</div>
<ul>
<li>If identity is optimal, the block just pushes F(x) → 0, which is easy.</li>
<li>The "+1" term gives gradients a direct highway back to early layers.</li>
</ul>
<h4>3. Building blocks</h4>
<ul>
<li><b>Basic block</b> (ResNet-18/34): 3×3 conv → BN → ReLU → 3×3 conv → BN, add x, ReLU.</li>
<li><b>Bottleneck block</b> (ResNet-50/101/152): 1×1 conv (reduce, e.g. 256→64) → 3×3 conv (64) → 1×1 conv (restore to 256), add x. Cuts computation.</li>
<li>Shortcut is identity (no parameters) or a 1×1 conv with stride 2 when size/channels change.</li>
</ul>
<h4>4. Overall architecture (ResNet-34/50)</h4>
<ol>
<li>7×7 conv, 64 filters, stride 2 → 3×3 max-pool, stride 2 (224 → 56).</li>
<li>Four stages of residual blocks (conv2_x … conv5_x) with 64, 128, 256, 512 base filters; the spatial size halves (56 → 28 → 14 → 7) while channels double.</li>
<li>Global average pooling → one FC layer of 1000 → softmax.</li>
</ol>
<table>
<tr><th>Model</th><th>Layers</th><th>Parameters</th></tr>
<tr><td>ResNet-18</td><td>18</td><td>~11.7 M</td></tr>
<tr><td>ResNet-34</td><td>34</td><td>~21.8 M</td></tr>
<tr><td>ResNet-50</td><td>50 (bottleneck)</td><td>~25.6 M</td></tr>
<tr><td>ResNet-152</td><td>152</td><td>~60 M</td></tr>
</table>
<h4>5. Advantages</h4>
<ul>
<li>Trains networks with 100+ layers (even 1000+ on CIFAR); deeper → better accuracy.</li>
<li>ResNet-152 has fewer FLOPs (~11.3 G) than VGG-19 (~19.6 G).</li>
<li>Standard backbone for detection (Faster R-CNN), segmentation and transfer learning.</li>
</ul>
<h4>6. Limitations</h4>
<ul><li>Very deep variants are slow at inference; many blocks contribute little (redundancy).</li></ul>
<p><b>Conclusion:</b> By learning residuals and adding identity shortcuts, ResNet removed the depth barrier and became the default CNN backbone.</p>`,
  hi: `<p><b>Definition:</b> <b>ResNet</b> (Kaiming He et al., Microsoft, 2015) ek bahut gehra CNN hai jo <b>residual blocks</b> aur <b>skip connections</b> se bana hai. ILSVRC 2015 jeeta – top-5 error sirf 3.57%.</p>
<h4>1. Problem kya thi</h4>
<ul>
<li><b>Vanishing gradient:</b> bahut layers se guzarte-guzarte gradient chhota hokar khatam.</li>
<li><b>Degradation:</b> 56-layer plain network ka <i>training</i> error 20-layer se zyada tha. Yeh overfitting nahi – gehra network optimise hi nahi ho pa raha tha. Extra layers ko bas "identity" (kuch mat badlo) seekhna tha, par woh bhi nahi seekh paate the.</li>
</ul>
<h4>2. Residual learning</h4>
<p>Layers seedha H(x) nahi seekhti, sirf farak F(x) = H(x) − x seekhti hain, aur output:</p>
<div class="formula">y = F(x, {W<sub>i</sub>}) + x &nbsp;&nbsp; (shape alag ho toh y = F(x) + W<sub>s</sub>x)</div>
<div class="formula">∂L/∂x = ∂L/∂y · (∂F/∂x + 1)</div>
<ul>
<li>Agar identity hi best hai toh F(x) = 0 seekhna aasaan.</li>
<li>"+1" ki wajah se gradient ka seedha highway – peeche tak pahunchta hai.</li>
</ul>
<h4>3. Blocks</h4>
<ul>
<li><b>Basic block</b> (ResNet-18/34): 3×3 conv → BN → ReLU → 3×3 conv → BN → +x → ReLU.</li>
<li><b>Bottleneck</b> (ResNet-50+): 1×1 (channels 256→64 kam) → 3×3 → 1×1 (wapas 256). Computation bachta hai.</li>
<li>Shortcut: identity (zero params) ya size badle toh 1×1 conv stride 2.</li>
</ul>
<h4>4. Poora architecture</h4>
<ol>
<li>7×7 conv, 64 filters, stride 2 → 3×3 max-pool (224 → 56).</li>
<li>Chaar stages: 64, 128, 256, 512 filters; size aadha (56 → 28 → 14 → 7), channels double.</li>
<li>Global average pooling → ek FC 1000 → softmax.</li>
</ol>
<table>
<tr><th>Model</th><th>Layers</th><th>Params</th></tr>
<tr><td>ResNet-18</td><td>18</td><td>~11.7 M</td></tr>
<tr><td>ResNet-34</td><td>34</td><td>~21.8 M</td></tr>
<tr><td>ResNet-50</td><td>50</td><td>~25.6 M</td></tr>
<tr><td>ResNet-152</td><td>152</td><td>~60 M</td></tr>
</table>
<h4>5. Fayde</h4>
<ul>
<li>100+ layers train ho jaati hain, gehra = zyada accurate.</li>
<li>ResNet-152 ke FLOPs (~11.3 G) VGG-19 (~19.6 G) se kam.</li>
<li>Detection, segmentation, transfer learning sab ka default backbone.</li>
</ul>
<h4>6. Kami</h4>
<ul><li>Bahut gehre version inference mein slow; kai blocks kam kaam ke.</li></ul>
<p><b>Desi example:</b> School mein naya teacher (layer) poora syllabus dobara nahi padhata – sirf "jo pichhle teacher ne chhoda, woh correction" padhata hai (residual). Aur principal ka direct notice (skip connection) har class tak seedha pahunchta hai, beech mein kho nahi jaata.</p>
<p><b>Conclusion:</b> Residual + identity shortcut ne depth ki deewar tod di; ResNet aaj ka default CNN backbone hai.</p>`,
  keys: ["residual block", "skip/identity connection", "y = F(x) + x", "degradation problem", "vanishing gradient", "bottleneck 1×1–3×3–1×1", "batch normalisation", "global average pooling", "3.57% top-5", "152 layers"],
  draw: "Residual block: x → weight layer → ReLU → weight layer → (+) with curved identity arrow from x → ReLU; optionally the bottleneck 1×1/3×3/1×1 version.",
  fig: "unit3.html#q2",
  num: false
},
{
  id: "U3-09",
  unit: 3,
  topic: "Motivation for CNNs",
  q: "What is the motivation behind CNNs? Explain sparse interactions, parameter sharing and equivariant representations.",
  alt: [
    "Why are CNNs preferred over MLPs for image data?",
    "Explain the three key ideas that motivate convolutional networks.",
    "What is meant by sparse connectivity (local receptive field) in CNNs?"
  ],
  marks: [2, 4, 10],
  priority: "high",
  prob: 58,
  diff: 3,
  pyq: [],
  why: "'Motivation' is a named syllabus sub-topic (never asked directly yet, so due); overlaps with parameter-sharing PYQs.",
  short: "CNNs are motivated by sparse interactions (local filters), parameter sharing (reused weights) and translation equivariance, giving far fewer parameters and spatial awareness.",
  en: `<p><b>Introduction:</b> A fully connected MLP on a 224×224×3 image has 150,528 inputs; a single hidden layer of 1000 neurons already needs about 150 million weights, and flattening destroys the 2-D neighbourhood structure. Goodfellow et al. give three ideas that motivate convolution.</p>
<h4>1. Sparse interactions (sparse connectivity / local receptive field)</h4>
<ul>
<li>Each output unit is connected only to a small local patch (kernel size k, e.g. 3×3) instead of all inputs.</li>
<li>With m inputs and n outputs, an FC layer needs m × n weights and O(m × n) operations; a conv layer needs only k × n connections and O(k × n) operations with k ≪ m.</li>
<li>Deeper layers still see a large region indirectly (growing receptive field).</li>
</ul>
<h4>2. Parameter sharing (tied weights)</h4>
<ul>
<li>The same kernel is used at every position, so the layer stores only k parameters per filter instead of m × n.</li>
<li>Reduces memory and overfitting; a useful feature (edge) is learned once and used everywhere.</li>
</ul>
<h4>3. Equivariant representations</h4>
<ul>
<li>A function f is equivariant to g if f(g(x)) = g(f(x)).</li>
<li>Convolution is equivariant to <b>translation</b>: shifting the image shifts the feature map by the same amount.</li>
<li>Pooling adds approximate <b>invariance</b> to small translations. Convolution is not naturally equivariant to rotation or scaling.</li>
</ul>
<div class="formula">Translation equivariance: conv(shift(x)) = shift(conv(x))</div>
<h4>4. Other motivations</h4>
<ul>
<li>Preserves spatial structure; learns a feature hierarchy automatically (no hand-crafted SIFT/HOG).</li>
<li>Handles inputs of variable size.</li>
<li>Biologically inspired: Hubel and Wiesel's simple and complex cells in the visual cortex.</li>
</ul>
<table>
<tr><th>Idea</th><th>Benefit</th></tr>
<tr><td>Sparse interactions</td><td>Fewer connections, less computation</td></tr>
<tr><td>Parameter sharing</td><td>Fewer parameters, less memory</td></tr>
<tr><td>Equivariance</td><td>Detect features anywhere in the image</td></tr>
</table>
<p><b>Example:</b> For a 320×280 image, a vertical-edge detector by convolution with a 2-element kernel needs 2 parameters and about 267,960 operations; the equivalent FC matrix would need over 8 billion entries.</p>
<p><b>Conclusion:</b> Sparse interactions, parameter sharing and equivariance make CNNs efficient and naturally suited to images.</p>`,
  hi: `<p><b>Intro:</b> MLP ko 224×224×3 photo do toh 1,50,528 inputs; sirf 1000 neurons ki ek hidden layer = ~15 crore weights! Aur photo ko flatten karte hi "kaun pixel kiske paas hai" yeh info kho jaati hai. Isliye CNN aaya – teen main ideas (Goodfellow book) ke saath.</p>
<h4>1. Sparse interactions (local connectivity)</h4>
<ul>
<li>Har output neuron sirf ek chhote patch (3×3) se juda hota hai, poori image se nahi.</li>
<li>FC: m × n weights; conv: sirf k × n connections, k bahut chhota.</li>
<li>Gehri layers indirectly bada area dekhti hain (receptive field badhta hai).</li>
</ul>
<h4>2. Parameter sharing</h4>
<ul>
<li>Ek hi kernel har jagah use – har filter ke sirf k parameters.</li>
<li>Kam memory, kam overfitting; edge detector ek baar seekho, har jagah use karo.</li>
</ul>
<h4>3. Equivariance</h4>
<ul>
<li>f(g(x)) = g(f(x)) – pehle shift karo phir conv, ya pehle conv phir shift, result same.</li>
<li>Photo mein billi right khiski toh feature map mein bhi uska signal right khiskega.</li>
<li>Pooling se chhoti shift ke liye <b>invariance</b> bhi milti hai. Rotation/scale ke liye conv khud se equivariant nahi.</li>
</ul>
<div class="formula">conv(shift(x)) = shift(conv(x))</div>
<h4>4. Aur kaaran</h4>
<ul>
<li>2-D structure bacha rehta hai; features ki hierarchy khud seekhta hai.</li>
<li>Alag-alag size ki images chal jaati hain.</li>
<li>Dimaag ke visual cortex (Hubel–Wiesel) se inspired.</li>
</ul>
<table>
<tr><th>Idea</th><th>Fayda</th></tr>
<tr><td>Sparse interactions</td><td>Kam connections, kam calculation</td></tr>
<tr><td>Parameter sharing</td><td>Kam parameters</td></tr>
<tr><td>Equivariance</td><td>Feature kahin bhi ho, mil jaaye</td></tr>
</table>
<p><b>Desi example:</b> Akhbaar padhte waqt aankh ek baar mein kuch shabd dekhti hai (local), har line pe wahi padhne ka tareeka (sharing), aur "Cricket" shabd page pe upar ho ya neeche, pehchaan lete ho (equivariance).</p>
<p><b>Conclusion:</b> Yeh teen ideas CNN ko efficient aur images ke liye perfect banate hain.</p>`,
  keys: ["sparse interactions", "local receptive field", "parameter sharing", "translation equivariance f(g(x)) = g(f(x))", "invariance via pooling", "fewer parameters", "spatial structure", "Hubel and Wiesel"],
  draw: "Left: FC layer with every input connected to every output; right: conv layer where each output connects to only 3 neighbouring inputs with the same coloured (shared) weights.",
  fig: "unit3.html#q5",
  num: false
},
{
  id: "U3-10",
  unit: 3,
  topic: "Filters and convolution layer",
  q: "Explain the convolution operation in a CNN. What are filters (kernels) and feature maps?",
  alt: [
    "What is a filter/kernel in a CNN?",
    "What is a feature map (activation map)?",
    "Explain the convolution layer with an example.",
    "Perform convolution of a given input with a given kernel (numerical)."
  ],
  marks: [2, 4],
  priority: "high",
  prob: 55,
  diff: 3,
  pyq: [],
  why: "Filters/kernels is a named syllabus item and the basis of every CNN question; a likely Part A or Part B variant.",
  short: "A filter is a small learnable weight matrix sliding over the input computing dot products; its output, showing where a pattern occurs, is a feature map.",
  en: `<p><b>Convolution operation:</b> A small weight matrix (filter/kernel) slides over the input; at each position the element-wise products of filter and the covered patch are summed and a bias added. (CNN libraries actually compute cross-correlation, i.e. without flipping the kernel, but still call it convolution.)</p>
<div class="formula">S(i, j) = Σ<sub>m</sub> Σ<sub>n</sub> I(i + m, j + n) · K(m, n) + b</div>
<h4>Filter / kernel</h4>
<ul>
<li>A small learnable matrix of size f × f × C (depth equals input channels), e.g. 3×3×3 for RGB.</li>
<li>Each filter detects one pattern: edges, corners, colours in early layers; eyes, wheels in deeper ones.</li>
<li>Weights are learned by backpropagation, not hand-designed (classic hand-made ones: Sobel, sharpen).</li>
</ul>
<h4>Feature map (activation map)</h4>
<ul>
<li>The 2-D output of one filter over the whole input; high values show where the pattern occurs.</li>
<li>K filters → K feature maps stacked as the output depth.</li>
</ul>
<h4>Worked example (4×4 input, 3×3 vertical-edge filter, s = 1, p = 0)</h4>
<pre>Input I            Filter K
3 1 0 2            1 0 -1
2 0 1 1            1 0 -1
1 3 2 0            1 0 -1
0 1 1 4
Output size = (4 - 3)/1 + 1 = 2
O(1,1) = (3+2+1) - (0+1+2) = 3
O(1,2) = (1+0+3) - (2+1+0) = 1
O(2,1) = (2+1+0) - (1+2+1) = -1
O(2,2) = (0+3+1) - (1+0+4) = -1
Feature map = [3 1; -1 -1] → ReLU → [3 1; 0 0]</pre>
<h4>Parameters of a conv layer</h4>
<div class="formula">Params = K × (f × f × C + 1)</div>
<p>e.g. 10 filters of 3×3 on RGB: 10 × (27 + 1) = 280.</p>
<p><b>Conclusion:</b> Filters are learnable pattern detectors; convolving them over the input produces feature maps that the next layers build upon.</p>`,
  hi: `<p><b>Convolution:</b> Ek chhota weight matrix (filter/kernel) image ke upar slide hota hai; har jagah filter aur patch ke numbers ko multiply karke jodo, bias add karo – ek number mila. (Libraries actually cross-correlation karti hain – kernel flip nahi karti – par naam convolution hi hai.)</p>
<div class="formula">S(i, j) = Σ<sub>m</sub> Σ<sub>n</sub> I(i + m, j + n) · K(m, n) + b</div>
<h4>Filter / kernel</h4>
<ul>
<li>f × f × C size ka chhota learnable matrix – RGB ke liye 3×3×3.</li>
<li>Har filter ek pattern pakadta hai: shuru mein edges/colour, gehrai mein aankh, pahiya.</li>
<li>Weights backprop se khud seekhe jaate hain (purane hand-made: Sobel, sharpen).</li>
</ul>
<h4>Feature map</h4>
<ul>
<li>Ek filter ka poori image pe output – jahan value badi, wahan pattern hai.</li>
<li>K filters → K feature maps, depth mein stack.</li>
</ul>
<h4>Solved example</h4>
<pre>Input I            Filter K
3 1 0 2            1 0 -1
2 0 1 1            1 0 -1
1 3 2 0            1 0 -1
0 1 1 4
Size = (4 - 3)/1 + 1 = 2
O(1,1) = (3+2+1) - (0+1+2) = 3
O(1,2) = (1+0+3) - (2+1+0) = 1
O(2,1) = (2+1+0) - (1+2+1) = -1
O(2,2) = (0+3+1) - (1+0+4) = -1
Feature map = [3 1; -1 -1] → ReLU → [3 1; 0 0]</pre>
<p>Shortcut: is filter ke liye har patch ka (left column ka sum) − (right column ka sum).</p>
<div class="formula">Params = K × (f × f × C + 1)</div>
<p>10 filters 3×3 RGB pe: 10 × 28 = 280.</p>
<p><b>Desi example:</b> Filter = chhoti "jaali" jo aap chawal ke dher pe har jagah rakh ke dekhte ho kankar hai ya nahi. Jahan jahan kankar mila, wahan tick – woh tick wala naksha hi feature map hai.</p>
<p><b>Conclusion:</b> Filters seekhne wale pattern detectors hain, unka output feature map agli layers ka input banta hai.</p>`,
  keys: ["kernel/filter", "sliding window", "dot product + bias", "cross-correlation", "feature map", "depth = input channels", "K × (f×f×C + 1)", "learned by backprop"],
  draw: "4×4 grid with a highlighted 3×3 window, the 3×3 kernel beside it, arrow to one cell of the 2×2 output.",
  fig: "unit3.html#q6",
  num: true
},
{
  id: "U3-11",
  unit: 3,
  topic: "Stride, padding and output size",
  q: "Explain stride and padding in CNNs. Derive and apply the formula for the output size of a convolution layer.",
  alt: [
    "What is padding? Differentiate valid and same padding.",
    "What is stride in a convolution layer?",
    "Calculate the output size of a conv layer for given n, f, p, s (numerical).",
    "Why is zero padding used in CNNs?"
  ],
  marks: [2, 4],
  priority: "high",
  prob: 52,
  diff: 3,
  pyq: [],
  why: "Stride/padding are named syllabus items; output-size calculation is the most natural numerical in this unit.",
  short: "Stride is the step the filter moves; padding adds zeros around the border. Output size = ⌊(n − f + 2p)/s⌋ + 1.",
  en: `<p><b>Stride (s):</b> the number of pixels the filter moves at each step. s = 1 gives dense output; s = 2 roughly halves the width and height (down-sampling without pooling).</p>
<p><b>Padding (p):</b> adding extra border pixels (usually zeros) around the input.</p>
<ul>
<li><b>Valid padding</b> (p = 0): no padding, output shrinks by f − 1.</li>
<li><b>Same padding</b>: p = (f − 1)/2 with s = 1 keeps output size = input size (e.g. p = 1 for 3×3, p = 2 for 5×5).</li>
<li><b>Why pad:</b> prevents the map from shrinking layer after layer, and lets border pixels take part in as many windows as central ones (keeps edge information).</li>
</ul>
<h4>Output-size formula</h4>
<div class="formula">O = ⌊(n − f + 2p) / s⌋ + 1 &nbsp;&nbsp; (apply separately to height and width; depth = number of filters K)</div>
<p><b>Derivation:</b> after padding the input width is n + 2p. The filter's first position covers columns 1…f; each step moves s columns, and the last valid start is at n + 2p − f. Number of positions = ⌊(n + 2p − f)/s⌋ + 1.</p>
<h4>Worked examples</h4>
<pre>1) n = 32, f = 5, p = 0, s = 1 → (32 - 5)/1 + 1 = 28   → 28×28
2) n = 32, f = 5, p = 2, s = 1 → (32 - 5 + 4)/1 + 1 = 32 → 32×32 (same)
3) n = 7,  f = 3, p = 0, s = 2 → (7 - 3)/2 + 1 = 3      → 3×3
4) n = 227, f = 11, p = 0, s = 4 → 216/4 + 1 = 55      (AlexNet Conv1)
5) n = 16, f = 3, p = 1, s = 2 → ⌊15/2⌋ + 1 = 7 + 1 = 8 → 8×8
Pooling uses the same formula: 2×2, s = 2 on 28×28 → (28 - 2)/2 + 1 = 14</pre>
<h4>Full layer example</h4>
<p>Input 32×32×3, 10 filters 5×5, p = 2, s = 1 → 32×32×10; parameters = 10 × (5×5×3 + 1) = 760.</p>
<table>
<tr><th>Setting</th><th>Effect on output</th></tr>
<tr><td>Larger f</td><td>Smaller output, larger receptive field</td></tr>
<tr><td>Larger s</td><td>Smaller output, less computation</td></tr>
<tr><td>Larger p</td><td>Larger output, border info kept</td></tr>
</table>
<p><b>Conclusion:</b> Stride and padding control the spatial size of feature maps; always quote ⌊(n − f + 2p)/s⌋ + 1 with an example.</p>`,
  hi: `<p><b>Stride (s):</b> filter ek baar mein kitne pixel kood ke aage badhta hai. s = 1 – har pixel; s = 2 – output lagbhag aadha.</p>
<p><b>Padding (p):</b> image ke chaaron taraf extra border (zero) lagana.</p>
<ul>
<li><b>Valid</b> (p = 0): padding nahi, output chhota ho jaata hai.</li>
<li><b>Same:</b> p = (f − 1)/2, s = 1 pe output = input size (3×3 ke liye p = 1).</li>
<li><b>Kyun:</b> har layer ke baad photo sikudti na jaaye, aur kinaare ke pixels bhi barabar use hon.</li>
</ul>
<h4>Formula</h4>
<div class="formula">O = ⌊(n − f + 2p) / s⌋ + 1 &nbsp;&nbsp; (height aur width alag-alag; depth = filters K)</div>
<p><b>Derivation:</b> padding ke baad width n + 2p. Filter pehli jagah 1…f pe, har step s aage, aakhri start n + 2p − f pe. Kul positions = ⌊(n + 2p − f)/s⌋ + 1.</p>
<h4>Solved examples</h4>
<pre>1) n = 32, f = 5, p = 0, s = 1 → 28×28
2) n = 32, f = 5, p = 2, s = 1 → 32×32 (same)
3) n = 7,  f = 3, p = 0, s = 2 → (7 - 3)/2 + 1 = 3
4) n = 227, f = 11, s = 4 → 216/4 + 1 = 55 (AlexNet Conv1)
5) n = 16, f = 3, p = 1, s = 2 → ⌊15/2⌋ + 1 = 8
Pooling 2×2, s = 2 on 28×28 → 14</pre>
<p>Poori layer: 32×32×3 input, 10 filters 5×5, p = 2 → 32×32×10; params = 10 × 76 = 760.</p>
<table>
<tr><th>Badlo</th><th>Output pe asar</th></tr>
<tr><td>f bada</td><td>Output chhota</td></tr>
<tr><td>s bada</td><td>Output chhota, fast</td></tr>
<tr><td>p bada</td><td>Output bada, kinaare bache</td></tr>
</table>
<p><b>Desi example:</b> Khet mein beej daalna – har 1 foot pe (stride 1) ya har 2 foot pe (stride 2). Khet ke kinaare mitti ki extra mend (padding) bana do taaki kinaare wali line bhi barabar boyi jaaye.</p>
<p><b>Conclusion:</b> Stride aur padding feature map ka size control karte hain; formula ⌊(n − f + 2p)/s⌋ + 1 hamesha example ke saath likho.</p>`,
  keys: ["stride", "zero padding", "valid padding", "same padding p = (f−1)/2", "⌊(n − f + 2p)/s⌋ + 1", "depth = number of filters", "border information"],
  draw: "5×5 input with a ring of zeros (padding) and a 3×3 window shown at two positions 2 cells apart (stride 2).",
  fig: "unit3.html#q6",
  num: true
},
{
  id: "U3-12",
  unit: 3,
  topic: "Pooling layer",
  q: "What is pooling in CNNs? Explain max pooling, average pooling and global average pooling with an example.",
  alt: [
    "Differentiate max pooling and average pooling.",
    "What is the role of the pooling layer in a CNN?",
    "What is global average pooling and why is it used?",
    "Apply 2×2 max and average pooling on a given 4×4 matrix (numerical)."
  ],
  marks: [2, 4],
  priority: "high",
  prob: 52,
  diff: 2,
  pyq: [],
  why: "Pooling is a named layer in the syllabus and appears inside every CNN-architecture answer; an easy short-answer target.",
  short: "Pooling down-samples feature maps: max pooling keeps the largest value, average pooling the mean, global average pooling one value per channel; no learnable parameters.",
  en: `<p><b>Definition:</b> A <b>pooling layer</b> down-samples each feature map independently by summarising small windows (e.g. 2×2 with stride 2), reducing height and width while keeping the depth.</p>
<h4>Purpose</h4>
<ul>
<li>Reduces spatial size → fewer computations and parameters in later layers.</li>
<li>Gives approximate invariance to small translations/distortions.</li>
<li>Controls overfitting; enlarges the receptive field of later layers.</li>
<li>Has <b>no learnable parameters</b> (only hyper-parameters: window size, stride).</li>
</ul>
<h4>Types</h4>
<ul>
<li><b>Max pooling:</b> takes the maximum in each window; keeps the strongest activation; most common.</li>
<li><b>Average pooling:</b> takes the mean; smoother; used in LeNet.</li>
<li><b>Global average pooling (GAP):</b> averages each whole feature map to one number, e.g. 7×7×512 → 1×1×512. Replaces big FC layers (GoogLeNet, ResNet), cuts parameters and allows any input size.</li>
<li>Global max pooling, and strided convolution as a learnable alternative.</li>
</ul>
<h4>Worked example (2×2, stride 2)</h4>
<pre>Input 4×4          Max-pool      Avg-pool
1 3 | 2 1
4 6 | 5 0          | 6  5 |      | 3.5   2.0  |
----+----          | 7  8 |      | 3.25  2.75 |
3 1 | 1 2
7 2 | 0 8
Max:  6, 5, 7, 8
Avg:  14/4 = 3.5, 8/4 = 2.0, 13/4 = 3.25, 11/4 = 2.75
GAP of the whole 4×4 map = 46/16 = 2.875</pre>
<div class="formula">Output size = ⌊(n − f)/s⌋ + 1 → (4 − 2)/2 + 1 = 2</div>
<table>
<tr><th>Max pooling</th><th>Average pooling</th></tr>
<tr><td>Keeps strongest feature</td><td>Keeps average response</td></tr>
<tr><td>Better for detecting presence of edges/texture</td><td>Smoother, keeps background info</td></tr>
<tr><td>Common in modern CNNs (AlexNet, VGG)</td><td>Older nets (LeNet); GAP at the end of ResNet</td></tr>
</table>
<p><b>Conclusion:</b> Pooling shrinks feature maps cheaply and adds robustness; max pooling inside the network and GAP at the end are the usual choices.</p>`,
  hi: `<p><b>Definition:</b> <b>Pooling layer</b> har feature map ko chhota karti hai – chhote dabbon (2×2, stride 2) ka summary leke. Height-width kam, depth same.</p>
<h4>Kyun</h4>
<ul>
<li>Size kam → aage computation aur parameters kam.</li>
<li>Thoda khisakne/hilne pe bhi same output (translation invariance).</li>
<li>Overfitting kam; aage ki layers bada area dekhti hain.</li>
<li><b>Koi learnable parameter nahi</b> – sirf window size aur stride.</li>
</ul>
<h4>Types</h4>
<ul>
<li><b>Max pooling:</b> dabbe ka sabse bada number – strongest feature.</li>
<li><b>Average pooling:</b> dabbe ka average – smooth; LeNet mein.</li>
<li><b>Global average pooling:</b> poore map ka ek average – 7×7×512 → 1×1×512. Bade FC layers ki jagah (ResNet, GoogLeNet).</li>
<li>Global max pooling; strided conv (seekhne wala alternative).</li>
</ul>
<h4>Solved example</h4>
<pre>Input 4×4          Max-pool      Avg-pool
1 3 | 2 1
4 6 | 5 0          | 6  5 |      | 3.5   2.0  |
----+----          | 7  8 |      | 3.25  2.75 |
3 1 | 1 2
7 2 | 0 8
GAP = 46/16 = 2.875</pre>
<div class="formula">Output size = ⌊(n − f)/s⌋ + 1 → (4 − 2)/2 + 1 = 2</div>
<table>
<tr><th>Max</th><th>Average</th></tr>
<tr><td>Sabse strong feature</td><td>Average response</td></tr>
<tr><td>Edge/texture ki presence</td><td>Smooth, background bhi</td></tr>
<tr><td>AlexNet, VGG</td><td>LeNet; GAP ResNet ke end mein</td></tr>
</table>
<p><b>Desi example:</b> Class ke har bench (2×2 group) se sabse zyada marks wala bachcha monitor bana do – max pooling. Har bench ka average marks note karo – average pooling. Poori class ka ek average – global average pooling.</p>
<p><b>Conclusion:</b> Pooling sasta down-sampling + robustness deta hai; beech mein max-pool, end mein GAP common hai.</p>`,
  keys: ["down-sampling", "max pooling", "average pooling", "global average pooling", "no learnable parameters", "translation invariance", "2×2 stride 2 halves size"],
  draw: "4×4 grid split into four coloured 2×2 blocks with arrows to a 2×2 max-pool output and a 2×2 average-pool output.",
  fig: "unit3.html#q1",
  num: true
},
{
  id: "U3-13",
  unit: 3,
  topic: "CNN vs fully connected network",
  q: "Differentiate between a CNN and a fully connected (feed-forward/MLP) neural network for image tasks.",
  alt: [
    "Why is a fully connected network not suitable for images?",
    "Compare CNN and ANN/MLP.",
    "What are the advantages of CNNs over traditional neural networks?"
  ],
  marks: [2, 4],
  priority: "high",
  prob: 50,
  diff: 2,
  pyq: [],
  why: "Syllabus lists 'CNN vs fully-connected network'; differentiation questions are a favourite Part B format.",
  short: "An MLP connects every input to every neuron and ignores spatial layout; a CNN uses local, shared filters, keeping 2-D structure with far fewer parameters.",
  en: `<p><b>Fully connected network (MLP):</b> every neuron in a layer is connected to every neuron in the next layer; the image must be flattened into a 1-D vector.</p>
<p><b>CNN:</b> uses convolution layers with small, shared, local filters followed by pooling, and only a few FC layers at the end.</p>
<table>
<tr><th>Point</th><th>Fully connected / MLP</th><th>CNN</th></tr>
<tr><td>Connectivity</td><td>Dense: every input to every neuron</td><td>Sparse/local: each neuron sees a small patch</td></tr>
<tr><td>Weights</td><td>Separate weight for every connection</td><td>Shared filter weights across positions</td></tr>
<tr><td>Parameters (32×32×3 → 4704 units)</td><td>≈ 14.5 million</td><td>456 (6 filters 5×5×3)</td></tr>
<tr><td>Input form</td><td>Flattened vector; spatial structure lost</td><td>2-D/3-D tensor; spatial structure preserved</td></tr>
<tr><td>Translation</td><td>Must relearn a pattern at each location</td><td>Equivariant; pooling adds invariance</td></tr>
<tr><td>Feature extraction</td><td>Usually hand-crafted features as input</td><td>Learns hierarchical features automatically</td></tr>
<tr><td>Input size</td><td>Fixed</td><td>Flexible (with GAP)</td></tr>
<tr><td>Overfitting risk on images</td><td>High</td><td>Lower</td></tr>
<tr><td>Best for</td><td>Tabular data, final classifier layers</td><td>Images, video, spectrograms</td></tr>
</table>
<h4>Why MLP fails on images</h4>
<ul>
<li>A 224×224×3 image gives 150,528 inputs; one 1000-unit layer needs ~150 million weights.</li>
<li>Shifting a cat by a few pixels changes which weights fire, so the MLP generalises poorly.</li>
</ul>
<h4>Relation</h4>
<p>A convolution layer is a special FC layer whose weight matrix is sparse (local) and tied (shared). A CNN still ends with FC layers for classification.</p>
<p><b>Example:</b> On MNIST, a simple MLP reaches about 98% accuracy, while a small CNN (LeNet-5) reaches over 99% with fewer parameters.</p>
<p><b>Conclusion:</b> For images, CNNs are more accurate and far more parameter-efficient than fully connected networks.</p>`,
  hi: `<p><b>Fully connected (MLP):</b> har neuron agli layer ke har neuron se juda; photo ko pehle ek lambi line (vector) mein flatten karna padta hai.</p>
<p><b>CNN:</b> chhote, shared, local filters + pooling, aur end mein bas kuch FC layers.</p>
<table>
<tr><th>Point</th><th>MLP</th><th>CNN</th></tr>
<tr><td>Connection</td><td>Sab se sab</td><td>Sirf chhota patch</td></tr>
<tr><td>Weights</td><td>Har connection ka alag</td><td>Ek filter sab jagah share</td></tr>
<tr><td>Params (32×32×3 → 4704)</td><td>~1.45 crore</td><td>456</td></tr>
<tr><td>Input</td><td>Flatten – structure khatam</td><td>2-D/3-D – structure bacha</td></tr>
<tr><td>Translation</td><td>Har jagah dobara seekhna</td><td>Equivariant + pooling se invariance</td></tr>
<tr><td>Features</td><td>Aksar hand-made</td><td>Khud seekhta hai</td></tr>
<tr><td>Input size</td><td>Fixed</td><td>Flexible (GAP ke saath)</td></tr>
<tr><td>Overfitting</td><td>Zyada</td><td>Kam</td></tr>
<tr><td>Best for</td><td>Tabular data</td><td>Images, video, audio spectrogram</td></tr>
</table>
<h4>MLP images pe fail kyun</h4>
<ul>
<li>224×224×3 = 1,50,528 inputs; 1000 neurons = ~15 crore weights.</li>
<li>Billi thodi khiski toh alag weights active – MLP confuse.</li>
</ul>
<h4>Rishta</h4>
<p>Conv layer ek special FC layer hi hai jiske weights sparse (local) aur tied (shared) hain. CNN ke end mein FC hota hi hai.</p>
<p><b>Desi example:</b> MLP = har customer ke liye alag salesman rakhna. CNN = ek trained salesman jo har counter pe ghoom ke same tareeke se kaam karta hai – sasta aur effective.</p>
<p><b>Conclusion:</b> Images ke liye CNN zyada accurate aur bahut kam parameters wala hai.</p>`,
  keys: ["dense vs sparse connectivity", "parameter sharing", "flattening loses spatial structure", "translation equivariance", "automatic feature learning", "parameter count comparison"],
  draw: "Side-by-side: FC network (all lines crossing) vs conv layer (each output linked to a 3-pixel window).",
  fig: "unit3.html#q5",
  num: false
},
{
  id: "U3-14",
  unit: 3,
  topic: "Transfer learning with CNNs",
  q: "What is transfer learning? Explain how a pretrained CNN is used for a new image task (feature extraction and fine-tuning).",
  alt: [
    "Explain transfer learning with CNNs with an example.",
    "Differentiate feature extraction and fine-tuning.",
    "Why is transfer learning useful when the dataset is small?"
  ],
  marks: [2, 4, 10],
  priority: "med",
  prob: 45,
  diff: 3,
  pyq: [],
  why: "Named syllabus sub-topic never asked yet; very likely to appear as a 4-marker eventually.",
  short: "Transfer learning reuses a CNN pretrained on a large dataset (ImageNet) for a new task, as a frozen feature extractor or by fine-tuning it.",
  en: `<p><b>Definition:</b> <b>Transfer learning</b> is reusing knowledge (weights) learned on a large source task, usually ImageNet classification (1.2 M images, 1000 classes), to solve a different target task with less data and compute.</p>
<h4>Why it works for CNNs</h4>
<ul>
<li>Early layers learn generic features (edges, colours, textures) useful for almost any image.</li>
<li>Deeper layers become task-specific (dog faces, wheels).</li>
<li>So the lower layers can be reused and only the top adapted.</li>
</ul>
<h4>Two strategies</h4>
<ol>
<li><b>Feature extraction:</b> freeze all conv layers of a pretrained model (VGG16, ResNet-50), remove the original 1000-way head, and train only a new classifier (FC + softmax) on the new data. Best for very small datasets similar to ImageNet.</li>
<li><b>Fine-tuning:</b> start from pretrained weights, replace the head, then unfreeze some or all deeper layers and train with a small learning rate (e.g. 10× lower) so the features adapt. Best when you have more data or the domain differs.</li>
</ol>
<table>
<tr><th>Dataset size</th><th>Similar to source</th><th>Different from source</th></tr>
<tr><td>Small</td><td>Feature extraction (train head only)</td><td>Use features from earlier layers + new head</td></tr>
<tr><td>Large</td><td>Fine-tune top layers</td><td>Fine-tune most/all layers</td></tr>
</table>
<h4>Steps</h4>
<ol>
<li>Choose a pretrained backbone (ResNet-50).</li>
<li>Resize and normalise images the way the source was trained (224×224, ImageNet mean/std).</li>
<li>Replace the final layer with one matching the new classes.</li>
<li>Freeze the backbone, train the head for a few epochs.</li>
<li>Optionally unfreeze the last block(s) and fine-tune with a low learning rate plus augmentation.</li>
</ol>
<h4>Advantages</h4>
<ul>
<li>Needs far less labelled data; faster training; better accuracy and less overfitting.</li>
</ul>
<h4>Limitations</h4>
<ul>
<li>Negative transfer if the domains are very different; large pretrained models are heavy to deploy.</li>
</ul>
<p><b>Example:</b> Classifying 5 types of Indian crop leaf disease with 1,500 photos: freeze ResNet-50, train a new 5-way softmax, then fine-tune the last block → high accuracy in minutes on one GPU.</p>
<p><b>Conclusion:</b> Transfer learning lets small projects benefit from large-scale CNN training and is the default way CNNs are used in practice.</p>`,
  hi: `<p><b>Definition:</b> <b>Transfer learning</b> = ek bade task (aksar ImageNet – 12 lakh photos, 1000 classes) pe seekhe hue weights ko naye task ke liye reuse karna, taaki kam data aur kam time mein kaam ho jaaye.</p>
<h4>CNN mein kyun chalta hai</h4>
<ul>
<li>Shuru ki layers generic cheezein seekhti hain – edges, colours, texture – jo har photo mein kaam aati hain.</li>
<li>Gehri layers task-specific hoti hain.</li>
<li>Toh neeche ki layers reuse, sirf upar ka hissa badlo.</li>
</ul>
<h4>Do tareeke</h4>
<ol>
<li><b>Feature extraction:</b> pretrained model (VGG16/ResNet-50) ki saari conv layers freeze, purana 1000-class head hatao, naya chhota classifier train karo. Bahut kam data ho toh best.</li>
<li><b>Fine-tuning:</b> pretrained weights se shuru, head badlo, phir kuch/saari gehri layers unfreeze karke chhoti learning rate se train. Zyada data ya alag domain ho toh.</li>
</ol>
<table>
<tr><th>Data</th><th>Similar domain</th><th>Alag domain</th></tr>
<tr><td>Kam</td><td>Sirf head train</td><td>Pehle ki layers ke features + naya head</td></tr>
<tr><td>Zyada</td><td>Upar ki layers fine-tune</td><td>Zyada/saari layers fine-tune</td></tr>
</table>
<h4>Steps</h4>
<ol>
<li>Backbone chuno (ResNet-50).</li>
<li>Photos ko 224×224, ImageNet mean/std se normalise.</li>
<li>Last layer ko naye classes ke hisaab se badlo.</li>
<li>Backbone freeze, head train.</li>
<li>Phir last block unfreeze karke low LR + augmentation se fine-tune.</li>
</ol>
<h4>Fayde / kamiyan</h4>
<ul>
<li>Kam data, fast training, better accuracy, kam overfitting.</li>
<li>Domain bahut alag ho toh negative transfer; bade models deploy karna bhaari.</li>
</ul>
<p><b>Desi example:</b> Jo bachcha cycle chalana jaanta hai, woh scooty jaldi seekh leta hai – balance (generic features) pehle se aata hai, sirf accelerator-brake (naya head) seekhna hai. Jaise 1,500 photos se 5 tarah ki fasal bimari pehchaanne ke liye ResNet-50 ka use.</p>
<p><b>Conclusion:</b> Transfer learning se chhote projects bhi bade CNN training ka fayda uthate hain – practice mein yahi default hai.</p>`,
  keys: ["pretrained model", "ImageNet", "feature extraction (freeze)", "fine-tuning (low learning rate)", "replace classifier head", "generic low-level features", "small dataset", "negative transfer"],
  draw: "Pretrained CNN blocks shown frozen (padlock) with a new FC + softmax head for the new classes; arrow showing the last block unfrozen for fine-tuning.",
  fig: "",
  num: false
},
{
  id: "U3-15",
  unit: 3,
  topic: "Regularization in CNNs",
  q: "What is data augmentation? How does it help in training CNNs?",
  alt: [
    "Explain data augmentation as a regularization technique for CNNs.",
    "List common image augmentation techniques."
  ],
  marks: [2, 4],
  priority: "med",
  prob: 42,
  diff: 2,
  pyq: ["7CAI 2025 A10"],
  why: "Valid answer to 7CAI 2025 A10 and part of B3; syllabus lists it under regularization.",
  short: "Data augmentation creates new training images by label-preserving transforms (flip, rotate, crop, colour jitter), enlarging the dataset and reducing CNN overfitting.",
  en: `<p><b>Definition:</b> <b>Data augmentation</b> artificially enlarges the training set by applying random, <b>label-preserving</b> transformations to existing images on the fly during training. It is one of the most effective regularisers for CNNs.</p>
<h4>Common techniques</h4>
<ul>
<li><b>Geometric:</b> horizontal/vertical flip, rotation, random crop, scaling/zoom, translation, shear.</li>
<li><b>Photometric:</b> brightness, contrast, saturation, hue (colour jitter), PCA lighting noise.</li>
<li><b>Noise and blur:</b> Gaussian noise, blur.</li>
<li><b>Advanced:</b> Cutout/random erasing, Mixup, CutMix.</li>
</ul>
<h4>How it helps</h4>
<ul>
<li>More varied samples → the model cannot memorise exact pixels → less overfitting.</li>
<li>Teaches invariance to position, orientation, lighting, scale.</li>
<li>Cheap: no new labelling needed.</li>
</ul>
<h4>Cautions</h4>
<ul>
<li>Transforms must keep the label valid: flipping "6" vertically makes "9"; a left-turn sign flipped becomes right-turn.</li>
<li>Apply only to training data, not to validation/test data.</li>
</ul>
<p><b>Example:</b> AlexNet took random 224×224 crops and their mirror images from 256×256 images (a 2048× increase in variety) and added PCA colour jitter, reducing top-1 error by over 1%.</p>
<p><b>Conclusion:</b> Augmentation gives "free" extra data and robustness, and is used in virtually every CNN training pipeline.</p>`,
  hi: `<p><b>Definition:</b> <b>Data augmentation</b> = purani photos ko random tareeke se badal ke (label same rehte hue) naye training samples banana. CNN ke liye sabse asardaar regularisers mein se ek.</p>
<h4>Techniques</h4>
<ul>
<li><b>Geometric:</b> flip, rotate, random crop, zoom, shift.</li>
<li><b>Colour:</b> brightness, contrast, hue badalna.</li>
<li><b>Noise/blur:</b> thoda noise ya blur.</li>
<li><b>Advanced:</b> Cutout (photo ka tukda mita do), Mixup, CutMix.</li>
</ul>
<h4>Fayda</h4>
<ul>
<li>Zyada variety → model ratta nahi maar paata → overfitting kam.</li>
<li>Position, angle, roshni badalne pe bhi sahi pehchaan.</li>
<li>Sasta – naye labels nahi chahiye.</li>
</ul>
<h4>Savdhaani</h4>
<ul>
<li>Label nahi badalna chahiye: "6" ulta karo toh "9"; left-turn sign flip = right-turn.</li>
<li>Sirf training data pe, test pe nahi.</li>
</ul>
<p><b>Example:</b> AlexNet ne 256×256 se random 224×224 crops + mirror liye aur colour jitter kiya – error kam hua.</p>
<p><b>Desi example:</b> Ek hi aam ki photo – dhoop mein, chhaon mein, thodi tedhi, zoom karke – sab "aam" hi hai. Model ko yeh sab dikhao, toh market mein kisi bhi roshni mein aam pehchaan lega.</p>
<p><b>Conclusion:</b> Augmentation "free ka data" aur robustness deta hai; har CNN pipeline mein use hota hai.</p>`,
  keys: ["label-preserving transformations", "flip, rotate, crop, zoom", "colour jitter", "regularization", "invariance", "training data only"],
  draw: "One original image with 4 augmented copies (flipped, rotated, cropped, brighter) all labelled with the same class.",
  fig: "unit3.html#q4",
  num: false
},
{
  id: "U3-16",
  unit: 3,
  topic: "Regularization in CNNs",
  q: "What is batch normalization? Explain its working and benefits in CNNs.",
  alt: [
    "Explain batch normalization with its formula.",
    "How does batch normalization act as a regularizer?",
    "What is internal covariate shift?"
  ],
  marks: [2, 4],
  priority: "med",
  prob: 40,
  diff: 3,
  pyq: [],
  why: "Named in the syllabus under regularization and central to ResNet; not yet asked.",
  short: "Batch normalisation normalises layer inputs over a mini-batch to zero mean, unit variance, then scales (γ) and shifts (β); speeds training, mildly regularises.",
  en: `<p><b>Definition:</b> <b>Batch normalisation (BN)</b> (Ioffe &amp; Szegedy, 2015) normalises the inputs of a layer over each mini-batch so they have zero mean and unit variance, then applies a learnable scale γ and shift β. It was proposed to reduce <b>internal covariate shift</b>, the change in each layer's input distribution as earlier weights change.</p>
<h4>Algorithm (mini-batch of size m)</h4>
<div class="formula">μ<sub>B</sub> = (1/m) Σ x<sub>i</sub> &nbsp;&nbsp; σ<sub>B</sub><sup>2</sup> = (1/m) Σ (x<sub>i</sub> − μ<sub>B</sub>)<sup>2</sup></div>
<div class="formula">x̂<sub>i</sub> = (x<sub>i</sub> − μ<sub>B</sub>) / √(σ<sub>B</sub><sup>2</sup> + ε) &nbsp;&nbsp; y<sub>i</sub> = γ x̂<sub>i</sub> + β</div>
<ul>
<li>In a CNN, statistics are computed <b>per channel</b> over batch, height and width; each channel has its own γ, β.</li>
<li>Usually placed after conv and before ReLU (Conv → BN → ReLU).</li>
<li>At test time, running (moving) averages of μ and σ<sup>2</sup> from training are used.</li>
</ul>
<h4>Benefits</h4>
<ul>
<li>Allows higher learning rates and faster convergence.</li>
<li>Reduces sensitivity to weight initialisation; eases vanishing/exploding gradients.</li>
<li>Mild regularisation: batch statistics add noise, so dropout is often unnecessary (ResNet uses BN, no dropout).</li>
<li>Made very deep networks (ResNet) practical.</li>
</ul>
<h4>Limitations</h4>
<ul><li>Depends on batch size (poor with very small batches); behaves differently in training and inference.</li></ul>
<p><b>Example:</b> Activations [2, 4, 6, 8]: μ = 5, σ<sup>2</sup> = 5, x̂ ≈ [−1.34, −0.45, 0.45, 1.34]; with γ = 1, β = 0 these are the outputs.</p>
<p><b>Conclusion:</b> Batch-norm stabilises and speeds up CNN training and adds a small regularising effect.</p>`,
  hi: `<p><b>Definition:</b> <b>Batch normalisation (BN)</b> (Ioffe &amp; Szegedy, 2015) har mini-batch mein layer ke inputs ko mean 0, variance 1 pe le aata hai, phir learnable γ (scale) aur β (shift) lagata hai. Idea: <b>internal covariate shift</b> kam karna – pichhli layers ke weights badalne se agli layer ke input ka distribution baar-baar badalta hai.</p>
<h4>Steps (batch size m)</h4>
<div class="formula">μ<sub>B</sub> = (1/m) Σ x<sub>i</sub> &nbsp;&nbsp; σ<sub>B</sub><sup>2</sup> = (1/m) Σ (x<sub>i</sub> − μ<sub>B</sub>)<sup>2</sup></div>
<div class="formula">x̂<sub>i</sub> = (x<sub>i</sub> − μ<sub>B</sub>) / √(σ<sub>B</sub><sup>2</sup> + ε) &nbsp;&nbsp; y<sub>i</sub> = γ x̂<sub>i</sub> + β</div>
<ul>
<li>CNN mein <b>har channel</b> ke liye alag mean/variance (batch × height × width pe), alag γ, β.</li>
<li>Order: Conv → BN → ReLU.</li>
<li>Test pe training ke running average μ, σ<sup>2</sup> use hote hain.</li>
</ul>
<h4>Fayde</h4>
<ul>
<li>Badi learning rate, fast training.</li>
<li>Initialisation ki tension kam, gradient stable.</li>
<li>Batch noise se thoda regularisation – isliye ResNet mein dropout nahi.</li>
<li>Bahut gehre networks possible.</li>
</ul>
<h4>Kami</h4>
<ul><li>Chhote batch size pe kharab; training aur test mein alag behaviour.</li></ul>
<p><b>Example:</b> [2, 4, 6, 8] → μ = 5, σ<sup>2</sup> = 5 → x̂ ≈ [−1.34, −0.45, 0.45, 1.34].</p>
<p><b>Desi example:</b> Alag-alag school ke marks (kisi ka out of 50, kisi ka 100) seedha compare nahi kar sakte – pehle sabko percentage/z-score mein badlo. BN har layer ke liye yahi "marks ko ek scale pe laana" karta hai.</p>
<p><b>Conclusion:</b> BN training ko stable aur fast banata hai aur thoda regularise bhi karta hai.</p>`,
  keys: ["mini-batch mean and variance", "normalise x̂ = (x − μ)/√(σ² + ε)", "scale γ and shift β", "internal covariate shift", "per-channel in CNN", "running averages at test time", "higher learning rate"],
  draw: "Conv → BN → ReLU block; small histogram before (shifted, wide) and after BN (centred at 0).",
  fig: "",
  num: false
},
{
  id: "U3-17",
  unit: 3,
  topic: "Training a CNN",
  q: "Explain the steps involved in training a CNN, including how backpropagation works through convolution and pooling layers.",
  alt: [
    "How is a CNN trained? Explain the training pipeline.",
    "How are filter weights learned in a CNN?",
    "How does backpropagation pass through a max-pooling layer?"
  ],
  marks: [4, 10],
  priority: "med",
  prob: 40,
  diff: 4,
  pyq: ["8AID 2025 C1"],
  why: "'Working' of a CNN in 8AID 2025 C1 is answered by the training process; syllabus lists training a CNN.",
  short: "Training a CNN: forward pass to softmax, cross-entropy loss, backpropagation of gradients to all filters, and SGD/Adam updates repeated over epochs with regularization.",
  en: `<p><b>Overview:</b> Training a CNN means finding filter and FC weights that minimise a loss on labelled images, using forward propagation, backpropagation and gradient-based optimisation.</p>
<h4>1. Data preparation</h4>
<ul>
<li>Collect labelled images; split into train / validation / test (e.g. 70/15/15).</li>
<li>Resize to a fixed size (e.g. 224×224), normalise pixel values (0–1 or mean/std), apply data augmentation to training data.</li>
</ul>
<h4>2. Define the model</h4>
<ul>
<li>Choose architecture: [Conv → BN → ReLU → Pool] blocks + FC + softmax, or a pretrained backbone.</li>
<li>Initialise weights (He initialisation for ReLU networks).</li>
</ul>
<h4>3. Forward pass and loss</h4>
<div class="formula">L = − (1/N) Σ<sub>n</sub> Σ<sub>c</sub> y<sub>n,c</sub> log ŷ<sub>n,c</sub> &nbsp;&nbsp; (categorical cross-entropy)</div>
<h4>4. Backpropagation through CNN layers</h4>
<ul>
<li><b>FC and softmax:</b> as in an MLP; for softmax + cross-entropy, ∂L/∂z = ŷ − y.</li>
<li><b>Conv layer:</b> gradient w.r.t. a filter weight is the sum over all positions where it was used (because of parameter sharing): ∂L/∂K = input ⋆ ∂L/∂output (a convolution). Gradient w.r.t. the input is a full convolution of ∂L/∂output with the flipped filter.</li>
<li><b>Max pooling:</b> gradient goes only to the position that held the maximum; others get 0. <b>Average pooling:</b> gradient is split equally (÷ window size).</li>
<li><b>ReLU:</b> passes the gradient where input &gt; 0, blocks it otherwise.</li>
</ul>
<h4>5. Parameter update</h4>
<div class="formula">w ← w − η · ∂L/∂w &nbsp;&nbsp; (mini-batch SGD; momentum or Adam in practice)</div>
<h4>6. Hyper-parameters and monitoring</h4>
<ul>
<li>Learning rate (with schedule/decay), batch size (32–256), epochs, optimiser, weight decay.</li>
<li>Plot training vs validation loss/accuracy; use early stopping, dropout, BN, augmentation to fight overfitting.</li>
</ul>
<h4>7. Evaluation and deployment</h4>
<ul><li>Test accuracy, precision/recall, confusion matrix; export the model.</li></ul>
<table>
<tr><th>Stage</th><th>Key choice</th></tr>
<tr><td>Data</td><td>Normalise + augment</td></tr>
<tr><td>Model</td><td>Architecture / pretrained backbone</td></tr>
<tr><td>Loss</td><td>Cross-entropy</td></tr>
<tr><td>Optimiser</td><td>SGD + momentum / Adam</td></tr>
<tr><td>Regularisation</td><td>Dropout, L2, BN, early stopping</td></tr>
</table>
<p><b>Example:</b> MNIST digits with LeNet-5: 60,000 training images, batch 64, Adam lr 0.001, 10 epochs → about 99% test accuracy.</p>
<p><b>Conclusion:</b> A CNN is trained end-to-end: forward pass, cross-entropy loss, backprop through conv/pool/FC, and iterative optimiser updates.</p>`,
  hi: `<p><b>Overview:</b> CNN train karna = aise filter aur FC weights dhoondhna jisse labelled photos pe loss minimum ho – forward pass, backprop aur optimiser se.</p>
<h4>1. Data taiyaar karo</h4>
<ul>
<li>Labelled photos; train / validation / test split (70/15/15).</li>
<li>Same size (224×224), pixel normalise, training pe augmentation.</li>
</ul>
<h4>2. Model banao</h4>
<ul>
<li>[Conv → BN → ReLU → Pool] blocks + FC + softmax, ya pretrained backbone.</li>
<li>He initialisation (ReLU ke liye).</li>
</ul>
<h4>3. Forward pass + loss</h4>
<div class="formula">L = − (1/N) Σ<sub>n</sub> Σ<sub>c</sub> y<sub>n,c</sub> log ŷ<sub>n,c</sub></div>
<h4>4. Backprop CNN layers mein</h4>
<ul>
<li><b>FC + softmax:</b> MLP jaisa; ∂L/∂z = ŷ − y.</li>
<li><b>Conv:</b> filter weight har jagah use hua, toh uska gradient = saari positions ke gradients ka sum (parameter sharing ki wajah se). Yeh khud ek convolution hai: input ⋆ output-gradient.</li>
<li><b>Max pooling:</b> gradient sirf us position ko jahan max tha, baaki ko 0. <b>Average pooling:</b> barabar baant do.</li>
<li><b>ReLU:</b> input &gt; 0 tha toh gradient aage, warna block.</li>
</ul>
<h4>5. Update</h4>
<div class="formula">w ← w − η · ∂L/∂w</div>
<h4>6. Hyper-parameters aur monitoring</h4>
<ul>
<li>Learning rate, batch size, epochs, optimiser, weight decay.</li>
<li>Train vs validation loss graph dekho; early stopping, dropout, BN, augmentation.</li>
</ul>
<h4>7. Evaluation</h4>
<ul><li>Test accuracy, confusion matrix, precision/recall; phir deploy.</li></ul>
<table>
<tr><th>Stage</th><th>Main choice</th></tr>
<tr><td>Data</td><td>Normalise + augment</td></tr>
<tr><td>Model</td><td>Architecture</td></tr>
<tr><td>Loss</td><td>Cross-entropy</td></tr>
<tr><td>Optimiser</td><td>SGD/Adam</td></tr>
<tr><td>Regularisation</td><td>Dropout, L2, BN</td></tr>
</table>
<p><b>Desi example:</b> Naya cook roti banana seekh raha hai: banao (forward), maa bolti hai "jal gayi / kachchi hai" (loss), cook samajhta hai aanch zyada thi ya time kam (backprop), agli baar adjust (update). Sau roti ke baad perfect – yahi epochs hain.</p>
<p><b>Conclusion:</b> CNN end-to-end train hota hai: forward → loss → backprop (conv/pool/FC) → update, baar-baar.</p>`,
  keys: ["forward pass", "cross-entropy loss", "backpropagation", "gradient summed over shared weights", "max-pool routes gradient to max", "SGD/Adam", "learning rate", "epochs and mini-batches", "validation monitoring"],
  draw: "Loop diagram: images → CNN → softmax → loss → backprop arrow back to filters → optimiser update.",
  fig: "unit3.html#q1",
  num: false
},
{
  id: "U3-18",
  unit: 3,
  topic: "Popular CNN architectures",
  q: "Compare popular CNN architectures: LeNet-5, AlexNet, VGGNet, GoogLeNet (Inception) and ResNet.",
  alt: [
    "Write short notes on VGGNet and GoogLeNet.",
    "Explain the evolution of CNN architectures on ImageNet.",
    "What is an Inception module?"
  ],
  marks: [4, 10],
  priority: "med",
  prob: 40,
  diff: 3,
  pyq: [],
  why: "Syllabus says 'popular CNN architectures'; a broader comparison or short notes on VGG/GoogLeNet is a plausible variant of C3.",
  short: "LeNet-5 (1998, digits), AlexNet (2012, ReLU+dropout), VGG (2014, stacked 3×3), GoogLeNet (2014, Inception + 1×1), ResNet (2015, skip connections, 152 layers).",
  en: `<p><b>Introduction:</b> CNN architectures evolved mainly through the ImageNet (ILSVRC) challenge, each adding a key design idea.</p>
<h4>1. LeNet-5 (LeCun et al., 1998)</h4>
<ul><li>~7 layers (2 conv + 2 subsampling + FC), 32×32 grey input, tanh/sigmoid, average pooling, ~60 K parameters; used for handwritten digit/cheque reading.</li></ul>
<h4>2. AlexNet (2012)</h4>
<ul><li>5 conv + 3 FC, ~60 M params; ReLU, dropout, data augmentation, GPUs; top-5 error 15.3%.</li></ul>
<h4>3. VGGNet (Simonyan &amp; Zisserman, Oxford, 2014)</h4>
<ul>
<li>VGG-16/19: uses only <b>3×3 conv (stride 1, pad 1)</b> and 2×2 max-pool, doubling channels 64→128→256→512.</li>
<li>Two stacked 3×3 convs = 5×5 receptive field, three = 7×7, with fewer parameters (27C² vs 49C²) and more non-linearity.</li>
<li>~138 M params (VGG-16), top-5 error ~7.3% (ILSVRC 2014 runner-up in classification). Simple, popular for transfer learning, but heavy.</li>
</ul>
<h4>4. GoogLeNet / Inception-v1 (Szegedy et al., Google, 2014)</h4>
<ul>
<li>22 layers deep; won ILSVRC 2014 with 6.67% top-5 error.</li>
<li><b>Inception module:</b> parallel 1×1, 3×3, 5×5 convs and 3×3 max-pool, outputs concatenated along depth — multi-scale features.</li>
<li><b>1×1 convolutions</b> reduce channels before costly 3×3/5×5 convs; global average pooling instead of big FC layers → only ~5 M parameters (12× fewer than AlexNet). Auxiliary classifiers help gradients.</li>
</ul>
<h4>5. ResNet (He et al., 2015)</h4>
<ul><li>Residual blocks y = F(x) + x, BN, up to 152 layers; top-5 error 3.57%.</li></ul>
<h4>Comparison table</h4>
<table>
<tr><th>Model</th><th>Year</th><th>Depth</th><th>Params</th><th>Key idea</th><th>ImageNet top-5</th></tr>
<tr><td>LeNet-5</td><td>1998</td><td>~7</td><td>~60 K</td><td>Conv + subsampling for digits</td><td>–</td></tr>
<tr><td>AlexNet</td><td>2012</td><td>8</td><td>~60 M</td><td>ReLU, dropout, GPU</td><td>15.3%</td></tr>
<tr><td>VGG-16</td><td>2014</td><td>16</td><td>~138 M</td><td>Uniform 3×3 stacks</td><td>~7.3%</td></tr>
<tr><td>GoogLeNet</td><td>2014</td><td>22</td><td>~5 M</td><td>Inception module, 1×1 conv, GAP</td><td>6.67%</td></tr>
<tr><td>ResNet-152</td><td>2015</td><td>152</td><td>~60 M</td><td>Residual skip connections, BN</td><td>3.57%</td></tr>
</table>
<h4>Trends</h4>
<ul>
<li>Deeper networks, smaller filters (3×3, 1×1), fewer FC parameters (GAP), better normalisation (BN), better gradient flow (skip connections).</li>
</ul>
<p><b>Conclusion:</b> From LeNet to ResNet, depth increased from ~7 to 152 layers while error fell from 15.3% (AlexNet) to 3.57%, driven by ReLU, small filters, Inception modules and residual learning.</p>`,
  hi: `<p><b>Intro:</b> CNN architectures ImageNet competition ke saath evolve hue – har ek ne ek naya idea joda.</p>
<h4>1. LeNet-5 (1998)</h4>
<ul><li>LeCun; ~7 layers, 32×32 grey input, tanh, average pooling, ~60 hazaar params; bank cheque ke digits padhne ke liye.</li></ul>
<h4>2. AlexNet (2012)</h4>
<ul><li>5 conv + 3 FC, ~6 crore params; ReLU, dropout, GPU; error 15.3%.</li></ul>
<h4>3. VGGNet (Oxford, 2014)</h4>
<ul>
<li>Sirf <b>3×3 conv</b> aur 2×2 max-pool – simple design; channels 64→128→256→512.</li>
<li>Do 3×3 = ek 5×5 jitna area, teen 3×3 = 7×7, par kam params aur zyada ReLU.</li>
<li>VGG-16 mein ~13.8 crore params – bahut bhaari; error ~7.3%.</li>
</ul>
<h4>4. GoogLeNet / Inception (Google, 2014)</h4>
<ul>
<li>22 layers, 2014 winner, error 6.67%.</li>
<li><b>Inception module:</b> 1×1, 3×3, 5×5 conv aur pooling ek saath parallel, output jod do – alag-alag size ke features ek saath.</li>
<li><b>1×1 conv</b> se pehle channels kam, end mein global average pooling – sirf ~50 lakh params (AlexNet se 12 guna kam).</li>
</ul>
<h4>5. ResNet (2015)</h4>
<ul><li>y = F(x) + x skip connections, BN, 152 layers, error 3.57%.</li></ul>
<table>
<tr><th>Model</th><th>Saal</th><th>Depth</th><th>Params</th><th>Main idea</th><th>Top-5</th></tr>
<tr><td>LeNet-5</td><td>1998</td><td>~7</td><td>~60 K</td><td>Digits ke liye conv</td><td>–</td></tr>
<tr><td>AlexNet</td><td>2012</td><td>8</td><td>~60 M</td><td>ReLU, dropout, GPU</td><td>15.3%</td></tr>
<tr><td>VGG-16</td><td>2014</td><td>16</td><td>~138 M</td><td>Sirf 3×3</td><td>~7.3%</td></tr>
<tr><td>GoogLeNet</td><td>2014</td><td>22</td><td>~5 M</td><td>Inception, 1×1, GAP</td><td>6.67%</td></tr>
<tr><td>ResNet-152</td><td>2015</td><td>152</td><td>~60 M</td><td>Skip connections</td><td>3.57%</td></tr>
</table>
<h4>Trend</h4>
<ul><li>Gehra network, chhote filters, kam FC params, BN, skip connections.</li></ul>
<p><b>Desi example:</b> Mobile phones ka evolution – Nokia 1100 (LeNet) → pehla smartphone (AlexNet) → bada heavy phablet (VGG) → slim smart design (GoogLeNet) → aaj ka flagship (ResNet).</p>
<p><b>Conclusion:</b> LeNet se ResNet tak depth 7 se 152, error 15.3% se 3.57% – ReLU, 3×3 filters, Inception aur residual learning ki wajah se.</p>`,
  keys: ["LeNet-5", "AlexNet", "VGG-16 3×3 stacks 138M", "GoogLeNet Inception module", "1×1 convolution", "global average pooling", "ResNet skip connections", "ILSVRC top-5 errors"],
  draw: "Inception module: previous layer → four parallel branches (1×1; 1×1→3×3; 1×1→5×5; 3×3 pool→1×1) → depth concatenation.",
  fig: "unit3.html#q2",
  num: false
},
{
  id: "U3-19",
  unit: 3,
  topic: "Filters and convolution layer",
  q: "What is the receptive field in a CNN? How does it grow with depth?",
  alt: [
    "Define local receptive field.",
    "Why do stacked 3×3 filters give the same receptive field as a larger filter?"
  ],
  marks: [2, 4],
  priority: "med",
  prob: 32,
  diff: 3,
  pyq: [],
  why: "Receptive field is a named item under filters; appears as a 2-mark definition or inside VGG discussion.",
  short: "The receptive field is the input region that influences one neuron; it grows with depth, e.g. three stacked 3×3 convolutions see 7×7.",
  en: `<p><b>Definition:</b> The <b>receptive field</b> of a neuron is the region of the original input image that affects its value. In the first conv layer it equals the filter size (e.g. 3×3, the <b>local receptive field</b>); in deeper layers it becomes larger because each neuron combines several neurons of the previous layer.</p>
<h4>Growth with depth</h4>
<div class="formula">r<sub>l</sub> = r<sub>l−1</sub> + (k<sub>l</sub> − 1) × j<sub>l−1</sub>, &nbsp; j<sub>l</sub> = j<sub>l−1</sub> × s<sub>l</sub> &nbsp; (r<sub>0</sub> = 1, j<sub>0</sub> = 1)</div>
<p>k = kernel size, s = stride, j = cumulative stride ("jump").</p>
<pre>Three 3×3 convs, stride 1:  r = 3 → 5 → 7   (7×7 field)
Conv3 (s1) → Pool2 (s2) → Conv3 (s1):
  r = 3 → 3 + 1×1 = 4 → 4 + 2×2 = 8   (8×8 field)</pre>
<h4>Why it matters</h4>
<ul>
<li>Early layers (small fields) see edges; deep layers (large fields) see object parts and whole objects.</li>
<li>Pooling and stride enlarge the receptive field quickly.</li>
<li><b>VGG insight:</b> two 3×3 layers = 5×5 field with 18C² parameters instead of 25C²; three 3×3 = 7×7 with 27C² instead of 49C², plus more ReLU non-linearity.</li>
<li>For dense tasks (segmentation) the receptive field must cover the whole object; dilated convolutions enlarge it without extra parameters.</li>
</ul>
<p><b>Conclusion:</b> The receptive field tells how much of the image a neuron "sees"; depth, pooling and stride make it grow so deep layers capture global context.</p>`,
  hi: `<p><b>Definition:</b> Kisi neuron ka <b>receptive field</b> = original image ka woh hissa jo us neuron ki value pe asar daalta hai. Pehli conv layer mein yeh filter size jitna (3×3 – <b>local receptive field</b>); gehri layers mein bada, kyunki har neuron pichhli layer ke kai neurons ko jodta hai.</p>
<h4>Depth ke saath badhta hai</h4>
<div class="formula">r<sub>l</sub> = r<sub>l−1</sub> + (k<sub>l</sub> − 1) × j<sub>l−1</sub>, &nbsp; j<sub>l</sub> = j<sub>l−1</sub> × s<sub>l</sub> &nbsp; (r<sub>0</sub> = 1, j<sub>0</sub> = 1)</div>
<pre>Teen 3×3 conv, stride 1:  r = 3 → 5 → 7
Conv3 → Pool2 (s2) → Conv3:  r = 3 → 4 → 8</pre>
<h4>Kyun important</h4>
<ul>
<li>Shuru ki layers (chhota field) edges dekhti hain; gehri layers (bada field) poora object.</li>
<li>Pooling/stride se field jaldi badhta hai.</li>
<li><b>VGG trick:</b> do 3×3 = 5×5 jitna area par 18C² params (25C² ki jagah); teen 3×3 = 7×7, 27C² vs 49C².</li>
<li>Segmentation mein field poore object jitna chahiye; dilated conv se bina extra params bada field.</li>
</ul>
<p><b>Desi example:</b> Cricket stadium mein ek darshak sirf apne aas-paas ke 3–4 log dekhta hai (chhota field). Camera-man thoda upar, poora stand dekhta hai. Drone camera (gehri layer) poora ground dekhta hai.</p>
<p><b>Conclusion:</b> Receptive field batata hai neuron image ka kitna hissa "dekhta" hai; depth ke saath badhta hai.</p>`,
  keys: ["local receptive field", "region of input affecting a neuron", "grows with depth", "stacked 3×3 = 5×5/7×7", "pooling/stride enlarge it", "dilated convolution"],
  draw: "Three stacked grids: one output cell → 3×3 in the layer below → 5×5 in the input, shaded.",
  fig: "unit3.html#q6",
  num: false
},
{
  id: "U3-20",
  unit: 3,
  topic: "Filters and convolution layer",
  q: "What is a 1×1 convolution? Explain its uses in CNN architectures.",
  alt: [
    "Explain network-in-network / pointwise convolution.",
    "How do 1×1 convolutions reduce computation in GoogLeNet and ResNet?"
  ],
  marks: [2, 4],
  priority: "med",
  prob: 30,
  diff: 3,
  pyq: [],
  why: "Listed under filters; key to GoogLeNet and ResNet bottlenecks, so a likely short note.",
  short: "A 1×1 convolution mixes channels at each pixel, changing channel count (dimensionality reduction), adding non-linearity and cutting computation, e.g. Inception, ResNet bottlenecks.",
  en: `<p><b>Definition:</b> A <b>1×1 convolution</b> (pointwise convolution, introduced in Network-in-Network, 2013) uses filters of size 1×1×C. At every pixel it takes a weighted sum across all C input channels, i.e. a small fully connected layer applied identically at every spatial position. It does not change height and width.</p>
<div class="formula">Input H × W × C<sub>in</sub> → K filters of 1×1×C<sub>in</sub> → H × W × K; &nbsp; params = K × (C<sub>in</sub> + 1)</div>
<h4>Uses</h4>
<ul>
<li><b>Dimensionality (channel) reduction:</b> 28×28×192 → 1×1 conv with 32 filters → 28×28×32 (params 32 × 193 = 6,176).</li>
<li><b>Reduce computation</b> before expensive 3×3/5×5 convs (Inception "bottleneck").</li>
<li><b>Increase channels</b> back up (ResNet bottleneck 1×1 → 3×3 → 1×1).</li>
<li><b>Adds non-linearity</b> (followed by ReLU) without changing spatial size.</li>
<li>Projection shortcut in ResNet when channel counts differ; final classifier in fully convolutional networks.</li>
</ul>
<h4>Numerical: cost saving</h4>
<pre>Input 28×28×192 → 5×5 conv, 32 filters (same padding)
Direct:  28×28×32 × (5×5×192) = 120,422,400 ≈ 120 M multiplications
With 1×1 bottleneck to 16 channels first:
  1×1: 28×28×16 × 192        =   2,408,448
  5×5: 28×28×32 × (5×5×16)   =  10,035,200
  Total                       ≈  12.4 M  (about 10× cheaper)</pre>
<p><b>Conclusion:</b> 1×1 convolutions are cheap channel mixers that shrink or expand depth and make deep networks like GoogLeNet and ResNet efficient.</p>`,
  hi: `<p><b>Definition:</b> <b>1×1 convolution</b> (pointwise conv, Network-in-Network 2013) ka filter 1×1×C hota hai. Har pixel pe saare C channels ka weighted sum – yaani har pixel pe ek chhota FC layer. Height-width same rehte hain, sirf channels badalte hain.</p>
<div class="formula">H × W × C<sub>in</sub> → K filters 1×1×C<sub>in</sub> → H × W × K; &nbsp; params = K × (C<sub>in</sub> + 1)</div>
<h4>Use kahan</h4>
<ul>
<li><b>Channels kam karna:</b> 28×28×192 → 32 filters → 28×28×32 (params 6,176).</li>
<li><b>Computation bachana</b> – mehnge 3×3/5×5 se pehle (Inception).</li>
<li><b>Channels badhana</b> – ResNet bottleneck 1×1 → 3×3 → 1×1.</li>
<li><b>Non-linearity:</b> ReLU ke saath, size badle bina.</li>
<li>ResNet projection shortcut; fully convolutional networks ka classifier.</li>
</ul>
<h4>Numerical</h4>
<pre>28×28×192 → 5×5 conv, 32 filters
Seedha:  28×28×32 × 5×5×192 ≈ 12 crore multiplications
Pehle 1×1 se 16 channels:
  1×1: 28×28×16 × 192       ≈ 24 lakh
  5×5: 28×28×32 × 5×5×16    ≈ 1 crore
  Total ≈ 1.24 crore (lagbhag 10 guna sasta)</pre>
<p><b>Desi example:</b> Shaadi ke 192 rishtedaar ke opinions seedha sunna mushkil – pehle har family ka ek representative chun lo (1×1 conv, 192 → 16), phir unse detail baat karo (5×5 conv). Kaam wahi, mehnat 10 guna kam.</p>
<p><b>Conclusion:</b> 1×1 conv sasta channel-mixer hai jo GoogLeNet aur ResNet ko efficient banata hai.</p>`,
  keys: ["pointwise convolution", "channel mixing", "dimensionality reduction", "bottleneck", "Network-in-Network", "GoogLeNet Inception", "ResNet bottleneck", "spatial size unchanged"],
  draw: "A 1×1×C 'needle' through a stack of channels producing one value; arrow 28×28×192 → 28×28×32.",
  fig: "",
  num: true
},
{
  id: "U3-21",
  unit: 3,
  topic: "CNN layers",
  q: "Explain the role of the ReLU activation layer in CNNs. Why is ReLU preferred over sigmoid and tanh?",
  alt: [
    "What is the purpose of the activation layer in a CNN?",
    "Explain ReLU and its variants used in CNNs."
  ],
  marks: [2, 4],
  priority: "med",
  prob: 30,
  diff: 2,
  pyq: ["7CAI 2025 A2"],
  why: "ReLU is a named CNN layer; ReLU/LReLU asked in 7CAI 2025 A2 (Unit 1 context).",
  short: "ReLU, f(x) = max(0, x), adds non-linearity after each convolution; it is cheap, non-saturating and avoids vanishing gradients, so CNNs train faster.",
  en: `<p><b>Definition:</b> The <b>ReLU (Rectified Linear Unit)</b> layer applies f(x) = max(0, x) element-wise to every value of the feature map after convolution. It has no learnable parameters and keeps the size unchanged.</p>
<div class="formula">f(x) = max(0, x), &nbsp; f'(x) = 1 if x &gt; 0, else 0</div>
<h4>Role in a CNN</h4>
<ul>
<li>Introduces <b>non-linearity</b>; without it, stacked convolutions would collapse into one linear operation.</li>
<li>Keeps only positive responses ("feature present"), giving sparse activations.</li>
</ul>
<h4>Why preferred over sigmoid/tanh</h4>
<ul>
<li><b>No saturation</b> for x &gt; 0, so gradients do not vanish in deep nets.</li>
<li><b>Cheap:</b> a comparison, no exponentials.</li>
<li><b>Faster convergence:</b> AlexNet reported ~6× faster training than tanh.</li>
</ul>
<h4>Limitation and variants</h4>
<ul>
<li><b>Dying ReLU:</b> neurons stuck at negative inputs output 0 forever.</li>
<li><b>Leaky ReLU:</b> f(x) = x if x &gt; 0 else 0.01x; <b>PReLU</b> learns the slope; <b>ELU</b> smooth negatives.</li>
</ul>
<p><b>Example:</b> feature map [3, −2; 0.5, −7] → ReLU → [3, 0; 0.5, 0].</p>
<p><b>Conclusion:</b> ReLU is the default CNN activation because it is simple, fast and keeps gradients alive.</p>`,
  hi: `<p><b>Definition:</b> <b>ReLU</b> layer har feature-map value pe f(x) = max(0, x) lagati hai – negative ko 0, positive waisa hi. Koi parameter nahi, size same.</p>
<div class="formula">f(x) = max(0, x), &nbsp; f'(x) = 1 if x &gt; 0, else 0</div>
<h4>Role</h4>
<ul>
<li><b>Non-linearity</b> – iske bina saari conv layers milke ek hi linear operation ban jaati.</li>
<li>Sirf positive response ("feature mila") bachta hai – sparse activations.</li>
</ul>
<h4>Sigmoid/tanh se better kyun</h4>
<ul>
<li>x &gt; 0 pe saturate nahi – gradient nahi marta.</li>
<li>Sasta – bas compare, exponential nahi.</li>
<li>AlexNet mein tanh se ~6× fast training.</li>
</ul>
<h4>Kami aur variants</h4>
<ul>
<li><b>Dying ReLU:</b> neuron hamesha negative pe atak gaya toh hamesha 0.</li>
<li><b>Leaky ReLU:</b> negative pe 0.01x; <b>PReLU:</b> slope seekho; <b>ELU</b>.</li>
</ul>
<p><b>Example:</b> [3, −2; 0.5, −7] → [3, 0; 0.5, 0].</p>
<p><b>Desi example:</b> Exam ke baad sirf positive feedback note karna aur negative ko zero maan lena – ReLU. Leaky ReLU = negative bhi thoda sa (1%) yaad rakhna.</p>
<p><b>Conclusion:</b> ReLU simple, fast aur gradient-friendly hai – CNN ka default activation.</p>`,
  keys: ["max(0, x)", "non-linearity", "no saturation", "vanishing gradient", "sparse activation", "dying ReLU", "Leaky ReLU"],
  draw: "Graph of ReLU (flat 0 for x < 0, 45° line for x > 0) beside Leaky ReLU.",
  fig: "unit3.html#q1",
  num: false
},
{
  id: "U3-22",
  unit: 3,
  topic: "CNN layers",
  q: "Explain the flatten, fully connected and softmax layers of a CNN.",
  alt: [
    "What is the role of the fully connected layer in a CNN?",
    "Why is softmax used at the output of a CNN classifier?",
    "What is the flatten layer?"
  ],
  marks: [2, 4],
  priority: "med",
  prob: 30,
  diff: 2,
  pyq: [],
  why: "Syllabus lists FC, softmax and flatten as CNN layers; good 2-mark definitions.",
  short: "Flatten turns feature maps into a vector; fully connected layers combine all features for decision; softmax converts final scores into class probabilities summing to 1.",
  en: `<h4>1. Flatten layer</h4>
<ul>
<li>Reshapes the final 3-D feature maps (H × W × C) into a 1-D vector so they can feed FC layers. No parameters.</li>
<li>Example: AlexNet 6×6×256 → 9216-length vector. (Global average pooling is an alternative: 6×6×256 → 256.)</li>
</ul>
<h4>2. Fully connected (dense) layer</h4>
<ul>
<li>Every input connected to every neuron: z = W·x + b, followed by ReLU (hidden FC) .</li>
<li>Combines the local features extracted by conv layers into global, high-level reasoning for classification.</li>
<li>Holds most parameters in classic CNNs (AlexNet FC6 alone: 9216 × 4096 + 4096 ≈ 37.75 M), so dropout is applied here.</li>
</ul>
<div class="formula">Params of FC = n<sub>in</sub> × n<sub>out</sub> + n<sub>out</sub></div>
<h4>3. Softmax (output) layer</h4>
<div class="formula">softmax(z<sub>i</sub>) = e<sup>z<sub>i</sub></sup> / Σ<sub>j=1</sub><sup>K</sup> e<sup>z<sub>j</sub></sup></div>
<ul>
<li>Converts K raw scores (logits) into probabilities in (0, 1) that sum to 1; predicted class = arg max.</li>
<li>Paired with cross-entropy loss; for binary/multi-label tasks sigmoid is used instead.</li>
</ul>
<pre>Logits z = [2.0, 1.0, 0.1]
e^z      = [7.389, 2.718, 1.105], sum = 11.212
softmax  = [0.659, 0.242, 0.099]  → class 1 (cat)</pre>
<p><b>Conclusion:</b> Flatten → FC → softmax form the classifier head that turns learned features into class probabilities.</p>`,
  hi: `<h4>1. Flatten layer</h4>
<ul>
<li>Aakhri 3-D feature maps (H × W × C) ko ek lambi 1-D line (vector) mein badalna, taaki FC layer le sake. Koi parameter nahi.</li>
<li>AlexNet: 6×6×256 → 9216 numbers. (Alternative: global average pooling → 256.)</li>
</ul>
<h4>2. Fully connected layer</h4>
<ul>
<li>Har input har neuron se juda: z = W·x + b, phir ReLU.</li>
<li>Conv layers ke local features ko milake final decision – "aankh + kaan + mooch = billi".</li>
<li>Sabse zyada params yahin (AlexNet FC6 ≈ 3.77 crore), isliye dropout yahin lagta hai.</li>
</ul>
<div class="formula">FC params = n<sub>in</sub> × n<sub>out</sub> + n<sub>out</sub></div>
<h4>3. Softmax layer</h4>
<div class="formula">softmax(z<sub>i</sub>) = e<sup>z<sub>i</sub></sup> / Σ<sub>j=1</sub><sup>K</sup> e<sup>z<sub>j</sub></sup></div>
<ul>
<li>Raw scores ko probabilities (0–1, total 1) mein badalta hai; sabse badi = answer.</li>
<li>Cross-entropy loss ke saath; binary ke liye sigmoid.</li>
</ul>
<pre>z = [2.0, 1.0, 0.1] → e^z = [7.389, 2.718, 1.105], sum 11.212
softmax = [0.659, 0.242, 0.099] → billi</pre>
<p><b>Desi example:</b> Election counting: har booth ki parchi ek line mein lagao (flatten), saare votes jodo (FC), phir har party ka vote share % nikalo jo total 100% ho (softmax).</p>
<p><b>Conclusion:</b> Flatten → FC → softmax = classifier head jo features ko class probabilities mein badalta hai.</p>`,
  keys: ["flatten to 1-D vector", "fully connected W·x + b", "most parameters in FC", "softmax e^z / Σe^z", "probabilities sum to 1", "cross-entropy", "global average pooling alternative"],
  draw: "Stack of feature maps → arrow 'flatten' → long vector → dense layer → softmax bars for classes.",
  fig: "unit3.html#q1",
  num: false
},
{
  id: "U3-23",
  unit: 3,
  topic: "Regularization in CNNs",
  q: "Explain L1 and L2 regularization and early stopping as regularization techniques for CNNs.",
  alt: [
    "Differentiate L1 and L2 regularization.",
    "What is weight decay?",
    "What is early stopping?"
  ],
  marks: [2, 4],
  priority: "med",
  prob: 30,
  diff: 3,
  pyq: ["7CAI 2025 B3", "7CAI 2025 A10"],
  why: "Possible answers for 7CAI 2025 B3/A10; L1/L2 and early stopping are named in the syllabus under regularization.",
  short: "L2 adds λΣw² (weight decay, small weights), L1 adds λΣ|w| (sparse weights); early stopping halts training when validation loss starts rising.",
  en: `<h4>1. L2 regularization (weight decay)</h4>
<div class="formula">L = L<sub>0</sub> + λ Σ w<sup>2</sup> &nbsp;&nbsp; → &nbsp;&nbsp; w ← w − η(∂L<sub>0</sub>/∂w + 2λw) = (1 − 2ηλ)w − η ∂L<sub>0</sub>/∂w</div>
<ul>
<li>Penalises large weights; each step shrinks ("decays") weights toward zero.</li>
<li>Gives smoother functions, less sensitive to small input changes. Default in CNN training (e.g. 0.0005 in AlexNet, 0.0001 in ResNet).</li>
</ul>
<h4>2. L1 regularization</h4>
<div class="formula">L = L<sub>0</sub> + λ Σ |w| &nbsp;&nbsp; → &nbsp;&nbsp; gradient term λ · sign(w)</div>
<ul>
<li>Pushes many weights exactly to zero → <b>sparse</b> model, implicit feature selection, useful for pruning.</li>
</ul>
<table>
<tr><th>Point</th><th>L1</th><th>L2</th></tr>
<tr><td>Penalty</td><td>λ Σ |w|</td><td>λ Σ w²</td></tr>
<tr><td>Effect</td><td>Sparse weights (many zero)</td><td>Small, spread-out weights</td></tr>
<tr><td>Also called</td><td>Lasso</td><td>Ridge / weight decay</td></tr>
<tr><td>Use in CNNs</td><td>Pruning / compression</td><td>Standard default</td></tr>
</table>
<h4>3. Early stopping</h4>
<ul>
<li>Track validation loss after every epoch. Training loss keeps falling, but validation loss starts rising when the model begins to overfit.</li>
<li>Stop when validation loss has not improved for a "patience" of, say, 5 epochs; restore the best weights.</li>
<li>Cheap, no change to the model; acts like limiting effective model capacity (similar effect to L2).</li>
</ul>
<p><b>Example:</b> Validation loss: epoch 8 = 0.31 (best), 9 = 0.33, 10 = 0.35 … with patience 3, training stops at epoch 11 and epoch-8 weights are kept.</p>
<p><b>Conclusion:</b> L2 keeps weights small, L1 makes them sparse, and early stopping stops before memorisation; all improve CNN generalisation.</p>`,
  hi: `<h4>1. L2 (weight decay)</h4>
<div class="formula">L = L<sub>0</sub> + λ Σ w<sup>2</sup> &nbsp;&nbsp; → &nbsp;&nbsp; w ← (1 − 2ηλ)w − η ∂L<sub>0</sub>/∂w</div>
<ul>
<li>Bade weights pe penalty; har step weights thode chhote ("decay").</li>
<li>Smooth model, chhote input badlaav se ghabrata nahi. CNN mein default (AlexNet 0.0005).</li>
</ul>
<h4>2. L1</h4>
<div class="formula">L = L<sub>0</sub> + λ Σ |w| &nbsp;&nbsp; → &nbsp;&nbsp; λ · sign(w)</div>
<ul><li>Kai weights bilkul zero – <b>sparse</b> model, pruning mein kaam ka.</li></ul>
<table>
<tr><th>Point</th><th>L1</th><th>L2</th></tr>
<tr><td>Penalty</td><td>λ Σ |w|</td><td>λ Σ w²</td></tr>
<tr><td>Asar</td><td>Bahut weights zero</td><td>Sab weights chhote</td></tr>
<tr><td>Naam</td><td>Lasso</td><td>Ridge / weight decay</td></tr>
<tr><td>CNN mein</td><td>Compression</td><td>Default</td></tr>
</table>
<h4>3. Early stopping</h4>
<ul>
<li>Har epoch ke baad validation loss dekho. Training loss girta rehta hai, par validation loss badhne lage toh model ratta maar raha hai.</li>
<li>"Patience" (jaise 5 epochs) tak sudhaar na ho toh ruk jao, best weights wapas lo.</li>
<li>Sasta, model badalna nahi padta.</li>
</ul>
<p><b>Example:</b> Epoch 8 pe val loss 0.31 (best), phir 0.33, 0.35… patience 3 → epoch 11 pe stop, epoch-8 ke weights rakho.</p>
<p><b>Desi example:</b> L2 = ghar ka budget – kisi ek kharche ko bahut bada mat hone do. L1 = faltu subscriptions band karke zero kar do. Early stopping = chai mein chini tab tak daalo jab tak swaad badhe; jaise hi zyada meethi lagne lage, ruk jao.</p>
<p><b>Conclusion:</b> L2 chhote weights, L1 sparse weights, early stopping ratte se pehle stop – teeno generalisation sudhaarte hain.</p>`,
  keys: ["L2 λΣw²", "weight decay", "L1 λΣ|w|", "sparsity", "early stopping", "validation loss", "patience", "restore best weights"],
  draw: "Training loss (falling) and validation loss (U-shaped) vs epochs with a vertical line at the early-stopping point.",
  fig: "unit3.html#q4",
  num: false
},
{
  id: "U3-24",
  unit: 3,
  topic: "Parameter sharing",
  q: "Calculate the number of learnable parameters in a convolution layer and compare it with a fully connected layer (numerical).",
  alt: [
    "Find the number of parameters of AlexNet's first convolution layer.",
    "How many parameters does a conv layer with K filters of size f×f on a C-channel input have?",
    "Show numerically how parameter sharing reduces parameters."
  ],
  marks: [2, 4],
  priority: "med",
  prob: 30,
  diff: 3,
  pyq: ["8AID 2025 A7", "7CAI 2025 A4"],
  why: "Numerical extension of the parameter-sharing PYQs; examiners may ask a count to test understanding.",
  short: "Conv params = K × (f×f×C + 1); e.g. 96 filters of 11×11×3 give 34,944, independent of image size, unlike FC layers.",
  en: `<p><b>Formulas</b></p>
<div class="formula">Conv layer: Params = K × (f × f × C<sub>in</sub> + 1) &nbsp;&nbsp; | &nbsp;&nbsp; FC layer: Params = n<sub>in</sub> × n<sub>out</sub> + n<sub>out</sub></div>
<p>Pooling, ReLU and flatten layers have 0 parameters.</p>
<h4>Example 1: small CNN layer</h4>
<pre>Input 32×32×3, 6 filters 5×5, s = 1, p = 0
Output = (32 - 5)/1 + 1 = 28 → 28×28×6 = 4704 values
Conv params = 6 × (5×5×3 + 1) = 6 × 76 = 456
FC to the same 4704 outputs:
  3072 × 4704 + 4704 = 14,450,688 + 4,704 = 14,455,392
Ratio ≈ 31,700 : 1</pre>
<h4>Example 2: AlexNet layers</h4>
<pre>Conv1: 96 × (11×11×3 + 1) = 96 × 364        =     34,944
FC6:   9216 × 4096 + 4096                   = 37,752,832
FC7:   4096 × 4096 + 4096                   = 16,781,312
FC8:   4096 × 1000 + 1000                   =  4,097,000
FC6 + FC7 + FC8 ≈ 58.6 M of AlexNet's ~60 M parameters</pre>
<h4>Example 3: same padding layer</h4>
<pre>Input 64×64×16, 32 filters 3×3, p = 1, s = 1
Output = (64 - 3 + 2)/1 + 1 = 64 → 64×64×32
Params = 32 × (3×3×16 + 1) = 32 × 145 = 4,640</pre>
<h4>Observations</h4>
<ul>
<li>Conv parameters depend only on f, C<sub>in</sub> and K, not on the image size (parameter sharing).</li>
<li>In classic CNNs the FC layers dominate the parameter count, which is why modern nets use global average pooling.</li>
</ul>
<p><b>Conclusion:</b> Always write the formula K(f²C + 1), substitute, and contrast with n<sub>in</sub>n<sub>out</sub> + n<sub>out</sub> for an FC layer.</p>`,
  hi: `<p><b>Formulas</b></p>
<div class="formula">Conv: Params = K × (f × f × C<sub>in</sub> + 1) &nbsp;&nbsp; | &nbsp;&nbsp; FC: Params = n<sub>in</sub> × n<sub>out</sub> + n<sub>out</sub></div>
<p>Pooling, ReLU, flatten – 0 parameters.</p>
<h4>Example 1</h4>
<pre>Input 32×32×3, 6 filters 5×5, s = 1, p = 0
Output = 28×28×6 = 4704
Conv params = 6 × (75 + 1) = 456
FC: 3072 × 4704 + 4704 = 14,455,392
Lagbhag 31,700 guna farak</pre>
<h4>Example 2: AlexNet</h4>
<pre>Conv1: 96 × (11×11×3 + 1) = 96 × 364 = 34,944
FC6:   9216 × 4096 + 4096           = 37,752,832
FC7:   4096 × 4096 + 4096           = 16,781,312
FC8:   4096 × 1000 + 1000           =  4,097,000
Teeno FC milake ≈ 5.86 crore (60 M mein se!)</pre>
<h4>Example 3</h4>
<pre>Input 64×64×16, 32 filters 3×3, p = 1
Output = 64×64×32
Params = 32 × (144 + 1) = 4,640</pre>
<h4>Dhyan do</h4>
<ul>
<li>Conv params sirf f, C<sub>in</sub>, K pe depend – image size pe nahi (parameter sharing).</li>
<li>Purane CNN mein FC layers mein sabse zyada params, isliye aaj GAP use hota hai.</li>
</ul>
<p><b>Desi example:</b> Ek stamp (filter) banwane ka kharcha ek baar – chahe 10 page pe lagao ya 10,000 pe. FC layer = har page ke liye alag stamp banwana.</p>
<p><b>Conclusion:</b> Formula K(f²C + 1) likho, values daalo, aur FC ke n<sub>in</sub>n<sub>out</sub> + n<sub>out</sub> se compare karo.</p>`,
  keys: ["K × (f×f×C + 1)", "bias per filter", "n_in × n_out + n_out", "pooling has no parameters", "independent of image size", "FC layers dominate AlexNet"],
  draw: "",
  fig: "unit3.html#q3",
  num: true
},
{
  id: "U3-25",
  unit: 3,
  topic: "Motivation for CNNs",
  q: "Differentiate between translation equivariance and translation invariance in CNNs.",
  alt: [
    "What is equivariance in convolution?",
    "How does pooling provide translation invariance?"
  ],
  marks: [2, 4],
  priority: "low",
  prob: 28,
  diff: 3,
  pyq: [],
  why: "Derived from the 'equivariance' part of the motivation sub-topic; a possible 2-mark twist.",
  short: "Equivariance: shifting the input shifts the feature map equally (convolution). Invariance: the output stays the same despite small shifts (pooling, global pooling).",
  en: `<p><b>Equivariance:</b> f is equivariant to a transformation g if f(g(x)) = g(f(x)). Convolution is <b>translation-equivariant</b>: if an object moves 5 pixels right in the image, its response in the feature map also moves 5 pixels right.</p>
<p><b>Invariance:</b> f is invariant to g if f(g(x)) = f(x). The output does not change when the input is shifted. <b>Pooling</b> gives approximate invariance to small shifts; global pooling + classifier makes the final label invariant to where the object is.</p>
<table>
<tr><th>Point</th><th>Equivariance</th><th>Invariance</th></tr>
<tr><td>Definition</td><td>f(g(x)) = g(f(x))</td><td>f(g(x)) = f(x)</td></tr>
<tr><td>Provided by</td><td>Convolution (parameter sharing)</td><td>Pooling, global pooling</td></tr>
<tr><td>Position info</td><td>Kept (where the feature is)</td><td>Discarded (only whether it exists)</td></tr>
<tr><td>Needed for</td><td>Detection, segmentation</td><td>Classification</td></tr>
</table>
<ul>
<li>Convolution is not naturally equivariant to rotation or scale; data augmentation helps there.</li>
</ul>
<p><b>Example:</b> Max-pool 2×2 on [0 9; 0 0] and [9 0; 0 0] both give 9: the 1-pixel shift is ignored (invariance).</p>
<p><b>Conclusion:</b> Convolution tells where a feature is (equivariant); pooling tells that it exists regardless of small shifts (invariant).</p>`,
  hi: `<p><b>Equivariance:</b> f(g(x)) = g(f(x)). Convolution translation-equivariant hai – photo mein object 5 pixel right gaya toh feature map mein bhi uska signal 5 pixel right.</p>
<p><b>Invariance:</b> f(g(x)) = f(x) – input khiska, output same. <b>Pooling</b> chhoti shift ke liye invariance deta hai; global pooling + classifier se final label position pe depend nahi karta.</p>
<table>
<tr><th>Point</th><th>Equivariance</th><th>Invariance</th></tr>
<tr><td>Definition</td><td>f(g(x)) = g(f(x))</td><td>f(g(x)) = f(x)</td></tr>
<tr><td>Kaun deta hai</td><td>Convolution</td><td>Pooling</td></tr>
<tr><td>Position info</td><td>Bachi rehti hai</td><td>Hat jaati hai</td></tr>
<tr><td>Kahan chahiye</td><td>Detection, segmentation</td><td>Classification</td></tr>
</table>
<ul><li>Rotation/scale ke liye conv khud se equivariant nahi – augmentation se help.</li></ul>
<p><b>Example:</b> [0 9; 0 0] aur [9 0; 0 0] dono ka max-pool = 9 – 1 pixel ki shift ignore.</p>
<p><b>Desi example:</b> GPS app (equivariant): aap chale toh map pe aapka dot bhi utna hi chala. Attendance register (invariant): aap class mein aage baitho ya peeche, "Present" hi likha jaayega.</p>
<p><b>Conclusion:</b> Convolution batata hai feature kahan hai; pooling batata hai feature hai ya nahi.</p>`,
  keys: ["equivariance f(g(x)) = g(f(x))", "invariance f(g(x)) = f(x)", "convolution", "pooling", "position information", "rotation not handled"],
  draw: "Two images with a shifted object and their feature maps showing a shifted blob (equivariance), then the same pooled output (invariance).",
  fig: "unit3.html#q5",
  num: false
},
{
  id: "U3-26",
  unit: 3,
  topic: "Applications of CNNs",
  q: "Differentiate image classification, object detection and image segmentation. How are CNNs used in each?",
  alt: [
    "How are CNNs used for object detection (R-CNN, YOLO)?",
    "Explain semantic vs instance segmentation.",
    "Explain CNN-based face recognition, medical imaging or self-driving applications."
  ],
  marks: [4, 10],
  priority: "low",
  prob: 25,
  diff: 3,
  pyq: ["7CAI 2025 B6"],
  why: "A deeper variant of the CV-applications PYQs; useful to enrich any applications answer.",
  short: "Classification gives one label per image, detection gives labelled bounding boxes (YOLO, Faster R-CNN), and segmentation labels every pixel (U-Net, Mask R-CNN).",
  en: `<h4>1. Image classification</h4>
<ul>
<li>Output: one label (or probabilities) for the whole image.</li>
<li>CNN: backbone (ResNet/VGG) → GAP/FC → softmax. Example: crop-disease or chest X-ray classification.</li>
</ul>
<h4>2. Object detection</h4>
<ul>
<li>Output: class + bounding box (x, y, w, h) for each object; multiple objects per image.</li>
<li><b>Two-stage:</b> R-CNN → Fast R-CNN → Faster R-CNN (Region Proposal Network proposes boxes, CNN classifies and refines them). Accurate.</li>
<li><b>One-stage:</b> YOLO, SSD predict boxes and classes in one pass over a grid. Real-time (CCTV, self-driving).</li>
<li>Metrics: IoU, mAP; non-max suppression removes duplicate boxes.</li>
</ul>
<h4>3. Image segmentation</h4>
<ul>
<li><b>Semantic:</b> label every pixel with a class (all cars = "car"). Fully Convolutional Networks, U-Net (encoder–decoder with skip connections), DeepLab.</li>
<li><b>Instance:</b> separate each object instance (car 1, car 2). Mask R-CNN = Faster R-CNN + mask branch.</li>
<li>Example: tumour boundary in MRI, drivable road area.</li>
</ul>
<table>
<tr><th>Task</th><th>Output</th><th>Models</th><th>Example</th></tr>
<tr><td>Classification</td><td>One label</td><td>AlexNet, ResNet</td><td>Cat vs dog</td></tr>
<tr><td>Detection</td><td>Boxes + labels</td><td>Faster R-CNN, YOLO, SSD</td><td>Pedestrians in traffic</td></tr>
<tr><td>Semantic segmentation</td><td>Class per pixel</td><td>FCN, U-Net</td><td>Road vs sidewalk</td></tr>
<tr><td>Instance segmentation</td><td>Mask per object</td><td>Mask R-CNN</td><td>Counting cells</td></tr>
</table>
<h4>4. Related applications</h4>
<ul>
<li><b>Face recognition:</b> detect face → align → CNN embedding (FaceNet, triplet loss) → compare distance; used in phone unlock, DigiYatra.</li>
<li><b>Medical imaging:</b> classification (pneumonia), detection (nodules), segmentation (organs, tumours).</li>
<li><b>Self-driving:</b> detection of cars/pedestrians/signs + segmentation of lanes and drivable area, fused with other sensors.</li>
</ul>
<p><b>Conclusion:</b> The same CNN backbone serves all three tasks; only the head and output change from one label, to boxes, to per-pixel masks.</p>`,
  hi: `<h4>1. Classification</h4>
<ul>
<li>Poori photo ka ek label.</li>
<li>Backbone (ResNet) → GAP/FC → softmax. Jaise X-ray normal ya pneumonia.</li>
</ul>
<h4>2. Object detection</h4>
<ul>
<li>Har object ka class + box (x, y, w, h); ek photo mein kai objects.</li>
<li><b>Two-stage:</b> R-CNN → Faster R-CNN – pehle box propose (RPN), phir classify. Accurate.</li>
<li><b>One-stage:</b> YOLO, SSD – ek hi pass mein, real-time (CCTV, gaadi).</li>
<li>IoU, mAP metrics; non-max suppression se duplicate box hatao.</li>
</ul>
<h4>3. Segmentation</h4>
<ul>
<li><b>Semantic:</b> har pixel ko class (saari gaadiyan = "car"). FCN, U-Net, DeepLab.</li>
<li><b>Instance:</b> har object alag (car 1, car 2). Mask R-CNN.</li>
<li>MRI mein tumour ka border, road ka drivable area.</li>
</ul>
<table>
<tr><th>Task</th><th>Output</th><th>Model</th><th>Example</th></tr>
<tr><td>Classification</td><td>Ek label</td><td>ResNet</td><td>Cat vs dog</td></tr>
<tr><td>Detection</td><td>Box + label</td><td>YOLO, Faster R-CNN</td><td>Traffic mein log</td></tr>
<tr><td>Semantic seg.</td><td>Har pixel class</td><td>U-Net</td><td>Road vs footpath</td></tr>
<tr><td>Instance seg.</td><td>Har object ka mask</td><td>Mask R-CNN</td><td>Cells ginna</td></tr>
</table>
<h4>4. Related</h4>
<ul>
<li><b>Face recognition:</b> face detect → align → embedding (FaceNet) → distance compare; phone unlock, DigiYatra.</li>
<li><b>Medical:</b> classification, detection (nodule), segmentation (tumour).</li>
<li><b>Self-driving:</b> detection + lane segmentation, baaki sensors ke saath.</li>
</ul>
<p><b>Desi example:</b> Shaadi ki group photo: "yeh shaadi ki photo hai" = classification; har rishtedaar ke chehre pe box = detection; har pixel ko "dulha / dulhan / background" mein rang dena = segmentation.</p>
<p><b>Conclusion:</b> Backbone same, sirf head badalta hai – ek label, boxes, ya har pixel ka mask.</p>`,
  keys: ["classification one label", "object detection bounding boxes", "R-CNN / Faster R-CNN", "YOLO / SSD", "IoU, mAP", "semantic segmentation", "instance segmentation", "U-Net", "Mask R-CNN", "FaceNet embedding"],
  draw: "Same street image three times: label 'street with car', boxes around car and person, colour mask over road/car/person pixels.",
  fig: "unit3.html#q1",
  num: false
}
);
