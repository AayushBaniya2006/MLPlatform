import type { Week } from "@/lib/types";

export const prerequisites: string[] = [
  "Comfortable with basic Python (loops, functions, classes). Scientific Python (NumPy, Jupyter, matplotlib) is taught in Week 1 — no prior knowledge required.",
  "A Mac, Linux box, or Windows with WSL2. Terminal access required.",
  "GitHub account with SSH or HTTPS auth working.",
  "~25–35 hours/week available for 12 weeks. The plan is paced for 30h/week.",
  "High-school algebra fluency. Multivariable calculus and linear algebra are re-derived in Week 1, but trigonometry and algebra are assumed.",
];

export const weeks: Week[] = [
  // ───────────────────────────── WEEK 1 ─────────────────────────────
  {
    number: 1,
    phase: "Phase 0: Math Audit",
    title: "Math foundations + Scientific Python on-ramp",
    goal: "Build the math foundation AND the working environment. End the week able to derive backprop for a 2-layer MLP on paper, with a working Python + Jupyter + NumPy setup and a GitHub repo for your curriculum work.",
    estimatedHours: 25,
    killCriterion:
      "If by end of week 1 you cannot (a) derive ∂L/∂W for a 2-layer MLP with ReLU + cross-entropy loss on paper, OR (b) run a Jupyter notebook that imports NumPy and matplotlib on your machine, you must stop. Week 2 (fast.ai) requires both. Do not push forward \"to catch up\" — both gaps compound.",
    topics: [
      {
        id: "w1-linalg",
        title: "Linear Algebra refresh",
        summary:
          "Rebuild geometric intuition for the core operations of linear algebra. Aim is fluency, not novelty: matrix multiplication, determinants, change of basis, eigenvectors, and SVD should feel obvious by week's end.",
        resources: [
          { label: "3Blue1Brown — Essence of Linear Algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", type: "video" },
          { label: "Gilbert Strang — MIT 18.06 Lectures 1-6", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/video_galleries/video-lectures/", type: "video" },
        ],
        problems: [
          { id: "w1-linalg-q1", title: "Watch 3B1B Essence of Linear Algebra chapters 1-9", description: "Watch the full first nine chapters of the 3B1B playlist. Take notes on anything that doesn't click — those are the gaps to close.", source: "3B1B playlist", sourceUrl: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", estimatedMinutes: 180, status: "not_started", notes: "" },
          { id: "w1-linalg-q2", title: "Matrix multiplication: geometric intuition + numerical problem", description: "Write one paragraph in your notes explaining matrix multiplication as a composition of linear transformations. Then do one numerical multiplication problem by hand (at least 3×3).", source: "3B1B + own notes", estimatedMinutes: 25, status: "not_started", notes: "" },
          { id: "w1-linalg-q3", title: "Determinant: geometric intuition + numerical problem", description: "One paragraph on the determinant as signed volume scaling. One numerical problem computing a 3×3 determinant by cofactor expansion.", source: "3B1B + own notes", estimatedMinutes: 25, status: "not_started", notes: "" },
          { id: "w1-linalg-q4", title: "Change of basis: geometric intuition + numerical problem", description: "One paragraph on change of basis as relabeling coordinates. One numerical problem converting a vector between two bases.", source: "3B1B + own notes", estimatedMinutes: 25, status: "not_started", notes: "" },
          { id: "w1-linalg-q5", title: "Eigenvectors: geometric intuition + numerical problem", description: "One paragraph on eigenvectors as invariant directions. One numerical problem finding eigenvalues/eigenvectors of a 2×2 or 3×3 matrix.", source: "3B1B + own notes", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w1-linalg-q6", title: "SVD: geometric intuition + numerical problem", description: "One paragraph on SVD as rotate–scale–rotate. One numerical problem computing the SVD of a small (e.g., 2×3) matrix.", source: "3B1B + Strang", estimatedMinutes: 35, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w1-calc",
        title: "Multivariable Calculus for ML",
        summary:
          "Master the chain rule and Jacobians in their multivariable form. These are the operations you'll execute thousands of times in backprop — they must be automatic.",
        resources: [
          { label: "3Blue1Brown — Essence of Calculus", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr", type: "video" },
          { label: "Matrix Calculus (Parr & Howard)", url: "https://explained.ai/matrix-calculus/", type: "article" },
        ],
        problems: [
          { id: "w1-calc-q1", title: "Derive gradient of f(x) = xᵀAx", description: "Derive the gradient of the scalar function f(x) = xᵀAx with respect to vector x, for both general A and symmetric A. Show every step.", source: "Matrix Calculus", sourceUrl: "https://explained.ai/matrix-calculus/", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w1-calc-q2", title: "Derive Jacobian of softmax", description: "Derive the Jacobian of the softmax function. Identify and explain the diagonal vs off-diagonal structure.", source: "own derivation", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w1-calc-q3", title: "Chain rule on composed vector functions", description: "Pick a composition g(f(x)) where f and g are both vector-valued, and derive the full Jacobian via the multivariable chain rule.", source: "own derivation", estimatedMinutes: 25, status: "not_started", notes: "" },
          { id: "w1-calc-q4", title: "Mixed problem", description: "One mixed problem combining matrix calculus + chain rule of your choice — e.g., derive the gradient of cross-entropy loss with respect to logits for a softmax classifier.", source: "own derivation", estimatedMinutes: 40, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w1-pyenv",
        title: "Scientific Python primer",
        summary:
          "Set up the environment you'll use for the next 11 weeks. Goal: a working Python 3.10+ install, Jupyter Lab, NumPy and matplotlib comfort, and a GitHub repo holding your curriculum work. NumPy fluency is the on-ramp for fast.ai (Week 2) and Karpathy's Phase 2 from-scratch implementations.",
        resources: [
          { label: "Python Data Science Handbook — Ch. 1 (Jupyter) & Ch. 2 (NumPy)", url: "https://jakevdp.github.io/PythonDataScienceHandbook/", type: "book" },
          { label: "Real Python — NumPy tutorial", url: "https://realpython.com/numpy-tutorial/", type: "article" },
          { label: "GitHub — first-time setup", url: "https://docs.github.com/en/get-started/quickstart/set-up-git", type: "article" },
        ],
        problems: [
          { id: "w1-pyenv-q1", title: "Install Python 3.10+ and Jupyter Lab", description: "Install Python 3.10 or newer (pyenv recommended on macOS/Linux). Install Jupyter Lab. Run `jupyter lab`, create a fresh notebook, and execute `print('hello')`.", source: "official docs", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w1-pyenv-q2", title: "NumPy basics — work through PDSH Chapter 2", description: "Read and run every code cell in Chapter 2 of the Python Data Science Handbook (NumPy: arrays, indexing, slicing, broadcasting, ufuncs, aggregations). Don't skim — type the cells.", source: "PDSH Ch. 2", sourceUrl: "https://jakevdp.github.io/PythonDataScienceHandbook/", estimatedMinutes: 240, status: "not_started", notes: "" },
          { id: "w1-pyenv-q3", title: "matplotlib hello-world", description: "In a notebook, create a 100-point NumPy array of x values, compute y = sin(x) + 0.1·random, and plot it with matplotlib. Annotate one peak with a marker.", source: "own work", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w1-pyenv-q4", title: "Set up your curriculum GitHub repo", description: "Create a public (or private) GitHub repo named e.g. `ml-12-weeks`. Push your environment-setup notebook and a README that lists your Python version, OS, and setup notes.", source: "GitHub", sourceUrl: "https://docs.github.com/en/get-started/quickstart/set-up-git", estimatedMinutes: 45, status: "not_started", notes: "" },
          { id: "w1-pyenv-q5", title: "Math → code bridge — manual linear regression in NumPy", description: "Implement single-variable linear regression from scratch in NumPy: generate a tiny synthetic dataset (y = 2x + 1 + noise), compute MSE loss, compute the gradient by hand (using the calculus from Topic 2), and run 100 gradient-descent steps. Plot the loss curve. This is the lightest possible exercise of translating paper math to working code — it sets you up for fast.ai and seeds the from-scratch backprop work you'll do in Week 6.", source: "own work", estimatedMinutes: 90, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w1-prob",
        title: "Probability essentials",
        summary:
          "Reground in the probability concepts that ML actually uses: MLE, KL divergence, conjugate priors, entropy. Skip the rest for now.",
        resources: [
          { label: "Murphy — Probabilistic ML, Ch. 2", url: "https://probml.github.io/pml-book/book1.html", type: "book" },
        ],
        problems: [
          { id: "w1-prob-q1", title: "MLE for Gaussian mean and variance", description: "Derive the maximum likelihood estimators for the mean and variance of a univariate Gaussian. Show why the MLE variance estimator is biased.", source: "Murphy Ch. 2", estimatedMinutes: 40, status: "not_started", notes: "" },
          { id: "w1-prob-q2", title: "KL(N(μ1,σ1) ‖ N(μ2,σ2))", description: "Derive the KL divergence between two univariate Gaussians. Sanity-check by computing KL when the two distributions are identical.", source: "Murphy Ch. 2", estimatedMinutes: 45, status: "not_started", notes: "" },
          { id: "w1-prob-q3", title: "Bayes update with a conjugate prior", description: "Pick any conjugate pair (Beta-Bernoulli is canonical) and walk through a full Bayesian update with explicit numbers.", source: "Murphy Ch. 2", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w1-prob-q4", title: "Entropy problem", description: "Compute the entropy of a discrete distribution of your choice, then compute its cross-entropy against a uniform distribution and confirm the relationship to KL.", source: "Murphy Ch. 2", estimatedMinutes: 25, status: "not_started", notes: "" },
        ],
      },
    ],
    weeklyDeliverable: {
      title: "Math derivations document + working Python environment",
      description:
        "Two artifacts. (1) A markdown document (or photographed handwritten pages, committed to your GitHub repo) containing your full derivations of: gradient of f(x) = xᵀAx, the Jacobian of softmax, MLE for Gaussian mean+variance, KL(N(μ₁,σ₁) ‖ N(μ₂,σ₂)), and — the kill-criterion check — ∂L/∂W for a 2-layer MLP with ReLU + cross-entropy loss. (2) A GitHub repo containing your environment-setup notebook (NumPy + matplotlib working) and your linear-regression-from-scratch notebook from Topic 4. No working MLP is required this week — that comes in Week 6.",
      rubric: [
        "All 5 derivations shown end-to-end (including ∂L/∂W for 2-layer MLP)",
        "Python 3.10+, Jupyter, NumPy, matplotlib all running on your machine",
        "Public or private GitHub repo created with notebooks + README",
        "Linear-regression-from-scratch notebook runs and plots a loss curve",
        "Reflection: which derivation was hardest, and which Python concept was new",
      ],
      rubricChecked: [false, false, false, false, false],
      submitted: false,
      reflection: "",
      expectedScore: 100,
    },
  },

  // ───────────────────────────── WEEK 2 ─────────────────────────────
  {
    number: 2,
    phase: "Phase 1: fast.ai",
    title: "fast.ai — Lessons 1-2",
    goal: "Train and deploy your first deep learning model. Internalize the top-down workflow: ship first, understand later.",
    estimatedHours: 30,
    killCriterion:
      "If by end of week 2 you have not deployed at least one model to Hugging Face Spaces or Gradio, the plan is failing. Do not move to Week 3.",
    topics: [
      {
        id: "w2-preflight",
        title: "Preflight — accounts and tooling",
        summary:
          "fast.ai's Lesson 2 will ask you to deploy a model to Hugging Face Spaces. That's the kill criterion for the week. Spend 30 minutes confirming the accounts and tooling are ready before you start the lesson work — otherwise the deploy step bites you mid-week.",
        resources: [
          { label: "Hugging Face — Spaces", url: "https://huggingface.co/spaces", type: "article" },
          { label: "Kaggle", url: "https://www.kaggle.com/", type: "article" },
        ],
        problems: [
          { id: "w2-preflight-q1", title: "Verify Kaggle + Hugging Face + GitHub accounts work", description: "Confirm you can log into Kaggle, Hugging Face, and GitHub. Make a throwaway commit-and-push to a private GitHub repo to confirm Git auth. Generate a Hugging Face access token for later use in Lesson 2.", source: "own setup", estimatedMinutes: 30, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w2-fastai-l1",
        title: "Lesson 1 — Getting started",
        summary:
          "Run a working classifier on day one. The point is to internalize the top-down approach: build first, theorize later.",
        resources: [
          { label: "Lesson 1 video", url: "https://course.fast.ai/Lessons/lesson1.html", type: "video" },
          { label: "Fastbook Ch. 1", url: "https://github.com/fastai/fastbook/blob/master/01_intro.ipynb", type: "book" },
          { label: "Kaggle: Is it a bird?", url: "https://www.kaggle.com/code/jhoward/is-it-a-bird-creating-a-model-from-your-own-data", type: "repo" },
        ],
        problems: [
          { id: "w2-fastai-l1-q1", title: "Watch Lesson 1 in full", description: "Watch the full Lesson 1 video. Resist the urge to skip — the first 30 minutes set the philosophy for the whole course.", source: "fast.ai Lesson 1", sourceUrl: "https://course.fast.ai/Lessons/lesson1.html", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w2-fastai-l1-q2", title: "Run the bird classifier on Kaggle", description: "Open the \"Is it a bird?\" Kaggle notebook, run every cell, and confirm the model trains end-to-end.", source: "Kaggle", sourceUrl: "https://www.kaggle.com/code/jhoward/is-it-a-bird-creating-a-model-from-your-own-data", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w2-fastai-l1-q3", title: "Replicate the classifier on a different domain", description: "Pick a different domain (musical instruments, sneaker brands, dog breeds, etc.) and rebuild the classifier from scratch in your own notebook.", source: "own work", estimatedMinutes: 120, status: "not_started", notes: "" },
          { id: "w2-fastai-l1-q4", title: "Answer Chapter 1 Questionnaire (10+ questions)", description: "Write answers to at least 10 of the Chapter 1 end-of-chapter questions in your notes.", source: "Fastbook Ch. 1", sourceUrl: "https://github.com/fastai/fastbook/blob/master/01_intro.ipynb", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w2-fastai-l1-q5", title: "200-word reflection on top-down pedagogy", description: "Write a 200-word reflection on what's gained and lost by fast.ai's top-down approach.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w2-fastai-l2",
        title: "Lesson 2 — Deployment",
        summary:
          "Ship a model to the public internet. The deployment step is what crystalizes the whole workflow: a model that lives on your laptop doesn't count.",
        resources: [
          { label: "Lesson 2 video", url: "https://course.fast.ai/Lessons/lesson2.html", type: "video" },
          { label: "Fastbook Ch. 2", url: "https://github.com/fastai/fastbook/blob/master/02_production.ipynb", type: "book" },
        ],
        problems: [
          { id: "w2-fastai-l2-q1", title: "Watch Lesson 2", description: "Full Lesson 2 video, focusing on the data-cleaning loop and the deployment workflow.", source: "fast.ai Lesson 2", sourceUrl: "https://course.fast.ai/Lessons/lesson2.html", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w2-fastai-l2-q2", title: "Build the bear classifier (or substitute)", description: "Build the bear classifier from the book — or substitute a domain of your choice (the one you started in Lesson 1 is fine).", source: "Fastbook Ch. 2", estimatedMinutes: 120, status: "not_started", notes: "" },
          { id: "w2-fastai-l2-q3", title: "Clean the dataset with the lesson techniques", description: "Use the ImageClassifierCleaner workflow shown in the lesson to remove mislabeled / low-quality images, then retrain.", source: "Fastbook Ch. 2", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w2-fastai-l2-q4", title: "Deploy to Hugging Face Spaces with Gradio", description: "Wrap the trained model in a Gradio app and push it to a Hugging Face Space. Confirm it works from a browser.", source: "fast.ai Lesson 2", estimatedMinutes: 120, status: "not_started", notes: "" },
          { id: "w2-fastai-l2-q5", title: "Save the public URL in your notes", description: "Paste the public URL of your deployed Space into your notes so you can link it from your GitHub README later.", source: "own work", estimatedMinutes: 5, status: "not_started", notes: "" },
        ],
      },
    ],
    weeklyDeliverable: {
      title: "Deployed classifier #1",
      description:
        "A custom image classifier on a domain you picked, trained with fastai, deployed publicly on Hugging Face Spaces with a Gradio interface. Linked from your GitHub README.",
      rubric: [
        "Custom domain (not the lesson's default)",
        "Dataset cleaned, >100 images",
        "Model achieves reasonable accuracy (>80% on your validation set)",
        "Deployed publicly with working URL",
        "GitHub repo with notebook + README explaining your dataset choice",
      ],
      rubricChecked: [false, false, false, false, false],
      submitted: false,
      reflection: "",
      expectedScore: 90,
    },
  },

  // ───────────────────────────── WEEK 3 ─────────────────────────────
  {
    number: 3,
    phase: "Phase 1: fast.ai",
    title: "fast.ai — Lessons 3-4",
    goal: "Understand the neural net foundations beneath fastai's abstractions. Start handling text data.",
    estimatedHours: 30,
    killCriterion:
      "If you cannot, by end of week 3, explain what an embedding is and why it matters, you need to slow down.",
    topics: [
      {
        id: "w3-fastai-l3",
        title: "Lesson 3 — Neural net foundations",
        summary:
          "Now we pull back the curtain. Lesson 3 walks through SGD and the actual mechanics under fastai's high-level API. You should leave this week able to write training loops by hand.",
        resources: [
          { label: "Lesson 3 video", url: "https://course.fast.ai/Lessons/lesson3.html", type: "video" },
          { label: "Fastbook Ch. 4", url: "https://github.com/fastai/fastbook/blob/master/04_mnist_basics.ipynb", type: "book" },
        ],
        problems: [
          { id: "w3-fastai-l3-q1", title: "Watch Lesson 3", description: "Full Lesson 3 video, with notes on the SGD walk-through.", source: "fast.ai Lesson 3", sourceUrl: "https://course.fast.ai/Lessons/lesson3.html", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w3-fastai-l3-q2", title: "Implement SGD from scratch on MNIST 3-vs-7", description: "Follow Chapter 4: implement gradient descent yourself on the MNIST 3-vs-7 binary classification task, no fastai shortcuts.", source: "Fastbook Ch. 4", sourceUrl: "https://github.com/fastai/fastbook/blob/master/04_mnist_basics.ipynb", estimatedMinutes: 180, status: "not_started", notes: "" },
          { id: "w3-fastai-l3-q3", title: "Answer Chapter 4 Questionnaire", description: "Work through the Chapter 4 questionnaire in your notes.", source: "Fastbook Ch. 4", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w3-fastai-l3-q4", title: "Parameter vs activation, in your own words", description: "Write a clear distinction between a parameter and an activation. Use a concrete example from your MLP.", source: "own writing", estimatedMinutes: 20, status: "not_started", notes: "" },
          { id: "w3-fastai-l3-q5", title: "Implement a Learner from scratch", description: "Write a minimal Learner class that bundles model + optimizer + loss + data loaders, with a .fit() method. No fastai.", source: "own work", estimatedMinutes: 120, status: "not_started", notes: "" },
          { id: "w3-fastai-l3-q6", title: "Reflection: what is fastai hiding?", description: "List five things fastai's abstractions hide from you. For each, decide whether the abstraction is helpful or load-bearing.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w3-fastai-l4",
        title: "Lesson 4 — Natural Language (NLP)",
        summary:
          "First taste of transformers and fine-tuning. Embeddings are the conceptual key — don't leave this lesson without internalizing them.",
        resources: [
          { label: "Lesson 4 video", url: "https://course.fast.ai/Lessons/lesson4.html", type: "video" },
          { label: "Fastbook Ch. 10", url: "https://github.com/fastai/fastbook/blob/master/10_nlp.ipynb", type: "book" },
        ],
        problems: [
          { id: "w3-fastai-l4-q1", title: "Watch Lesson 4", description: "Full Lesson 4 video.", source: "fast.ai Lesson 4", sourceUrl: "https://course.fast.ai/Lessons/lesson4.html", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w3-fastai-l4-q2", title: "Fine-tune a HuggingFace transformer on a custom text dataset", description: "Pick a text classification dataset of your choice and fine-tune a small transformer (e.g., DistilBERT) on it.", source: "Fastbook Ch. 10 / HF", estimatedMinutes: 180, status: "not_started", notes: "" },
          { id: "w3-fastai-l4-q3", title: "Answer Chapter 10 Questionnaire", description: "Work through the Chapter 10 questionnaire in your notes.", source: "Fastbook Ch. 10", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w3-fastai-l4-q4", title: "200-word explanation: what does fine-tuning actually change?", description: "Write a 200-word explanation of what is updated inside the model during fine-tuning vs. what is frozen.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w3-fastai-l4-q5", title: "Deploy the text classifier", description: "Wrap the fine-tuned classifier in a Gradio app and deploy it to Hugging Face Spaces.", source: "own work", estimatedMinutes: 90, status: "not_started", notes: "" },
        ],
      },
    ],
    weeklyDeliverable: {
      title: "From-scratch SGD + text classifier",
      description:
        "Two notebooks. (1) MNIST trained with SGD you implemented yourself, matching fastai's accuracy. (2) Text classifier fine-tuned on a custom dataset, deployed.",
      rubric: [
        "From-scratch SGD trains to >98% on 3-vs-7",
        "Loss curves plotted and explained",
        "Text classifier achieves competitive accuracy",
        "Both deployed or shipped to GitHub with reproducible instructions",
        "Reflection comparing fastai's training loop to your from-scratch version",
      ],
      rubricChecked: [false, false, false, false, false],
      submitted: false,
      reflection: "",
      expectedScore: 85,
    },
  },

  // ───────────────────────────── WEEK 4 ─────────────────────────────
  {
    number: 4,
    phase: "Phase 1: fast.ai",
    title: "fast.ai — Lessons 5-6",
    goal: "Build a model from scratch end-to-end. Understand random forests as a contrast point to deep learning.",
    estimatedHours: 30,
    killCriterion:
      "None this week — this is the consolidation week of Phase 1. If you're falling behind on hours, this is where you absorb the slip.",
    topics: [
      {
        id: "w4-fastai-l5",
        title: "Lesson 5 — From-scratch model",
        summary:
          "Build the pet breeds classifier and use the experience to understand transfer learning and the LR finder. Cross-entropy from scratch is the integrating exercise.",
        resources: [
          { label: "Lesson 5 video", url: "https://course.fast.ai/Lessons/lesson5.html", type: "video" },
          { label: "Fastbook Ch. 5", url: "https://github.com/fastai/fastbook/blob/master/05_pet_breeds.ipynb", type: "book" },
        ],
        problems: [
          { id: "w4-fastai-l5-q1", title: "Watch Lesson 5", description: "Full Lesson 5 video.", source: "fast.ai Lesson 5", sourceUrl: "https://course.fast.ai/Lessons/lesson5.html", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w4-fastai-l5-q2", title: "Implement the pet breeds classifier", description: "Build the multi-class pet breeds classifier from Chapter 5.", source: "Fastbook Ch. 5", sourceUrl: "https://github.com/fastai/fastbook/blob/master/05_pet_breeds.ipynb", estimatedMinutes: 150, status: "not_started", notes: "" },
          { id: "w4-fastai-l5-q3", title: "Experiment with the learning rate finder", description: "Run the LR finder on a couple of different models and write up what the curves are telling you.", source: "Fastbook Ch. 5", estimatedMinutes: 45, status: "not_started", notes: "" },
          { id: "w4-fastai-l5-q4", title: "Cross-entropy from scratch", description: "Implement cross-entropy loss from scratch in NumPy or PyTorch, with explicit log-softmax handling. Verify against a library implementation.", source: "own work", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w4-fastai-l5-q5", title: "Answer Chapter 5 Questionnaire", description: "Full Chapter 5 questionnaire in your notes.", source: "Fastbook Ch. 5", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w4-fastai-l5-q6", title: "Reflection on transfer learning", description: "Write 250 words on why transfer learning works and where it breaks down.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w4-fastai-l6",
        title: "Lesson 6 — Random forests",
        summary:
          "Counter-program against the deep learning monoculture. Trees still dominate tabular. Knowing when not to reach for a neural net is a senior skill.",
        resources: [
          { label: "Lesson 6 video", url: "https://course.fast.ai/Lessons/lesson6.html", type: "video" },
          { label: "Fastbook Ch. 9", url: "https://github.com/fastai/fastbook/blob/master/09_tabular.ipynb", type: "book" },
        ],
        problems: [
          { id: "w4-fastai-l6-q1", title: "Watch Lesson 6", description: "Full Lesson 6 video.", source: "fast.ai Lesson 6", sourceUrl: "https://course.fast.ai/Lessons/lesson6.html", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w4-fastai-l6-q2", title: "Build a random forest from scratch on a Kaggle tabular competition", description: "Pick any Kaggle tabular competition (active or completed) and build a random forest pipeline, ideally writing the tree logic yourself for at least one tree.", source: "Fastbook Ch. 9 + Kaggle", estimatedMinutes: 180, status: "not_started", notes: "" },
          { id: "w4-fastai-l6-q3", title: "Submit to Kaggle", description: "Submit your predictions to the competition and record the public leaderboard score.", source: "Kaggle", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w4-fastai-l6-q4", title: "Analyze feature importance", description: "Plot and interpret feature importance from your random forest. Identify the top 5 features and explain why they make sense.", source: "Fastbook Ch. 9", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w4-fastai-l6-q5", title: "Reflection: trees vs deep learning", description: "Write 250 words on when to use trees vs deep learning, drawing on your experience this week.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
        ],
      },
    ],
    weeklyDeliverable: {
      title: "Kaggle tabular submission + analysis",
      description:
        "Submit to a live or completed Kaggle tabular competition. Achieve a reasonable rank. Write up your feature engineering, model choice, and what you learned.",
      rubric: [
        "Active Kaggle submission with public score",
        "Feature engineering documented",
        "Comparison of at least 2 model types (random forest + something else)",
        "Writeup explaining your choices",
        "Code on GitHub",
      ],
      rubricChecked: [false, false, false, false, false],
      submitted: false,
      reflection: "",
      expectedScore: 80,
    },
  },

  // ───────────────────────────── WEEK 5 ─────────────────────────────
  {
    number: 5,
    phase: "Phase 1: fast.ai",
    title: "fast.ai — Lessons 7-8 + Phase 1 capstone",
    goal: "Finish fast.ai Part 1. Ship a real, polished, publicly visible deep learning project.",
    estimatedHours: 30,
    killCriterion:
      "If by end of week 5 you don't have a deployed model on your GitHub README that you'd actually show in an interview, the plan is failing. Stop and re-evaluate before Karpathy.",
    topics: [
      {
        id: "w5-fastai-l7",
        title: "Lesson 7 — Collaborative filtering",
        summary:
          "Embeddings move from \"NLP technique\" to \"general representation tool.\" The movie-recommender exercise is the cleanest way to internalize embeddings.",
        resources: [
          { label: "Lesson 7 video", url: "https://course.fast.ai/Lessons/lesson7.html", type: "video" },
          { label: "Fastbook Ch. 8", url: "https://github.com/fastai/fastbook/blob/master/08_collab.ipynb", type: "book" },
        ],
        problems: [
          { id: "w5-fastai-l7-q1", title: "Watch Lesson 7", description: "Full Lesson 7 video.", source: "fast.ai Lesson 7", sourceUrl: "https://course.fast.ai/Lessons/lesson7.html", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w5-fastai-l7-q2", title: "Build a movie recommender from scratch", description: "Build the MovieLens collaborative filter from Chapter 8, writing the embedding layer yourself.", source: "Fastbook Ch. 8", sourceUrl: "https://github.com/fastai/fastbook/blob/master/08_collab.ipynb", estimatedMinutes: 150, status: "not_started", notes: "" },
          { id: "w5-fastai-l7-q3", title: "300-word explanation of embeddings", description: "Write 300 words explaining embeddings in your own words: what they are, why they work, what task structure they exploit.", source: "own writing", estimatedMinutes: 45, status: "not_started", notes: "" },
          { id: "w5-fastai-l7-q4", title: "Deploy the recommender", description: "Wrap the recommender in a small Gradio interface and deploy it.", source: "own work", estimatedMinutes: 75, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w5-fastai-l8",
        title: "Lesson 8 — Convolutions (CNNs)",
        summary:
          "Rebuild the convolution operation from primitives. fastai hides this — you should be able to write a Conv2d forward pass by hand.",
        resources: [
          { label: "Lesson 8 video", url: "https://course.fast.ai/Lessons/lesson8.html", type: "video" },
          { label: "Fastbook Ch. 13", url: "https://github.com/fastai/fastbook/blob/master/13_convolutions.ipynb", type: "book" },
        ],
        problems: [
          { id: "w5-fastai-l8-q1", title: "Watch Lesson 8", description: "Full Lesson 8 video.", source: "fast.ai Lesson 8", sourceUrl: "https://course.fast.ai/Lessons/lesson8.html", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w5-fastai-l8-q2", title: "Implement a CNN from scratch in PyTorch (no fastai)", description: "Build a small CNN (e.g., 3 conv blocks + FC head) entirely in raw PyTorch and train it on a dataset of your choice.", source: "Fastbook Ch. 13 / own work", estimatedMinutes: 180, status: "not_started", notes: "" },
          { id: "w5-fastai-l8-q3", title: "Compare accuracy to fastai's version", description: "Train an equivalent fastai CNN on the same dataset. Compare convergence speed and final accuracy and explain the gap.", source: "own work", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w5-fastai-l8-q4", title: "Visualize feature maps", description: "Pull activations from the first and last convolutional layers and visualize them. Interpret what each layer is detecting.", source: "own work", estimatedMinutes: 60, status: "not_started", notes: "" },
        ],
      },
    ],
    weeklyDeliverable: {
      title: "Phase 1 Capstone — Your portfolio project",
      description:
        "One polished, deployed, publicly shareable ML project of your choosing. Pinned to GitHub. README with problem statement, approach, results, demo link. This is the artifact you'd show in an interview. Not the bear classifier from week 2.",
      rubric: [
        "Original problem (not from any lesson)",
        "Public demo URL (HF Spaces / Gradio / Replicate)",
        "GitHub repo pinned to profile",
        "README with: problem, data, approach, results, limitations",
        "Reproducible (someone else could run it)",
        "Includes at least one design decision you can defend in an interview",
      ],
      rubricChecked: [false, false, false, false, false, false],
      submitted: false,
      reflection: "",
      expectedScore: 90,
    },
  },

  // ───────────────────────────── WEEK 6 ─────────────────────────────
  {
    number: 6,
    phase: "Phase 2: Karpathy",
    title: "Karpathy — Micrograd + makemore 1-2",
    goal: "Rebuild autograd from scratch. Start understanding language modeling from the ground up.",
    estimatedHours: 30,
    killCriterion:
      "End of week 6, if you can't explain what micrograd is doing on a whiteboard without notes, you skipped too fast.",
    topics: [
      {
        id: "w6-micrograd",
        title: "Micrograd",
        summary:
          "Autograd in 100 lines of Python. After this week you should never again think of backprop as magic.",
        resources: [
          { label: "Micrograd lecture", url: "https://www.youtube.com/watch?v=VMj-3S1tku0", type: "video" },
          { label: "micrograd repo", url: "https://github.com/karpathy/micrograd", type: "repo" },
        ],
        problems: [
          { id: "w6-micrograd-q1", title: "Watch the full micrograd lecture", description: "All ~2.5 hours, in one or two sittings. Don't skip the derivation segments.", source: "Karpathy", sourceUrl: "https://www.youtube.com/watch?v=VMj-3S1tku0", estimatedMinutes: 150, status: "not_started", notes: "" },
          { id: "w6-micrograd-q2", title: "Re-implement micrograd from scratch (without copying)", description: "Close his repo. Implement Value, the autograd graph, and backward() from your own memory. Compare to his only after you have something working.", source: "own work", estimatedMinutes: 240, status: "not_started", notes: "" },
          { id: "w6-micrograd-q3", title: "Add ReLU and sigmoid as new ops", description: "tanh exists in the original; you add ReLU and sigmoid yourself, including the local gradient definitions.", source: "own work", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w6-micrograd-q4", title: "Train an MLP on a simple dataset using your micrograd", description: "Pick a toy dataset (XOR, moons, a tiny tabular set) and train an MLP using only your engine.", source: "own work", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w6-micrograd-q5", title: "Write up how your version differs from his", description: "After comparing, write up the diffs: API choices, missing ops, anything that surprised you.", source: "own writing", estimatedMinutes: 45, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w6-makemore1",
        title: "Makemore Part 1 — bigram model",
        summary:
          "The dumbest possible language model. The exercise is to feel its limits — the rest of makemore is the climb out of those limits.",
        resources: [
          { label: "Makemore Part 1 lecture", url: "https://www.youtube.com/watch?v=PaCmpygFfXo", type: "video" },
          { label: "makemore repo", url: "https://github.com/karpathy/makemore", type: "repo" },
        ],
        problems: [
          { id: "w6-makemore1-q1", title: "Watch the bigram lecture", description: "Full ~2-hour bigram lecture.", source: "Karpathy", sourceUrl: "https://www.youtube.com/watch?v=PaCmpygFfXo", estimatedMinutes: 120, status: "not_started", notes: "" },
          { id: "w6-makemore1-q2", title: "Build the bigram model from scratch", description: "Re-implement the bigram language model end-to-end in PyTorch (or NumPy).", source: "own work", estimatedMinutes: 120, status: "not_started", notes: "" },
          { id: "w6-makemore1-q3", title: "Train on a custom corpus (not names)", description: "Pick a corpus of your choice — song titles, country names, restaurant names, anything but the lesson's names dataset — and train the bigram on it.", source: "own work", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w6-makemore1-q4", title: "Write up what a bigram model is and what it can't do", description: "Write a clear explanation of the bigram model and list its failure modes that motivate the next lecture.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w6-makemore2",
        title: "Makemore Part 2 — MLP",
        summary:
          "Upgrade the bigram into a neural language model, exactly the way Bengio et al. 2003 did. This is the conceptual root of modern LMs.",
        resources: [
          { label: "Makemore Part 2 lecture", url: "https://www.youtube.com/watch?v=TCH_1BHY58I", type: "video" },
        ],
        problems: [
          { id: "w6-makemore2-q1", title: "Watch the MLP lecture", description: "Full Part 2 video.", source: "Karpathy", sourceUrl: "https://www.youtube.com/watch?v=TCH_1BHY58I", estimatedMinutes: 120, status: "not_started", notes: "" },
          { id: "w6-makemore2-q2", title: "Implement the MLP language model from scratch", description: "Re-implement the MLP-based character LM from scratch.", source: "own work", estimatedMinutes: 150, status: "not_started", notes: "" },
          { id: "w6-makemore2-q3", title: "Experiment with embedding dimensions", description: "Sweep embedding dimensions (e.g., 2, 8, 32, 128) and plot validation loss vs dim. Discuss the bias-variance trade-off.", source: "own work", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w6-makemore2-q4", title: "300-word writeup of Bengio et al. 2003", description: "Skim the original Bengio et al. 2003 paper and write a 300-word summary of its core idea and impact.", source: "Bengio et al. 2003", estimatedMinutes: 60, status: "not_started", notes: "" },
        ],
      },
    ],
    weeklyDeliverable: {
      title: "Your micrograd + custom bigram corpus",
      description:
        "GitHub repo with your from-scratch micrograd (with at least one extension Karpathy didn't add) and a bigram model trained on a corpus you chose. README explaining both.",
      rubric: [
        "Micrograd reimplemented from scratch",
        "At least one extension (ReLU, sigmoid, a new optimizer, anything)",
        "Bigram trained on custom corpus",
        "README with conceptual writeup",
      ],
      rubricChecked: [false, false, false, false],
      submitted: false,
      reflection: "",
      expectedScore: 85,
    },
  },

  // ───────────────────────────── WEEK 7 ─────────────────────────────
  {
    number: 7,
    phase: "Phase 2: Karpathy",
    title: "Karpathy — Makemore 3-5",
    goal: "Understand activations, gradients, batchnorm, and the diagnostic mindset of training neural nets.",
    estimatedHours: 30,
    killCriterion:
      "End of week 7, if you can't articulate why gradient flow matters and what BatchNorm is fixing, slow down.",
    topics: [
      {
        id: "w7-makemore3",
        title: "Makemore Part 3 — activations, gradients, BatchNorm",
        summary:
          "The most important lecture in the series. The diagnostic mindset — staring at activation/gradient histograms — is what separates ML practitioners who can debug training from those who can't.",
        resources: [
          { label: "Makemore Part 3 lecture", url: "https://www.youtube.com/watch?v=P6sfmUTpUmc", type: "video" },
        ],
        problems: [
          { id: "w7-makemore3-q1", title: "Watch the activations/gradients/BN lecture", description: "Full Part 3 video.", source: "Karpathy", sourceUrl: "https://www.youtube.com/watch?v=P6sfmUTpUmc", estimatedMinutes: 120, status: "not_started", notes: "" },
          { id: "w7-makemore3-q2", title: "Implement the lecture code", description: "Re-implement the diagnostics and BN code from the lecture.", source: "own work", estimatedMinutes: 150, status: "not_started", notes: "" },
          { id: "w7-makemore3-q3", title: "Diagnose vanishing gradients in a deep net", description: "Build an intentionally bad deep MLP (e.g., 8 layers of tanh, naive init) and visualize the gradient norms across layers. Confirm vanishing.", source: "own work", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w7-makemore3-q4", title: "Implement BatchNorm from scratch", description: "Write a BatchNorm layer (forward + backward, training vs eval) from scratch. Verify against PyTorch's nn.BatchNorm1d.", source: "own work", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w7-makemore3-q5", title: "Experiment with init schemes (Xavier, Kaiming)", description: "Run the same deep net under default, Xavier, and Kaiming init. Plot activation histograms across layers for each.", source: "own work", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w7-makemore3-q6", title: "Write up the tanh saturation problem", description: "Write a clear ~250-word explanation of tanh saturation and the role of init/BN in avoiding it.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w7-makemore4",
        title: "Makemore Part 4 — manual backprop",
        summary:
          "Karpathy's hardest exercise. The only way to do it is alone, at a whiteboard, slowly. The reward is permanent comfort with backprop.",
        resources: [
          { label: "Makemore Part 4 lecture", url: "https://www.youtube.com/watch?v=q8SA3rM6ckI", type: "video" },
        ],
        problems: [
          { id: "w7-makemore4-q1", title: "Watch the manual backprop lecture", description: "Full Part 4 video, but pause before he gives the answer to each exercise.", source: "Karpathy", sourceUrl: "https://www.youtube.com/watch?v=q8SA3rM6ckI", estimatedMinutes: 120, status: "not_started", notes: "" },
          { id: "w7-makemore4-q2", title: "Do the manual backprop exercise yourself", description: "Work through every backprop derivation in the exercise notebook by hand. No peeking at his solution until you're stuck for >30 min.", source: "own work", estimatedMinutes: 240, status: "not_started", notes: "" },
          { id: "w7-makemore4-q3", title: "Check against his solution", description: "Compare your derivations to Karpathy's solution line by line. Diff every discrepancy.", source: "own work", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w7-makemore4-q4", title: "Reflect on what surprised you", description: "Write up the three things in the exercise that surprised you most.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w7-makemore5",
        title: "Makemore Part 5 — WaveNet",
        summary:
          "First taste of hierarchical receptive fields. WaveNet's dilated convs prefigure the structure of modern audio + sequence models.",
        resources: [
          { label: "Makemore Part 5 lecture", url: "https://www.youtube.com/watch?v=t3YJ5hKiMQ0", type: "video" },
        ],
        problems: [
          { id: "w7-makemore5-q1", title: "Watch the WaveNet lecture", description: "Full Part 5 video.", source: "Karpathy", sourceUrl: "https://www.youtube.com/watch?v=t3YJ5hKiMQ0", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w7-makemore5-q2", title: "Implement WaveNet", description: "Re-implement the WaveNet-style char LM from the lecture.", source: "own work", estimatedMinutes: 150, status: "not_started", notes: "" },
          { id: "w7-makemore5-q3", title: "Compare to MLP version", description: "Train both on the same data and compare validation loss + sample quality.", source: "own work", estimatedMinutes: 45, status: "not_started", notes: "" },
          { id: "w7-makemore5-q4", title: "Write up dilated convolutions", description: "Write ~250 words on dilated convolutions: what they buy you and why they fit this problem.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
        ],
      },
    ],
    weeklyDeliverable: {
      title: "Activation/gradient diagnostic notebook",
      description:
        "A notebook where you train a deep MLP, intentionally break it (vanishing gradients, exploding activations, dead neurons), and demonstrate each fix (init, BatchNorm, residual connections). Plots throughout.",
      rubric: [
        "At least 3 distinct failure modes induced and visualized",
        "Each fix demonstrated separately",
        "Manual backprop derivation included for one layer",
        "Clear plots with annotations",
        "Writeup with takeaways",
      ],
      rubricChecked: [false, false, false, false, false],
      submitted: false,
      reflection: "",
      expectedScore: 85,
    },
  },

  // ───────────────────────────── WEEK 8 ─────────────────────────────
  {
    number: 8,
    phase: "Phase 2: Karpathy",
    title: "Karpathy — nanoGPT + Attention paper",
    goal: "Build GPT from scratch. Map every line of code to a line of the original Transformer paper.",
    estimatedHours: 35,
    killCriterion:
      "End of week 8, if you can't draw the transformer block on a whiteboard and explain each component, Phase 3 will fail.",
    topics: [
      {
        id: "w8-nanogpt",
        title: "Let's build GPT (nanoGPT lecture)",
        summary:
          "The most-watched ML lecture of the decade for a reason. By the end of this topic you should be able to explain a transformer block from memory.",
        resources: [
          { label: "Let's build GPT lecture", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", type: "video" },
          { label: "nanoGPT repo", url: "https://github.com/karpathy/nanoGPT", type: "repo" },
        ],
        problems: [
          { id: "w8-nanogpt-q1", title: "Watch the full 2-hour lecture", description: "All of it. In one or two sittings.", source: "Karpathy", sourceUrl: "https://www.youtube.com/watch?v=kCc8FmEb1nY", estimatedMinutes: 150, status: "not_started", notes: "" },
          { id: "w8-nanogpt-q2", title: "Reimplement nanoGPT on Tiny Shakespeare", description: "Implement nanoGPT from scratch and train it on Tiny Shakespeare. Match his loss curve roughly.", source: "own work", estimatedMinutes: 300, status: "not_started", notes: "" },
          { id: "w8-nanogpt-q3", title: "Train on a custom dataset (not Shakespeare, not default)", description: "Pick your own text corpus — code, song lyrics, a Wikipedia subset — and train on it. Save a sample.", source: "own work", estimatedMinutes: 120, status: "not_started", notes: "" },
          { id: "w8-nanogpt-q4", title: "Experiment with model size", description: "Sweep n_layer and n_embd. Plot val loss vs param count and discuss scaling.", source: "own work", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w8-nanogpt-q5", title: "Experiment with context length", description: "Sweep block_size. Note compute/memory cost and impact on quality.", source: "own work", estimatedMinutes: 45, status: "not_started", notes: "" },
          { id: "w8-nanogpt-q6", title: "Implement one attention modification", description: "Pick one attention variant — Flash Attention, ALiBi, RoPE — and implement it. Compare to vanilla.", source: "own work", estimatedMinutes: 180, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w8-attention-paper",
        title: "Attention Is All You Need",
        summary:
          "Read the original. Twice. Map every equation in the paper to a line in your nanoGPT. This is the cornerstone reference you'll keep returning to.",
        resources: [
          { label: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", type: "paper" },
          { label: "The Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/", type: "article" },
        ],
        problems: [
          { id: "w8-attention-q1", title: "Read the Attention paper twice", description: "Once for sweep, once with a pen. Highlight every equation.", source: "Vaswani et al. 2017", sourceUrl: "https://arxiv.org/abs/1706.03762", estimatedMinutes: 120, status: "not_started", notes: "" },
          { id: "w8-attention-q2", title: "Map every equation to a line of your nanoGPT", description: "Create a side-by-side mapping: paper equation ↔ nanoGPT line number. Note any equation you can't find.", source: "own work", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w8-attention-q3", title: "Write up positional encoding in your own words", description: "~250 words explaining why positional encoding is necessary and how the sinusoidal scheme works.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w8-attention-q4", title: "Multi-head vs single-head, in your own words", description: "~250 words on why multi-head attention matters beyond \"more parameters.\"", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w8-mechinterp",
        title: "Mechanistic interpretability primer",
        summary:
          "Begin to see the transformer as a circuit rather than a black box. This sets up Track A and sharpens your understanding regardless of which track you pick.",
        resources: [
          { label: "A Mathematical Framework for Transformer Circuits", url: "https://transformer-circuits.pub/2021/framework/index.html", type: "paper" },
          { label: "Neel Nanda's framework walkthrough", url: "https://www.neelnanda.io/mechanistic-interpretability/a-walkthrough-of-a-mathematical-framework-for-transformer-circuits", type: "article" },
        ],
        problems: [
          { id: "w8-mechinterp-q1", title: "Read the framework piece", description: "Anthropic's Mathematical Framework for Transformer Circuits, end-to-end.", source: "Anthropic", sourceUrl: "https://transformer-circuits.pub/2021/framework/index.html", estimatedMinutes: 150, status: "not_started", notes: "" },
          { id: "w8-mechinterp-q2", title: "Watch Neel's walkthrough", description: "Neel Nanda's walkthrough video/article of the same paper.", source: "Neel Nanda", sourceUrl: "https://www.neelnanda.io/mechanistic-interpretability/a-walkthrough-of-a-mathematical-framework-for-transformer-circuits", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w8-mechinterp-q3", title: "Write up: what is a residual stream?", description: "~250 words in your own words on the residual stream view of the transformer.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
        ],
      },
    ],
    weeklyDeliverable: {
      title: "Your own nanoGPT with a twist",
      description:
        "A GitHub repo with: your reimplemented nanoGPT, trained on a custom dataset, with at least one non-trivial architectural modification (different positional encoding, modified attention, custom tokenizer, etc.). README mapping your code to sections of the Attention paper. Loss curves, sample outputs, ablation.",
      rubric: [
        "Reimplemented from scratch (not forked from Karpathy)",
        "Custom dataset",
        "At least one architectural variation",
        "README cross-references the paper",
        "Ablation showing your variation matters (or doesn't — both fine, with discussion)",
        "Sample generated outputs included",
      ],
      rubricChecked: [false, false, false, false, false, false],
      submitted: false,
      reflection: "",
      expectedScore: 85,
    },
  },

  // ───────────────────────────── WEEK 9 ─────────────────────────────
  {
    number: 9,
    phase: "Phase 3: Specialization",
    title: "Phase 3 begins — specialization choice",
    goal: "Pick your track (A, B, or C below) and complete its onboarding. Set up the project that you'll ship across weeks 9-12.",
    estimatedHours: 25,
    killCriterion:
      "End of week 9, if you haven't committed in writing to one track in your tracker's reflection field, you haven't earned weeks 10-12 yet.",
    topics: [
      {
        id: "w9-track-a",
        title: "TRACK A — Research / Mechanistic Interpretability",
        summary:
          "The research path. You'll partially replicate a published mech-interp result on GPT-2 small and use that as the launching pad for an extension.",
        resources: [
          { label: "Anthropic Circuits Thread", url: "https://transformer-circuits.pub/", type: "article" },
          { label: "Neel Nanda's mech interp tutorials", url: "https://www.neelnanda.io/mechanistic-interpretability", type: "article" },
          { label: "TransformerLens library", url: "https://github.com/TransformerLensOrg/TransformerLens", type: "repo" },
        ],
        problems: [
          { id: "w9-a-q0", title: "Warm-up — read 2 short Circuits Thread pieces end-to-end", description: "Before picking a paper, get oriented: read any 2 of the shorter Anthropic Circuits Thread pieces in full. Goal is to know what an interp result LOOKS like before deciding which one to reproduce. Take notes on the structure (claim → evidence → figure → caveat).", source: "Anthropic Circuits Thread", sourceUrl: "https://transformer-circuits.pub/", estimatedMinutes: 120, status: "not_started", notes: "" },
          { id: "w9-a-q1", title: "Pick a paper to (partially) replicate", description: "Choose one published mech-interp result whose figure you can plausibly reproduce on GPT-2 small in 2-3 weeks.", source: "your choice", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w9-a-q2", title: "Install TransformerLens", description: "Set up the library locally with a clean environment. Run the quickstart.", source: "TransformerLens docs", sourceUrl: "https://github.com/TransformerLensOrg/TransformerLens", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w9-a-q3", title: "Load GPT-2 small", description: "Load GPT-2 small via TransformerLens and confirm you can pull activations from any layer.", source: "own work", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w9-a-q4", title: "Reproduce one figure from an Anthropic circuits piece", description: "Pick any single figure from the Circuits Thread and reproduce it on GPT-2 small.", source: "Anthropic", sourceUrl: "https://transformer-circuits.pub/", estimatedMinutes: 360, status: "not_started", notes: "" },
          { id: "w9-a-q5", title: "Write 1-page proposal for your extension", description: "One page: what you'll extend, why, your concrete hypothesis, and how you'll know if you're wrong.", source: "own writing", estimatedMinutes: 90, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w9-track-b",
        title: "TRACK B — AI Engineer / LLM Apps",
        summary:
          "The applied path. You'll pick a non-chatbot product idea, design its evals before writing app code, and ship the simplest end-to-end version.",
        resources: [
          { label: "Baseten Inference Engineering", url: "https://www.baseten.co/inference-engineering/", type: "article" },
          { label: "Hamel Husain — Your AI Product Needs Evals", url: "https://hamel.dev/blog/posts/evals/", type: "article" },
          { label: "Chip Huyen — Building LLM-powered applications", url: "https://huyenchip.com/2023/04/11/llm-engineering.html", type: "article" },
        ],
        problems: [
          { id: "w9-b-q1", title: "Pick a non-chatbot LLM app idea", description: "Anything but a chatbot. Pick something with a clear input → output specification.", source: "your choice", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w9-b-q2", title: "Design its eval harness BEFORE you build", description: "Write down what \"good\" looks like, what failure modes to test, and what success number you're trying to hit. Before any app code.", source: "Hamel Husain", sourceUrl: "https://hamel.dev/blog/posts/evals/", estimatedMinutes: 180, status: "not_started", notes: "" },
          { id: "w9-b-q3", title: "Set up Braintrust / Inspect / custom eval", description: "Implement the eval harness in any tool of your choice. Run it on a no-op or random baseline first.", source: "own work", estimatedMinutes: 240, status: "not_started", notes: "" },
          { id: "w9-b-q4", title: "Write a 1-page design doc", description: "One page: user story, system architecture sketch, eval metrics, risks.", source: "own writing", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w9-b-q5", title: "Build the simplest version", description: "Ship the dumbest possible version end-to-end. It should be runnable and evaluable.", source: "own work", estimatedMinutes: 300, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w9-track-c",
        title: "TRACK C — Internship Prep",
        summary:
          "The interview path. You'll work through Chip Huyen's interview book, drill ML system design, and start applications.",
        resources: [
          { label: "Chip Huyen — ML Interviews Book", url: "https://huyenchip.com/ml-interviews-book/", type: "book" },
          { label: "Designing ML Systems (Chip Huyen)", url: "https://huyenchip.com/", type: "book" },
        ],
        problems: [
          { id: "w9-c-q1", title: "Read MLIB Chapters 1-4", description: "First four chapters of the ML Interviews Book. Take structured notes.", source: "MLIB", sourceUrl: "https://huyenchip.com/ml-interviews-book/", estimatedMinutes: 300, status: "not_started", notes: "" },
          { id: "w9-c-q2", title: "Do 5 ML system design problems", description: "Five end-to-end ML system design problems written up in your notes.", source: "MLIB / own", estimatedMinutes: 300, status: "not_started", notes: "" },
          { id: "w9-c-q3", title: "Do 10 ML-flavored LeetCode mediums", description: "Ten medium LeetCode problems that touch ML/DS-style data manipulation. Solutions saved.", source: "LeetCode", estimatedMinutes: 360, status: "not_started", notes: "" },
          { id: "w9-c-q4", title: "Identify 10 target companies with Summer 2027 ML internships", description: "Concrete list of 10 companies with open or projected Summer 2027 ML/AI internships. Save links and deadlines.", source: "own research", estimatedMinutes: 90, status: "not_started", notes: "" },
          { id: "w9-c-q5", title: "Draft your application narrative", description: "One-page narrative covering your projects, your direction, and the kind of team you want to join. Reusable across applications.", source: "own writing", estimatedMinutes: 90, status: "not_started", notes: "" },
        ],
      },
    ],
    weeklyDeliverable: {
      title: "Phase 3 project scope doc",
      description:
        "A written 1-2 page proposal for what you will build/research/prepare across weeks 10-12. Must include: hypothesis or goal, deliverable, success metric, weekly milestones, risks.",
      rubric: [
        "Clear single goal (not three)",
        "Concrete deliverable",
        "Measurable success criterion",
        "Risk section identifies at least 3 ways this could fail",
      ],
      rubricChecked: [false, false, false, false],
      submitted: false,
      reflection: "",
      expectedScore: 100,
    },
  },

  // ───────────────────────────── WEEK 10 ─────────────────────────────
  {
    number: 10,
    phase: "Phase 3: Specialization",
    title: "Phase 3 execution — Build sprint #1",
    goal: "Build the first half of your Phase 3 deliverable.",
    estimatedHours: 30,
    killCriterion:
      "End of week 10, if you haven't pushed code to GitHub for your Phase 3 project, you're avoiding the work and need to confront that.",
    topics: [
      {
        id: "w10-build-sprint-1",
        title: "Build sprint #1",
        summary:
          "Track-defined. Use the rubric from your week-9 scope doc as the operational checklist for this week. Items below are the universal scaffolding.",
        resources: [],
        problems: [
          { id: "w10-q1", title: "Create the project's GitHub repo and push initial commit", description: "Repo created, README stub, license, gitignore, first commit pushed.", source: "own work", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w10-q2", title: "Build the skeleton end-to-end", description: "Wire the full pipeline / experimental loop / interview flow end-to-end with stubs. Confirm it runs without errors.", source: "own work", estimatedMinutes: 360, status: "not_started", notes: "" },
          { id: "w10-q3", title: "Make one component real (not stubbed)", description: "Replace one stub with the real implementation. This is the proof that the skeleton can actually carry the work.", source: "own work", estimatedMinutes: 480, status: "not_started", notes: "" },
          { id: "w10-q4", title: "Run preliminary experiments / metrics", description: "Track A: first replication metric. Track B: first eval-harness run. Track C: first mock interview / first batch of completed problems.", source: "own work", estimatedMinutes: 240, status: "not_started", notes: "" },
          { id: "w10-q5", title: "Write a blocker status update in this week's reflection", description: "In the deliverable's reflection field, list the top 3 blockers and what you'll do about each.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
        ],
      },
    ],
    weeklyDeliverable: {
      title: "Mid-sprint demo",
      description:
        "A working — but unfinished — version of your Phase 3 project, with all skeleton code in place and at least one end-to-end test passing. Pushed to GitHub.",
      rubric: [
        "GitHub repo created and pushed",
        "End-to-end skeleton runs without errors",
        "At least one component is \"real\" (not stubbed)",
        "Status update in your reflection: what's blocking you?",
      ],
      rubricChecked: [false, false, false, false],
      submitted: false,
      reflection: "",
      expectedScore: 75,
    },
  },

  // ───────────────────────────── WEEK 11 ─────────────────────────────
  {
    number: 11,
    phase: "Phase 3: Specialization",
    title: "Phase 3 execution — Build sprint #2 + iteration",
    goal: "Finish the build. Iterate based on what you learned in week 10.",
    estimatedHours: 30,
    killCriterion:
      "End of week 11, if your project still doesn't have results worth showing, you scoped too big in week 9. Acknowledge it in writing and pick a smaller deliverable for week 12.",
    topics: [
      {
        id: "w11-build-sprint-2",
        title: "Build sprint #2 + iteration",
        summary:
          "Track-defined. Run experiments, get real metrics, polish. By end of week you have a number that you can defend.",
        resources: [],
        problems: [
          { id: "w11-q1", title: "Iterate on the week-10 blockers", description: "Concrete progress on each of the top 3 blockers you logged last week.", source: "own work", estimatedMinutes: 240, status: "not_started", notes: "" },
          { id: "w11-q2", title: "Run the experiments / generate figures / collect metrics", description: "Track A: experiments produce the figures you need. Track B: evals run on real outputs. Track C: drill problems and mock interviews complete.", source: "own work", estimatedMinutes: 480, status: "not_started", notes: "" },
          { id: "w11-q3", title: "Address scope honestly: cut or finish", description: "If scope is too big, make the scope cut in writing and pick a smaller week-12 deliverable. Document the trade-off.", source: "own writing", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w11-q4", title: "Polish the core deliverable", description: "Code clean, README readable, figures labeled — this is the version someone could actually look at.", source: "own work", estimatedMinutes: 240, status: "not_started", notes: "" },
          { id: "w11-q5", title: "Report your success metric with a real number", description: "Whatever you wrote in the week-9 scope doc — replace the placeholder with the actual number.", source: "own work", estimatedMinutes: 60, status: "not_started", notes: "" },
        ],
      },
    ],
    weeklyDeliverable: {
      title: "Finished build with results",
      description:
        "Your Phase 3 project, functionally complete, with whatever metric you defined in your scope doc reported.",
      rubric: [
        "Project complete per scope doc OR scope explicitly cut with reasoning",
        "Success metric reported with actual number",
        "At least one figure/table/plot included",
        "Honest discussion of limitations",
        "Code clean enough to share",
      ],
      rubricChecked: [false, false, false, false, false],
      submitted: false,
      reflection: "",
      expectedScore: 85,
    },
  },

  // ───────────────────────────── WEEK 12 ─────────────────────────────
  {
    number: 12,
    phase: "Phase 3: Specialization",
    title: "Phase 3 close — Writeup + ship + retro",
    goal: "Polish, publish, and retrospect honestly.",
    estimatedHours: 25,
    killCriterion:
      "End of week 12, if you have NOT published your work publicly (blog post, paper draft, GitHub README at minimum), the project doesn't count. The pattern of \"built it but never shipped\" is exactly what this 12 weeks was supposed to break.",
    topics: [
      {
        id: "w12-writeup",
        title: "Writeup",
        summary:
          "The public artifact. Pick the venue that fits the track: blog for engineering, LessWrong / Alignment Forum for interp work, GitHub README at minimum.",
        resources: [],
        problems: [
          { id: "w12-writeup-q1", title: "Draft the writeup", description: "Full first draft: motivation, approach, results, limitations, what's next.", source: "own writing", estimatedMinutes: 240, status: "not_started", notes: "" },
          { id: "w12-writeup-q2", title: "Get one external reader to review it", description: "One trusted reader reads end-to-end and gives written feedback.", source: "own outreach", estimatedMinutes: 60, status: "not_started", notes: "" },
          { id: "w12-writeup-q3", title: "Revise based on feedback", description: "Concrete revision pass: address every comment or explain why not.", source: "own writing", estimatedMinutes: 180, status: "not_started", notes: "" },
          { id: "w12-writeup-q4", title: "Publish", description: "Live URL. Not a draft. Not \"almost done.\" Published.", source: "own writing", estimatedMinutes: 60, status: "not_started", notes: "" },
        ],
      },
      {
        id: "w12-retro",
        title: "Retrospective",
        summary:
          "Honest retrospection. The retrospective itself is part of the deliverable — without it, you'll repeat the same mistakes in the next 12 weeks.",
        resources: [],
        problems: [
          { id: "w12-retro-q1", title: "List every deliverable from weeks 1-12 with its actual score", description: "Pull the actual scores from this tracker into a single table.", source: "own tracker", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w12-retro-q2", title: "Identify the 3 weeks that went best", description: "Pick three and write a sentence on why each one worked.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w12-retro-q3", title: "Identify the 3 weeks that went worst", description: "Pick three and write a sentence on the root cause of each.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w12-retro-q4", title: "Identify 1 habit that worked and 1 that didn't", description: "Two habits, named precisely.", source: "own writing", estimatedMinutes: 30, status: "not_started", notes: "" },
          { id: "w12-retro-q5", title: "Write a 500-word retrospective", description: "Honest, not flattering. What you'd do differently if you could re-run these 12 weeks.", source: "own writing", estimatedMinutes: 90, status: "not_started", notes: "" },
        ],
      },
    ],
    weeklyDeliverable: {
      title: "Published Phase 3 work + retrospective",
      description:
        "A publicly visible writeup of your Phase 3 project AND a personal retrospective document.",
      rubric: [
        "Public link to the writeup (not just a draft)",
        "Retrospective written with honest assessment",
        "GitHub profile updated to feature this work",
        "One thing you'll do differently in any future 12-week effort",
        "One thing you'll keep",
      ],
      rubricChecked: [false, false, false, false, false],
      submitted: false,
      reflection: "",
      expectedScore: 100,
    },
  },
];

export const CURRENT_VERSION = 2;
