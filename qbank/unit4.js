window.QB = window.QB || [];
window.QB.push(
{
  id: "U4-01",
  unit: 4,
  topic: "Bidirectional RNN",
  q: "Define Bidirectional Recurrent Neural Networks (BRNNs). Explain their working with a diagram.",
  alt: ["What are bidirectional RNNs?","Explain the architecture of a BRNN and its applications.","Why does a BRNN give better results than a unidirectional RNN for NER/speech? What is its limitation?","Differentiate between unidirectional RNN and bidirectional RNN."],
  marks: [2,4],
  priority: "must",
  prob: 92,
  diff: 2,
  pyq: ["8AID 2025 A8","8AID 2024 A9"],
  why: "Asked in Part A of both 8AID papers back to back; very likely again (as 2-mark or 4-mark with diagram).",
  short: "A BRNN runs two RNNs on a sequence, one forward and one backward, and concatenates their hidden states so every output uses past and future context.",
  en: `<p><b>Definition:</b> A <b>Bidirectional RNN</b> (Schuster &amp; Paliwal, 1997) processes the same input sequence with <b>two separate recurrent layers</b>: a <b>forward</b> layer that reads x<sub>1</sub> → x<sub>T</sub> and a <b>backward</b> layer that reads x<sub>T</sub> → x<sub>1</sub>. At each time step the two hidden states are <b>concatenated</b>, so the output y<sub>t</sub> depends on both the <b>past and the future</b> of the sequence.</p>
<h4>Equations</h4>
<div class="formula">Forward: h→<sub>t</sub> = tanh(W<sub>f</sub> x<sub>t</sub> + V<sub>f</sub> h→<sub>t-1</sub> + b<sub>f</sub>)<br>Backward: h←<sub>t</sub> = tanh(W<sub>b</sub> x<sub>t</sub> + V<sub>b</sub> h←<sub>t+1</sub> + b<sub>b</sub>)<br>Output: y<sub>t</sub> = g(U [h→<sub>t</sub> ; h←<sub>t</sub>] + c)</div>
<h4>Working</h4>
<ol>
<li>The forward RNN runs left to right and stores h→<sub>1</sub> … h→<sub>T</sub>.</li>
<li>The backward RNN runs right to left and stores h←<sub>T</sub> … h←<sub>1</sub>.</li>
<li>The two layers have <b>separate weights</b> and do not feed into each other.</li>
<li>At every step t, [h→<sub>t</sub> ; h←<sub>t</sub>] goes to the output layer (softmax for tagging).</li>
<li>Both directions are trained jointly with BPTT; the cells can be simple RNN, LSTM (BiLSTM) or GRU.</li>
</ol>
<h4>Unidirectional vs bidirectional</h4>
<table><tr><th>Point</th><th>Unidirectional RNN</th><th>Bidirectional RNN</th></tr>
<tr><td>Context used</td><td>Past only</td><td>Past + future</td></tr>
<tr><td>Hidden layers</td><td>1 direction</td><td>2 (forward + backward)</td></tr>
<tr><td>Cost</td><td>1×</td><td>≈ 2× computation and parameters</td></tr>
<tr><td>Real-time use</td><td>Yes (streaming)</td><td>No, needs the whole sequence</td></tr></table>
<h4>Example</h4>
<p>"He said Teddy bears are on sale" vs "He said Teddy Roosevelt was a president": whether "Teddy" is a person can only be decided from the words that come <i>after</i> it. A BRNN sees them.</p>
<h4>Applications</h4>
<ul><li>Named Entity Recognition and POS tagging</li><li>Speech recognition (BiLSTM + CTC)</li><li>Encoder of machine translation models</li><li>Handwriting recognition, protein structure prediction</li></ul>
<h4>Limitations</h4>
<ul><li>Not usable for online / next-word prediction since the future is not available.</li><li>About double the compute and memory.</li></ul>
<p><b>Conclusion:</b> A BRNN gives each time step full-sentence context by combining a forward and a backward RNN.</p>`,
  hi: `<p><b>Definition:</b> Bidirectional RNN (BRNN) mein ek hi sequence ko <b>do RNN</b> padhte hain: ek <b>aage se</b> (x<sub>1</sub> → x<sub>T</sub>, forward) aur ek <b>peeche se</b> (x<sub>T</sub> → x<sub>1</sub>, backward). Har time step pe dono ke hidden states ko <b>jod (concatenate)</b> dete hain, toh output ko pichhla aur agla dono context milta hai.</p>
<h4>Formula</h4>
<div class="formula">Forward: h→<sub>t</sub> = tanh(W<sub>f</sub> x<sub>t</sub> + V<sub>f</sub> h→<sub>t-1</sub> + b<sub>f</sub>)<br>Backward: h←<sub>t</sub> = tanh(W<sub>b</sub> x<sub>t</sub> + V<sub>b</sub> h←<sub>t+1</sub> + b<sub>b</sub>)<br>Output: y<sub>t</sub> = g(U [h→<sub>t</sub> ; h←<sub>t</sub>] + c)</div>
<h4>Kaam kaise karta hai</h4>
<ol>
<li>Forward RNN left se right chalta hai, har word ke notes banata hai.</li>
<li>Backward RNN right se left chalta hai, apne alag notes banata hai.</li>
<li>Dono ke weights alag hote hain, ek doosre ko input nahi dete.</li>
<li>Har step pe dono notes jodkar output layer (softmax) ko dete hain.</li>
<li>Training BPTT se hoti hai; cell LSTM ho toh BiLSTM bolte hain.</li>
</ol>
<h4>Normal RNN vs BRNN</h4>
<table><tr><th>Point</th><th>Normal RNN</th><th>BRNN</th></tr>
<tr><td>Context</td><td>Sirf pichhla</td><td>Pichhla + agla</td></tr>
<tr><td>Cost</td><td>1×</td><td>Lagbhag 2×</td></tr>
<tr><td>Live prediction</td><td>Ho sakta hai</td><td>Nahi, poora sentence pehle chahiye</td></tr></table>
<h4>Desi example</h4>
<p>"Maine aam khaaya" vs "Yeh ek aam baat hai": "aam" fruit hai ya common, yeh baad waale words batate hain. Normal RNN sirf peeche dekhta hai, BRNN dono taraf, isliye sahi matlab pakad leta hai. Jaise exam mein MCQ ka option padhne se pehle poora question padhte ho.</p>
<h4>Applications</h4>
<ul><li>NER, POS tagging</li><li>Speech recognition (BiLSTM + CTC)</li><li>Translation ka encoder</li><li>Handwriting recognition</li></ul>
<h4>Limitation</h4>
<ul><li>Live typing / next-word prediction mein kaam nahi aata, kyunki future words hote hi nahi.</li><li>Double computation.</li></ul>
<p><b>Ek line:</b> BRNN = aage + peeche dono RNN, har word ko poore sentence ka context.</p>`,
  keys: ["forward layer","backward layer","concatenate","past and future context","separate weights","BiLSTM","NER","not for real-time"],
  draw: "Two rows of RNN cells over x1..x3: forward arrows left-to-right, backward arrows right-to-left, both feeding each y_t.",
  fig: "unit4.html#q3",
  num: false
},
{
  id: "U4-02",
  unit: 4,
  topic: "Encoder-decoder seq2seq",
  q: "Describe the encoder–decoder sequence-to-sequence architecture with a neat diagram. Explain the role of the context vector.",
  alt: ["What is the encoder-decoder model in seq2seq?","Explain seq2seq models for machine translation.","What is the bottleneck problem of the encoder-decoder and how is it solved?","Explain training and inference of a seq2seq model."],
  marks: [2,4,10],
  priority: "must",
  prob: 88,
  diff: 3,
  pyq: ["7CAI 2025 A5","7CAI 2025 B4"],
  why: "Asked twice in the 7CAI 2025 paper (Part A and Part B); a named syllabus sub-topic and natural 10-marker.",
  short: "An encoder RNN compresses the input sequence into a context vector; a decoder RNN generates the output sequence from it, e.g. English to Hindi translation.",
  en: `<p><b>Definition:</b> The <b>encoder–decoder (seq2seq)</b> architecture (Sutskever et al., 2014; Cho et al., 2014) maps an input sequence x<sub>1</sub>…x<sub>T</sub> to an output sequence y<sub>1</sub>…y<sub>T'</sub> whose <b>length can differ</b>. It uses two RNNs (usually LSTM/GRU).</p>
<h4>Components</h4>
<ul>
<li><b>Encoder:</b> reads the input one token at a time (as embeddings) and updates its hidden state. Its outputs are discarded; only the final state is kept.</li>
<li><b>Context vector C:</b> the encoder's final hidden (and cell) state, a fixed-length summary of the whole input. It initialises the decoder.</li>
<li><b>Decoder:</b> starting from &lt;START&gt;, generates one token per step using the previous token, its hidden state and C, until it emits &lt;END&gt;.</li>
</ul>
<div class="formula">Encoder: h<sub>t</sub> = f(x<sub>t</sub>, h<sub>t-1</sub>),  C = h<sub>T</sub><br>Decoder: s<sub>t</sub> = g(y<sub>t-1</sub>, s<sub>t-1</sub>, C),  P(y<sub>t</sub> | y<sub>&lt;t</sub>, x) = softmax(W s<sub>t</sub>)<br>Training objective: maximise Σ<sub>t</sub> log P(y<sub>t</sub> | y<sub>&lt;t</sub>, x)</div>
<h4>Training and inference</h4>
<ol>
<li>Training uses cross-entropy over the target tokens with <b>teacher forcing</b>: the true previous word is fed to the decoder.</li>
<li>Gradients flow back through decoder and encoder (BPTT); the whole model is trained end-to-end.</li>
<li>At inference the decoder feeds back its own prediction; decoding is <b>greedy</b> or <b>beam search</b>.</li>
</ol>
<h4>Bottleneck problem and attention</h4>
<p>One fixed-size vector C must hold the entire sentence, so quality falls for long inputs. <b>Attention</b> (Bahdanau, 2015) lets the decoder build a new context c<sub>t</sub> = Σ<sub>i</sub> α<sub>ti</sub> h<sub>i</sub> at every step from all encoder states. Sutskever also found that reversing the source sentence helped.</p>
<h4>Example</h4>
<p>"I love India" (3 tokens) → encoder → C → decoder → "मुझे भारत पसंद है &lt;END&gt;" (4 tokens).</p>
<h4>Applications</h4>
<ul><li>Machine translation</li><li>Text summarisation, chatbots, question answering</li><li>Speech-to-text</li><li>Image captioning (CNN encoder + LSTM decoder)</li></ul>
<h4>Advantages / limitations</h4>
<ul><li>+ Handles variable-length input and output; end-to-end training.</li><li>− Fixed context bottleneck, slow sequential decoding, exposure bias from teacher forcing.</li></ul>
<p><b>Conclusion:</b> The encoder "understands", the context vector "remembers" and the decoder "speaks"; attention removes the bottleneck.</p>`,
  hi: `<p><b>Definition:</b> Encoder–decoder (seq2seq) model ek input sequence ko ek output sequence mein badalta hai, aur dono ki <b>length alag</b> ho sakti hai (jaise English → Hindi). Isme do RNN (LSTM/GRU) hote hain.</p>
<h4>Parts</h4>
<ul>
<li><b>Encoder:</b> input ko word by word padhta hai aur hidden state update karta hai. Beech ke outputs phenk dete hain, sirf last state rakhte hain.</li>
<li><b>Context vector C:</b> encoder ki last hidden state = poore sentence ka "saar" ek fixed size vector mein. Yahi decoder ki starting state banti hai.</li>
<li><b>Decoder:</b> &lt;START&gt; se shuru karke ek-ek word bolta hai, pichhla word + apni state + C use karke, jab tak &lt;END&gt; na aa jaaye.</li>
</ul>
<div class="formula">Encoder: h<sub>t</sub> = f(x<sub>t</sub>, h<sub>t-1</sub>),  C = h<sub>T</sub><br>Decoder: s<sub>t</sub> = g(y<sub>t-1</sub>, s<sub>t-1</sub>, C),  P(y<sub>t</sub>) = softmax(W s<sub>t</sub>)</div>
<h4>Training aur inference</h4>
<ol>
<li>Training mein cross-entropy loss + <b>teacher forcing</b>: decoder ko sahi pichhla word diya jaata hai, uska apna guess nahi.</li>
<li>Poora model end-to-end BPTT se train hota hai.</li>
<li>Test time pe decoder apna hi output wapas leta hai; greedy ya beam search se words chunte hain.</li>
</ol>
<h4>Bottleneck aur attention</h4>
<p>Lamba sentence ho toh ek chhote vector C mein sab yaad nahi rehta, quality gir jaati hai. <b>Attention</b> mein decoder har step pe saare encoder states pe nazar daalta hai: c<sub>t</sub> = Σ α<sub>ti</sub> h<sub>i</sub>. Isi se aage Transformer bana.</p>
<h4>Desi example</h4>
<p>Dubhashiya (interpreter) socho: neta ji ka poora English bhaashan sunta hai, matlab dimaag mein rakhta hai (C), phir Hindi mein ek-ek shabd bolta hai. "I love India" (3 words) → "मुझे भारत पसंद है" (4 words), length alag fir bhi kaam ho gaya.</p>
<h4>Applications</h4>
<ul><li>Machine translation (Google Translate ka purana version)</li><li>Summarisation, chatbot</li><li>Speech-to-text</li><li>Image captioning (CNN encoder + LSTM decoder)</li></ul>
<h4>Fayde / nuksaan</h4>
<ul><li>+ Variable length input-output, end-to-end training.</li><li>− Fixed C ka bottleneck, decoding slow, teacher forcing se exposure bias.</li></ul>
<p><b>Ek line:</b> Encoder samajhta hai, C yaad rakhta hai, decoder bolta hai; attention bottleneck hatata hai.</p>`,
  keys: ["encoder","decoder","context vector","fixed-length","variable length","START/END tokens","teacher forcing","beam search","bottleneck","attention"],
  draw: "Encoder LSTM chain over 'I love India' -> box C -> decoder LSTM chain producing Hindi words, with previous output fed back.",
  fig: "unit4.html#q4",
  num: false
},
{
  id: "U4-03",
  unit: 4,
  topic: "RNN architecture",
  q: "Explain the architecture and working of a Recurrent Neural Network. Given a sequence prediction problem, propose how you would implement an RNN to solve it.",
  alt: ["What is an RNN? Explain with a diagram.","Design an RNN for next-word / time-series prediction.","How does an RNN maintain memory of previous inputs?","Why can't a feedforward network handle sequences?"],
  marks: [2,4,10],
  priority: "must",
  prob: 85,
  diff: 3,
  pyq: ["8AID 2025 B5"],
  why: "Asked as 8AID 2025 B5; RNN basics are the base of every Unit 4 question and appear in some form every paper.",
  short: "An RNN processes sequences by feeding its previous hidden state back with the current input, h_t = tanh(W_hh h_{t-1} + W_xh x_t + b), sharing weights over time.",
  en: `<p><b>Definition:</b> A <b>Recurrent Neural Network (RNN)</b> is a neural network for sequential data (text, speech, time series). It has a <b>feedback loop</b>: the hidden state from step t−1 is fed back with the input at step t, so the network carries a <b>memory</b> of the past. The <b>same weights</b> are used at every time step.</p>
<h4>Architecture</h4>
<ul><li><b>Input layer</b> x<sub>t</sub> (word embedding or feature vector).</li><li><b>Hidden layer</b> h<sub>t</sub> with a recurrent connection W<sub>hh</sub>.</li><li><b>Output layer</b> y<sub>t</sub> (softmax for classes, linear for regression).</li></ul>
<div class="formula">h<sub>t</sub> = tanh(W<sub>hh</sub> h<sub>t-1</sub> + W<sub>xh</sub> x<sub>t</sub> + b<sub>h</sub>)<br>y<sub>t</sub> = W<sub>hy</sub> h<sub>t</sub> + b<sub>y</sub>  (softmax for classification)</div>
<p><b>Unfolding:</b> the loop is drawn as a chain of copies, one per time step, all sharing W<sub>xh</sub>, W<sub>hh</sub>, W<sub>hy</sub>. Training uses <b>BPTT</b>.</p>
<h4>Why not a feedforward net?</h4>
<ul><li>Fixed input size; sequences vary in length.</li><li>No memory of order; RNN shares parameters across positions and captures order.</li></ul>
<h4>Implementation for sequence prediction (e.g. next-day temperature)</h4>
<ol>
<li><b>Data:</b> collect the daily series, min-max normalise, create sliding windows (days 1–7 → day 8, days 2–8 → day 9 …). Split train/val/test in time order.</li>
<li><b>Model:</b> input (7 × 1) → SimpleRNN/LSTM(32, tanh) → Dense(1, linear). Many-to-one.</li>
<li><b>Loss &amp; optimiser:</b> MSE, Adam (lr = 0.001).</li>
<li><b>Training:</b> BPTT over 7 steps, mini-batches, ~50 epochs, early stopping, gradient clipping (norm 1.0).</li>
<li><b>Evaluation:</b> RMSE / MAE on test data; plot predicted vs actual.</li>
<li><b>Prediction:</b> feed the latest 7 days; for multi-step forecasts feed predictions back in.</li>
</ol>
<p>For <b>next-word prediction</b>: tokens → embedding → RNN → softmax over vocabulary, cross-entropy loss, evaluated by perplexity.</p>
<h4>Small worked example</h4>
<p>W<sub>xh</sub> = 0.5, W<sub>hh</sub> = 0.8, h<sub>0</sub> = 0, x = [1, 2]: h<sub>1</sub> = tanh(0.5) = 0.462; h<sub>2</sub> = tanh(0.8×0.462 + 1.0) = tanh(1.370) = 0.879. h<sub>2</sub> depends on x<sub>1</sub>: this is memory.</p>
<h4>Advantages / limitations</h4>
<ul><li>+ Variable-length input, parameter sharing, models order.</li><li>− Vanishing/exploding gradients, slow sequential training, short memory → LSTM/GRU.</li></ul>
<p><b>Applications:</b> language modelling, speech, translation, sentiment, stock/weather forecasting.</p>
<p><b>Conclusion:</b> An RNN is a network with a loop; data windowing → RNN → loss → BPTT → evaluation is the standard recipe for sequence prediction.</p>`,
  hi: `<p><b>Definition:</b> RNN aisa neural network hai jo sequence data (text, awaaz, time series) ke liye bana hai. Isme ek <b>loop</b> hota hai: pichhle step ki hidden state (notes) agle step ke input ke saath wapas aati hai, isliye network ko pichhli baatein <b>yaad</b> rehti hain. Har step pe <b>same weights</b>.</p>
<h4>Architecture</h4>
<ul><li>Input x<sub>t</sub> (word embedding ya feature).</li><li>Hidden state h<sub>t</sub> jisme recurrent weight W<sub>hh</sub> hai.</li><li>Output y<sub>t</sub> (classification ke liye softmax, regression ke liye linear).</li></ul>
<div class="formula">h<sub>t</sub> = tanh(W<sub>hh</sub> h<sub>t-1</sub> + W<sub>xh</sub> x<sub>t</sub> + b<sub>h</sub>)<br>y<sub>t</sub> = W<sub>hy</sub> h<sub>t</sub> + b<sub>y</sub></div>
<p><b>Unfolding:</b> loop ko time ke hisaab se khol ke chain bana dete hain, har copy same weights use karti hai. Training BPTT se.</p>
<h4>Feedforward kyun nahi?</h4>
<ul><li>Uska input size fixed hota hai, sentence ki length badalti rehti hai.</li><li>Order ki samajh nahi; RNN order pakadta hai.</li></ul>
<h4>Implementation (kal ka temperature predict karna)</h4>
<ol>
<li><b>Data:</b> rozana temperature lo, normalise karo, 7-7 din ki sliding window banao (1–7 → 8, 2–8 → 9). Time order mein train/test split, shuffle nahi.</li>
<li><b>Model:</b> input (7×1) → RNN/LSTM(32) → Dense(1). Many-to-one.</li>
<li><b>Loss:</b> MSE, optimiser Adam.</li>
<li><b>Training:</b> BPTT, mini-batch, early stopping, gradient clipping.</li>
<li><b>Evaluation:</b> RMSE/MAE, graph mein predicted vs actual.</li>
<li><b>Predict:</b> last 7 din do, kal ka mil jaayega.</li>
</ol>
<p>Next-word ke liye: word → embedding → RNN → softmax (poori vocabulary), loss cross-entropy.</p>
<h4>Chhota hisaab</h4>
<p>W<sub>xh</sub>=0.5, W<sub>hh</sub>=0.8, x=[1,2]: h<sub>1</sub>=tanh(0.5)=0.462, h<sub>2</sub>=tanh(0.37+1.0)=0.879. h<sub>2</sub> mein x<sub>1</sub> ka asar hai = memory.</p>
<h4>Desi example</h4>
<p>Cricket commentary suno: "Kohli ne ___" ke baad "chauka maara" aayega, kyunki pichhle words yaad hain. RNN bhi word by word padhte hue yaad rakhta hai. Ya TV serial: pichhla episode yaad ho tabhi aaj ka samajh aata hai.</p>
<h4>Fayde / kamiyan</h4>
<ul><li>+ Koi bhi length, weight sharing, order samajhta hai.</li><li>− Vanishing gradient, slow training, chhoti memory → isliye LSTM/GRU.</li></ul>
<p><b>Ek line:</b> RNN = loop waala network; window → RNN → loss → BPTT → evaluate.</p>`,
  keys: ["hidden state","recurrent connection","weight sharing","unfolding","BPTT","sliding window","many-to-one","MSE / cross-entropy","RMSE"],
  draw: "Folded RNN with self-loop, and the unfolded chain x1->h1->h2->h3 with outputs y_t, labelled U, W, V shared.",
  fig: "unit4.html#q1",
  num: false
},
{
  id: "U4-04",
  unit: 4,
  topic: "RNN vs LSTM vs GRU",
  q: "Compare RNN, LSTM and GRU in terms of structure, training efficiency and applications.",
  alt: ["Differentiate between LSTM and GRU.","Why are LSTM and GRU preferred over simple RNNs?","Which recurrent model would you choose for a long sequence task and why?"],
  marks: [4,10],
  priority: "must",
  prob: 82,
  diff: 4,
  pyq: ["7CAI 2025 C4"],
  why: "A 10-mark question in 7CAI 2025 and LSTM appeared in 8AID 2025 C4; a comparison is the favourite examiner format.",
  short: "Simple RNN has one tanh layer and forgets long context; LSTM adds a cell state and 3 gates; GRU uses 2 gates, fewer parameters, similar accuracy.",
  en: `<p><b>Introduction:</b> All three are recurrent networks that process sequences step by step with shared weights. They differ in how the hidden state is updated and therefore in how well they remember long-term dependencies.</p>
<h4>1. Simple (vanilla) RNN</h4>
<div class="formula">h<sub>t</sub> = tanh(W<sub>hh</sub> h<sub>t-1</sub> + W<sub>xh</sub> x<sub>t</sub> + b)</div>
<ul><li>One tanh layer, hidden state only.</li><li>Gradients multiply by W<sub>hh</sub>·tanh′ at every step → vanishing/exploding gradients; memory of ~10 steps.</li></ul>
<h4>2. LSTM (Hochreiter &amp; Schmidhuber, 1997)</h4>
<div class="formula">f<sub>t</sub> = σ(W<sub>f</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>f</sub>),  i<sub>t</sub> = σ(W<sub>i</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>i</sub>),  o<sub>t</sub> = σ(W<sub>o</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>o</sub>)<br>C̃<sub>t</sub> = tanh(W<sub>C</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>C</sub>)<br>C<sub>t</sub> = f<sub>t</sub> ⊙ C<sub>t-1</sub> + i<sub>t</sub> ⊙ C̃<sub>t</sub>,  h<sub>t</sub> = o<sub>t</sub> ⊙ tanh(C<sub>t</sub>)</div>
<ul><li>Separate <b>cell state</b> plus forget, input and output gates.</li><li>Additive cell update keeps gradients alive over hundreds of steps.</li></ul>
<h4>3. GRU (Cho et al., 2014)</h4>
<div class="formula">z<sub>t</sub> = σ(W<sub>z</sub>[h<sub>t-1</sub>, x<sub>t</sub>]),  r<sub>t</sub> = σ(W<sub>r</sub>[h<sub>t-1</sub>, x<sub>t</sub>])<br>h̃<sub>t</sub> = tanh(W[r<sub>t</sub> ⊙ h<sub>t-1</sub>, x<sub>t</sub>]),  h<sub>t</sub> = (1 − z<sub>t</sub>) ⊙ h<sub>t-1</sub> + z<sub>t</sub> ⊙ h̃<sub>t</sub></div>
<ul><li>Update gate merges LSTM's forget + input gates; reset gate controls how much past enters the candidate.</li><li>No separate cell state, no output gate.</li></ul>
<h4>Comparison table</h4>
<table><tr><th>Point</th><th>Simple RNN</th><th>LSTM</th><th>GRU</th></tr>
<tr><td>Gates</td><td>None</td><td>3 (forget, input, output)</td><td>2 (update, reset)</td></tr>
<tr><td>Memory states</td><td>h<sub>t</sub></td><td>h<sub>t</sub> and C<sub>t</sub></td><td>h<sub>t</sub> only</td></tr>
<tr><td>Weight blocks</td><td>1</td><td>4</td><td>3</td></tr>
<tr><td>Parameters (n units, m inputs)</td><td>n(n+m)+n</td><td>4[n(n+m)+n]</td><td>3[n(n+m)+n]</td></tr>
<tr><td>Long-term dependencies</td><td>Poor</td><td>Excellent</td><td>Very good</td></tr>
<tr><td>Vanishing gradient</td><td>Severe</td><td>Largely solved</td><td>Largely solved</td></tr>
<tr><td>Training speed</td><td>Fast per step, unstable</td><td>Slowest, most memory</td><td>Faster than LSTM</td></tr>
<tr><td>Data need</td><td>Low</td><td>High</td><td>Works on smaller data</td></tr>
<tr><td>Applications</td><td>Short sequences, simple time series</td><td>Speech recognition, translation, long text, handwriting</td><td>Real-time / mobile NLP, sentiment, music</td></tr></table>
<h4>How to choose</h4>
<ol><li>Short sequences, small compute → simple RNN.</li><li>Long sequences, large data, accuracy critical → LSTM.</li><li>Limited data or need speed → GRU (often similar accuracy, about 25% fewer parameters than LSTM).</li></ol>
<h4>Example</h4>
<p>"I grew up in France … (40 words) … I speak fluent ___": a simple RNN has lost "France"; LSTM/GRU keep it and predict "French".</p>
<p><b>Conclusion:</b> LSTM and GRU fix the vanishing-gradient weakness of simple RNNs through gating; GRU trades a little flexibility for speed.</p>`,
  hi: `<p><b>Intro:</b> Teeno recurrent networks hain jo sequence ko step by step padhte hain aur weights share karte hain. Fark yeh hai ki memory kaise update hoti hai, aur isi se lambi baat yaad rehti hai ya nahi.</p>
<h4>1. Simple RNN</h4>
<div class="formula">h<sub>t</sub> = tanh(W<sub>hh</sub> h<sub>t-1</sub> + W<sub>xh</sub> x<sub>t</sub> + b)</div>
<ul><li>Bas ek tanh layer, sirf hidden state.</li><li>Gradient har step pe multiply hota hai → vanishing/exploding; memory "goldfish" jaisi, ~10 steps.</li></ul>
<h4>2. LSTM</h4>
<div class="formula">C<sub>t</sub> = f<sub>t</sub> ⊙ C<sub>t-1</sub> + i<sub>t</sub> ⊙ C̃<sub>t</sub>,  h<sub>t</sub> = o<sub>t</sub> ⊙ tanh(C<sub>t</sub>)</div>
<ul><li>Alag <b>cell state</b> (diary) + 3 gates: forget (kya mitaana), input (kya likhna), output (kya bolna).</li><li>Diary mein update <b>jod</b> ke hota hai, isliye gradient lambe time tak zinda rehta hai.</li></ul>
<h4>3. GRU</h4>
<div class="formula">h<sub>t</sub> = (1 − z<sub>t</sub>) ⊙ h<sub>t-1</sub> + z<sub>t</sub> ⊙ h̃<sub>t</sub></div>
<ul><li>Sirf 2 gates: update gate (forget+input ka combo) aur reset gate.</li><li>Alag cell state nahi, output gate nahi → halka aur fast.</li></ul>
<h4>Table</h4>
<table><tr><th>Point</th><th>RNN</th><th>LSTM</th><th>GRU</th></tr>
<tr><td>Gates</td><td>0</td><td>3</td><td>2</td></tr>
<tr><td>States</td><td>h</td><td>h + C</td><td>h</td></tr>
<tr><td>Weight blocks</td><td>1</td><td>4</td><td>3</td></tr>
<tr><td>Lambi memory</td><td>Kamzor</td><td>Best</td><td>Bahut achhi</td></tr>
<tr><td>Speed</td><td>Fast par unstable</td><td>Sabse slow</td><td>LSTM se fast</td></tr>
<tr><td>Use</td><td>Chhote sequence</td><td>Speech, translation, lamba text</td><td>Mobile / real-time, sentiment</td></tr></table>
<h4>Kab kya lein</h4>
<ol><li>Chhota sequence, kam compute → simple RNN.</li><li>Lamba sequence, bahut data, accuracy chahiye → LSTM.</li><li>Kam data ya speed chahiye → GRU (~25% kam parameters, accuracy lagbhag same).</li></ol>
<h4>Desi example</h4>
<p>Simple RNN = woh dost jo 2 minute pehle ki baat bhool jaata hai. LSTM = dost jiske paas diary hai aur woh decide karta hai kya likhna, kya kaatna, kya batana. GRU = chhoti pocket diary, kaam wahi, bojh kam. "Main Jaipur mein pala-badha … (bahut baad) … isliye main fluent ___ bolta hoon" → LSTM/GRU "Rajasthani/Hindi" yaad rakhte hain.</p>
<p><b>Ek line:</b> Gates ki wajah se LSTM/GRU lambi memory rakhte hain; GRU thoda simple aur fast.</p>`,
  keys: ["cell state","forget/input/output gates","update/reset gates","vanishing gradient","parameters 4x vs 3x","long-term dependencies","training speed"],
  draw: "Side-by-side cells: RNN (single tanh), LSTM (cell line on top + 3 sigmoid gates), GRU (z and r gates).",
  fig: "unit4.html#q2",
  num: false
},
{
  id: "U4-05",
  unit: 4,
  topic: "LSTM",
  q: "Explain the architecture of an LSTM cell with its gates. How does LSTM solve the vanishing gradient problem of RNNs?",
  alt: ["What is LSTM? Draw the LSTM cell.","Explain forget, input and output gates.","What is the cell state in LSTM?","Why is LSTM better than a simple RNN for long sequences?"],
  marks: [2,4,10],
  priority: "must",
  prob: 80,
  diff: 4,
  pyq: ["7CAI 2025 C4","8AID 2025 C4"],
  why: "Core named sub-topic; LSTM was central to 8AID 2025 C4 and 7CAI 2025 C4, yet never asked alone, so a direct LSTM question is due.",
  short: "LSTM is an RNN with a cell state and forget, input and output gates; the additive cell update preserves gradients, letting it learn long-term dependencies.",
  en: `<p><b>Definition:</b> <b>Long Short-Term Memory (LSTM)</b>, proposed by Hochreiter &amp; Schmidhuber (1997; forget gate added by Gers et al., 2000), is a gated RNN that can learn <b>long-term dependencies</b>. Besides the hidden state h<sub>t</sub> it maintains a <b>cell state C<sub>t</sub></b>, a memory "conveyor belt" modified only through gates.</p>
<h4>Gates (each a sigmoid layer, output 0–1)</h4>
<div class="formula">Forget: f<sub>t</sub> = σ(W<sub>f</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>f</sub>)<br>Input: i<sub>t</sub> = σ(W<sub>i</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>i</sub>)<br>Candidate: C̃<sub>t</sub> = tanh(W<sub>C</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>C</sub>)<br>Cell: C<sub>t</sub> = f<sub>t</sub> ⊙ C<sub>t-1</sub> + i<sub>t</sub> ⊙ C̃<sub>t</sub><br>Output: o<sub>t</sub> = σ(W<sub>o</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>o</sub>)<br>Hidden: h<sub>t</sub> = o<sub>t</sub> ⊙ tanh(C<sub>t</sub>)</div>
<ul>
<li><b>Forget gate:</b> what fraction of old memory to keep (0 = erase, 1 = keep).</li>
<li><b>Input gate + candidate:</b> what new information to write into memory.</li>
<li><b>Output gate:</b> what part of memory to expose as h<sub>t</sub>.</li>
<li>⊙ = element-wise multiplication; σ = sigmoid.</li>
</ul>
<h4>Working (one time step)</h4>
<ol><li>Concatenate h<sub>t-1</sub> and x<sub>t</sub>.</li><li>Forget gate scales old cell state.</li><li>Input gate scales the candidate and adds it.</li><li>Output gate filters tanh(C<sub>t</sub>) to give h<sub>t</sub>, which goes to the output layer and the next step.</li></ol>
<h4>Why it solves vanishing gradients</h4>
<ul>
<li>In a simple RNN, ∂h<sub>t</sub>/∂h<sub>t-1</sub> = W<sub>hh</sub><sup>T</sup> diag(tanh′), multiplied over many steps → shrinks exponentially.</li>
<li>In LSTM the cell is updated <b>additively</b>; along the cell path ∂C<sub>t</sub>/∂C<sub>t-1</sub> ≈ f<sub>t</sub> (no repeated weight matrix, no squashing).</li>
<li>When f<sub>t</sub> ≈ 1 the gradient passes almost unchanged through hundreds of steps: the <b>constant error carousel</b>. Forget-gate bias is often initialised to 1 for this reason.</li>
<li>Gates are learned, so the network decides what to remember. (Exploding gradients still need clipping.)</li>
</ul>
<h4>Parameters</h4>
<p>4 weight blocks: 4 × [n(n + m) + n] for n units and m inputs. E.g. n = 128, m = 100 → 4 × (128×228 + 128) = 117,248.</p>
<h4>Example</h4>
<p>"The cat, which ate all the fish that the neighbours bought, <b>was</b> full": the LSTM keeps "cat = singular" in C<sub>t</sub> across the clause and picks "was".</p>
<h4>Applications</h4>
<ul><li>Speech recognition, machine translation, handwriting recognition</li><li>Text generation, sentiment, time-series forecasting, video captioning</li></ul>
<h4>Limitations</h4>
<ul><li>4× parameters of an RNN, slow sequential training; largely replaced by Transformers for very long text.</li></ul>
<p><b>Conclusion:</b> Gates + additive cell state = long memory and stable gradients.</p>`,
  hi: `<p><b>Definition:</b> LSTM (Long Short-Term Memory, Hochreiter &amp; Schmidhuber 1997) ek special RNN hai jo <b>lambi baatein yaad</b> rakh sakta hai. Hidden state h<sub>t</sub> ke alawa iske paas ek <b>cell state C<sub>t</sub></b> hoti hai, ek diary ya conveyor belt jisme sirf gates ke through hi badlaav hota hai.</p>
<h4>Gates (sigmoid, value 0 se 1)</h4>
<div class="formula">f<sub>t</sub> = σ(W<sub>f</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>f</sub>)<br>i<sub>t</sub> = σ(W<sub>i</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>i</sub>),  C̃<sub>t</sub> = tanh(W<sub>C</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>C</sub>)<br>C<sub>t</sub> = f<sub>t</sub> ⊙ C<sub>t-1</sub> + i<sub>t</sub> ⊙ C̃<sub>t</sub><br>o<sub>t</sub> = σ(W<sub>o</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>o</sub>),  h<sub>t</sub> = o<sub>t</sub> ⊙ tanh(C<sub>t</sub>)</div>
<ul>
<li><b>Forget gate:</b> purani diary mein se kya mitaana hai (0 = poora mitao, 1 = rakho).</li>
<li><b>Input gate:</b> nayi kaunsi baat likhni hai.</li>
<li><b>Output gate:</b> diary ka kaunsa hissa abhi bolna hai (h<sub>t</sub>).</li>
</ul>
<h4>Ek step mein kya hota hai</h4>
<ol><li>h<sub>t-1</sub> aur x<sub>t</sub> jodo.</li><li>Forget gate purani memory ko scale karta hai.</li><li>Input gate nayi info add karta hai.</li><li>Output gate se h<sub>t</sub> nikalta hai, jo output aur agle step dono ko jaata hai.</li></ol>
<h4>Vanishing gradient kaise solve hota hai</h4>
<ul>
<li>Simple RNN mein gradient har step pe W<sub>hh</sub> aur tanh′ se multiply hota hai, toh 0.5 × 0.5 × … jaisa chhota hota jaata hai.</li>
<li>LSTM mein cell update <b>plus (+)</b> se hota hai; cell path pe ∂C<sub>t</sub>/∂C<sub>t-1</sub> ≈ f<sub>t</sub>.</li>
<li>Agar f<sub>t</sub> ≈ 1, toh gradient bina ghate sau steps tak chala jaata hai: isko <b>constant error carousel</b> kehte hain.</li>
<li>Exploding ke liye phir bhi clipping lagti hai.</li>
</ul>
<h4>Parameters</h4>
<p>4 weight blocks: 4 × [n(n+m)+n]. n=128, m=100 → 117,248 parameters.</p>
<h4>Desi example</h4>
<p>Class ka topper apni notebook mein sirf important points rakhta hai, faltu cheezein kaat deta hai (forget), naye formula likhta hai (input), aur exam mein sirf zaroori answer likhta hai (output). Sentence: "Woh ladka, jo kal Delhi se train pakad ke aaya tha, bahut thaka <b>hua tha</b>" → LSTM "ladka" (male, singular) yaad rakhta hai aur "hua tha" sahi chunta hai.</p>
<h4>Applications</h4>
<ul><li>Speech recognition, translation, handwriting</li><li>Text generation, sentiment, stock/weather forecasting</li></ul>
<h4>Kamiyan</h4>
<ul><li>RNN se 4 guna parameters, training slow; bahut lambe text ke liye ab Transformer.</li></ul>
<p><b>Ek line:</b> Gates + jodne waali cell state = lambi memory aur stable gradient.</p>`,
  keys: ["cell state","forget gate","input gate","output gate","sigmoid","C_t = f_t*C_{t-1} + i_t*C~_t","additive update","constant error carousel","long-term dependencies"],
  draw: "LSTM cell: horizontal cell-state line on top with x (forget) and + (input) nodes; three sigma gates and tanh blocks below; h_t out.",
  fig: "unit4.html#q2",
  num: false
},
{
  id: "U4-06",
  unit: 4,
  topic: "Speech recognition pipeline",
  q: "Propose a deep learning pipeline for speech recognition, detailing each step from pre-processing to LSTM model evaluation.",
  alt: ["Explain the application of RNN/LSTM in speech recognition.","Explain an end-to-end ASR system with BiLSTM and CTC.","How is a speech recognition model evaluated?"],
  marks: [4,10],
  priority: "must",
  prob: 75,
  diff: 4,
  pyq: ["8AID 2025 C4"],
  why: "Full 10-marker in 8AID 2025 C4; speech recognition is a named application in the syllabus.",
  short: "Audio → preprocessing (16 kHz, framing, windowing) → MFCC → stacked BiLSTM → CTC loss → beam-search decoding with LM → evaluate by WER.",
  en: `<p><b>Goal:</b> <b>Automatic Speech Recognition (ASR)</b> converts an audio waveform into text. A deep pipeline replaces hand-built HMM-GMM components with an end-to-end LSTM model.</p>
<h4>1. Data collection</h4>
<ul><li>Audio + transcripts (LibriSpeech, Common Voice); many speakers, accents, noise. Split train/val/test by speaker.</li></ul>
<h4>2. Pre-processing</h4>
<ul><li>Mono, resample to 16 kHz, amplitude normalisation.</li><li>Noise reduction, silence trimming (voice activity detection).</li><li>Pre-emphasis: y[n] = x[n] − 0.97 x[n−1].</li><li><b>Framing</b> ~25 ms frames with 10 ms hop; <b>Hamming window</b> on each frame.</li></ul>
<h4>3. Feature extraction</h4>
<ul><li>FFT → power spectrum → Mel filter bank → log → DCT → <b>MFCC</b> (13 + Δ + ΔΔ = 39 per frame), or 80-bin log-Mel spectrogram.</li><li>Cepstral mean-variance normalisation; augmentation (SpecAugment, speed, noise).</li></ul>
<h4>4. Label preparation</h4>
<ul><li>Normalise text, tokenise to characters/sub-words, add a <b>blank</b> symbol for CTC.</li></ul>
<h4>5. Model</h4>
<ul><li>Input (T × 39) → optional CNN (downsampling) → 3–5 stacked <b>BiLSTM</b> layers (256–512 units, dropout 0.2–0.3) → Dense + softmax over characters + blank at every frame.</li></ul>
<h4>6. Loss and training</h4>
<ul><li><b>CTC loss</b>: sums probabilities of all frame alignments that collapse to the transcript, so no frame-level labels are needed.</li><li>Adam (lr ≈ 1e-3 with decay), length-sorted mini-batches, BPTT, <b>gradient clipping</b>, early stopping on validation WER.</li></ul>
<h4>7. Decoding</h4>
<ul><li>Greedy: best symbol per frame, merge repeats, remove blanks.</li><li>Beam search with an n-gram / neural <b>language model</b> for fluent text.</li></ul>
<h4>8. Evaluation</h4>
<div class="formula">WER = (S + D + I) / N</div>
<p>Ref "the cat sat on the mat" (N = 6), hyp "the cat sit on mat today": S = 1, D = 1, I = 1 → WER = 3/6 = 50%. Also report CER and real-time factor.</p>
<h4>9. Deployment</h4>
<ul><li>Export (TFLite/ONNX), quantise, use unidirectional LSTM for streaming, monitor errors.</li></ul>
<table><tr><th>Stage</th><th>Output</th></tr><tr><td>Preprocess</td><td>Clean 25 ms frames</td></tr><tr><td>Features</td><td>39-d MFCC per frame</td></tr><tr><td>BiLSTM + softmax</td><td>Per-frame char probabilities</td></tr><tr><td>CTC decode + LM</td><td>Text</td></tr><tr><td>Evaluate</td><td>WER / CER</td></tr></table>
<p><b>Example:</b> Google voice typing / Alexa: "call mom" → MFCC frames → BiLSTM → "c a l l _ m o m" → LM fixes "coal mom" to "call mom".</p>
<p><b>Challenges:</b> accents, background noise, homophones, code-mixing (Hinglish), low-resource languages.</p>
<p><b>Conclusion:</b> Preprocess → MFCC → BiLSTM + CTC → beam search + LM → WER is the standard deep ASR pipeline.</p>`,
  hi: `<p><b>Goal:</b> ASR (Automatic Speech Recognition) = awaaz ko text mein badalna. Deep learning pipeline mein poora kaam ek LSTM model end-to-end seekhta hai.</p>
<h4>1. Data</h4>
<ul><li>Audio + uska transcript (LibriSpeech, Common Voice). Alag-alag log, accent, shor. Speaker ke hisaab se split.</li></ul>
<h4>2. Pre-processing</h4>
<ul><li>Mono, 16 kHz pe resample, volume normalise.</li><li>Shor hatao, chup waale hisse kaato (VAD).</li><li>Pre-emphasis se high frequency boost.</li><li>25 ms ke chhote frames, 10 ms hop; har frame pe Hamming window.</li></ul>
<h4>3. Feature extraction</h4>
<ul><li>FFT → Mel filter bank → log → DCT = <b>MFCC</b> (13 + Δ + ΔΔ = 39 numbers per frame). Yeh awaaz ka "fingerprint" hai.</li><li>Augmentation: SpecAugment, speed change, noise add.</li></ul>
<h4>4. Labels</h4>
<ul><li>Text ko lower-case karke characters mein todo, CTC ke liye ek <b>blank</b> token jodo.</li></ul>
<h4>5. Model</h4>
<ul><li>Input (T×39) → CNN (optional) → 3–5 <b>BiLSTM</b> layers → softmax har frame pe (characters + blank).</li></ul>
<h4>6. Loss aur training</h4>
<ul><li><b>CTC loss</b>: kaunsa frame kis akshar ka hai yeh batana nahi padta, CTC khud saare alignments jod leta hai.</li><li>Adam, mini-batch, BPTT, gradient clipping, early stopping.</li></ul>
<h4>7. Decoding</h4>
<ul><li>Greedy: har frame ka best akshar, repeat merge, blank hatao.</li><li>Beam search + language model, taaki sentence sahi bane.</li></ul>
<h4>8. Evaluation</h4>
<div class="formula">WER = (S + D + I) / N</div>
<p>Ref "the cat sat on the mat" (6 words), output "the cat sit on mat today": S=1, D=1, I=1 → WER = 3/6 = 50%. Kam WER = achha model.</p>
<h4>9. Deployment</h4>
<ul><li>TFLite/ONNX, quantisation, live ke liye unidirectional LSTM.</li></ul>
<h4>Desi example</h4>
<p>Phone mein bolo "मम्मी को कॉल करो". Phone awaaz saaf karta hai, 25 ms ke tukde, har tukde ka MFCC, BiLSTM akshar pehchaanta hai, language model "mummy ko call karo" sahi banata hai. Jaise exam copy check karna: galat words (S), chhoote words (D), extra words (I) gin ke WER.</p>
<p><b>Mushkilein:</b> accent, shor, Hinglish code-mixing, kam data waali bhashayein.</p>
<p><b>Ek line:</b> Preprocess → MFCC → BiLSTM + CTC → beam search + LM → WER.</p>`,
  keys: ["16 kHz resampling","framing 25 ms / 10 ms","Hamming window","MFCC 39","BiLSTM","CTC loss","blank token","beam search + language model","WER = (S+D+I)/N","CER"],
  draw: "Flowchart: audio -> preprocess -> MFCC -> BiLSTM layers -> softmax -> CTC -> beam search + LM -> text -> WER.",
  fig: "unit4.html#q5",
  num: false
},
{
  id: "U4-07",
  unit: 4,
  topic: "BPTT",
  q: "Explain Backpropagation Through Time (BPTT) for training RNNs. What problems arise and how are they handled?",
  alt: ["How are RNNs trained?","Derive the gradient of the loss with respect to W_hh in BPTT.","Differentiate between backpropagation and BPTT."],
  marks: [2,4,10],
  priority: "high",
  prob: 60,
  diff: 4,
  pyq: [],
  why: "Never asked yet but a named syllabus sub-topic and core concept (backprop is asked every paper in Unit 1) — due.",
  short: "BPTT unfolds the RNN over time, does a forward pass, then back-propagates errors from the last step to the first, summing gradients of the shared weights.",
  en: `<p><b>Definition:</b> <b>Backpropagation Through Time (BPTT)</b> is the standard algorithm for training RNNs: the network is <b>unfolded</b> into a deep feedforward chain (one layer per time step, all sharing weights) and ordinary backpropagation is applied to it.</p>
<h4>Steps</h4>
<ol>
<li><b>Unfold</b> the RNN for T steps; every copy shares W<sub>xh</sub>, W<sub>hh</sub>, W<sub>hy</sub>.</li>
<li><b>Forward pass:</b> compute h<sub>1</sub>…h<sub>T</sub>, outputs y<sub>t</sub> and losses L<sub>t</sub>; total L = Σ<sub>t</sub> L<sub>t</sub>.</li>
<li><b>Backward pass:</b> from t = T down to 1 apply the chain rule; the error at h<sub>t</sub> comes from y<sub>t</sub> and from h<sub>t+1</sub>.</li>
<li><b>Accumulate:</b> since weights are shared, ∂L/∂W = Σ<sub>t</sub> ∂L<sub>t</sub>/∂W.</li>
<li><b>Update:</b> W ← W − η ∂L/∂W (SGD/Adam).</li>
</ol>
<h4>Key formula</h4>
<div class="formula">h<sub>t</sub> = tanh(W<sub>hh</sub>h<sub>t-1</sub> + W<sub>xh</sub>x<sub>t</sub>)<br>∂L<sub>t</sub>/∂W<sub>hh</sub> = Σ<sub>k=1..t</sub> (∂L<sub>t</sub>/∂h<sub>t</sub>) · (Π<sub>j=k+1..t</sub> ∂h<sub>j</sub>/∂h<sub>j-1</sub>) · ∂h<sub>k</sub>/∂W<sub>hh</sub><br>∂h<sub>j</sub>/∂h<sub>j-1</sub> = W<sub>hh</sub><sup>T</sup> · diag(1 − h<sub>j</sub><sup>2</sup>)</div>
<h4>Backprop vs BPTT</h4>
<table><tr><th>Point</th><th>Backpropagation</th><th>BPTT</th></tr>
<tr><td>Network</td><td>Feedforward</td><td>Recurrent, unfolded in time</td></tr>
<tr><td>Weights per layer</td><td>Different</td><td>Same at every step</td></tr>
<tr><td>Gradient</td><td>One per layer</td><td>Summed over all time steps</td></tr>
<tr><td>Memory</td><td>Depth of net</td><td>Grows with sequence length T</td></tr></table>
<h4>Problems and remedies</h4>
<ul>
<li><b>Vanishing gradients</b> (product of terms &lt; 1): use LSTM/GRU, ReLU, orthogonal/identity init, attention, skip connections.</li>
<li><b>Exploding gradients</b> (terms &gt; 1): <b>gradient clipping</b> g ← θ·g/‖g‖ if ‖g‖ &gt; θ; lower learning rate.</li>
<li><b>Cost</b> O(T) memory and time: <b>truncated BPTT</b> — backpropagate only k steps (e.g. 20–50) while carrying the hidden state forward.</li>
</ul>
<h4>Example</h4>
<p>Language model on "I love deep learning": losses at each word are summed; the gradient for W<sub>hh</sub> collects contributions from all 4 positions.</p>
<p><b>Conclusion:</b> BPTT = backprop on the unrolled RNN with summed shared-weight gradients; its weaknesses motivate clipping, truncation and LSTM.</p>`,
  hi: `<p><b>Definition:</b> BPTT RNN ko train karne ka tareeka hai. RNN ko time mein <b>khol (unfold)</b> do, toh woh ek lamba feedforward network ban jaata hai jisme har step ki layer same weights use karti hai; phir normal backprop chala do.</p>
<h4>Steps</h4>
<ol>
<li><b>Unfold:</b> T steps ki chain banao, sab copies same W<sub>xh</sub>, W<sub>hh</sub>, W<sub>hy</sub>.</li>
<li><b>Forward pass:</b> h<sub>1</sub>…h<sub>T</sub>, outputs aur har step ka loss; total L = Σ L<sub>t</sub>.</li>
<li><b>Backward pass:</b> aakhri step se pehle step tak chain rule; h<sub>t</sub> ki galti y<sub>t</sub> se bhi aati hai aur h<sub>t+1</sub> se bhi.</li>
<li><b>Jodo:</b> weights shared hain, toh saare steps ke gradients add: ∂L/∂W = Σ ∂L<sub>t</sub>/∂W.</li>
<li><b>Update:</b> W ← W − η ∂L/∂W.</li>
</ol>
<div class="formula">∂L<sub>t</sub>/∂W<sub>hh</sub> = Σ<sub>k</sub> (∂L<sub>t</sub>/∂h<sub>t</sub>) · (Π<sub>j=k+1..t</sub> ∂h<sub>j</sub>/∂h<sub>j-1</sub>) · ∂h<sub>k</sub>/∂W<sub>hh</sub><br>∂h<sub>j</sub>/∂h<sub>j-1</sub> = W<sub>hh</sub><sup>T</sup> · diag(1 − h<sub>j</sub><sup>2</sup>)</div>
<h4>Backprop vs BPTT</h4>
<table><tr><th>Point</th><th>Backprop</th><th>BPTT</th></tr>
<tr><td>Network</td><td>Feedforward</td><td>RNN unfolded</td></tr>
<tr><td>Weights</td><td>Har layer alag</td><td>Har step same</td></tr>
<tr><td>Gradient</td><td>Layer-wise</td><td>Saare steps ka sum</td></tr>
<tr><td>Memory</td><td>Fixed</td><td>Sequence length ke saath badhti</td></tr></table>
<h4>Problems aur ilaaj</h4>
<ul>
<li><b>Vanishing:</b> product mein 1 se chhote numbers → gradient 0. Ilaaj: LSTM/GRU, ReLU, achha initialisation, attention.</li>
<li><b>Exploding:</b> 1 se bade numbers → gradient bahut bada, NaN. Ilaaj: gradient clipping, chhota learning rate.</li>
<li><b>Lamba sequence = zyada memory:</b> truncated BPTT, sirf last k (20–50) steps tak peeche jao.</li>
</ul>
<h4>Desi example</h4>
<p>Cricket team match haar gayi. Coach sirf aakhri over ko nahi, poori innings ko peeche se dekhta hai: 50th over ki galti, 49th ki, … aur sabka dosh jodta hai. Kyunki har over mein "same team" (same weights) khel rahi thi, saari galtiyan milake ek hi team ko sudhaarte hain. Yahi BPTT hai.</p>
<p><b>Ek line:</b> BPTT = unfolded RNN pe backprop + shared weights ke gradients ka sum.</p>`,
  keys: ["unfold","shared weights","sum of gradients over time","chain rule","forward and backward pass","vanishing/exploding","gradient clipping","truncated BPTT"],
  draw: "Unfolded RNN chain with forward arrows and red backward arrows flowing from L_T to h_1, losses L1..LT at each step.",
  fig: "unit4.html#q6",
  num: false
},
{
  id: "U4-08",
  unit: 4,
  topic: "Applications in computer vision",
  q: "Explain applications of RNN/LSTM in computer vision such as image captioning and video analysis.",
  alt: ["How are CNN and LSTM combined for image captioning?","Give one major use of deep learning in computer vision.","Explain deep networks in computer vision with a real-world example.","How are RNNs used for video classification / action recognition?"],
  marks: [2,4,10],
  priority: "high",
  prob: 60,
  diff: 3,
  pyq: ["7CAI 2025 A6","7CAI 2025 B6"],
  why: "7CAI 2025 asked DL in CV twice (A6, B6; mainly a CNN/Unit 3 question, but the syllabus puts CV applications in Unit 4); captioning is the sequence-model angle.",
  short: "Image captioning: a CNN encodes the image and an LSTM decoder generates the caption word by word; video: CNN per frame + LSTM over frames.",
  en: `<p><b>Introduction:</b> CNNs extract spatial features; RNNs/LSTMs model sequences. Combining them (CNN + RNN) solves vision tasks whose input or output is a <b>sequence</b>.</p>
<h4>1. Image captioning (one-to-many)</h4>
<ul>
<li><b>Encoder:</b> a pretrained CNN (e.g. ResNet/Inception) turns the image into a feature vector (e.g. 2048-d).</li>
<li><b>Decoder:</b> an LSTM initialised with that vector generates words from &lt;START&gt; to &lt;END&gt;: P(w<sub>t</sub> | w<sub>&lt;t</sub>, image).</li>
<li><b>Training:</b> MS-COCO / Flickr8k image–caption pairs, cross-entropy with teacher forcing; <b>attention</b> (Show, Attend and Tell, 2015) lets each word focus on an image region.</li>
<li><b>Inference:</b> beam search; evaluated with BLEU, METEOR, CIDEr.</li>
<li>Example (Show and Tell, Vinyals et al. 2015): photo → "a dog is running on the grass".</li>
</ul>
<h4>2. Video classification / action recognition (many-to-one)</h4>
<ul><li>CNN extracts features from each frame → LSTM over the frame sequence → softmax over actions ("playing cricket"). Known as LRCN (Donahue et al., 2015).</li></ul>
<h4>3. Video captioning (many-to-many)</h4>
<ul><li>CNN frame features → LSTM encoder → LSTM decoder sentence.</li></ul>
<h4>4. OCR / handwriting recognition</h4>
<ul><li>CRNN: CNN feature columns → BiLSTM → CTC loss reads text lines (number plates, cheques).</li></ul>
<h4>5. Others</h4>
<ul><li>Visual question answering (CNN for image + LSTM for question), object tracking across frames, gesture/sign-language recognition, medical scan sequences.</li></ul>
<table><tr><th>Task</th><th>RNN type</th><th>Architecture</th></tr>
<tr><td>Image captioning</td><td>One-to-many</td><td>CNN + LSTM decoder</td></tr>
<tr><td>Action recognition</td><td>Many-to-one</td><td>CNN per frame + LSTM</td></tr>
<tr><td>Video captioning</td><td>Many-to-many</td><td>CNN + LSTM encoder–decoder</td></tr>
<tr><td>OCR</td><td>Many-to-many</td><td>CNN + BiLSTM + CTC</td></tr></table>
<h4>Real-world example</h4>
<p>Accessibility "alt-text" on social media and apps like Microsoft Seeing AI describe photos for visually impaired users using CNN + language decoder.</p>
<h4>Advantages / limitations</h4>
<ul><li>+ End-to-end, generates natural language, handles temporal dynamics.</li><li>− Needs large paired datasets; captions can be generic or hallucinated; slow sequential decoding.</li></ul>
<p><b>Conclusion:</b> CNN sees, LSTM describes — the CNN + RNN pairing brings sequence modelling to vision.</p>`,
  hi: `<p><b>Intro:</b> CNN photo ke features nikaalta hai, RNN/LSTM sequence sambhalta hai. Dono ko jodo (CNN + RNN) toh vision ke woh kaam hote hain jinme input ya output <b>sequence</b> ho.</p>
<h4>1. Image captioning (one-to-many)</h4>
<ul>
<li><b>Encoder:</b> pretrained CNN (ResNet) photo ko ek feature vector (2048 numbers) mein badalta hai.</li>
<li><b>Decoder:</b> LSTM us vector se shuru karke ek-ek word bolta hai, &lt;START&gt; se &lt;END&gt; tak.</li>
<li><b>Training:</b> MS-COCO jaise photo+caption data, cross-entropy, teacher forcing; attention se har word photo ke sahi hisse ko dekhta hai.</li>
<li>Output: "a dog is running on the grass". BLEU score se check.</li>
</ul>
<h4>2. Video classification (many-to-one)</h4>
<ul><li>Har frame ka CNN feature → LSTM saare frames padhta hai → "cricket khel raha hai".</li></ul>
<h4>3. Video captioning</h4>
<ul><li>Frames → LSTM encoder → LSTM decoder sentence.</li></ul>
<h4>4. OCR / handwriting</h4>
<ul><li>CNN + BiLSTM + CTC: number plate, cheque, purani handwritten files padhna.</li></ul>
<h4>5. Aur</h4>
<ul><li>VQA (photo + sawaal → jawaab), sign language recognition, object tracking.</li></ul>
<table><tr><th>Task</th><th>Type</th><th>Model</th></tr>
<tr><td>Captioning</td><td>One-to-many</td><td>CNN + LSTM</td></tr>
<tr><td>Action recognition</td><td>Many-to-one</td><td>CNN + LSTM</td></tr>
<tr><td>OCR</td><td>Many-to-many</td><td>CNN + BiLSTM + CTC</td></tr></table>
<h4>Desi example</h4>
<p>Traffic police ka FASTag/challan camera: CNN + BiLSTM number plate "RJ14 AB 1234" padhta hai. Instagram/WhatsApp pe photo ka auto description "do log muskura rahe hain" CNN + LSTM se banta hai. Cricket highlights mein "six" waale clip khud dhoondhna = video classification.</p>
<h4>Fayde / kamiyan</h4>
<ul><li>+ End-to-end, natural sentence bana deta hai.</li><li>− Bahut data chahiye, kabhi galat ya generic caption.</li></ul>
<p><b>Ek line:</b> CNN dekhta hai, LSTM bolta hai.</p>`,
  keys: ["CNN encoder","LSTM decoder","image captioning","one-to-many","attention over regions","video action recognition","CRNN + CTC","BLEU"],
  draw: "Image -> CNN -> feature vector -> chain of LSTM cells emitting 'a dog is running' words.",
  fig: "unit4.html#q7",
  num: false
},
{
  id: "U4-09",
  unit: 4,
  topic: "Vanishing and exploding gradients",
  q: "What are vanishing and exploding gradient problems in RNNs? Explain their causes and remedies, including gradient clipping.",
  alt: ["Why do RNNs fail to learn long-term dependencies?","What is gradient clipping?","How do LSTM and GRU overcome the vanishing gradient problem?"],
  marks: [2,4],
  priority: "high",
  prob: 55,
  diff: 3,
  pyq: [],
  why: "Never asked directly, but it is the reason LSTM exists and is a classic 2/4-mark question; often embedded in LSTM/BPTT answers.",
  short: "In BPTT gradients multiply by W_hh·tanh′ each step; if <1 they vanish (no long memory), if >1 they explode. Fix: LSTM/GRU, gradient clipping.",
  en: `<p><b>Definition:</b> During BPTT the gradient reaching an early time step is a <b>product of many Jacobians</b> ∂h<sub>j</sub>/∂h<sub>j-1</sub>. If these factors are mostly smaller than 1 the gradient shrinks exponentially (<b>vanishing gradient</b>); if larger than 1 it grows exponentially (<b>exploding gradient</b>).</p>
<div class="formula">∂h<sub>t</sub>/∂h<sub>k</sub> = Π<sub>j=k+1..t</sub> W<sub>hh</sub><sup>T</sup> diag(tanh′(a<sub>j</sub>))<br>‖·‖ ≈ (λ<sub>max</sub> · γ)<sup>t−k</sup>, tanh′ ≤ 1</div>
<p>0.5<sup>20</sup> ≈ 0.00000095 (vanishes); 1.5<sup>20</sup> ≈ 3325 (explodes).</p>
<h4>Effects</h4>
<table><tr><th>Point</th><th>Vanishing</th><th>Exploding</th></tr>
<tr><td>Cause</td><td>Largest eigenvalue of W<sub>hh</sub> &lt; 1, saturated tanh/sigmoid</td><td>Largest eigenvalue &gt; 1</td></tr>
<tr><td>Symptom</td><td>Early inputs do not affect learning; loss plateaus</td><td>Loss spikes, weights become NaN</td></tr>
<tr><td>Detection</td><td>Gradient norms near 0 for early steps</td><td>Very large gradient norms</td></tr>
<tr><td>Remedy</td><td>LSTM/GRU, ReLU, orthogonal/identity init, skip connections, attention</td><td>Gradient clipping, lower LR, weight regularisation</td></tr></table>
<h4>Gradient clipping</h4>
<div class="formula">if ‖g‖ &gt; θ :  g ← θ · g / ‖g‖</div>
<p>Rescales the whole gradient vector to norm θ (e.g. θ = 1 or 5), keeping its direction. Clip-by-value (clip each component to [−c, c]) is a simpler variant.</p>
<h4>How LSTM/GRU help</h4>
<p>Their additive memory update (C<sub>t</sub> = f<sub>t</sub>C<sub>t-1</sub> + …) gives a gradient path ∂C<sub>t</sub>/∂C<sub>t-1</sub> = f<sub>t</sub> that stays near 1 when the gate chooses to remember.</p>
<p><b>Example:</b> "The <b>keys</b> to the old wooden cabinet <b>are</b> on the table" — a plain RNN forgets the plural subject; an LSTM keeps it.</p>
<p><b>Conclusion:</b> Clip to stop explosions, use gated cells to stop vanishing.</p>`,
  hi: `<p><b>Definition:</b> BPTT mein shuru ke steps tak gradient pahunchne ke liye bahut saare terms ka <b>guna (product)</b> hota hai. Agar terms 1 se chhote hain toh gradient lagbhag 0 ho jaata hai (<b>vanishing</b>); 1 se bade hain toh bahut bada ho jaata hai (<b>exploding</b>).</p>
<div class="formula">∂h<sub>t</sub>/∂h<sub>k</sub> = Π W<sub>hh</sub><sup>T</sup> diag(tanh′)</div>
<p>0.5<sup>20</sup> ≈ 0.00000095 (gaayab), 1.5<sup>20</sup> ≈ 3325 (phat gaya).</p>
<h4>Table</h4>
<table><tr><th>Point</th><th>Vanishing</th><th>Exploding</th></tr>
<tr><td>Kaaran</td><td>W<sub>hh</sub> chhota, tanh saturate</td><td>W<sub>hh</sub> bada</td></tr>
<tr><td>Asar</td><td>Purane words ka koi asar nahi, lambi memory nahi</td><td>Loss achaanak uchhalta hai, NaN</td></tr>
<tr><td>Ilaaj</td><td>LSTM/GRU, ReLU, orthogonal init, attention</td><td>Gradient clipping, chhota LR</td></tr></table>
<h4>Gradient clipping</h4>
<div class="formula">agar ‖g‖ &gt; θ :  g ← θ · g / ‖g‖</div>
<p>Gradient ki direction same rehti hai, bas size θ tak chhota kar dete hain. Jaise bike ka speed limiter: direction tumhari, par 80 se upar nahi jaane dega.</p>
<h4>LSTM/GRU kaise bachate hain</h4>
<p>Unki memory <b>jod</b> ke update hoti hai (C<sub>t</sub> = f<sub>t</sub>C<sub>t-1</sub> + …), toh gradient path pe sirf f<sub>t</sub> aata hai jo ≈ 1 reh sakta hai.</p>
<h4>Desi example</h4>
<p>"Telephone game" (Chinese whispers): 20 log ek message aage badhate hain; har koi thoda dheere bole toh aakhri tak message gaayab (vanishing); har koi masala laga ke bole toh baat ka batangad (exploding).</p>
<p><b>Ek line:</b> Exploding → clip karo; vanishing → LSTM/GRU lagao.</p>`,
  keys: ["product of Jacobians","eigenvalue of W_hh","tanh derivative ≤ 1","long-term dependencies","gradient clipping by norm","LSTM/GRU","NaN"],
  draw: "Bar chart sketch of gradient magnitude shrinking (vanishing) or growing (exploding) going back over time steps.",
  fig: "unit4.html#q6",
  num: false
},
{
  id: "U4-10",
  unit: 4,
  topic: "Types of RNN",
  q: "Explain the different types of RNN architectures (one-to-one, one-to-many, many-to-one, many-to-many) with examples.",
  alt: ["Classify RNNs based on input and output sequences.","Give an example of a many-to-one RNN.","Which RNN type is used for image captioning / machine translation?"],
  marks: [2,4],
  priority: "high",
  prob: 55,
  diff: 2,
  pyq: [],
  why: "Named in the syllabus sub-topics (types of RNN); easy 4-mark question with a diagram that examiners like.",
  short: "One-to-one (classification), one-to-many (image captioning), many-to-one (sentiment), many-to-many equal (NER) and unequal length (translation).",
  en: `<p><b>Introduction:</b> RNNs are classified by the shape of their input and output sequences. The same recurrent cell is wired differently for each task.</p>
<table><tr><th>Type</th><th>Input → Output</th><th>Example</th></tr>
<tr><td>One-to-one</td><td>Single vector → single output</td><td>Ordinary image classification (vanilla NN)</td></tr>
<tr><td>One-to-many</td><td>One input → sequence</td><td>Image captioning (image → sentence), music generation from a seed</td></tr>
<tr><td>Many-to-one</td><td>Sequence → single output</td><td>Sentiment analysis, spam detection, video classification, next-day forecast</td></tr>
<tr><td>Many-to-many (synced, T<sub>x</sub> = T<sub>y</sub>)</td><td>Output at every input step</td><td>POS tagging, NER, frame-level video labelling</td></tr>
<tr><td>Many-to-many (T<sub>x</sub> ≠ T<sub>y</sub>)</td><td>Encoder–decoder</td><td>Machine translation, summarisation, speech-to-text</td></tr></table>
<h4>How each is built</h4>
<ul>
<li><b>One-to-many:</b> input fed at step 1 (or as initial state); each output is fed back as the next input.</li>
<li><b>Many-to-one:</b> read the full sequence; use only the last hidden state h<sub>T</sub> for a Dense/softmax layer.</li>
<li><b>Many-to-many synced:</b> output y<sub>t</sub> = softmax(W h<sub>t</sub>) at every step.</li>
<li><b>Many-to-many seq2seq:</b> encoder compresses input into a context vector, decoder generates output of a different length.</li>
</ul>
<h4>Example</h4>
<p>Review "not worth the money" → many-to-one → "negative". Photo of a dog → one-to-many → "a dog runs on grass".</p>
<p><b>Conclusion:</b> Choose the RNN type by matching input/output lengths of the task.</p>`,
  hi: `<p><b>Intro:</b> RNN ko input aur output ki shape ke hisaab se 5 types mein baanta jaata hai. Cell same hota hai, bas wiring alag.</p>
<table><tr><th>Type</th><th>Input → Output</th><th>Example</th></tr>
<tr><td>One-to-one</td><td>Ek input → ek output</td><td>Normal image classification</td></tr>
<tr><td>One-to-many</td><td>Ek input → sequence</td><td>Image captioning (photo → sentence)</td></tr>
<tr><td>Many-to-one</td><td>Sequence → ek output</td><td>Sentiment analysis, spam detection</td></tr>
<tr><td>Many-to-many (same length)</td><td>Har word ka output</td><td>NER, POS tagging</td></tr>
<tr><td>Many-to-many (alag length)</td><td>Encoder–decoder</td><td>Translation, summarisation</td></tr></table>
<h4>Kaise banta hai</h4>
<ul>
<li><b>One-to-many:</b> input pehle step pe do, phir har output agle step ka input.</li>
<li><b>Many-to-one:</b> poora sentence padho, sirf last h<sub>T</sub> se answer nikalo.</li>
<li><b>Many-to-many same:</b> har step pe output.</li>
<li><b>Many-to-many alag:</b> encoder → context vector → decoder.</li>
</ul>
<h4>Desi example</h4>
<ul><li>Zomato review "khana thanda tha, paisa barbaad" → many-to-one → negative.</li><li>Shaadi ki photo → one-to-many → "dulha dulhan stage pe khade hain".</li><li>"Ram Jaipur gaya" → many-to-many same → [PERSON, LOCATION, O].</li><li>"How are you" → many-to-many alag → "आप कैसे हैं".</li></ul>
<p><b>Ek line:</b> Task ke input/output length dekh ke RNN type chuno.</p>`,
  keys: ["one-to-one","one-to-many","many-to-one","many-to-many synced","encoder-decoder","image captioning","sentiment","translation"],
  draw: "Five small box diagrams (Karpathy style): red input boxes, green RNN boxes, blue output boxes for each type.",
  fig: "unit4.html#q1",
  num: false
},
{
  id: "U4-11",
  unit: 4,
  topic: "Applications in NLP",
  q: "Explain the applications of RNNs/LSTMs in natural language processing (sentiment analysis, machine translation, NER, language modelling).",
  alt: ["How are sequence models used in NLP?","Explain RNN-based named entity recognition.","Write applications of recurrent neural networks."],
  marks: [2,4,10],
  priority: "high",
  prob: 50,
  diff: 2,
  pyq: [],
  why: "NLP is a named application area in the syllabus; 'applications of RNN' is a standard question, not yet asked.",
  short: "RNNs are used for language modelling, machine translation (seq2seq), sentiment analysis (many-to-one), NER/POS tagging (many-to-many), chatbots and summarisation.",
  en: `<p><b>Introduction:</b> Text is a sequence of words where order and context decide meaning, so RNNs/LSTMs became the standard NLP models before Transformers. Words are first mapped to <b>embeddings</b> (Word2Vec, GloVe or learned).</p>
<h4>1. Language modelling and text generation</h4>
<ul><li>Predict the next word: P(w<sub>t</sub> | w<sub>1</sub>…w<sub>t-1</sub>) with softmax over the vocabulary; evaluated with <b>perplexity</b>.</li><li>Uses: autocomplete, keyboard suggestions, text/poetry generation, re-ranking in ASR.</li></ul>
<h4>2. Machine translation</h4>
<ul><li>Encoder–decoder LSTM with attention (Google NMT, 2016: 8-layer LSTM encoder/decoder).</li></ul>
<h4>3. Sentiment analysis (many-to-one)</h4>
<ul><li>Review → embeddings → LSTM → last hidden state → sigmoid/softmax. Captures negation ("not good").</li></ul>
<h4>4. Named Entity Recognition / POS tagging (many-to-many)</h4>
<ul><li>BiLSTM (often + CRF layer) labels each token: "Sundar[B-PER] Pichai[I-PER] visited Jaipur[B-LOC]".</li></ul>
<h4>5. Others</h4>
<ul><li>Text summarisation, question answering, chatbots, spelling/grammar correction, transliteration (Hinglish → Devanagari).</li></ul>
<table><tr><th>Task</th><th>RNN type</th><th>Output layer / loss</th></tr>
<tr><td>Language model</td><td>Many-to-many</td><td>Softmax, cross-entropy, perplexity</td></tr>
<tr><td>Translation</td><td>Seq2seq</td><td>Softmax per step, BLEU</td></tr>
<tr><td>Sentiment</td><td>Many-to-one</td><td>Sigmoid, binary cross-entropy</td></tr>
<tr><td>NER</td><td>Many-to-many synced (BiLSTM)</td><td>Softmax/CRF per token, F1</td></tr></table>
<h4>Working steps of an RNN-based NLP system</h4>
<ol>
<li><b>Text cleaning:</b> lower-case, remove noise, tokenise into words or sub-words.</li>
<li><b>Vocabulary and indexing:</b> map tokens to integer ids; add &lt;PAD&gt;, &lt;UNK&gt;, &lt;START&gt;, &lt;END&gt;.</li>
<li><b>Embedding layer:</b> convert ids to dense vectors (e.g. 100–300-d).</li>
<li><b>Recurrent encoder:</b> LSTM/GRU or BiLSTM reads the sequence and produces hidden states.</li>
<li><b>Task head:</b> last state → classifier (sentiment), every state → tagger (NER), or decoder (translation).</li>
<li><b>Training and evaluation:</b> cross-entropy loss with BPTT; measure accuracy/F1, BLEU or perplexity.</li>
</ol>
<div class="formula">Perplexity = exp( −(1/N) Σ<sub>t</sub> log P(w<sub>t</sub> | w<sub>&lt;t</sub>) )  (lower is better)</div>
<h4>RNN-based NLP vs Transformer-based NLP</h4>
<table><tr><th>Point</th><th>RNN / LSTM</th><th>Transformer</th></tr>
<tr><td>Processing</td><td>Sequential, one token at a time</td><td>Parallel over all tokens</td></tr>
<tr><td>Long context</td><td>Limited by gating / memory</td><td>Direct via self-attention</td></tr>
<tr><td>Data / compute</td><td>Works on small data, cheap</td><td>Needs large data and GPUs</td></tr>
<tr><td>Examples</td><td>GNMT, ELMo, Smart Compose</td><td>BERT, GPT</td></tr></table>
<p><b>Example:</b> Gmail Smart Compose, Google Translate (pre-2020), Amazon review classifiers.</p>
<p><b>Limitations:</b> sequential (slow), limited very-long context; Transformers (BERT, GPT) now dominate.</p>
<p><b>Conclusion:</b> By choosing the right RNN type and task head on top of embeddings, one recurrent cell solves almost every NLP task.</p>`,
  hi: `<p><b>Intro:</b> Text words ka sequence hai, aur matlab order aur context se banta hai. Isliye Transformer se pehle NLP mein RNN/LSTM hi king the. Pehle words ko <b>embedding</b> (numbers ka vector) mein badalte hain.</p>
<h4>1. Language modelling</h4>
<ul><li>Agla word predict karna: P(w<sub>t</sub> | pichhle words), softmax poori vocabulary pe; perplexity se check.</li><li>Use: autocomplete, keyboard suggestion, text generation.</li></ul>
<h4>2. Machine translation</h4>
<ul><li>Encoder–decoder LSTM + attention (Google NMT 2016).</li></ul>
<h4>3. Sentiment analysis</h4>
<ul><li>Review → LSTM → last state → positive/negative. "achha nahi" jaisa negation samajhta hai.</li></ul>
<h4>4. NER / POS tagging</h4>
<ul><li>BiLSTM (+ CRF) har word ko tag deta hai: "Virat[PER] Kohli[PER] Delhi[LOC] mein".</li></ul>
<h4>5. Aur</h4>
<ul><li>Summarisation, chatbot, question answering, spelling correction, transliteration (Hinglish → देवनागरी).</li></ul>
<table><tr><th>Task</th><th>Type</th><th>Loss</th></tr>
<tr><td>LM</td><td>Many-to-many</td><td>Cross-entropy, perplexity</td></tr>
<tr><td>Translation</td><td>Seq2seq</td><td>BLEU</td></tr>
<tr><td>Sentiment</td><td>Many-to-one</td><td>Binary CE</td></tr>
<tr><td>NER</td><td>BiLSTM har token</td><td>F1</td></tr></table>
<h4>Desi example</h4>
<p>WhatsApp keyboard mein "Happy" likhte hi "Birthday" suggest hona = language model. Flipkart review "delivery late, product bekaar" → negative = sentiment. Google Translate "kal milte hain" → "see you tomorrow" = seq2seq.</p>
<h4>Working steps</h4>
<ol>
<li><b>Text saaf karo:</b> lower-case, faltu symbols hatao, words/sub-words mein todo.</li>
<li><b>Vocabulary:</b> har word ko ek number do; &lt;PAD&gt;, &lt;UNK&gt;, &lt;START&gt;, &lt;END&gt; jodo.</li>
<li><b>Embedding:</b> number → 100–300 size ka vector.</li>
<li><b>RNN encoder:</b> LSTM/GRU/BiLSTM poora sentence padh ke hidden states banata hai.</li>
<li><b>Task head:</b> last state → classifier (sentiment), har state → tagger (NER), ya decoder (translation).</li>
<li><b>Training:</b> cross-entropy + BPTT; accuracy/F1, BLEU ya perplexity se check.</li>
</ol>
<div class="formula">Perplexity = exp( −(1/N) Σ<sub>t</sub> log P(w<sub>t</sub> | w<sub>&lt;t</sub>) )  (kam = better)</div>
<h4>RNN vs Transformer (NLP mein)</h4>
<table><tr><th>Point</th><th>RNN/LSTM</th><th>Transformer</th></tr>
<tr><td>Padhna</td><td>Ek-ek word, line mein</td><td>Saare words ek saath (parallel)</td></tr>
<tr><td>Lamba context</td><td>Mushkil</td><td>Self-attention se seedha</td></tr>
<tr><td>Data/compute</td><td>Kam data, sasta</td><td>Bahut data, GPU chahiye</td></tr>
<tr><td>Examples</td><td>GNMT, ELMo</td><td>BERT, GPT</td></tr></table>
<p><b>Kamiyan:</b> slow, bahut lamba context mushkil; ab BERT/GPT jaise Transformer.</p>
<p><b>Ek line:</b> Embedding ke upar sahi RNN type aur task head chuno, NLP ka almost har kaam ho jaata hai.</p>`,
  keys: ["word embeddings","language modelling","perplexity","machine translation","sentiment (many-to-one)","NER with BiLSTM-CRF","summarisation","chatbots"],
  draw: "Table of NLP tasks mapped to RNN types, or BiLSTM tagging each word with an entity label.",
  fig: "unit4.html#q7",
  num: false
},
{
  id: "U4-12",
  unit: 4,
  topic: "Attention mechanism",
  q: "What is the attention mechanism? How does it extend the encoder–decoder model?",
  alt: ["Explain the bottleneck problem in seq2seq and how attention solves it.","Define attention weights and context vector in attention.","Explain Bahdanau attention."],
  marks: [2,4],
  priority: "med",
  prob: 45,
  diff: 3,
  pyq: [],
  why: "Natural follow-up to the encoder-decoder question asked twice in 7CAI 2025; listed as an extension of seq2seq.",
  short: "Attention lets the decoder take a weighted sum of all encoder hidden states at each step, focusing on relevant input words and removing the fixed-context bottleneck.",
  en: `<p><b>Definition:</b> <b>Attention</b> (Bahdanau et al., 2015) lets the decoder of a seq2seq model look at <b>all</b> encoder hidden states at every output step and build a step-specific context vector as their weighted sum, instead of relying on one fixed vector C.</p>
<h4>Why needed</h4>
<ul><li>Plain seq2seq squeezes the whole input into a fixed-length C → information loss and poor BLEU on long sentences (bottleneck).</li></ul>
<h4>Steps at decoder step t</h4>
<ol>
<li><b>Score</b> each encoder state h<sub>i</sub> against the previous decoder state s<sub>t-1</sub>: e<sub>ti</sub> = v<sup>T</sup> tanh(W<sub>1</sub>s<sub>t-1</sub> + W<sub>2</sub>h<sub>i</sub>) (additive) or e<sub>ti</sub> = s<sub>t-1</sub><sup>T</sup>h<sub>i</sub> (dot-product, Luong).</li>
<li><b>Normalise</b> with softmax to get attention weights α<sub>ti</sub>.</li>
<li><b>Context</b> c<sub>t</sub> = Σ<sub>i</sub> α<sub>ti</sub> h<sub>i</sub>.</li>
<li>Decoder uses [y<sub>t-1</sub>, s<sub>t-1</sub>, c<sub>t</sub>] to produce s<sub>t</sub> and y<sub>t</sub>.</li>
</ol>
<div class="formula">α<sub>ti</sub> = exp(e<sub>ti</sub>) / Σ<sub>k</sub> exp(e<sub>tk</sub>),   c<sub>t</sub> = Σ<sub>i</sub> α<sub>ti</sub> h<sub>i</sub></div>
<h4>Without vs with attention</h4>
<table><tr><th>Point</th><th>Plain seq2seq</th><th>With attention</th></tr>
<tr><td>Context</td><td>One fixed C</td><td>New c<sub>t</sub> each step</td></tr>
<tr><td>Long sentences</td><td>Degrades</td><td>Stays good</td></tr>
<tr><td>Interpretability</td><td>None</td><td>Alignment heat-map of α</td></tr></table>
<p><b>Example:</b> translating "I love India" → when generating "भारत", α is highest on "India".</p>
<p><b>Applications:</b> NMT, image captioning (attend to image regions), speech recognition (Listen-Attend-Spell); self-attention is the basis of Transformers.</p>
<p><b>Conclusion:</b> Attention = dynamic, weighted context that removes the seq2seq bottleneck.</p>`,
  hi: `<p><b>Definition:</b> Attention mein decoder har output word banate waqt encoder ke <b>saare</b> hidden states ko dekhta hai aur unka weighted sum leta hai. Ek fixed C pe depend nahi rehta.</p>
<h4>Kyun chahiye</h4>
<ul><li>Simple seq2seq poore sentence ko ek chhote vector mein dabata hai, lamba sentence ho toh info kho jaati hai (bottleneck).</li></ul>
<h4>Steps</h4>
<ol>
<li>Har encoder state h<sub>i</sub> ka score nikalo: decoder ki pichhli state s<sub>t-1</sub> se kitna match karta hai.</li>
<li>Softmax se weights α<sub>ti</sub> banao (sab ka sum 1).</li>
<li>Context c<sub>t</sub> = Σ α<sub>ti</sub> h<sub>i</sub>.</li>
<li>Decoder c<sub>t</sub> + pichhla word use karke agla word bolta hai.</li>
</ol>
<div class="formula">α<sub>ti</sub> = softmax(e<sub>ti</sub>),   c<sub>t</sub> = Σ<sub>i</sub> α<sub>ti</sub> h<sub>i</sub></div>
<table><tr><th>Point</th><th>Bina attention</th><th>Attention ke saath</th></tr>
<tr><td>Context</td><td>Ek fixed C</td><td>Har step naya c<sub>t</sub></td></tr>
<tr><td>Lamba sentence</td><td>Kharab</td><td>Achha</td></tr>
<tr><td>Samajh</td><td>Black box</td><td>Heat-map dikhta hai kis word pe dhyaan</td></tr></table>
<h4>Desi example</h4>
<p>Exam mein answer likhte waqt aap poori book yaad nahi rakhte; har question ke liye sirf us chapter ke page pe "dhyaan" dete ho. "I love India" → "भारत" likhte waqt model "India" pe sabse zyada dhyaan deta hai.</p>
<p><b>Use:</b> translation, image captioning (photo ke hisse pe dhyaan), speech; self-attention se Transformer bana.</p>
<p><b>Ek line:</b> Attention = har step pe naya, weighted context.</p>`,
  keys: ["bottleneck","alignment score","softmax weights α","context c_t = Σ α h","Bahdanau / Luong","Transformer"],
  draw: "Encoder states h1..h3 with arrows weighted α to a summation node c_t feeding the decoder state s_t.",
  fig: "unit4.html#q4",
  num: false
},
{
  id: "U4-13",
  unit: 4,
  topic: "GRU",
  q: "Explain the Gated Recurrent Unit (GRU) with its update and reset gates.",
  alt: ["What is GRU? How is it different from LSTM?","Write the equations of a GRU cell.","Why is GRU faster than LSTM?"],
  marks: [2,4],
  priority: "med",
  prob: 45,
  diff: 3,
  pyq: ["7CAI 2025 C4"],
  why: "Part of the 7CAI 2025 C4 comparison; a standalone GRU 2/4-marker is plausible.",
  short: "GRU is a gated RNN with an update gate and a reset gate and no separate cell state; it learns long dependencies with fewer parameters than LSTM.",
  en: `<p><b>Definition:</b> The <b>Gated Recurrent Unit (GRU)</b>, introduced by Cho et al. (2014), is a simplified LSTM. It merges the cell and hidden states and uses only <b>two gates</b>: an <b>update gate</b> and a <b>reset gate</b>.</p>
<div class="formula">Update gate: z<sub>t</sub> = σ(W<sub>z</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>z</sub>)<br>Reset gate: r<sub>t</sub> = σ(W<sub>r</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>r</sub>)<br>Candidate: h̃<sub>t</sub> = tanh(W<sub>h</sub>[r<sub>t</sub> ⊙ h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>h</sub>)<br>New state: h<sub>t</sub> = (1 − z<sub>t</sub>) ⊙ h<sub>t-1</sub> + z<sub>t</sub> ⊙ h̃<sub>t</sub></div>
<h4>Role of gates</h4>
<ul>
<li><b>Update gate z<sub>t</sub>:</b> how much of the new candidate replaces the old state (does the job of LSTM's forget + input gates together).</li>
<li><b>Reset gate r<sub>t</sub>:</b> how much of the past state is used to compute the candidate; r ≈ 0 lets the unit "start fresh".</li>
<li>The interpolation h<sub>t</sub> = (1−z)h<sub>t-1</sub> + z h̃<sub>t</sub> gives a near-identity gradient path when z ≈ 0, so vanishing gradients are reduced.</li>
</ul>
<h4>GRU vs LSTM</h4>
<table><tr><th>Point</th><th>LSTM</th><th>GRU</th></tr>
<tr><td>Gates</td><td>3</td><td>2</td></tr>
<tr><td>Cell state</td><td>Separate C<sub>t</sub></td><td>None (only h<sub>t</sub>)</td></tr>
<tr><td>Output gate</td><td>Yes</td><td>No</td></tr>
<tr><td>Parameters</td><td>4 blocks</td><td>3 blocks (~25% fewer)</td></tr>
<tr><td>Speed / data need</td><td>Slower, more data</td><td>Faster, good on small data</td></tr></table>
<p><b>Example:</b> On-device keyboard next-word prediction or sentiment classification where speed matters.</p>
<p><b>Conclusion:</b> GRU gives LSTM-like long memory with a lighter, faster cell.</p>`,
  hi: `<p><b>Definition:</b> GRU (Cho et al., 2014) LSTM ka halka version hai. Isme alag cell state nahi hoti, aur sirf <b>do gates</b> hote hain: <b>update gate</b> aur <b>reset gate</b>.</p>
<div class="formula">z<sub>t</sub> = σ(W<sub>z</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>z</sub>)<br>r<sub>t</sub> = σ(W<sub>r</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>r</sub>)<br>h̃<sub>t</sub> = tanh(W<sub>h</sub>[r<sub>t</sub> ⊙ h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>h</sub>)<br>h<sub>t</sub> = (1 − z<sub>t</sub>) ⊙ h<sub>t-1</sub> + z<sub>t</sub> ⊙ h̃<sub>t</sub></div>
<h4>Gates ka kaam</h4>
<ul>
<li><b>Update gate:</b> kitna purana rakhna, kitna naya lena (LSTM ke forget + input dono ka kaam ek saath).</li>
<li><b>Reset gate:</b> naya candidate banate waqt purani memory kitni use karni; 0 ho toh "naye sire se shuru".</li>
<li>z ≈ 0 hone pe h<sub>t</sub> ≈ h<sub>t-1</sub>, gradient seedha peeche jaata hai, vanishing kam.</li>
</ul>
<table><tr><th>Point</th><th>LSTM</th><th>GRU</th></tr>
<tr><td>Gates</td><td>3</td><td>2</td></tr>
<tr><td>Cell state</td><td>Haan</td><td>Nahi</td></tr>
<tr><td>Parameters</td><td>4 blocks</td><td>3 blocks (~25% kam)</td></tr>
<tr><td>Speed</td><td>Slow</td><td>Fast, kam data pe bhi achha</td></tr></table>
<h4>Desi example</h4>
<p>LSTM = bada almirah jisme alag-alag khaane (diary, gates). GRU = ek hi trolley bag jisme kaam ki cheezein; halka aur jaldi pack hota hai. Mobile keyboard (Gboard) ka next-word suggestion jahan speed zaroori hai, wahan GRU jaisa halka model kaam aata hai.</p>
<p><b>Ek line:</b> GRU = 2 gates, no cell state, LSTM jaisi memory par fast.</p>`,
  keys: ["update gate","reset gate","no cell state","interpolation h_t = (1-z)h_{t-1} + z h~_t","fewer parameters","Cho 2014"],
  draw: "GRU cell: h_{t-1} line through (1-z) multiplier and + node, r gate feeding tanh candidate, z gate mixing.",
  fig: "unit4.html#q2",
  num: false
},
{
  id: "U4-14",
  unit: 4,
  topic: "Recursive neural networks",
  q: "What are recursive neural networks? How do they differ from recurrent neural networks?",
  alt: ["Explain tree-structured recursive neural networks with an example.","Differentiate recursive and recurrent networks.","How are recursive nets used for sentiment analysis of phrases?"],
  marks: [2,4],
  priority: "med",
  prob: 45,
  diff: 3,
  pyq: [],
  why: "Named in the unit title ('Recurrent and Recursive Nets') but never asked; the recursive-vs-recurrent difference is a ready 2/4-marker.",
  short: "A recursive neural network applies the same weights recursively over a tree (e.g. a parse tree), combining child vectors into a parent: p = tanh(W[c1; c2] + b).",
  en: `<p><b>Definition:</b> A <b>recursive neural network</b> (Goller &amp; Küchler 1996; Socher et al. 2011) applies the <b>same set of weights recursively over a tree structure</b>, such as the parse tree of a sentence, to produce a vector for every node and finally the root.</p>
<div class="formula">p = tanh(W [c<sub>1</sub> ; c<sub>2</sub>] + b),  y<sub>p</sub> = softmax(W<sub>s</sub> p)</div>
<h4>Working</h4>
<ol>
<li>Parse the sentence into a binary tree (leaves = word embeddings).</li>
<li>Combine two children vectors with the shared W to get the parent vector (bottom-up).</li>
<li>Repeat until the root vector, which represents the whole sentence.</li>
<li>Attach a softmax at any node for labels (e.g. sentiment of each phrase); train with backpropagation through structure (BPTS).</li>
</ol>
<h4>Variants</h4>
<ul><li>Recursive Autoencoder, Matrix-Vector RNN (MV-RNN), Recursive Neural Tensor Network (RNTN), Tree-LSTM (Tai et al., 2015).</li></ul>
<h4>Recursive vs recurrent</h4>
<table><tr><th>Point</th><th>Recurrent NN</th><th>Recursive NN</th></tr>
<tr><td>Structure</td><td>Linear chain over time</td><td>Tree (hierarchy)</td></tr>
<tr><td>Weight sharing</td><td>Across time steps</td><td>Across tree nodes</td></tr>
<tr><td>Input needed</td><td>Raw sequence</td><td>Sequence + parse tree</td></tr>
<tr><td>Depth for n tokens</td><td>n</td><td>≈ log n (balanced tree)</td></tr>
<tr><td>Training</td><td>BPTT</td><td>Backprop through structure</td></tr>
<tr><td>Use</td><td>Speech, time series, LM</td><td>Phrase sentiment, parsing, scene parsing</td></tr></table>
<p>A recurrent net is a special case of a recursive net whose tree is a left-branching chain.</p>
<h4>Example</h4>
<p>Stanford Sentiment Treebank: "not very good" → "very good" is positive, the parent with "not" flips it to negative; the tree captures this compositional meaning.</p>
<h4>Advantages / limitations</h4>
<ul><li>+ Captures hierarchical, compositional structure; shorter gradient paths.</li><li>− Needs a parser; hard to batch; less popular since Transformers.</li></ul>
<p><b>Conclusion:</b> Recursive nets share weights over trees, recurrent nets over chains.</p>`,
  hi: `<p><b>Definition:</b> Recursive neural network ek hi weights ko <b>tree structure</b> (jaise sentence ka grammar/parse tree) pe baar-baar lagata hai. Neeche ke words se upar jaate hue har node ka vector banata hai, aur root ka vector poore sentence ko represent karta hai.</p>
<div class="formula">p = tanh(W [c<sub>1</sub> ; c<sub>2</sub>] + b)</div>
<h4>Kaise kaam karta hai</h4>
<ol>
<li>Sentence ka binary parse tree banao (leaves = word embeddings).</li>
<li>Do bachchon (children) ke vectors jodkar same W se parent vector banao.</li>
<li>Upar root tak yahi repeat karo.</li>
<li>Kisi bhi node pe softmax lagake label (jaise phrase ka sentiment); training = backprop through structure.</li>
</ol>
<h4>Variants</h4>
<ul><li>RNTN, MV-RNN, Tree-LSTM, recursive autoencoder.</li></ul>
<table><tr><th>Point</th><th>Recurrent</th><th>Recursive</th></tr>
<tr><td>Shape</td><td>Seedhi chain (time)</td><td>Tree</td></tr>
<tr><td>Weight sharing</td><td>Time steps pe</td><td>Tree nodes pe</td></tr>
<tr><td>Chahiye</td><td>Sirf sequence</td><td>Sequence + parse tree</td></tr>
<tr><td>Depth</td><td>n</td><td>≈ log n</td></tr>
<tr><td>Use</td><td>Speech, LM</td><td>Phrase sentiment, parsing</td></tr></table>
<p>Recurrent net asal mein recursive net ka special case hai jisme tree ek seedhi line hai.</p>
<h4>Desi example</h4>
<p>"bilkul achha nahi" → pehle "achha" positive, phir "bilkul achha" zyada positive, phir "nahi" lagte hi poora negative. Tree mein neeche se upar meaning banta hai, jaise family tree mein dada-dadi tak pahunchte ho. Maths ka expression (2 + 3) × 4 bhi tree se hi solve hota hai.</p>
<h4>Fayde / kamiyan</h4>
<ul><li>+ Hierarchy aur compositional meaning pakadta hai.</li><li>− Parser chahiye, batching mushkil.</li></ul>
<p><b>Ek line:</b> Recursive = tree pe weight sharing, recurrent = chain pe.</p>`,
  keys: ["tree structure","parse tree","shared weights over nodes","p = tanh(W[c1;c2]+b)","compositionality","backprop through structure","RNTN / Tree-LSTM","recurrent = chain special case"],
  draw: "Binary parse tree of 'not very good' with leaf word vectors combining upward into parent nodes and a root sentiment label.",
  fig: "unit4.html#q7",
  num: false
},
{
  id: "U4-15",
  unit: 4,
  topic: "Unfolding computational graphs",
  q: "Explain unfolding of an RNN into a computational graph. What is the role of parameter sharing in RNNs?",
  alt: ["What is meant by unrolling an RNN?","Why are the weights shared across time steps in an RNN?","Explain the recurrent connection and hidden state."],
  marks: [2,4],
  priority: "med",
  prob: 40,
  diff: 2,
  pyq: [],
  why: "Basic concept from Goodfellow ch.10 and the unit notes; parameter sharing was asked for CNNs (8AID 2025 A7, 7CAI 2025 A4), so the RNN version is a possible twist.",
  short: "Unfolding draws the recurrent loop as a chain of copies, one per time step, sharing the same weights; sharing lets the RNN handle any length with few parameters.",
  en: `<p><b>Definition:</b> <b>Unfolding (unrolling)</b> converts the recursive definition h<sub>t</sub> = f(h<sub>t-1</sub>, x<sub>t</sub>; θ) into an explicit <b>computational graph</b>: a chain with one copy of the network per time step, each copy using the <b>same parameters θ</b>.</p>
<div class="formula">h<sub>3</sub> = f(f(f(h<sub>0</sub>, x<sub>1</sub>; θ), x<sub>2</sub>; θ), x<sub>3</sub>; θ)</div>
<h4>Why unfold</h4>
<ul><li>Shows exactly how information flows through time.</li><li>Makes the network a deep feedforward graph so backpropagation (BPTT) can be applied.</li><li>Depth of the unfolded graph = sequence length T.</li></ul>
<h4>Parameter sharing in RNNs</h4>
<ul>
<li>The same W<sub>xh</sub>, W<sub>hh</sub>, W<sub>hy</sub> are used at every step.</li>
<li><b>Variable length:</b> the model works for any T without changing its size.</li>
<li><b>Fewer parameters:</b> parameter count does not grow with T → less overfitting.</li>
<li><b>Generalisation across positions:</b> a pattern ("in 2009") learned at one position is recognised at any position.</li>
<li>Gradients of shared weights are summed over time in BPTT.</li>
</ul>
<table><tr><th>Point</th><th>CNN sharing</th><th>RNN sharing</th></tr><tr><td>Across</td><td>Spatial positions (kernel)</td><td>Time steps</td></tr><tr><td>Gives</td><td>Translation equivariance</td><td>Time invariance, any length</td></tr></table>
<p><b>Example:</b> "I went to Nepal in 2009" and "In 2009, I went to Nepal": one shared cell extracts the year wherever it appears.</p>
<p><b>Conclusion:</b> Unfolding turns the loop into a graph for BPTT; sharing keeps the model small and length-independent.</p>`,
  hi: `<p><b>Definition:</b> <b>Unfolding</b> matlab RNN ke loop ko time ke hisaab se khol ke ek chain bana dena: har time step ki ek copy, aur har copy mein <b>same weights θ</b>.</p>
<div class="formula">h<sub>3</sub> = f(f(f(h<sub>0</sub>, x<sub>1</sub>; θ), x<sub>2</sub>; θ), x<sub>3</sub>; θ)</div>
<h4>Kyun kholte hain</h4>
<ul><li>Dikh jaata hai ki info time mein kaise aage badhti hai.</li><li>Network normal deep feedforward graph ban jaata hai, toh backprop (BPTT) laga sakte hain.</li><li>Graph ki depth = sequence length T.</li></ul>
<h4>Parameter sharing</h4>
<ul>
<li>Har step pe same W<sub>xh</sub>, W<sub>hh</sub>, W<sub>hy</sub>.</li>
<li>Koi bhi length ka sentence chal jaata hai.</li>
<li>Parameters T ke saath nahi badhte → overfitting kam.</li>
<li>Ek jagah seekha pattern kisi bhi position pe pehchaan leta hai.</li>
<li>BPTT mein shared weights ke gradients sab steps se jodte hain.</li>
</ul>
<table><tr><th>Point</th><th>CNN</th><th>RNN</th></tr><tr><td>Sharing</td><td>Image ki jagah pe (kernel)</td><td>Time steps pe</td></tr></table>
<h4>Desi example</h4>
<p>Ek hi chef (same weights) roz roti banata hai, chahe 5 roti ho ya 50 (koi bhi length). Har roti ke liye naya chef nahi rakhte. "Main 2009 mein Nepal gaya" ya "2009 mein main Nepal gaya" — saal kahin bhi ho, same cell pakad leta hai.</p>
<p><b>Ek line:</b> Unfold = loop ko chain banao (BPTT ke liye); sharing = chhota model, koi bhi length.</p>`,
  keys: ["unrolling","computational graph","same parameters θ","variable-length input","fewer parameters","BPTT","generalisation across positions"],
  draw: "Folded cell with self-loop = unfolded chain h0->h1->h2->h3 with x_t inputs and the same W labels on every arrow.",
  fig: "unit4.html#q1",
  num: false
},
{
  id: "U4-16",
  unit: 4,
  topic: "Case studies: classification and regression",
  q: "Explain a case study of sequence classification using LSTM (e.g. sentiment analysis of movie reviews).",
  alt: ["Design an LSTM model for sentiment classification.","Explain a case study of RNN in classification.","How would you build a spam / review classifier with an RNN?"],
  marks: [4,10],
  priority: "med",
  prob: 40,
  diff: 3,
  pyq: [],
  why: "Syllabus lists 'case studies in classification'; design-style questions (like 8AID 2025 B2, B5, B7) make a design-a-classifier question plausible.",
  short: "Sentiment classification: tokenise and pad reviews → embedding → LSTM → last hidden state → sigmoid; binary cross-entropy, Adam; IMDB accuracy ≈ 85–88%.",
  en: `<p><b>Problem:</b> Classify IMDB movie reviews (50,000 reviews, 25k train / 25k test) as <b>positive or negative</b>. This is a <b>many-to-one</b> sequence classification task.</p>
<h4>Pipeline</h4>
<ol>
<li><b>Preprocessing:</b> lower-case, remove HTML/punctuation, tokenise; keep top 10,000 words; map to integer ids; <b>pad/truncate</b> to 200 tokens.</li>
<li><b>Embedding layer:</b> 10,000 × 100 (learned or GloVe initialised).</li>
<li><b>Recurrent layer:</b> LSTM(64) (or BiLSTM) with dropout 0.2–0.3; only the final hidden state h<sub>T</sub> is used.</li>
<li><b>Output:</b> Dense(1, sigmoid) → P(positive).</li>
<li><b>Loss / optimiser:</b> binary cross-entropy, Adam (lr 0.001), batch 64, 5–10 epochs, early stopping.</li>
<li><b>Evaluation:</b> accuracy, precision, recall, F1, confusion matrix.</li>
</ol>
<div class="formula">ŷ = σ(w<sup>T</sup> h<sub>T</sub> + b),   L = −[y log ŷ + (1 − y) log(1 − ŷ)]</div>
<h4>Results</h4>
<table><tr><th>Model</th><th>Typical test accuracy</th></tr>
<tr><td>Bag-of-words + logistic regression</td><td>≈ 84–88%</td></tr>
<tr><td>Simple RNN</td><td>≈ 80–85% (struggles with long reviews)</td></tr>
<tr><td>LSTM / BiLSTM</td><td>≈ 86–89%</td></tr></table>
<h4>Why LSTM helps</h4>
<ul><li>Understands word order and negation: "The movie was <b>not good</b> at all" → negative, which bag-of-words may misjudge.</li><li>Keeps context across 200 tokens thanks to gating.</li></ul>
<h4>Other classification case studies</h4>
<ul><li>Spam SMS detection, toxic comment detection, ECG arrhythmia classification, human activity recognition from phone sensors, video action classification.</li></ul>
<h4>Working: one review through the network</h4>
<ol>
<li>"not good at all" → ids [21, 49, 30, 29] → padded to length 200.</li>
<li>Embedding gives 200 vectors of size 100 (input shape 200 × 100).</li>
<li>The LSTM reads them in order; at "not" the cell state stores a negation cue, and at "good" the gates combine it to flip the sentiment.</li>
<li>h<sub>T</sub> (64-d) → Dense(1) → σ gives, say, ŷ = 0.12 → predicted <b>negative</b> (threshold 0.5).</li>
<li>If the true label is y = 0, loss = −log(1 − 0.12) = 0.128; BPTT updates embedding, LSTM and Dense weights.</li>
</ol>
<h4>Choice of recurrent layer</h4>
<table><tr><th>Layer (64 units, 100-d input)</th><th>Parameters</th><th>Remark</th></tr>
<tr><td>SimpleRNN</td><td>10,560</td><td>Fast, forgets long reviews</td></tr>
<tr><td>GRU</td><td>31,680</td><td>Good speed/accuracy balance</td></tr>
<tr><td>LSTM</td><td>42,240</td><td>Best long-range memory</td></tr>
<tr><td>BiLSTM</td><td>84,480</td><td>Uses context from both sides</td></tr></table>
<h4>Limitations</h4>
<ul><li>Sarcasm, domain shift; Transformers (BERT ≈ 93–95% on IMDB) now outperform.</li></ul>
<p><b>Conclusion:</b> Clean and pad → embed → LSTM → sigmoid, trained with BCE and judged by accuracy/F1, is the standard recipe for sequence classification.</p>`,
  hi: `<p><b>Problem:</b> IMDB ke 50,000 movie reviews ko <b>positive ya negative</b> batana. Yeh <b>many-to-one</b> task hai: poora review andar, ek label bahar.</p>
<h4>Pipeline</h4>
<ol>
<li><b>Preprocessing:</b> lower-case, HTML/punctuation hatao, words mein todo; top 10,000 words rakho; har word ko number do; har review ko 200 words tak pad/cut karo.</li>
<li><b>Embedding:</b> har word → 100 numbers ka vector.</li>
<li><b>LSTM(64)</b> (ya BiLSTM), dropout ke saath; sirf last hidden state lo.</li>
<li><b>Output:</b> Dense(1, sigmoid) = positive hone ki probability.</li>
<li><b>Loss:</b> binary cross-entropy, Adam, 5–10 epochs, early stopping.</li>
<li><b>Evaluation:</b> accuracy, precision, recall, F1, confusion matrix.</li>
</ol>
<div class="formula">ŷ = σ(w<sup>T</sup> h<sub>T</sub> + b),   L = −[y log ŷ + (1 − y) log(1 − ŷ)]</div>
<table><tr><th>Model</th><th>Accuracy (approx)</th></tr>
<tr><td>Bag-of-words</td><td>84–88%</td></tr>
<tr><td>Simple RNN</td><td>80–85%</td></tr>
<tr><td>LSTM/BiLSTM</td><td>86–89%</td></tr></table>
<h4>LSTM kyun achha</h4>
<ul><li>Word order aur "nahi" jaise negation samajhta hai: "film bilkul achhi nahi thi" → negative.</li><li>Gates ki wajah se 200 words tak context yaad.</li></ul>
<h4>Desi example</h4>
<p>Swiggy/Zomato review "biryani toh mast thi par delivery boy ne 1 ghanta laga diya, dobara order nahi karunga" → LSTM poora padh ke "negative" bolta hai; sirf "mast" word dekhne waala model galat "positive" bol deta.</p>
<h4>Aur case studies</h4>
<ul><li>SMS spam, toxic comment, ECG se heart problem, phone sensor se activity (walking/running).</li></ul>
<h4>Working: ek review network mein kaise jaata hai</h4>
<ol>
<li>"not good at all" → ids [21, 49, 30, 29] → 200 length tak pad.</li>
<li>Embedding se 200 vectors, har ek 100 size ka.</li>
<li>LSTM order mein padhta hai; "not" pe cell state mein "ulta karna hai" ka signal, "good" pe gates milake sentiment palat dete hain.</li>
<li>h<sub>T</sub> → Dense(1) → σ = 0.12 → <b>negative</b> (0.5 se kam).</li>
<li>Sahi label y = 0 ho toh loss = −log(1 − 0.12) = 0.128; BPTT saare weights sudhaarta hai.</li>
</ol>
<h4>Kaunsi layer lein</h4>
<table><tr><th>Layer (64 units)</th><th>Parameters</th><th>Remark</th></tr>
<tr><td>SimpleRNN</td><td>10,560</td><td>Fast, lamba review bhoolta hai</td></tr>
<tr><td>GRU</td><td>31,680</td><td>Speed aur accuracy ka balance</td></tr>
<tr><td>LSTM</td><td>42,240</td><td>Sabse achhi lambi memory</td></tr>
<tr><td>BiLSTM</td><td>84,480</td><td>Dono taraf ka context</td></tr></table>
<p><b>Ek line:</b> Saaf + pad → embedding → LSTM → sigmoid, BCE se train aur accuracy/F1 se check = sequence classification ka standard formula.</p>`,
  keys: ["many-to-one","tokenise and pad","embedding layer","LSTM final hidden state","sigmoid","binary cross-entropy","accuracy / F1","negation handling"],
  draw: "Words -> embedding boxes -> chain of LSTM cells -> last h_T -> sigmoid -> positive/negative.",
  fig: "unit4.html#q7",
  num: false
},
{
  id: "U4-17",
  unit: 4,
  topic: "Case studies: classification and regression",
  q: "Explain a case study of time-series regression (forecasting) using LSTM.",
  alt: ["How can RNNs be used for stock price / weather / load forecasting?","Explain a regression case study with deep sequence networks.","Design an LSTM for predicting the next value of a time series."],
  marks: [4,10],
  priority: "med",
  prob: 38,
  diff: 3,
  pyq: ["8AID 2025 B5"],
  why: "Syllabus lists case studies in regression; closely overlaps 8AID 2025 B5 (sequence prediction).",
  short: "Forecasting: normalise the series, make sliding windows (last 24 values → next), LSTM → Dense(1, linear), MSE loss, evaluate with RMSE/MAE.",
  en: `<p><b>Problem:</b> Predict next-hour <b>electricity load</b> (or temperature / stock price) from past readings. The target is a real number, so this is <b>sequence regression</b> (many-to-one).</p>
<h4>Pipeline</h4>
<ol>
<li><b>Data:</b> hourly load for 3 years + optional features (temperature, hour, weekday, holiday).</li>
<li><b>Preprocessing:</b> fill missing values, remove outliers, <b>min-max or z-score scaling</b> (fit on train only).</li>
<li><b>Windowing:</b> input = last 24 hours (24 × features) → target = hour 25; slide by one hour.</li>
<li><b>Split chronologically:</b> 70/15/15 — never shuffle across time (avoid leakage).</li>
<li><b>Model:</b> LSTM(50, return_sequences) → LSTM(50) → Dropout(0.2) → Dense(1, <b>linear</b>).</li>
<li><b>Training:</b> MSE loss, Adam, batch 32, early stopping, gradient clipping.</li>
<li><b>Evaluation:</b> RMSE, MAE, MAPE on the test set after inverse scaling; compare with naive and ARIMA baselines.</li>
<li><b>Multi-step forecast:</b> recursive (feed prediction back) or direct (Dense(24) output, many-to-many).</li>
</ol>
<div class="formula">MSE = (1/n) Σ (y<sub>i</sub> − ŷ<sub>i</sub>)<sup>2</sup>,  RMSE = √MSE,  MAE = (1/n) Σ |y<sub>i</sub> − ŷ<sub>i</sub>|</div>
<h4>Classification vs regression with RNNs</h4>
<table><tr><th>Point</th><th>Classification</th><th>Regression</th></tr>
<tr><td>Output layer</td><td>Sigmoid / softmax</td><td>Linear</td></tr>
<tr><td>Loss</td><td>Cross-entropy</td><td>MSE / MAE / Huber</td></tr>
<tr><td>Metric</td><td>Accuracy, F1</td><td>RMSE, MAE, MAPE</td></tr>
<tr><td>Example</td><td>Review sentiment</td><td>Load / price forecast</td></tr></table>
<h4>Small example</h4>
<p>Actual = [100, 110], predicted = [98, 114]: MAE = (2 + 4)/2 = 3; MSE = (4 + 16)/2 = 10; RMSE = 3.16.</p>
<h4>Advantages / limitations</h4>
<ul><li>+ Captures non-linear patterns and daily/weekly seasonality better than ARIMA.</li><li>− Needs much data; stock prices are noisy and hard to predict; errors accumulate in recursive forecasting.</li></ul>
<p><b>Conclusion:</b> Window → LSTM → linear output → MSE → RMSE is the standard deep regression recipe for sequences.</p>`,
  hi: `<p><b>Problem:</b> Pichhle readings se agle ghante ki <b>bijli ki demand</b> (ya temperature, share price) batana. Output ek real number hai, toh yeh <b>sequence regression</b> hai (many-to-one).</p>
<h4>Pipeline</h4>
<ol>
<li><b>Data:</b> 3 saal ka hourly data + temperature, din, chhutti jaise features.</li>
<li><b>Preprocessing:</b> missing values bharo, outliers hatao, scaling (sirf train pe fit).</li>
<li><b>Window:</b> pichhle 24 ghante → agla ghanta; ek-ek ghanta khiskao.</li>
<li><b>Split:</b> time order mein, shuffle bilkul nahi (warna future ka data leak).</li>
<li><b>Model:</b> LSTM(50) → LSTM(50) → Dropout → Dense(1, <b>linear</b>).</li>
<li><b>Training:</b> MSE loss, Adam, early stopping, clipping.</li>
<li><b>Evaluation:</b> RMSE, MAE, MAPE; ARIMA se compare.</li>
<li><b>Aage ke kai ghante:</b> prediction ko wapas input banao ya ek saath 24 output do.</li>
</ol>
<div class="formula">MSE = (1/n) Σ (y − ŷ)<sup>2</sup>,  RMSE = √MSE,  MAE = (1/n) Σ |y − ŷ|</div>
<table><tr><th>Point</th><th>Classification</th><th>Regression</th></tr>
<tr><td>Output</td><td>Sigmoid/softmax</td><td>Linear</td></tr>
<tr><td>Loss</td><td>Cross-entropy</td><td>MSE/MAE</td></tr>
<tr><td>Metric</td><td>Accuracy</td><td>RMSE/MAE</td></tr></table>
<h4>Chhota hisaab</h4>
<p>Actual [100, 110], predicted [98, 114]: MAE = 3, MSE = 10, RMSE ≈ 3.16.</p>
<h4>Desi example</h4>
<p>Rajasthan bijli vibhag ko pata hona chahiye ki garmi ki dopahar mein AC ki wajah se demand kitni badhegi. LSTM pichhle din ke pattern + temperature dekh ke batata hai, taaki power cut na ho. Waise hi Sabzi mandi mein kal tamatar ka bhaav predict karna.</p>
<h4>Fayde / kamiyan</h4>
<ul><li>+ Non-linear pattern aur seasonality pakadta hai.</li><li>− Bahut data chahiye; share market bahut noisy, galti jud-jud ke badhti hai.</li></ul>
<p><b>Ek line:</b> Window → LSTM → linear output → MSE → RMSE.</p>`,
  keys: ["sliding window","scaling","chronological split","LSTM + Dense linear","MSE loss","RMSE / MAE / MAPE","recursive vs direct forecasting"],
  draw: "Time-series plot with a 24-step window box sliding along, feeding LSTM -> next value.",
  fig: "unit4.html#q7",
  num: false
},
{
  id: "U4-18",
  unit: 4,
  topic: "Encoder-decoder seq2seq",
  q: "What is teacher forcing in training sequence models? State its advantage and drawback.",
  alt: ["Define teacher forcing.","What is exposure bias? How is it reduced?","Differentiate training and inference in a seq2seq decoder."],
  marks: [2,4],
  priority: "med",
  prob: 35,
  diff: 2,
  pyq: [],
  why: "Named in the brief's encoder-decoder sub-topics; quick 2-mark definition likely to follow the seq2seq PYQs.",
  short: "Teacher forcing feeds the true previous target token to the decoder during training instead of its own prediction; it speeds convergence but causes exposure bias.",
  en: `<p><b>Definition:</b> <b>Teacher forcing</b> is a training strategy for RNN decoders/language models in which the input at step t is the <b>ground-truth token y<sub>t-1</sub></b>, not the model's own prediction ŷ<sub>t-1</sub>.</p>
<div class="formula">Training: s<sub>t</sub> = g(y<sub>t-1</sub><sup>true</sup>, s<sub>t-1</sub>, C)<br>Inference: s<sub>t</sub> = g(ŷ<sub>t-1</sub>, s<sub>t-1</sub>, C)</div>
<h4>Advantages</h4>
<ul><li>Faster, more stable convergence: one early mistake does not derail the rest of the sequence.</li><li>All time steps can be computed in parallel in the loss (target sequence is known).</li></ul>
<h4>Drawback: exposure bias</h4>
<ul><li>At test time the model sees its own (possibly wrong) outputs, a distribution it never saw in training, so errors compound.</li></ul>
<h4>Remedies</h4>
<ul><li><b>Scheduled sampling</b> (Bengio et al., 2015): gradually replace true tokens with model predictions during training.</li><li>Beam search at inference; sequence-level training.</li></ul>
<table><tr><th>Phase</th><th>Decoder input</th></tr><tr><td>Training (teacher forcing)</td><td>True previous word</td></tr><tr><td>Inference</td><td>Own previous prediction</td></tr></table>
<p><b>Example:</b> Target "मुझे भारत पसंद है". If the decoder wrongly outputs "हमें" at step 1, with teacher forcing step 2 still receives "मुझे".</p>
<p><b>Conclusion:</b> Teacher forcing makes seq2seq training fast but must be balanced against exposure bias.</p>`,
  hi: `<p><b>Definition:</b> Teacher forcing mein decoder ko training ke waqt step t pe <b>sahi (true) pichhla word</b> diya jaata hai, uska apna guess nahi.</p>
<div class="formula">Training: s<sub>t</sub> = g(y<sub>t-1</sub><sup>true</sup>, s<sub>t-1</sub>, C)<br>Test: s<sub>t</sub> = g(ŷ<sub>t-1</sub>, s<sub>t-1</sub>, C)</div>
<h4>Fayde</h4>
<ul><li>Training jaldi aur stable: ek galti poore sentence ko kharab nahi karti.</li><li>Target pata hai, toh saare steps ka loss parallel mein nikal sakte hain.</li></ul>
<h4>Nuksaan: exposure bias</h4>
<ul><li>Test pe model ko apne hi (kabhi galat) words milte hain, jo training mein kabhi dekhe nahi, toh galtiyan badhti jaati hain.</li></ul>
<h4>Ilaaj</h4>
<ul><li><b>Scheduled sampling:</b> dheere-dheere training mein bhi model ke apne words dena shuru karo.</li><li>Beam search.</li></ul>
<h4>Desi example</h4>
<p>Driving school mein instructor ke paas bhi brake hota hai: galti karo toh woh turant sahi kar deta hai (teacher forcing), seekhna jaldi hota hai. Par licence ke baad akele chalao toh apni galti khud sambhalni padti hai (exposure bias). Isliye aakhri classes mein instructor dheere-dheere control chhodta hai = scheduled sampling.</p>
<p><b>Ek line:</b> Teacher forcing = training mein sahi pichhla word dena; fast par exposure bias.</p>`,
  keys: ["ground-truth previous token","decoder input","faster convergence","exposure bias","scheduled sampling"],
  draw: "Decoder chain where training inputs come from the target sentence (green) vs inference inputs from previous outputs (red).",
  fig: "unit4.html#q4",
  num: false
},
{
  id: "U4-19",
  unit: 4,
  topic: "Speech recognition pipeline",
  q: "What are MFCCs? Explain the steps of MFCC feature extraction for speech recognition.",
  alt: ["How is speech pre-processed before feeding to an LSTM?","Why are framing and windowing needed in speech processing?","What is the Mel scale?"],
  marks: [2,4],
  priority: "med",
  prob: 35,
  diff: 3,
  pyq: ["8AID 2025 C4"],
  why: "A sub-step of the 8AID 2025 C4 speech pipeline; can be asked alone as a 2/4-marker.",
  short: "MFCCs are compact speech features: frame and window the signal, FFT, Mel filter bank, log, then DCT; usually 13 coefficients (+Δ, ΔΔ = 39) per frame.",
  en: `<p><b>Definition:</b> <b>Mel-Frequency Cepstral Coefficients (MFCCs)</b> are a compact representation of the short-term power spectrum of speech on the <b>Mel scale</b>, which mimics human hearing (fine resolution at low frequencies, coarse at high).</p>
<div class="formula">Mel(f) = 2595 · log<sub>10</sub>(1 + f / 700)   (1000 Hz ≈ 1000 mel)</div>
<h4>Steps</h4>
<ol>
<li><b>Pre-emphasis:</b> y[n] = x[n] − 0.97 x[n−1] boosts high frequencies.</li>
<li><b>Framing:</b> 20–25 ms frames with 10 ms hop (speech is roughly stationary within a frame). At 16 kHz, 25 ms = 400 samples.</li>
<li><b>Windowing:</b> Hamming window w[n] = 0.54 − 0.46 cos(2πn/(N−1)) reduces spectral leakage at frame edges.</li>
<li><b>FFT</b> (e.g. 512-point) → power spectrum |X(k)|<sup>2</sup>/N.</li>
<li><b>Mel filter bank:</b> 26–40 overlapping triangular filters; sum energy in each.</li>
<li><b>Log</b> of filter-bank energies (loudness is perceived logarithmically). This is the log-Mel spectrogram.</li>
<li><b>DCT</b> decorrelates the log energies; keep the first <b>13 coefficients</b>.</li>
<li><b>Deltas:</b> add Δ (velocity) and ΔΔ (acceleration) → <b>39 features per frame</b>; apply cepstral mean-variance normalisation.</li>
</ol>
<table><tr><th>Feature</th><th>Size per frame</th><th>Used with</th></tr>
<tr><td>MFCC (+Δ, ΔΔ)</td><td>13 / 39</td><td>LSTM, HMM-GMM</td></tr>
<tr><td>Log-Mel spectrogram</td><td>40–80</td><td>CNN + LSTM, Transformers</td></tr></table>
<p><b>Example:</b> a 2-second clip at 16 kHz with 10 ms hop → ≈ 200 frames × 39 = the input matrix for a BiLSTM.</p>
<p><b>Advantages:</b> compact, decorrelated, robust; <b>limitation:</b> sensitive to noise; modern models often use log-Mel directly.</p>
<p><b>Conclusion:</b> MFCC turns raw audio into a small, hearing-inspired feature sequence for the RNN.</p>`,
  hi: `<p><b>Definition:</b> MFCC (Mel-Frequency Cepstral Coefficients) awaaz ka ek chhota "fingerprint" hai jo <b>Mel scale</b> pe banta hai. Mel scale insaan ke kaan jaisa hai: neeche ki frequency mein zyada fark samajhta hai, upar ki mein kam.</p>
<div class="formula">Mel(f) = 2595 · log<sub>10</sub>(1 + f / 700)</div>
<h4>Steps</h4>
<ol>
<li><b>Pre-emphasis:</b> high frequency ko thoda boost.</li>
<li><b>Framing:</b> 25 ms ke chhote tukde, 10 ms khiska ke (overlap). Itne chhote time mein awaaz lagbhag same rehti hai. 16 kHz pe 25 ms = 400 samples.</li>
<li><b>Windowing:</b> Hamming window, taaki tukde ke kinaare pe jhatka na ho.</li>
<li><b>FFT:</b> time se frequency mein, power spectrum.</li>
<li><b>Mel filter bank:</b> 26–40 triangle filters, har ek ki energy.</li>
<li><b>Log:</b> kaan awaaz ko log scale pe sunta hai.</li>
<li><b>DCT:</b> pehle 13 coefficients rakho.</li>
<li><b>Δ, ΔΔ:</b> badlaav ki speed jodo → 39 numbers per frame; normalise.</li>
</ol>
<table><tr><th>Feature</th><th>Size</th><th>Kahan</th></tr>
<tr><td>MFCC</td><td>13 / 39</td><td>LSTM, HMM</td></tr>
<tr><td>Log-Mel</td><td>40–80</td><td>CNN + LSTM</td></tr></table>
<h4>Desi example</h4>
<p>Jaise doctor poore body ka scan nahi, sirf pulse, BP, sugar jaise kuch numbers dekh ke haal samajh leta hai, waise hi MFCC har 25 ms ki awaaz ko sirf 39 numbers mein samet deta hai. 2 second ki "Hello Google" = ~200 frames × 39 = LSTM ka input.</p>
<p><b>Fayda:</b> chhota, compact; <b>kami:</b> shor se affect hota hai.</p>
<p><b>Ek line:</b> Frame → window → FFT → Mel → log → DCT = MFCC.</p>`,
  keys: ["pre-emphasis","framing 25 ms / 10 ms","Hamming window","FFT","Mel filter bank","log","DCT","13 coefficients + Δ + ΔΔ = 39"],
  draw: "Block chain: speech -> pre-emphasis -> framing -> window -> FFT -> Mel filter bank -> log -> DCT -> MFCC.",
  fig: "unit4.html#q5",
  num: false
},
{
  id: "U4-20",
  unit: 4,
  topic: "Speech recognition pipeline",
  q: "What is Connectionist Temporal Classification (CTC)? Why is it used in speech recognition?",
  alt: ["Explain the role of the blank token in CTC.","How does CTC solve the alignment problem?","Explain greedy CTC decoding."],
  marks: [2,4],
  priority: "med",
  prob: 30,
  diff: 4,
  pyq: ["8AID 2025 C4"],
  why: "Key part of the LSTM speech pipeline asked in 8AID 2025 C4; minor as a standalone question.",
  short: "CTC is a loss that trains an RNN to map long frame sequences to shorter label sequences without alignment, using a blank symbol and summing over all valid alignments.",
  en: `<p><b>Definition:</b> <b>Connectionist Temporal Classification (CTC)</b> (Graves et al., 2006) is an output layer + loss for sequence tasks where the input (e.g. 200 audio frames) is longer than the output (e.g. 5 letters) and the <b>frame-to-label alignment is unknown</b>.</p>
<h4>Key ideas</h4>
<ul>
<li>Add a special <b>blank (–)</b> symbol to the vocabulary.</li>
<li>The RNN outputs a probability distribution over labels + blank at every frame.</li>
<li><b>Collapse function B:</b> merge repeated symbols, then remove blanks. "hh–e–ll–l–oo" → "hello". A blank between two l's keeps the double letter.</li>
<li>Probability of a transcript = sum over all frame paths π that collapse to it.</li>
</ul>
<div class="formula">P(y | x) = Σ<sub>π ∈ B<sup>−1</sup>(y)</sub> Π<sub>t=1..T</sub> p(π<sub>t</sub> | x)<br>L<sub>CTC</sub> = −log P(y | x)</div>
<p>The sum is computed efficiently with the <b>forward–backward</b> (dynamic programming) algorithm.</p>
<h4>Decoding</h4>
<ul><li><b>Greedy:</b> best symbol per frame → collapse.</li><li><b>Beam search</b> with a language model for better accuracy.</li></ul>
<h4>Why used</h4>
<ul><li>No need for frame-level labelled data; trains end-to-end from (audio, transcript) pairs.</li><li>Used in DeepSpeech, Google voice search, OCR (CRNN), handwriting and sign-language recognition.</li></ul>
<h4>Limitation</h4>
<ul><li>Assumes outputs at different frames are conditionally independent → needs an external LM; output length must be ≤ input length.</li></ul>
<p><b>Conclusion:</b> CTC solves the alignment problem by summing over all alignments using a blank token.</p>`,
  hi: `<p><b>Definition:</b> CTC ek loss function hai jo tab kaam aata hai jab input lamba ho (200 audio frames) aur output chhota (5 akshar), aur pata na ho ki kaunsa frame kis akshar ka hai (<b>alignment unknown</b>).</p>
<h4>Main idea</h4>
<ul>
<li>Vocabulary mein ek <b>blank (–)</b> symbol jodo.</li>
<li>RNN har frame pe har akshar + blank ki probability deta hai.</li>
<li><b>Collapse rule:</b> repeat waale merge karo, phir blank hatao: "hh–e–ll–l–oo" → "hello". Do l ke beech blank hone se double l bachta hai.</li>
<li>Transcript ki probability = un saare raaston (paths) ka sum jo collapse hoke wahi bante hain.</li>
</ul>
<div class="formula">P(y | x) = Σ<sub>π</sub> Π<sub>t</sub> p(π<sub>t</sub> | x),   L = −log P(y | x)</div>
<p>Yeh sum forward–backward (dynamic programming) se jaldi nikalta hai.</p>
<h4>Decoding</h4>
<ul><li>Greedy: har frame ka best, phir collapse.</li><li>Beam search + language model.</li></ul>
<h4>Kyun use karte hain</h4>
<ul><li>Frame-by-frame label nahi chahiye, sirf audio + text.</li><li>DeepSpeech, voice search, OCR, handwriting mein.</li></ul>
<h4>Desi example</h4>
<p>Koi dheere bole "Raaaaam" toh 10 frames mein "R R a a a a a m m" aayega. CTC repeat merge karke "Ram" bana deta hai, aur hume batana nahi padta ki kaunsa frame kaunsa akshar tha. "Kitty" mein do t ke beech blank aata hai, taaki "Kity" na ban jaaye.</p>
<p><b>Kami:</b> har frame alag maan leta hai, isliye language model chahiye.</p>
<p><b>Ek line:</b> CTC = blank + saare alignments ka sum = bina alignment ke training.</p>`,
  keys: ["alignment-free","blank symbol","collapse repeats then remove blanks","sum over paths","−log P(y|x)","forward-backward","greedy / beam decoding"],
  draw: "Frame-wise outputs 'h h – e l – l o o' with arrows showing collapse to 'hello'.",
  fig: "unit4.html#q5",
  num: false
},
{
  id: "U4-21",
  unit: 4,
  topic: "Speech recognition pipeline",
  q: "How is a speech recognition system evaluated? Compute the Word Error Rate (WER) for a given reference and hypothesis.",
  alt: ["Define WER and CER.","Numerical: find WER when reference = 'what is the weather in jaipur today' and output = 'what is weather in jaipur to day'."],
  marks: [2,4],
  priority: "low",
  prob: 28,
  diff: 2,
  pyq: ["8AID 2025 C4"],
  why: "The 'evaluation' step of 8AID 2025 C4; a small numerical variant is possible but minor.",
  short: "WER = (S + D + I)/N, where S, D, I are word substitutions, deletions and insertions and N is the number of reference words; lower is better.",
  en: `<p><b>Definition:</b> <b>Word Error Rate (WER)</b> is the standard ASR metric. It is the minimum word-level edit distance (Levenshtein) between the reference transcript and the system output, divided by the reference length.</p>
<div class="formula">WER = (S + D + I) / N<br>S = substitutions, D = deletions, I = insertions, N = words in reference</div>
<h4>Worked example</h4>
<p>Reference: "what is the weather in jaipur today" → N = 7<br>Hypothesis: "what is weather in jaipur to day"</p>
<table><tr><th>Reference</th><th>Hypothesis</th><th>Operation</th></tr>
<tr><td>what</td><td>what</td><td>correct</td></tr>
<tr><td>is</td><td>is</td><td>correct</td></tr>
<tr><td>the</td><td>—</td><td>Deletion</td></tr>
<tr><td>weather</td><td>weather</td><td>correct</td></tr>
<tr><td>in</td><td>in</td><td>correct</td></tr>
<tr><td>jaipur</td><td>jaipur</td><td>correct</td></tr>
<tr><td>today</td><td>to</td><td>Substitution</td></tr>
<tr><td>—</td><td>day</td><td>Insertion</td></tr></table>
<div class="formula">S = 1, D = 1, I = 1 → WER = 3 / 7 = 0.4286 ≈ 42.9%<br>Word accuracy (approx.) = 1 − WER ≈ 57.1%</div>
<h4>Other metrics</h4>
<ul><li><b>CER</b> (character error rate): same formula on characters; used for character models and languages without spaces.</li><li><b>Real-time factor</b> = processing time / audio duration (speed).</li><li>Sentence error rate, latency.</li></ul>
<h4>Notes</h4>
<ul><li>Lower WER is better; WER can exceed 100% if there are many insertions.</li><li>Normalise case and punctuation before scoring.</li><li>Good modern systems reach ≈ 2–5% WER on clean LibriSpeech.</li></ul>
<p><b>Conclusion:</b> Count S, D, I by aligning words, divide by N.</p>`,
  hi: `<p><b>Definition:</b> WER speech recognition ka main metric hai: model ke output aur sahi transcript ke beech kitne word-level badlaav chahiye (edit distance), usko reference ke words se divide karo.</p>
<div class="formula">WER = (S + D + I) / N<br>S = galat word, D = chhoota word, I = extra word, N = sahi sentence ke words</div>
<h4>Hisaab</h4>
<p>Sahi: "what is the weather in jaipur today" → N = 7<br>Model: "what is weather in jaipur to day"</p>
<table><tr><th>Sahi</th><th>Model</th><th>Kya hua</th></tr>
<tr><td>the</td><td>—</td><td>Deletion</td></tr>
<tr><td>today</td><td>to</td><td>Substitution</td></tr>
<tr><td>—</td><td>day</td><td>Insertion</td></tr></table>
<div class="formula">WER = (1 + 1 + 1) / 7 = 0.4286 ≈ 42.9%</div>
<h4>Aur metrics</h4>
<ul><li><b>CER:</b> same formula, characters pe.</li><li><b>Real-time factor:</b> processing time / audio time.</li></ul>
<h4>Dhyaan rakho</h4>
<ul><li>Kam WER = achha. Insertions bahut ho toh WER 100% se bhi upar ja sakta hai.</li><li>Score se pehle case/punctuation normalise karo.</li></ul>
<h4>Desi example</h4>
<p>Teacher dictation leti hai: aapne ek word chhod diya (D), ek galat likha (S), ek extra likh diya (I). 7 words mein 3 galti = 42.9% error. Bilkul copy checking jaisa.</p>
<p><b>Ek line:</b> Words align karo, S + D + I gino, N se divide.</p>`,
  keys: ["WER = (S+D+I)/N","substitution","deletion","insertion","Levenshtein alignment","CER","lower is better"],
  draw: "Two-row alignment table of reference vs hypothesis words with S/D/I marked.",
  fig: "unit4.html#q5",
  num: true
},
{
  id: "U4-22",
  unit: 4,
  topic: "BPTT",
  q: "What is truncated BPTT? Why is it used, and what is its drawback?",
  alt: ["Differentiate full BPTT and truncated BPTT.","How are RNNs trained on very long sequences?"],
  marks: [2,4],
  priority: "low",
  prob: 28,
  diff: 3,
  pyq: [],
  why: "Named in the BPTT sub-topic; a plausible 2-mark definition but never asked.",
  short: "Truncated BPTT backpropagates only k recent time steps (e.g. 20–50) while carrying the hidden state forward, saving memory and time on long sequences.",
  en: `<p><b>Definition:</b> <b>Truncated BPTT (TBPTT)</b> splits a long sequence into chunks of k<sub>1</sub> steps; after each chunk it runs the forward pass and backpropagates errors for only <b>k<sub>2</sub> steps</b> back (often k<sub>1</sub> = k<sub>2</sub> = k, e.g. 20–50), instead of all the way to t = 1.</p>
<h4>Working</h4>
<ol>
<li>Split the sequence (e.g. 10,000 characters) into segments of k = 50.</li>
<li>Forward pass over the segment, starting from the <b>carried-over hidden state</b> of the previous segment (so forward memory is preserved).</li>
<li>Backpropagate within the segment only; detach the hidden state from the earlier graph.</li>
<li>Update weights, move to the next segment.</li>
</ol>
<table><tr><th>Point</th><th>Full BPTT</th><th>Truncated BPTT</th></tr>
<tr><td>Backward length</td><td>Entire sequence T</td><td>k steps</td></tr>
<tr><td>Memory</td><td>O(T)</td><td>O(k)</td></tr>
<tr><td>Updates</td><td>One per sequence</td><td>Many per sequence (faster learning)</td></tr>
<tr><td>Long dependencies (&gt; k)</td><td>Possible in theory</td><td>Hard to learn</td></tr></table>
<h4>Advantages</h4>
<ul><li>Saves memory and computation; allows training on very long or streaming data.</li><li>Also limits exploding gradients by shortening the product chain.</li></ul>
<h4>Drawback</h4>
<ul><li>Gradients cannot capture dependencies longer than k steps (biased gradient estimate).</li></ul>
<p><b>Example:</b> character-level language model on a whole novel trained with k = 100.</p>
<p><b>Conclusion:</b> TBPTT trades some long-range learning for large savings in compute.</p>`,
  hi: `<p><b>Definition:</b> Truncated BPTT mein lambe sequence ko chhote tukdon (k steps, jaise 20–50) mein baant dete hain, aur gradient sirf <b>k steps tak peeche</b> bhejte hain, shuru tak nahi.</p>
<h4>Kaise</h4>
<ol>
<li>10,000 characters ko 50-50 ke tukdon mein baanto.</li>
<li>Har tukde ka forward pass pichhle tukde ki hidden state se shuru karo (memory aage chalti rehti hai).</li>
<li>Backprop sirf us tukde ke andar.</li>
<li>Weights update, agla tukda.</li>
</ol>
<table><tr><th>Point</th><th>Full BPTT</th><th>Truncated</th></tr>
<tr><td>Peeche kitna</td><td>Poora T</td><td>Sirf k</td></tr>
<tr><td>Memory</td><td>O(T)</td><td>O(k)</td></tr>
<tr><td>Updates</td><td>Ek per sequence</td><td>Bahut saare (jaldi seekhna)</td></tr>
<tr><td>k se lambi dependency</td><td>Ho sakti hai</td><td>Mushkil</td></tr></table>
<h4>Fayde</h4>
<ul><li>Memory aur time bachta hai, lamba/streaming data chal jaata hai.</li><li>Chhoti chain se exploding bhi kam.</li></ul>
<h4>Nuksaan</h4>
<ul><li>k se zyada door ki baat seekhna mushkil.</li></ul>
<h4>Desi example</h4>
<p>Poori saal ki padhai ek baar mein revise karna impossible; isliye har hafte sirf us hafte ke chapters revise karte ho (k = 1 hafta), par yaad pichhle hafte ki bhi rehti hai (hidden state carry). Kami: 3 mahine pehle ke topic ka connection miss ho sakta hai.</p>
<p><b>Ek line:</b> TBPTT = sirf k steps tak backprop, memory bachao.</p>`,
  keys: ["k steps","segments","carry hidden state forward","O(k) memory","cannot learn dependencies longer than k"],
  draw: "Long unfolded chain divided into segments of k steps, backward arrows only inside each segment.",
  fig: "unit4.html#q6",
  num: false
},
{
  id: "U4-23",
  unit: 4,
  topic: "Deep RNNs and deep network case studies",
  q: "What are deep (stacked) RNNs? Explain with case studies of deep sequence networks.",
  alt: ["Explain stacked LSTM architecture.","How is depth added to an RNN?","Give a case study of a deep recurrent network (e.g. Google NMT, DeepSpeech 2)."],
  marks: [2,4],
  priority: "low",
  prob: 25,
  diff: 3,
  pyq: [],
  why: "Covers the 'case studies in deep networks' syllabus line; never asked.",
  short: "A deep RNN stacks several recurrent layers so each layer's hidden sequence feeds the next, learning hierarchical temporal features (e.g. 8-layer LSTM in Google NMT).",
  en: `<p><b>Definition:</b> A <b>deep (stacked) RNN</b> has several recurrent layers on top of each other; the hidden-state sequence of layer l becomes the input sequence of layer l+1.</p>
<div class="formula">h<sub>t</sub><sup>(l)</sup> = tanh(W<sup>(l)</sup> h<sub>t</sub><sup>(l−1)</sup> + U<sup>(l)</sup> h<sub>t−1</sub><sup>(l)</sup> + b<sup>(l)</sup>),  h<sub>t</sub><sup>(0)</sup> = x<sub>t</sub></div>
<h4>Ways to add depth (Goodfellow ch. 10)</h4>
<ul><li>Stacking recurrent layers (most common).</li><li>Deep input-to-hidden, hidden-to-hidden or hidden-to-output MLPs.</li><li>Skip/residual connections between layers to ease gradient flow.</li></ul>
<h4>Why deep</h4>
<ul><li>Lower layers learn local patterns (phonemes, characters), higher layers learn abstract ones (words, meaning).</li><li>More capacity; 2–4 layers usually beat 1.</li></ul>
<h4>Case studies</h4>
<table><tr><th>System</th><th>Architecture</th><th>Task</th></tr>
<tr><td>Google NMT (2016)</td><td>8-layer LSTM encoder (first layer bidirectional) + 8-layer decoder, attention, residual connections</td><td>Machine translation</td></tr>
<tr><td>DeepSpeech 2 (Baidu, 2015)</td><td>CNN layers + up to 7 bidirectional recurrent layers + CTC</td><td>English and Mandarin ASR</td></tr>
<tr><td>Graves et al. (2013)</td><td>Deep BiLSTM + CTC</td><td>TIMIT phoneme recognition</td></tr>
<tr><td>Show and Tell (2015)</td><td>Deep CNN + LSTM</td><td>Image captioning</td></tr></table>
<h4>Limitations</h4>
<ul><li>Harder and slower to train; needs dropout between layers, residual links and gradient clipping.</li></ul>
<p><b>Conclusion:</b> Stacking recurrent layers gives hierarchical sequence features and powered production systems in translation and speech.</p>`,
  hi: `<p><b>Definition:</b> Deep (stacked) RNN mein kai recurrent layers ek ke upar ek hoti hain; neeche waali layer ki hidden states upar waali layer ka input banti hain.</p>
<div class="formula">h<sub>t</sub><sup>(l)</sup> = tanh(W<sup>(l)</sup> h<sub>t</sub><sup>(l−1)</sup> + U<sup>(l)</sup> h<sub>t−1</sub><sup>(l)</sup> + b<sup>(l)</sup>)</div>
<h4>Depth kaise badhayein</h4>
<ul><li>Layers stack karo (sabse common).</li><li>Input/hidden/output ke beech chhote MLP.</li><li>Residual (skip) connections, taaki gradient aasaani se bahe.</li></ul>
<h4>Kyun</h4>
<ul><li>Neeche ki layer chhoti cheezein (awaaz ke tukde, akshar), upar ki layer badi cheezein (words, matlab) seekhti hai.</li><li>2–4 layers aam taur pe 1 se better.</li></ul>
<h4>Case studies</h4>
<table><tr><th>System</th><th>Model</th><th>Kaam</th></tr>
<tr><td>Google NMT 2016</td><td>8-layer LSTM encoder + 8-layer decoder, attention</td><td>Translation</td></tr>
<tr><td>DeepSpeech 2</td><td>CNN + 7 tak bidirectional RNN layers + CTC</td><td>English, Mandarin speech</td></tr>
<tr><td>Show and Tell</td><td>CNN + LSTM</td><td>Image captioning</td></tr></table>
<h4>Desi example</h4>
<p>Office mein clerk → manager → director: clerk chhoti details dekhta hai, manager unse summary banata hai, director bada decision leta hai. Stacked LSTM mein bhi har layer pichhli ki report ko aur abstract banati hai.</p>
<h4>Kami</h4>
<ul><li>Training slow aur mushkil; dropout, residual, clipping zaroori.</li></ul>
<p><b>Ek line:</b> Stacked RNN = layer pe layer, hierarchy waale features.</p>`,
  keys: ["stacked layers","h_t^(l) from h_t^(l-1) and h_{t-1}^(l)","hierarchical features","residual connections","Google NMT 8 layers","DeepSpeech 2"],
  draw: "Grid of RNN cells: 3 layers vertically × 4 time steps horizontally, arrows right (time) and up (depth).",
  fig: "",
  num: false
},
{
  id: "U4-24",
  unit: 4,
  topic: "RNN architecture",
  q: "Numerical: For a scalar RNN with W_xh = 1, W_hh = 0.5, b = 0, W_hy = 2, h0 = 0, compute the hidden states and outputs for the input sequence x = [1, 0, −1].",
  alt: ["Compute the forward pass of a simple RNN for 3 time steps.","Show how the hidden state carries memory with a numerical example."],
  marks: [4],
  priority: "low",
  prob: 20,
  diff: 2,
  pyq: [],
  why: "8AID 2025 had a backprop numerical (B4); an RNN forward-pass numerical is a possible but unlikely variant.",
  short: "h_t = tanh(W_xh x_t + W_hh h_{t−1}); here h1 = 0.762, h2 = 0.363, h3 = −0.674 and y_t = 2h_t = 1.523, 0.727, −1.348.",
  en: `<p><b>Given:</b> h<sub>t</sub> = tanh(W<sub>xh</sub>x<sub>t</sub> + W<sub>hh</sub>h<sub>t−1</sub> + b), y<sub>t</sub> = W<sub>hy</sub>h<sub>t</sub>; W<sub>xh</sub> = 1, W<sub>hh</sub> = 0.5, b = 0, W<sub>hy</sub> = 2, h<sub>0</sub> = 0, x = [1, 0, −1].</p>
<h4>Step t = 1</h4>
<div class="formula">a<sub>1</sub> = 1(1) + 0.5(0) = 1  →  h<sub>1</sub> = tanh(1) = 0.7616  →  y<sub>1</sub> = 2 × 0.7616 = 1.5232</div>
<h4>Step t = 2</h4>
<div class="formula">a<sub>2</sub> = 1(0) + 0.5(0.7616) = 0.3808  →  h<sub>2</sub> = tanh(0.3808) = 0.3634  →  y<sub>2</sub> = 0.7268</div>
<h4>Step t = 3</h4>
<div class="formula">a<sub>3</sub> = 1(−1) + 0.5(0.3634) = −0.8183  →  h<sub>3</sub> = tanh(−0.8183) = −0.6741  →  y<sub>3</sub> = −1.3483</div>
<table><tr><th>t</th><th>x<sub>t</sub></th><th>a<sub>t</sub></th><th>h<sub>t</sub></th><th>y<sub>t</sub></th></tr>
<tr><td>1</td><td>1</td><td>1.0000</td><td>0.7616</td><td>1.5232</td></tr>
<tr><td>2</td><td>0</td><td>0.3808</td><td>0.3634</td><td>0.7268</td></tr>
<tr><td>3</td><td>−1</td><td>−0.8183</td><td>−0.6741</td><td>−1.3483</td></tr></table>
<h4>Observations</h4>
<ul><li>At t = 2 the input is 0, yet h<sub>2</sub> ≠ 0: the network <b>remembers</b> x<sub>1</sub> through h<sub>1</sub>.</li><li>The memory decays (0.76 → 0.36) because W<sub>hh</sub> = 0.5 &lt; 1 — a small picture of the vanishing effect.</li><li>The same weights were used at all three steps (parameter sharing).</li></ul>
<p><b>Conclusion:</b> h = [0.762, 0.363, −0.674], y = [1.523, 0.727, −1.348].</p>`,
  hi: `<p><b>Diya hai:</b> h<sub>t</sub> = tanh(W<sub>xh</sub>x<sub>t</sub> + W<sub>hh</sub>h<sub>t−1</sub>), y<sub>t</sub> = 2h<sub>t</sub>; W<sub>xh</sub> = 1, W<sub>hh</sub> = 0.5, h<sub>0</sub> = 0, x = [1, 0, −1].</p>
<h4>t = 1</h4>
<div class="formula">a<sub>1</sub> = 1 + 0 = 1 → h<sub>1</sub> = tanh(1) = 0.7616 → y<sub>1</sub> = 1.5232</div>
<h4>t = 2</h4>
<div class="formula">a<sub>2</sub> = 0 + 0.5 × 0.7616 = 0.3808 → h<sub>2</sub> = 0.3634 → y<sub>2</sub> = 0.7268</div>
<h4>t = 3</h4>
<div class="formula">a<sub>3</sub> = −1 + 0.5 × 0.3634 = −0.8183 → h<sub>3</sub> = −0.6741 → y<sub>3</sub> = −1.3483</div>
<table><tr><th>t</th><th>x</th><th>h</th><th>y</th></tr>
<tr><td>1</td><td>1</td><td>0.7616</td><td>1.5232</td></tr>
<tr><td>2</td><td>0</td><td>0.3634</td><td>0.7268</td></tr>
<tr><td>3</td><td>−1</td><td>−0.6741</td><td>−1.3483</td></tr></table>
<h4>Kya seekha</h4>
<ul><li>t = 2 pe input 0 tha, phir bhi h<sub>2</sub> = 0.36: yeh x<sub>1</sub> ki <b>yaad</b> hai.</li><li>Yaad ghat rahi hai (0.76 → 0.36) kyunki W<sub>hh</sub> = 0.5 &lt; 1: vanishing ka chhota roop.</li><li>Teeno steps pe same weights.</li></ul>
<h4>Desi example</h4>
<p>Jaise garam chai ka cup: pehle minute garam (0.76), doosre minute thanda hone laga (0.36) bina naye input ke, aur teesre minute mein barf daal di (x = −1) toh ulta thanda (−0.67). Pichhli garmi ka asar har step pe thoda-thoda bacha rehta hai.</p>
<p><b>Answer:</b> h = [0.762, 0.363, −0.674], y = [1.523, 0.727, −1.348]. Calculator mein tanh radian mode mein karna.</p>`,
  keys: ["h_t = tanh(W_xh x_t + W_hh h_{t-1})","y_t = W_hy h_t","memory through h","decay since W_hh < 1","same weights each step"],
  draw: "Unfolded 3-step chain with the computed h and y values written on each cell.",
  fig: "unit4.html#q1",
  num: true
},
{
  id: "U4-25",
  unit: 4,
  topic: "Encoder-decoder seq2seq",
  q: "Differentiate greedy decoding and beam search in sequence-to-sequence models.",
  alt: ["What is beam search?","How is the output sequence generated at inference time in seq2seq / speech recognition?"],
  marks: [2,4],
  priority: "low",
  prob: 18,
  diff: 2,
  pyq: [],
  why: "Decoding appears inside the seq2seq and speech pipeline answers; rarely asked alone.",
  short: "Greedy decoding picks the single most probable token at each step; beam search keeps the k best partial sequences and returns the highest-scoring complete one.",
  en: `<p><b>Context:</b> At inference a seq2seq decoder must choose an output sequence y maximising P(y | x) = Π<sub>t</sub> P(y<sub>t</sub> | y<sub>&lt;t</sub>, x). Searching all V<sup>T</sup> sequences is impossible, so approximate search is used.</p>
<h4>Greedy decoding</h4>
<ul><li>At each step choose y<sub>t</sub> = argmax P(y<sub>t</sub> | y<sub>&lt;t</sub>, x) and feed it back.</li><li>Fast (one path) but an early wrong choice cannot be undone.</li></ul>
<h4>Beam search</h4>
<ol><li>Keep the top <b>k</b> (beam width, e.g. 4–10) partial sequences by cumulative log-probability.</li><li>Expand each by all vocabulary words → k × V candidates.</li><li>Keep the best k; move completed (&lt;END&gt;) hypotheses aside.</li><li>Return the best complete sequence, usually with <b>length normalisation</b> (score / length<sup>α</sup>) so short outputs are not unfairly favoured.</li></ol>
<div class="formula">score(y) = Σ<sub>t</sub> log P(y<sub>t</sub> | y<sub>&lt;t</sub>, x)</div>
<table><tr><th>Point</th><th>Greedy</th><th>Beam search</th></tr>
<tr><td>Paths kept</td><td>1</td><td>k</td></tr>
<tr><td>Cost</td><td>O(T·V)</td><td>O(k·T·V)</td></tr>
<tr><td>Quality</td><td>Can be sub-optimal</td><td>Usually better (higher BLEU / lower WER)</td></tr>
<tr><td>k = 1</td><td>Same as beam with k = 1</td><td>Generalises greedy</td></tr></table>
<p><b>Example:</b> Greedy picks "I" (0.5) then "am" (0.4) → 0.20; beam keeps "We" (0.4) whose best continuation "are" (0.9) → 0.36, a better sentence.</p>
<p><b>Use:</b> NMT, captioning, ASR (often with an LM fused into the beam score).</p>
<p><b>Conclusion:</b> Beam search trades extra compute for better output sequences.</p>`,
  hi: `<p><b>Context:</b> Test time pe decoder ko aisa output sentence chunna hai jiski probability sabse zyada ho. Saare possible sentences check karna impossible hai, isliye shortcut chahiye.</p>
<h4>Greedy decoding</h4>
<ul><li>Har step pe sabse zyada probability waala word lo aur aage badho.</li><li>Fast hai, par shuru mein galat word chuna toh baad mein sudhaar nahi sakte.</li></ul>
<h4>Beam search</h4>
<ol><li>Top <b>k</b> (beam width, jaise 5) adhoore sentences rakho.</li><li>Har ek ko saare words se aage badhao.</li><li>Phir se best k rakho; &lt;END&gt; waale alag rakh do.</li><li>Aakhir mein best poora sentence, length normalisation ke saath.</li></ol>
<div class="formula">score(y) = Σ<sub>t</sub> log P(y<sub>t</sub> | y<sub>&lt;t</sub>, x)</div>
<table><tr><th>Point</th><th>Greedy</th><th>Beam</th></tr>
<tr><td>Raaste</td><td>1</td><td>k</td></tr>
<tr><td>Speed</td><td>Fast</td><td>k guna slow</td></tr>
<tr><td>Quality</td><td>Kabhi kharab</td><td>Aam taur pe better</td></tr></table>
<p>k = 1 wala beam search = greedy.</p>
<h4>Desi example</h4>
<p>Shaadi ke liye rishta dhoondhna: greedy = pehla achha rishta dekha, haan bol di. Beam search = top 3 options saath mein aage badhao, families se milo, phir jo overall best ho woh chuno. Number example: greedy "I"(0.5) → "am"(0.4) = 0.20; beam "We"(0.4) → "are"(0.9) = 0.36, better.</p>
<p><b>Ek line:</b> Beam search = thoda zyada kaam, behtar sentence.</p>`,
  keys: ["argmax per step","beam width k","cumulative log-probability","length normalisation","k=1 = greedy","better BLEU / WER"],
  draw: "Search tree with beam width 2: kept branches bold, pruned branches dashed.",
  fig: "unit4.html#q4",
  num: false
},
{
  id: "U4-26",
  unit: 4,
  topic: "LSTM",
  q: "Numerical: For a scalar LSTM cell with x = 1, h_prev = 0, C_prev = 0.5 and gate pre-activations f = 1, i = 0.5, candidate = 1, o = 1, compute C_t and h_t.",
  alt: ["Compute one forward step of an LSTM cell.","Show numerically how the forget gate keeps old memory."],
  marks: [4],
  priority: "low",
  prob: 12,
  diff: 3,
  pyq: [],
  why: "Theory-first paper; an LSTM numerical has not appeared and is unlikely, but this cements the gate equations.",
  short: "f = σ(1) = 0.731, i = σ(0.5) = 0.622, C̃ = tanh(1) = 0.762, o = 0.731; C_t = 0.731×0.5 + 0.622×0.762 = 0.840; h_t = 0.731×tanh(0.840) = 0.501.",
  en: `<p><b>Given:</b> pre-activations (W[h<sub>t-1</sub>, x<sub>t</sub>] + b) are: forget = 1, input = 0.5, candidate = 1, output = 1; C<sub>t-1</sub> = 0.5.</p>
<h4>Step 1: gates</h4>
<div class="formula">f<sub>t</sub> = σ(1) = 1/(1 + e<sup>−1</sup>) = 0.7311<br>i<sub>t</sub> = σ(0.5) = 0.6225<br>C̃<sub>t</sub> = tanh(1) = 0.7616<br>o<sub>t</sub> = σ(1) = 0.7311</div>
<h4>Step 2: cell state</h4>
<div class="formula">C<sub>t</sub> = f<sub>t</sub>·C<sub>t-1</sub> + i<sub>t</sub>·C̃<sub>t</sub> = 0.7311 × 0.5 + 0.6225 × 0.7616 = 0.3655 + 0.4741 = 0.8396</div>
<h4>Step 3: hidden state</h4>
<div class="formula">h<sub>t</sub> = o<sub>t</sub> · tanh(C<sub>t</sub>) = 0.7311 × tanh(0.8396) = 0.7311 × 0.6856 = 0.5012</div>
<table><tr><th>Quantity</th><th>Value</th><th>Meaning</th></tr>
<tr><td>f<sub>t</sub></td><td>0.731</td><td>Keep 73% of old memory</td></tr>
<tr><td>i<sub>t</sub></td><td>0.622</td><td>Write 62% of new candidate</td></tr>
<tr><td>C<sub>t</sub></td><td>0.840</td><td>Updated memory</td></tr>
<tr><td>h<sub>t</sub></td><td>0.501</td><td>Exposed output</td></tr></table>
<h4>Observations</h4>
<ul><li>Old memory contributes 0.366 directly by addition, not through a weight matrix; this additive path is why gradients survive.</li><li>If f<sub>t</sub> were ≈ 1, the 0.5 would pass almost unchanged.</li></ul>
<p><b>Conclusion:</b> C<sub>t</sub> ≈ 0.840, h<sub>t</sub> ≈ 0.501.</p>`,
  hi: `<p><b>Diya hai:</b> gates ke pre-activation: forget = 1, input = 0.5, candidate = 1, output = 1; purani cell state C<sub>t-1</sub> = 0.5.</p>
<h4>Step 1: gates</h4>
<div class="formula">f = σ(1) = 0.7311, i = σ(0.5) = 0.6225, C̃ = tanh(1) = 0.7616, o = σ(1) = 0.7311</div>
<h4>Step 2: cell state</h4>
<div class="formula">C<sub>t</sub> = 0.7311 × 0.5 + 0.6225 × 0.7616 = 0.3655 + 0.4741 = 0.8396</div>
<h4>Step 3: hidden state</h4>
<div class="formula">h<sub>t</sub> = 0.7311 × tanh(0.8396) = 0.7311 × 0.6856 = 0.5012</div>
<table><tr><th>Cheez</th><th>Value</th><th>Matlab</th></tr>
<tr><td>f</td><td>0.731</td><td>Purani memory ka 73% rakho</td></tr>
<tr><td>i</td><td>0.622</td><td>Nayi info ka 62% likho</td></tr>
<tr><td>C<sub>t</sub></td><td>0.840</td><td>Nayi memory</td></tr>
<tr><td>h<sub>t</sub></td><td>0.501</td><td>Bahar dikhne waala output</td></tr></table>
<h4>Kya samjha</h4>
<ul><li>Purani memory 0.366 seedhe <b>jud</b> gayi, kisi weight matrix se multiply nahi hui; isi wajah se gradient bachta hai.</li><li>f ≈ 1 hota toh 0.5 lagbhag poora bach jaata.</li></ul>
<h4>Desi example</h4>
<p>Gullak (piggy bank) mein 0.5 rupaye the. Forget gate ne 73% rakhne diye (0.37), input gate ne naye 0.47 daal diye, total 0.84. Output gate ne bataya ki bahar sirf 0.50 dikhana hai. Gullak ka paisa jud ke badhta hai, isliye kho nahi jaata.</p>
<p><b>Answer:</b> C<sub>t</sub> ≈ 0.840, h<sub>t</sub> ≈ 0.501.</p>`,
  keys: ["σ(1) = 0.731","tanh(1) = 0.762","C_t = f·C_{t-1} + i·C~","h_t = o·tanh(C_t)","additive memory"],
  draw: "LSTM cell with the computed numbers written on each gate and on the cell-state line.",
  fig: "unit4.html#q2",
  num: true
}
);
