---
title: "RGCNN-nnUNet: Recurrent Group Equivariant nnU-Net for Robust Brain Tissue Segmentation on Stroke NCCT"
collection: publications
date: 2026-6-23   
venue: 'Journal of Computerized Medical Imaging and Graphics'
paperurl: ''
codeurl: ''
authors: Xiang Li, Fengyuan Wang, Saurabh Bagchi, John Julius Volpi, Timea Hodics, Stephen T. Wong, Kelvin Wong
Abstract: "Computed tomography (CT), particularly non-contrast CT (NCCT), is crucial in emergency settings for rapid stroke diagnosis due to its affordability and accessibility, yet subtle density variations in early ischemia are often obscured by high noise and low soft-tissue contrast in NCCT. To address this, we present RGCNN-nnUNet, a novel architecture designed for high-fidelity brain tissue segmentation. We introduce a Recurrent Group Convolutional Cell that leverages group equivariance to extract consistent anatomical features and stabilize iterative refinement. Evaluations on multi-center datasets demonstrate that RGCNN-nnUNet achieves state-of-the-art performance, reaching Dice coefficients of 0.885 for white matter and 0.86 for deep gray matter, while delivering a 14.3% and 10.6% reduction in Hausdorff Distance (HD95). To validate clinical impact, we conducted a blinded, independent reader study with a neuroimager. Results show that integrating RGCNN-nnUNet’s segmented tissue-specific Z-score maps with AI-denoised NCCT significantly improves diagnostic sensitivity compared to standard-of-care radiology reports, with an increased sensitivity by 29%. By providing precise anatomical boundaries and stable tissue-weighting, our framework enables the detection of subtle infarct signals."
---