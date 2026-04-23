/* ======================================================
   The AI Open Lab — Application (v2 — Visual Overhaul)
   ====================================================== */

(function () {
  'use strict';

  /* ---------- DATA ---------- */

  const resources = [
    { id: 1, name: "ALIA-40b-instruct-2601", type: "model", modality: "text", desc: "Multilingual instruction-tuned LLM with improved instruction following and long context handling, flagship of the ALIA family.", params: "40B", year: 2026, url: "https://huggingface.co/BSC-LT/ALIA-40b-instruct-2601" },
    { id: 2, name: "ALIA-40b-instruct-2601-GGUF", type: "model", modality: "text", desc: "Quantized GGUF version of ALIA-40b-instruct-2601 for local execution.", params: "40B", year: 2026, url: "https://huggingface.co/BSC-LT/ALIA-40b-instruct-2601-GGUF" },
    { id: 3, name: "Salamandra-7b-instruct", type: "model", modality: "text", desc: "Instruction-tuned multilingual LLM trained on 276K instructions across English, Spanish and Catalan.", params: "7B", year: 2024, url: "https://huggingface.co/BSC-LT/salamandra-7b-instruct" },
    { id: 4, name: "Salamandra-2b-instruct", type: "model", modality: "text", desc: "Compact instruction-tuned multilingual LLM trained on 276K instructions across English, Spanish and Catalan.", params: "2B", year: 2024, url: "https://huggingface.co/BSC-LT/salamandra-2b-instruct" },
    { id: 5, name: "Salamandra-7b", type: "model", modality: "text", desc: "Foundation multilingual LLM trained across 35 European languages, ready for fine-tuning.", params: "7B", year: 2024, url: "https://huggingface.co/BSC-LT/salamandra-7b" },
    { id: 6, name: "Salamandra-2b", type: "model", modality: "text", desc: "Compact foundation multilingual LLM trained across 35 European languages.", params: "2B", year: 2024, url: "https://huggingface.co/BSC-LT/salamandra-2b" },
    { id: 7, name: "Latxa 3.1 Instruct 70B", type: "model", modality: "text", desc: "Basque-focused instruction-tuned LLM based on Llama-3.1 with a 4.2B-token Basque corpus.", params: "70B", year: 2025, url: "https://huggingface.co/HiTZ/Latxa-Llama-3.1-70B-Instruct" },
    { id: 8, name: "Latxa 3.1 Instruct 8B", type: "model", modality: "text", desc: "Basque-focused instruction-tuned LLM based on Llama-3.1 with a 4.2B-token Basque corpus.", params: "8B", year: 2025, url: "https://huggingface.co/HiTZ/Latxa-Llama-3.1-8B-Instruct" },
    { id: 9, name: "Latxa 3.1 8B", type: "model", modality: "text", desc: "Basque-specialized Llama-3.1 foundation model for fine-tuning.", params: "8B", year: 2025, url: "https://huggingface.co/HiTZ/Latxa-Llama-3.1-8B" },
    { id: 10, name: "Llama-3.1-Carballo-Instr3", type: "model", modality: "text", desc: "Instruction-tuned model supporting Galician, Portuguese, Spanish, Catalan and English.", params: "8B", year: 2025, url: "https://huggingface.co/proxectonos/Llama-3.1-Carballo-Instr3" },
    { id: 11, name: "Llama-3.1-Carballo", type: "model", modality: "text", desc: "Foundation model optimized for Galician, Portuguese, Spanish, Catalan and English.", params: "8B", year: 2025, url: "https://huggingface.co/proxectonos/Llama-3.1-Carballo" },
    { id: 12, name: "Llama-Carvalho-PT-GL", type: "model", modality: "text", desc: "Llama-based model supporting Galician, Portuguese, Spanish and English.", params: "8B", year: 2025, url: "https://huggingface.co/Nos-PT/Llama-Carvalho-PT-GL" },
    { id: 13, name: "Carballo-Legal", type: "model", modality: "text", desc: "Legal-domain specialist model for Galician and Spanish texts.", params: "7B", year: 2025, url: "https://huggingface.co/proxectonos/Carballo-Legal" },
    { id: 14, name: "ALIA Legal-Administrative 7B Instruct", type: "model", modality: "text", desc: "Specialized instruction-tuned model for Spanish legal and administrative documents.", params: "7B", year: 2025, url: "https://huggingface.co/SINAI/ALIA-legal-administrative-7B-Instruct" },
    { id: 15, name: "Aitana-2B-S-base-1.0", type: "model", modality: "text", desc: "Generative model trained for Valencian, Spanish and English.", params: "2B", year: 2025, url: "https://huggingface.co/gplsi/Aitana-2B-S-base-1.0" },
    { id: 16, name: "Aitana-2B-S", type: "model", modality: "text", desc: "Valencian-specialized generative language model.", params: "2B", year: 2025, url: "https://huggingface.co/gplsi/Aitana-2B-S" },
    { id: 17, name: "Aitana-2B-S-tourism-base-1.0", type: "model", modality: "text", desc: "Tourism-domain variant of Aitana for Valencian and Spanish text generation.", params: "2B", year: 2025, url: "https://huggingface.co/gplsi/Aitana-2B-S-tourism-base-1.0" },
    { id: 18, name: "MrBERT", type: "model", modality: "text", desc: "Multilingual ModernBERT encoder covering 35 European languages.", year: 2025, url: "https://huggingface.co/BSC-LT/MrBERT" },
    { id: 19, name: "MrBERT-es", type: "model", modality: "text", desc: "Spanish-English bilingual ModernBERT variant.", year: 2025, url: "https://huggingface.co/BSC-LT/MrBERT-es" },
    { id: 20, name: "MrBERT-ca", type: "model", modality: "text", desc: "Catalan-English bilingual ModernBERT variant.", year: 2025, url: "https://huggingface.co/BSC-LT/MrBERT-ca" },
    { id: 21, name: "MrBERT-biomed", type: "model", modality: "text", desc: "Biomedical-domain ModernBERT specialist trained on 24.13B tokens.", year: 2025, url: "https://huggingface.co/BSC-LT/MrBERT-biomed" },
    { id: 22, name: "MrBERT-science", type: "model", modality: "text", desc: "Scientific-domain ModernBERT specialist trained on 3.6B tokens.", year: 2025, url: "https://huggingface.co/BSC-LT/MrBERT-science" },
    { id: 23, name: "MrBERT-legal", type: "model", modality: "text", desc: "Legal-domain ModernBERT specialist trained on 8B tokens.", year: 2025, url: "https://huggingface.co/BSC-LT/MrBERT-legal" },
    { id: 24, name: "mRoBERTa", type: "model", modality: "text", desc: "Multilingual RoBERTa encoder covering 35 languages.", year: 2025, url: "https://huggingface.co/BSC-LT/mRoBERTa" },
    { id: 25, name: "RoBERTa-ca", type: "model", modality: "text", desc: "Catalan-specific RoBERTa encoder model.", year: 2024, url: "https://huggingface.co/BSC-LT/RoBERTa-ca" },
    { id: 26, name: "BERnaT-base", type: "model", modality: "text", desc: "Basque discriminative encoder model for standard and non-standard text.", params: "100M", year: 2025, url: "https://huggingface.co/HiTZ/BERnaT-base" },
    { id: 27, name: "BERnaT-large", type: "model", modality: "text", desc: "Larger Basque discriminative encoder model for standard and non-standard text.", params: "400M", year: 2025, url: "https://huggingface.co/HiTZ/BERnaT-large" },
    { id: 28, name: "BERnaT-medium", type: "model", modality: "text", desc: "Medium-sized Basque discriminative encoder model.", params: "51.4M", year: 2025, url: "https://huggingface.co/HiTZ/BERnaT-medium" },
    { id: 29, name: "Salamandra-7b-instruct-guard", type: "model", modality: "text", desc: "Salamandra-based safety classification model for Catalan, Spanish and English content moderation.", params: "7B", year: 2025, url: "https://huggingface.co/BSC-LT/salamandra-7b-instruct-guard" },
    { id: 30, name: "Aitana-FraudDetection-R-1.0", type: "model", modality: "text", desc: "Phishing/fraud classification model built on an mRoBERTa baseline.", year: 2025, url: "https://huggingface.co/gplsi/Aitana-FraudDetection-R-1.0" },
    { id: 31, name: "Aitana-ClearLangDetection-R-1.0", type: "model", modality: "text", desc: "Classification model for Spanish plain-language / clarity assessment.", year: 2025, url: "https://huggingface.co/gplsi/Aitana-ClearLangDetection-R-1.0" },
    { id: 32, name: "Aitana-tourism-mb-encoder-1.0", type: "model", modality: "text", desc: "ModernBERT encoder adapted for Spanish/Valencian tourism domain.", year: 2025, url: "https://huggingface.co/gplsi/Aitana-tourism-mb-encoder-1.0" },
    { id: 33, name: "marianmt-cap-punct-eu", type: "model", modality: "text", desc: "MarianMT-based capitalization and punctuation restoration model for Basque.", year: 2025, url: "https://huggingface.co/HiTZ/cap-punct-eu" },
    { id: 34, name: "marianmt-cap-punct-es", type: "model", modality: "text", desc: "MarianMT-based capitalization and punctuation restoration model for Spanish.", year: 2025, url: "https://huggingface.co/HiTZ/cap-punct-es" },
    { id: 35, name: "Salamandra-VL-7B-2512", type: "model", modality: "multimodal", desc: "Multimodal LLM specialized in images and videos, using SigLIP 2 Giant image encoder trained on PixMo datasets.", params: "7B", year: 2025, url: "https://huggingface.co/BSC-LT/Salamandra-VL-7B-2512" },
    { id: 36, name: "Salamandra-7b-vision", type: "model", modality: "multimodal", desc: "Salamandra-7b adapted for image and video understanding.", params: "7B", year: 2025, url: "https://huggingface.co/BSC-LT/salamandra-7b-vision" },
    { id: 37, name: "SalamandraTAV-7b", type: "model", modality: "multimodal", desc: "Speech-to-text translation model using mhubert-base-25hz encoder, trained on 12,000 hours of speech data.", params: "7B", year: 2025, url: "https://huggingface.co/BSC-LT/salamandra-TAV-7b" },
    { id: 38, name: "Latxa Qwen-3 VL 2B", type: "model", modality: "multimodal", desc: "Multilingual vision-language model adapted for Basque, built on Qwen3-VL-2B-Instruct.", params: "2B", year: 2025, url: "https://huggingface.co/HiTZ/Latxa-Qwen3-VL-2B-Instruct" },
    { id: 39, name: "Latxa Qwen-3 VL 4B", type: "model", modality: "multimodal", desc: "Multilingual vision-language model adapted for Basque, built on Qwen3-VL-4B-Instruct.", params: "4B", year: 2025, url: "https://huggingface.co/HiTZ/Latxa-Qwen3-VL-4B-Instruct" },
    { id: 40, name: "SalamandraTA-7b-instruct", type: "model", modality: "translation", desc: "Multilingual machine translation model with competence in 35 European languages plus 3 regional varieties.", params: "7B", year: 2025, url: "https://huggingface.co/BSC-LT/salamandraTA-7b-instruct" },
    { id: 41, name: "SalamandraTA-7b-instruct-GGUF", type: "model", modality: "translation", desc: "Quantized GGUF variant of SalamandraTA-7b-instruct.", params: "7B", year: 2025, url: "https://huggingface.co/BSC-LT/salamandraTA-7B-instruct-GGUF" },
    { id: 42, name: "SalamandraTA-7b-academic", type: "model", modality: "translation", desc: "Multilingual translator fine-tuned with the ACAD-Train academic dataset.", params: "7B", year: 2025, url: "https://huggingface.co/BSC-LT/salamandraTA-7B-academic" },
    { id: 43, name: "SalamandraTA-2b-instruct", type: "model", modality: "translation", desc: "Compact multilingual translator covering 35 European languages plus 3 regional varieties.", params: "2B", year: 2025, url: "https://huggingface.co/BSC-LT/salamandraTA-2b-instruct" },
    { id: 44, name: "SalamandraTA-2b-instruct-GGUF", type: "model", modality: "translation", desc: "Quantized GGUF variant of SalamandraTA-2b-instruct.", params: "2B", year: 2025, url: "https://huggingface.co/BSC-LT/salamandraTA-2B-instruct-GGUF" },
    { id: 45, name: "SalamandraTA-2b-academic", type: "model", modality: "translation", desc: "Compact multilingual translator fine-tuned with the ACAD-Train academic dataset.", params: "2B", year: 2025, url: "https://huggingface.co/BSC-LT/salamandraTA-2B-academic" },
    { id: 46, name: "Aitana-TA-2B-S", type: "model", modality: "translation", desc: "Spanish-Valencian translator optimized for sentence-level machine translation.", params: "2B", year: 2025, url: "https://huggingface.co/gplsi/Aitana-TA-2B-S" },
    { id: 47, name: "Nos_MT-CT2-es-gl", type: "model", modality: "translation", desc: "Spanish-to-Galician Transformer translator via CTranslate2.", year: 2025, url: "https://huggingface.co/proxectonos/Nos_MT-CT2-es-gl" },
    { id: 48, name: "Nos_MT-CT2-gl-es", type: "model", modality: "translation", desc: "Galician-to-Spanish Transformer translator via CTranslate2.", year: 2025, url: "https://huggingface.co/proxectonos/Nos_MT-CT2-gl-es" },
    { id: 49, name: "Nos_MT-CT2-en-gl", type: "model", modality: "translation", desc: "English-to-Galician Transformer translator via CTranslate2.", year: 2025, url: "https://huggingface.co/proxectonos/Nos_MT-CT2-en-gl" },
    { id: 50, name: "Nos_MT-CT2-gl-en", type: "model", modality: "translation", desc: "Galician-to-English Transformer translator via CTranslate2.", year: 2025, url: "https://huggingface.co/proxectonos/Nos_MT-CT2-gl-en" },
    { id: 51, name: "aina-translator-gl-ca", type: "model", modality: "translation", desc: "Galician-to-Catalan machine translator trained on ~75M sentence pairs.", year: 2025, url: "https://huggingface.co/projecte-aina/aina-translator-gl-ca" },
    { id: 52, name: "aina-translator-eu-ca", type: "model", modality: "translation", desc: "Basque-to-Catalan machine translator trained on ~75M sentence pairs.", year: 2025, url: "https://huggingface.co/projecte-aina/aina-translator-eu-ca" },
    { id: 53, name: "aina-translator-es-ast", type: "model", modality: "translation", desc: "Spanish-Asturian translator fine-tuned from NLLB-200-600M.", year: 2025, url: "https://huggingface.co/projecte-aina/aina-translator-es-ast" },
    { id: 54, name: "aina-translator-es-an", type: "model", modality: "translation", desc: "Spanish-Aragonese translator fine-tuned from NLLB-200-600M.", year: 2025, url: "https://huggingface.co/projecte-aina/aina-translator-es-an" },
    { id: 55, name: "aina-translator-es-oc", type: "model", modality: "translation", desc: "Spanish-Aranese translator fine-tuned from NLLB-200-600M.", year: 2025, url: "https://huggingface.co/projecte-aina/aina-translator-es-oc" },
    { id: 56, name: "PL-BERT-es", type: "model", modality: "speech", desc: "Spanish phonetic encoder with word-level tokenization (ALBERT architecture) used for TTS.", year: 2025, url: "https://huggingface.co/BSC-LT/PL-BERT-es" },
    { id: 57, name: "PL-BERT-wp-es", type: "model", modality: "speech", desc: "Spanish phonetic encoder with subword (wordpiece) tokenization for TTS.", year: 2025, url: "https://huggingface.co/BSC-LT/PL-BERT-wp-es" },
    { id: 58, name: "PL-ModernBERT-wp-es", type: "model", modality: "speech", desc: "Spanish phonetic encoder leveraging ModernBERT with subword tokenization.", year: 2025, url: "https://huggingface.co/BSC-LT/PL-ModernBERT-wp-es" },
    { id: 59, name: "PL-BERT-ca", type: "model", modality: "speech", desc: "Catalan phonetic encoder with word-level tokenization for TTS.", year: 2025, url: "https://huggingface.co/BSC-LT/PL-BERT-ca" },
    { id: 60, name: "PL-BERT-wp-ca", type: "model", modality: "speech", desc: "Catalan phonetic encoder with subword tokenization for TTS.", year: 2025, url: "https://huggingface.co/BSC-LT/PL-BERT-wp-ca" },
    { id: 61, name: "PL-ModernBERT-wp-ca", type: "model", modality: "speech", desc: "Catalan phonetic encoder using ModernBERT with subword tokenization.", year: 2025, url: "https://huggingface.co/BSC-LT/PL-ModernBERT-wp-ca" },
    { id: 62, name: "Nos_TTS-sabela-vits-phonemes", type: "model", modality: "speech", desc: "Galician TTS trained with Coqui on the Sabela corpus.", year: 2024, url: "https://huggingface.co/proxectonos/Nos_TTS-sabela-vits-phonemes" },
    { id: 63, name: "Nos_TTS-icia-vits-phonemes", type: "model", modality: "speech", desc: "Galician voice synthesis trained from scratch using the Icia dataset.", year: 2024, url: "https://huggingface.co/proxectonos/Nos_TTS-icia-vits-phonemes" },
    { id: 64, name: "Nos_TTS-iago-vits-phonemes", type: "model", modality: "speech", desc: "Galician TTS built with Coqui on the Iago corpus.", year: 2024, url: "https://huggingface.co/proxectonos/Nos_TTS-iago-vits-phonemes" },
    { id: 65, name: "Nos_TTS-paulo-vits-phonemes", type: "model", modality: "speech", desc: "Galician voice model trained on the Paulo dataset via Coqui TTS.", year: 2024, url: "https://huggingface.co/proxectonos/Nos_TTS-paulo-vits-phonemes" },
    { id: 66, name: "Nos_TTS-celtia-vits-phonemes", type: "model", modality: "speech", desc: "Galician synthesis model based on the Nos_Celtia-GL corpus.", year: 2024, url: "https://huggingface.co/proxectonos/Nos_TTS-celtia-vits-phonemes" },
    { id: 67, name: "Nos_TTS-brais-vits-phonemes", type: "model", modality: "speech", desc: "Galician TTS trained on the Nos_Brais-GL dataset with phoneme input.", year: 2024, url: "https://huggingface.co/proxectonos/Nos_TTS-brais-vits-phonemes" },
    { id: 68, name: "Nos_TTS-brais-vits-graphemes", type: "model", modality: "speech", desc: "Galician TTS using grapheme-level input from Nos_Brais-GL.", year: 2024, url: "https://huggingface.co/proxectonos/Nos_TTS-brais-vits-graphemes" },
    { id: 69, name: "HiTZ TTS Models Collection", type: "model", modality: "speech", desc: "Collection of 12 VITS-based TTS models spanning Basque, Galician, Catalan and Spanish.", year: 2025, url: "https://huggingface.co/collections/HiTZ/tts" },
    { id: 70, name: "whisper-large-v3-LoS", type: "model", modality: "speech", desc: "Fine-tuned Whisper for Spanish, Catalan, Galician and Basque ASR, trained on 8,110 hours.", year: 2025, url: "https://huggingface.co/BSC-LT/whisper-large-v3-LoS" },
    { id: 71, name: "whisper-large-v3-LoS-punctuated", type: "model", modality: "speech", desc: "Punctuation-enhanced variant of multilingual Whisper for Iberian languages.", year: 2025, url: "https://huggingface.co/BSC-LT/whisper-large-v3-LoS-punctuated" },
    { id: 72, name: "stt_los_conformer_transducer_large", type: "model", modality: "speech", desc: "Conformer-Transducer ASR model for Spanish, Catalan, Galician and Basque.", year: 2025, url: "https://huggingface.co/BSC-LT/stt_los_conformer_transducer_large" },
    { id: 73, name: "stt_los_conformer_transducer_large_punctuated", type: "model", modality: "speech", desc: "Punctuated Conformer-Transducer ASR model for Iberian languages.", year: 2025, url: "https://huggingface.co/BSC-LT/stt_los_conformer_transducer_large_punctuated" },
    { id: 74, name: "hubert-base-los-2k", type: "model", modality: "speech", desc: "HuBERT Base pretrained on 2,000 hours of Iberian-language speech.", year: 2025, url: "https://huggingface.co/BSC-LT/hubert-base-los-2k" },
    { id: 75, name: "stt_ca-es_conformer_transducer_large", type: "model", modality: "speech", desc: "Bilingual Catalan-Spanish ASR model derived from NVIDIA base, trained on 7,426 hours.", year: 2024, url: "https://huggingface.co/projecte-aina/stt_ca-es_conformer_transducer_large" },
    { id: 76, name: "stt_eseu_conformer_transducer_large", type: "model", modality: "speech", desc: "Basque-Spanish code-switching ASR model trained on 1,366 hours.", year: 2025, url: "https://huggingface.co/HiTZ/stt_eseu_conformer_transducer_large" },
    { id: 77, name: "BBS-S2TC_conformer_transducer_large", type: "model", modality: "speech", desc: "Spanish-Basque ASR built with NVIDIA NeMo on 1,462 hours.", year: 2025, url: "https://huggingface.co/HiTZ/BBS-S2TC_conformer_transducer_large" },
    { id: 78, name: "spanish-verification-model-pkt-a", type: "model", modality: "speech", desc: "Parakeet-based verification model for Spanish transcription confidence.", year: 2025, url: "https://huggingface.co/BSC-LT/spanish-verification-model-pkt-a" },
    { id: 79, name: "spanish-verification-model-pkt-b", type: "model", modality: "speech", desc: "Cross-validation Spanish verification model paired with pkt-a.", year: 2025, url: "https://huggingface.co/BSC-LT/spanish-verification-model-pkt-b" },
    { id: 80, name: "spanish-verification-model-pkt-c", type: "model", modality: "speech", desc: "Spanish transcription verification model for reliability evaluation.", year: 2025, url: "https://huggingface.co/BSC-LT/spanish-verification-model-pkt-c" },
    { id: 81, name: "spanish-verification-model-pkt-d", type: "model", modality: "speech", desc: "Spanish verification model complementing pkt-c for enhanced confidence.", year: 2025, url: "https://huggingface.co/BSC-LT/spanish-verification-model-pkt-d" },
    { id: 82, name: "parakeet-rnnt-1.1b_cv17_es_ep18_1270h", type: "model", modality: "speech", desc: "Spanish ASR derived from NVIDIA Parakeet RNNT base (1,270 hours of Common Voice 17).", params: "1.1B", year: 2025, url: "https://huggingface.co/projecte-aina/parakeet-rnnt-1.1b_cv17_es_ep18_1270h" },
    { id: 83, name: "pyannote-segmentation-3.0-RTVE", type: "model", modality: "speech", desc: "Speaker diarization combining three optimized models via DOVER-Lap on RTVE data.", year: 2025, url: "https://huggingface.co/HiTZ/pyannote-segmentation-3.0-RTVE" },
    { id: 84, name: "whisper-bsc-large-v3-cat", type: "model", modality: "speech", desc: "Catalan Whisper ASR model fine-tuned on 4,700 hours of audio.", year: 2025, url: "https://huggingface.co/BSC-LT/whisper-bsc-large-v3-cat" },
    { id: 85, name: "faster-whisper-bsc-large-v3-cat", type: "model", modality: "speech", desc: "Lightweight Catalan Whisper variant optimized for inference speed.", year: 2025, url: "https://huggingface.co/BSC-LT/faster-whisper-bsc-large-v3-cat" },
    { id: 86, name: "whisper-3cat-cv21-valencian", type: "model", modality: "speech", desc: "Valencian speech-recognition model trained on 397.9 hours of audio.", year: 2025, url: "https://huggingface.co/BSC-LT/whisper-3cat-cv21-valencian" },
    { id: 87, name: "faster-whisper-3cat-cv21-valencian", type: "model", modality: "speech", desc: "Lightweight Valencian ASR model in faster-whisper format.", year: 2025, url: "https://huggingface.co/BSC-LT/faster-whisper-3cat-cv21-valencian" },
    { id: 88, name: "whisper-3cat-balearic", type: "model", modality: "speech", desc: "Balearic-dialect speech-recognition model trained on 90 hours.", year: 2025, url: "https://huggingface.co/BSC-LT/whisper-3cat-balearic" },
    { id: 89, name: "faster-whisper-3cat-balearic", type: "model", modality: "speech", desc: "Lightweight Balearic Catalan ASR using faster-whisper compression.", year: 2025, url: "https://huggingface.co/BSC-LT/faster-whisper-3cat-balearic" },
    { id: 90, name: "stt_eu_conformer_ctc_large", type: "model", modality: "speech", desc: "Basque ASR using CTC loss, trained on 548 hours via NeMo.", year: 2024, url: "https://huggingface.co/HiTZ/stt_eu_conformer_ctc_large" },
    { id: 91, name: "stt_eu_conformer_transducer_large", type: "model", modality: "speech", desc: "Basque speech transcription model using NeMo on 548 hours.", year: 2024, url: "https://huggingface.co/HiTZ/stt_eu_conformer_transducer_large" },
    { id: 92, name: "stt_eu_conformer_transducer_large_v2", type: "model", modality: "speech", desc: "Enhanced Basque transducer ASR trained on 771.73 hours.", year: 2025, url: "https://huggingface.co/HiTZ/stt_eu_conformer_transducer_large_v2" },
    { id: 93, name: "whisper-tiny-eu", type: "model", modality: "speech", desc: "Lightweight Basque Whisper fine-tuned on Mozilla Common Voice 13.0.", year: 2024, url: "https://huggingface.co/HiTZ/whisper-tiny-eu" },
    { id: 94, name: "whisper-base-eu", type: "model", modality: "speech", desc: "Base-size Basque Whisper fine-tuned on Common Voice 13.0.", year: 2024, url: "https://huggingface.co/HiTZ/whisper-base-eu" },
    { id: 95, name: "whisper-small-eu", type: "model", modality: "speech", desc: "Small Basque Whisper fine-tuned on Common Voice 13.0.", year: 2024, url: "https://huggingface.co/HiTZ/whisper-small-eu" },
    { id: 96, name: "whisper-medium-eu", type: "model", modality: "speech", desc: "Medium Basque Whisper fine-tuned on Common Voice 13.0.", year: 2024, url: "https://huggingface.co/HiTZ/whisper-medium-eu" },
    { id: 97, name: "whisper-large-eu", type: "model", modality: "speech", desc: "Large Basque Whisper fine-tuned on Common Voice 13.0.", year: 2024, url: "https://huggingface.co/HiTZ/whisper-large-eu" },
    { id: 98, name: "whisper-large-v2-eu", type: "model", modality: "speech", desc: "Basque Whisper large-v2 optimized on Mozilla Common Voice.", year: 2024, url: "https://huggingface.co/HiTZ/whisper-large-v2-eu" },
    { id: 99, name: "whisper-large-v3-eu", type: "model", modality: "speech", desc: "Latest Basque Whisper large-v3 fine-tuned on Common Voice 13.0.", year: 2025, url: "https://huggingface.co/HiTZ/whisper-large-v3-eu" },
    { id: 100, name: "CATalog", type: "dataset", modality: "text", desc: "Massive Catalan textual corpus of 17.45B words across 34.8M documents.", year: 2024, url: "https://huggingface.co/datasets/projecte-aina/CATalog" },
    { id: 101, name: "ALIA Multilingual Parallel Sentences", type: "dataset", modality: "translation", desc: "Multilingual parallel corpus with Valencian, Spanish and English sentences.", year: 2025, url: "https://huggingface.co/datasets/gplsi/alia_multilingual_parallel_sentences" },
    { id: 102, name: "ALIA_DOGV", type: "dataset", modality: "text", desc: "Bilingual Valencian-Spanish corpus from the Official Valencian Government gazette.", year: 2025, url: "https://huggingface.co/datasets/gplsi/alia_dogv" },
    { id: 103, name: "ALIA_BOUA", type: "dataset", modality: "text", desc: "Bilingual Valencian-Spanish university bulletin corpus.", year: 2025, url: "https://huggingface.co/datasets/gplsi/alia_boua" },
    { id: 104, name: "ALIA_AMIC", type: "dataset", modality: "text", desc: "Valencian-language newspaper and blog text corpus.", year: 2025, url: "https://huggingface.co/datasets/gplsi/alia_amic" },
    { id: 105, name: "ALIA_LES_CORTS", type: "dataset", modality: "text", desc: "Bilingual Valencian-Spanish parliamentary corpus from Les Corts Valencianes.", year: 2025, url: "https://huggingface.co/datasets/gplsi/alia_les_corts" },
    { id: 106, name: "ALIA_TOURISM", type: "dataset", modality: "text", desc: "Specialized tourism-domain corpus with 79.15M tokens across three languages.", year: 2025, url: "https://huggingface.co/datasets/gplsi/alia_tourism" },
    { id: 107, name: "ALIA_INTELLECTUAL_PROPERTY", type: "dataset", modality: "text", desc: "Spanish intellectual-property domain corpus with 1.13B tokens.", year: 2025, url: "https://huggingface.co/datasets/gplsi/alia_intellectual_property" },
    { id: 108, name: "latxa-corpus-v2", type: "dataset", modality: "text", desc: "Basque corpus covering legal, administrative, journalistic and academic domains.", year: 2025, url: "https://huggingface.co/datasets/HiTZ/latxa-corpus-v2" },
    { id: 109, name: "ALIA Biomedical Corpus", type: "dataset", modality: "text", desc: "Spanish biomedical text corpus with 5.5B tokens from official and scientific sources.", year: 2025, url: "https://huggingface.co/datasets/SINAI/ALIA-biomedical" },
    { id: 110, name: "ALIA Cultural Heritage Corpus", type: "dataset", modality: "text", desc: "Spanish cultural-heritage corpus with 946.4M tokens across 102 source datasets.", year: 2025, url: "https://huggingface.co/datasets/SINAI/ALIA-cultural-heritage" },
    { id: 111, name: "ALIA Legal-Administrative Corpus", type: "dataset", modality: "text", desc: "Spanish legal/administrative corpus with over 7M documents and 5B tokens.", year: 2025, url: "https://huggingface.co/datasets/SINAI/ALIA-legal-administrative" },
    { id: 112, name: "ALIA Legal Hard Negatives", type: "dataset", modality: "text", desc: "Hard-negative set for training Spanish legal-domain retrieval systems.", year: 2025, url: "https://huggingface.co/datasets/SINAI/ALIA-legal-administrative-hard-negatives" },
    { id: 113, name: "InstruCAT", type: "dataset", modality: "text", desc: "Over 200,000 Catalan instructions covering multiple downstream tasks for LLM fine-tuning.", year: 2024, url: "https://huggingface.co/datasets/projecte-aina/InstruCAT" },
    { id: 114, name: "ALIA Legal-Administrative Synthetic Instructions", type: "dataset", modality: "text", desc: "7.4M+ instruction-response pairs for Spanish legal-administrative LLMs.", year: 2025, url: "https://huggingface.co/datasets/SINAI/ALIA-legal-administrative-synthetic-instructions" },
    { id: 115, name: "mPersonas", type: "dataset", modality: "text", desc: "Multilingual synthetic persona descriptions generated with DeepSeek-V3.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/m-personas" },
    { id: 116, name: "Salamandra Guard Dataset", type: "dataset", modality: "text", desc: "21,335 conversational examples for Catalan/Spanish safety classification.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/salamandra-guard-dataset" },
    { id: 117, name: "Multi-LMentry", type: "benchmark", modality: "text", desc: "Nine-language benchmark evaluating elementary-level reasoning across multilingual models.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/multi_lmentry" },
    { id: 118, name: "VeritasQA", type: "benchmark", modality: "text", desc: "353 question-answer pairs evaluating factual accuracy in language models.", year: 2024, url: "https://huggingface.co/datasets/projecte-aina/veritasQA" },
    { id: 119, name: "EQ-bench_es", type: "benchmark", modality: "text", desc: "Spanish adaptation of EQ-bench for emotional-reasoning evaluation.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/EQ-bench_es" },
    { id: 120, name: "EQ-bench_ca", type: "benchmark", modality: "text", desc: "Catalan adaptation of EQ-bench for emotional-reasoning evaluation.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/EQ-bench_ca" },
    { id: 121, name: "EsBBQ", type: "benchmark", modality: "text", desc: "Spanish adaptation of BBQ evaluating social bias across ten demographic categories.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/EsBBQ" },
    { id: 122, name: "CaBBQ", type: "benchmark", modality: "text", desc: "Catalan adaptation of BBQ for social-bias evaluation in LLMs.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/CaBBQ" },
    { id: 123, name: "OpenBookQA_es", type: "benchmark", modality: "text", desc: "1,000-instance Spanish translation of OpenBookQA for world knowledge and reasoning.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/openbookqa-es" },
    { id: 124, name: "hhh_alignment_es", type: "benchmark", modality: "text", desc: "Spanish translation of the HHH alignment suite (helpful, honest, harmless).", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/hhh_alignment_es" },
    { id: 125, name: "hhh_alignment_ca", type: "benchmark", modality: "text", desc: "Catalan translation of the HHH alignment evaluation suite.", year: 2024, url: "https://huggingface.co/datasets/projecte-aina/hhh_alignment_ca" },
    { id: 126, name: "IFEval_es", type: "benchmark", modality: "text", desc: "Spanish IFEval with 541 verifiable instructions for instruction-following evaluation.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/IFEval_es" },
    { id: 127, name: "IFEval_ca", type: "benchmark", modality: "text", desc: "Catalan IFEval for evaluating instruction-optimized LLMs.", year: 2024, url: "https://huggingface.co/datasets/projecte-aina/IFEval_ca" },
    { id: 128, name: "SIQA_es", type: "benchmark", modality: "text", desc: "Spanish Social IQA for commonsense reasoning about social interactions.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/SIQA_es" },
    { id: 129, name: "arc_es", type: "benchmark", modality: "text", desc: "Spanish ARC science-reasoning challenge in multiple-choice format.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/arc_es" },
    { id: 130, name: "COPA-es", type: "benchmark", modality: "text", desc: "600-instance Spanish corpus for causal-reasoning evaluation.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/COPA-es" },
    { id: 131, name: "cobie_sst2", type: "benchmark", modality: "text", desc: "Modified SST-2 sentiment corpus for evaluating cognitive biases in LLMs.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/cobie_sst2" },
    { id: 132, name: "cobie_ai2_arc", type: "benchmark", modality: "text", desc: "Modified ARC reasoning dataset for cognitive-bias evaluation.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/cobie_ai2_arc" },
    { id: 133, name: "RAG_eu", type: "benchmark", modality: "text", desc: "Retrieval-augmented generation evaluation in Basque across legal, parliamentary and journalistic domains.", year: 2025, url: "https://huggingface.co/datasets/HiTZ/RAG_eu" },
    { id: 134, name: "ALIA-administrative-triplets", type: "dataset", modality: "text", desc: "Triplet data for training/evaluating information retrieval in the Spanish administrative domain.", year: 2025, url: "https://huggingface.co/datasets/SINAI/ALIA-administrative-triplets" },
    { id: 135, name: "ALIA Legal-Administrative CQA", type: "dataset", modality: "text", desc: "Question-answer pairs in the Spanish legal-administrative domain.", year: 2025, url: "https://huggingface.co/datasets/SINAI/ALIA-legal-administrative-cqa" },
    { id: 136, name: "Galician NER", type: "dataset", modality: "text", desc: "Manually annotated and reviewed Galician corpus for named-entity recognition.", year: 2024, url: "https://huggingface.co/datasets/proxectonos/Galician_NER" },
    { id: 137, name: "sentimento-gl", type: "dataset", modality: "text", desc: "Over 45,000 Galician sentences annotated for sentiment analysis.", year: 2024, url: "https://huggingface.co/datasets/proxectonos/sentimento-gl" },
    { id: 138, name: "UD_Galician-PUD", type: "dataset", modality: "text", desc: "1,000 Galician sentences annotated with Universal Dependencies syntactic tags.", year: 2024, url: "https://huggingface.co/datasets/proxectonos/UD_Galician-PUD" },
    { id: 139, name: "LexBOE", type: "dataset", modality: "text", desc: "Legal-text classification dataset from Spain's official gazette with unified labels.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/LexBOE" },
    { id: 140, name: "AbSanitas", type: "dataset", modality: "text", desc: "Biomedical information-retrieval dataset combining abstracts with synthetic queries.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/AbSanitas" },
    { id: 141, name: "AbScientia", type: "dataset", modality: "text", desc: "Thematic classification dataset of Spanish scientific abstracts.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/AbScientia" },
    { id: 142, name: "DISCRIMINATIVE CLEARSIM_ES", type: "dataset", modality: "text", desc: "13,953 Spanish texts in 4,651 triplets for plain-language classification.", year: 2025, url: "https://huggingface.co/datasets/gplsi/discriminative_clearsim_es" },
    { id: 143, name: "DISCRIMINATIVE CLEARSIM_VA", type: "dataset", modality: "text", desc: "Valencian equivalent of ClearSim with aligned texts at three complexity levels.", year: 2025, url: "https://huggingface.co/datasets/gplsi/discriminative_clearsim_va" },
    { id: 144, name: "Balanced Fake Job Postings EN", type: "dataset", modality: "text", desc: "1,730 balanced English job postings for fraud detection.", year: 2025, url: "https://huggingface.co/datasets/gplsi/fake_job_postings_balanced_en" },
    { id: 145, name: "Balanced Fake Job Postings VA", type: "dataset", modality: "text", desc: "1,730 Valencian job postings for fraudulent-posting detection.", year: 2025, url: "https://huggingface.co/datasets/gplsi/fake_job_postings_balanced_va" },
    { id: 146, name: "DISCRIMINATIVE COUNTERFEIT_ES", type: "dataset", modality: "text", desc: "Spanish dataset for trademark verification and counterfeit-product detection.", year: 2025, url: "https://huggingface.co/datasets/gplsi/discriminative_counterfeit_es" },
    { id: 147, name: "DISCRIMINATIVE COUNTERFEIT_EN", type: "dataset", modality: "text", desc: "English dataset for brand verification in legal contexts.", year: 2025, url: "https://huggingface.co/datasets/gplsi/discriminative_counterfeit_en" },
    { id: 148, name: "Wikiextractor-V2", type: "tool", modality: "text", desc: "Wikipedia text extractor supporting Spanish, Catalan and other languages; has extracted 675,000+ documents.", year: 2024, url: "https://github.com/langtech-bsc/Wikiextractor-V2/" },
    { id: 149, name: "AnonymizationPipeline", type: "tool", modality: "text", desc: "GDPR-compliant anonymization pipeline for integrating user-generated content into training data.", year: 2024, url: "https://github.com/langtech-bsc/AnonymizationPipeline" },
    { id: 150, name: "Colossal OSCAR 1.0", type: "dataset", modality: "text", desc: "Multilingual web corpus covering 35 European languages, used for ALIA 40B pretraining.", year: 2023, url: "https://huggingface.co/datasets/oscar-corpus/colossal-oscar-1.0" },
    { id: 151, name: "Aya Dataset", type: "dataset", modality: "text", desc: "Cohere-for-AI instruction dataset across 34 languages (without evaluation suite).", year: 2024, url: "https://huggingface.co/datasets/CohereForAI/aya_dataset" },
    { id: 152, name: "Wikimedia Dumps", type: "dataset", modality: "text", desc: "Wikipedia encyclopedia content across 31 languages used for ALIA 40B pretraining.", year: 2024, url: "https://dumps.wikimedia.org/" },
    { id: 153, name: "OpenSubtitles v2016", type: "dataset", modality: "text", desc: "Subtitle data in 27 languages used for pretraining.", year: 2016, url: "https://huggingface.co/datasets/Helsinki-NLP/open_subtitles" },
    { id: 154, name: "EurLEX-Resources", type: "dataset", modality: "text", desc: "European Union legal documents in 24 languages.", year: 2023, url: "https://huggingface.co/datasets/joelniklaus/eurlex_resources" },
    { id: 155, name: "MC4-Legal", type: "dataset", modality: "text", desc: "Legal web content in 23 languages, derived from mC4.", year: 2023, url: "https://huggingface.co/datasets/joelniklaus/legal-mc4" },
    { id: 156, name: "ParlaMint", type: "dataset", modality: "text", desc: "European parliamentary debate corpus in 22 languages.", year: 2023, url: "https://clarin-eric.github.io/ParlaMint/" },
    { id: 157, name: "MaCoCu", type: "dataset", modality: "text", desc: "Web-crawled parallel/monolingual corpora in 8 languages.", year: 2023, url: "https://macocu.eu/" },
    { id: 158, name: "CURLICAT", type: "dataset", modality: "text", desc: "Comparable corpora in 7 languages for cross-language NLP.", year: 2022, url: "https://curlicat-project.eu/" },
    { id: 159, name: "Norwegian Colossal Corpus (NCC)", type: "dataset", modality: "text", desc: "Large Norwegian/Nynorsk text collection used for ALIA 40B pretraining.", year: 2022, url: "https://github.com/NbAiLab/notram/blob/master/guides/corpus_description.md" },
    { id: 160, name: "Academic Slovene KAS 2.0", type: "dataset", modality: "text", desc: "Corpus of Slovenian academic texts.", year: 2021, url: "https://www.clarin.si/repository/xmlui/handle/11356/1448" },
    { id: 161, name: "BIGPATENT", type: "dataset", modality: "text", desc: "Collection of English patent documents used for pretraining.", year: 2019, url: "https://huggingface.co/datasets/NortheasternUniversity/big_patent" },
    { id: 162, name: "Biomedical-ES", type: "dataset", modality: "text", desc: "Spanish biomedical literature corpus.", year: 2021, url: "https://zenodo.org/records/4561971" },
    { id: 163, name: "Brazilian Portuguese Web as Corpus (BrWaC)", type: "dataset", modality: "text", desc: "Large web corpus of Brazilian Portuguese text.", year: 2018, url: "https://huggingface.co/datasets/dominguesm/brwac" },
    { id: 164, name: "Bulgarian National Corpus (BulNC)", type: "dataset", modality: "text", desc: "Reference corpus for the Bulgarian language.", year: 2014, url: "http://old.dcl.bas.bg/dataset/BulNC.7z" },
    { id: 165, name: "CaBeRnet", type: "dataset", modality: "text", desc: "French corpus resource used for pretraining.", year: 2020, url: "https://aclanthology.org/2020.cmlc-1.3/" },
    { id: 166, name: "CorpusNÓS", type: "dataset", modality: "text", desc: "Galician language corpus.", year: 2024, url: "https://zenodo.org/records/11655219" },
    { id: 167, name: "Croatian Web as Corpus 2.1 (hrWaC)", type: "dataset", modality: "text", desc: "Large web corpus of Croatian text.", year: 2018, url: "https://clarin.si/repository/xmlui/handle/11356/1064" },
    { id: 168, name: "DaNewsroom", type: "dataset", modality: "text", desc: "Danish newspaper corpus.", year: 2020, url: "https://github.com/danielvarab/da-newsroom" },
    { id: 169, name: "Danish GigaWord", type: "dataset", modality: "text", desc: "Large-scale Danish text collection.", year: 2021, url: "https://huggingface.co/datasets/danish-foundation-models/danish-gigaword" },
    { id: 170, name: "Dolmino-mix-1124", type: "dataset", modality: "text", desc: "English training-data subset from AllenAI's Dolmino mix.", year: 2024, url: "https://huggingface.co/datasets/allenai/dolmino-mix-1124" },
    { id: 171, name: "DK-CLARIN Reference Corpus of General Danish", type: "dataset", modality: "text", desc: "General-language Danish reference corpus.", year: 2021, url: "https://korpus.dsl.dk/clarin/" },
    { id: 172, name: "Estonian National Corpus 2021 (ENC)", type: "dataset", modality: "text", desc: "National reference corpus of Estonian.", year: 2021, url: "https://metashare.ut.ee/repository/search/?q=estonian%20national%20corpus" },
    { id: 173, name: "Estonian Reference Corpus (ERC)", type: "dataset", modality: "text", desc: "Reference corpus of Estonian texts.", year: 2013, url: "https://lindat.mff.cuni.cz/repository/xmlui/handle/11372/LRT-1068" },
    { id: 174, name: "EusCrawl", type: "dataset", modality: "text", desc: "Basque web-crawled corpus (without Wikipedia or NC-licensed content).", year: 2022, url: "https://huggingface.co/datasets/HiTZ/euscrawl" },
    { id: 175, name: "FineWeb-Edu (350BT subset)", type: "dataset", modality: "text", desc: "Large English educational web corpus from Hugging Face.", year: 2024, url: "https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu" },
    { id: 176, name: "Fineweb2", type: "dataset", modality: "text", desc: "Multilingual web-crawled corpus covering 34 languages.", year: 2024, url: "https://huggingface.co/datasets/HuggingFaceFW/fineweb-2" },
    { id: 177, name: "French Public Domain Books", type: "dataset", modality: "text", desc: "Collection of historical public-domain French literature.", year: 2024, url: "https://huggingface.co/datasets/PleIAs/French-PD-Books" },
    { id: 178, name: "French Public Domain Newspapers", type: "dataset", modality: "text", desc: "Historical French newspapers in the public domain.", year: 2024, url: "https://huggingface.co/datasets/PleIAs/French-PD-Newspapers" },
    { id: 179, name: "German Web as Corpus (DeWaC)", type: "dataset", modality: "text", desc: "Large web corpus of German text.", year: 2006, url: "https://wacky.sslmit.unibo.it/doku.php?id=seed_urls" },
    { id: 180, name: "Greek Legal Code (GLC)", type: "dataset", modality: "text", desc: "Greek legal documents corpus.", year: 2021, url: "https://huggingface.co/datasets/AI-team-UoA/greek_legal_code" },
    { id: 181, name: "Greek Web Corpus (GWC)", type: "dataset", modality: "text", desc: "Web-crawled corpus of Greek text.", year: 2020, url: "http://nlp.polytechnique.fr/resources-greek" },
    { id: 182, name: "HPLT v1 - Spanish", type: "dataset", modality: "text", desc: "High-quality Spanish web text from the HPLT project.", year: 2023, url: "https://hplt-project.org/datasets/v1" },
    { id: 183, name: "HPLT v1.1 - Spanish", type: "dataset", modality: "text", desc: "Updated Spanish HPLT dataset.", year: 2024, url: "https://hplt-project.org/datasets/v1.1" },
    { id: 184, name: "Irish Universal Dependencies (Ga-UD)", type: "dataset", modality: "text", desc: "Irish-language corpus annotated with Universal Dependencies.", year: 2020, url: "https://universaldependencies.org/ga/" },
    { id: 185, name: "Italian Web as Corpus (ItWaC)", type: "dataset", modality: "text", desc: "Large web corpus of Italian text.", year: 2006, url: "https://wacky.sslmit.unibo.it/doku.php?id=seed_urls" },
    { id: 186, name: "Korpus Malti", type: "dataset", modality: "text", desc: "Reference corpus of the Maltese language.", year: 2022, url: "https://huggingface.co/datasets/MLRS/korpus_malti" },
    { id: 187, name: "SK-Laws (Korpus slovenských právnych predpisov v1.9)", type: "dataset", modality: "text", desc: "Corpus of Slovak legislation.", year: 2022, url: "https://www.juls.savba.sk/data.html" },
    { id: 188, name: "Latxa Corpus v1.1 (GAITU)", type: "dataset", modality: "text", desc: "Basque language corpus used for Latxa pretraining.", year: 2024, url: "https://huggingface.co/datasets/HiTZ/latxa-corpus-v1.1" },
    { id: 189, name: "UK-Laws (Laws and legal acts of Ukraine)", type: "dataset", modality: "text", desc: "Corpus of Ukrainian legislation.", year: 2022, url: "https://lang.org.ua/en/corpora/#anchor7" },
    { id: 190, name: "Legal-ES", type: "dataset", modality: "text", desc: "Spanish legal-domain corpus.", year: 2020, url: "https://aclanthology.org/2020.lt4gov-1.6/" },
    { id: 191, name: "MARCELL Romanian Legislative Subcorpus v2", type: "dataset", modality: "text", desc: "Romanian legal texts from the MARCELL project.", year: 2020, url: "https://elrc-share.eu/repository/browse/marcell-romanian-legislative-subcorpus-v2/2da548428b9d11eb9c1a00155d026706ce94a6b59ffc4b0e9fb5cd9cebe6889e/" },
    { id: 192, name: "Math AMPS", type: "dataset", modality: "text", desc: "Mathematics problem corpus used for reasoning training.", year: 2021, url: "https://github.com/hendrycks/math" },
    { id: 193, name: "NKJP National Corpus of Polish v1.2", type: "dataset", modality: "text", desc: "National reference corpus of the Polish language.", year: 2012, url: "https://nkjp.pl/index.php?page=0&lang=1" },
    { id: 194, name: "Occitan Corpus (IEA-AALO)", type: "dataset", modality: "text", desc: "Occitan language text corpus (restricted distribution).", year: 2024, url: "https://www.institutestudisaranesi.cat/" },
    { id: 195, name: "Open Legal Data", type: "dataset", modality: "text", desc: "Collection of German court decisions and laws.", year: 2020, url: "https://openlegaldata.io/" },
    { id: 196, name: "ParlamentoPT", type: "dataset", modality: "text", desc: "Portuguese parliamentary corpus from the PORTULAN project.", year: 2023, url: "https://huggingface.co/datasets/PORTULAN/parlamento-pt" },
    { id: 197, name: "peS2o", type: "dataset", modality: "text", desc: "AllenAI corpus of English scientific papers.", year: 2023, url: "https://huggingface.co/datasets/allenai/peS2o" },
    { id: 198, name: "PG-19", type: "dataset", modality: "text", desc: "DeepMind corpus of long-form English fiction texts.", year: 2019, url: "https://huggingface.co/datasets/deepmind/pg19" },
    { id: 199, name: "Pile of Law", type: "dataset", modality: "text", desc: "Large English legal documents corpus.", year: 2022, url: "https://huggingface.co/datasets/pile-of-law/pile-of-law" },
    { id: 200, name: "Polish Parliamentary Corpus (PPC)", type: "dataset", modality: "text", desc: "Polish legislative-debate corpus.", year: 2021, url: "https://clip.ipipan.waw.pl/PPC" },
    { id: 201, name: "Proof Pile", type: "dataset", modality: "text", desc: "Mathematics and formal proofs corpus.", year: 2022, url: "https://huggingface.co/datasets/hoskinson-center/proof-pile" },
    { id: 202, name: "RedPajama-Data T1 (StackExchange subset)", type: "dataset", modality: "text", desc: "English Q&A content from RedPajama's StackExchange subset.", year: 2023, url: "https://huggingface.co/datasets/togethercomputer/RedPajama-Data-1T" },
    { id: 203, name: "Scientific-ES", type: "dataset", modality: "text", desc: "Spanish academic publications corpus from Dialnet.", year: 2022, url: "https://dialnet.unirioja.es/" },
    { id: 204, name: "OD-Justice (SK Court Decisions v2.0)", type: "dataset", modality: "text", desc: "Slovak court-decision corpus.", year: 2022, url: "https://www.juls.savba.sk/data/od-justice/od-justice-2.0.ver.xz" },
    { id: 205, name: "Slovene Web as Corpus (slWaC)", type: "dataset", modality: "text", desc: "Large web corpus of Slovenian text.", year: 2014, url: "https://www.sketchengine.eu/slwac-slovenian-corpus-from-the-web/" },
    { id: 206, name: "SoNAR Corpus NC 1.2", type: "dataset", modality: "text", desc: "Dutch reference corpus from the SoNAR project.", year: 2013, url: "https://elrc-share.eu/repository/browse/sonar-corpus/9735a54f1f9111e7bfe700155d020502b917ac3b8c8844e19665914d110e94d1/" },
    { id: 207, name: "Spanish Legal Domain Corpora", type: "dataset", modality: "text", desc: "Spanish legal-domain texts hosted on Zenodo.", year: 2021, url: "https://zenodo.org/records/5495529" },
    { id: 208, name: "SrpKorSubset", type: "dataset", modality: "text", desc: "Subset of the Contemporary Serbian corpus (news, legal, academic).", year: 2013, url: "http://metashare.elda.org/repository/browse/corpus-of-contemporary-serbian/00cc41168bdf11e29c9e0015171445924cdac8693bf840f780418187133495b8/" },
    { id: 209, name: "Starcoder Data", type: "dataset", modality: "text", desc: "BigCode programming-language source-code dataset.", year: 2023, url: "https://huggingface.co/datasets/bigcode/starcoderdata" },
    { id: 210, name: "State-related content from the Latvian Web", type: "dataset", modality: "text", desc: "Corpus of Latvian government web content.", year: 2021, url: "https://catalog.elra.info/en-us/repository/browse/ELRA-W0169/" },
    { id: 211, name: "SYN v9", type: "dataset", modality: "text", desc: "Large written-Czech corpus from the LINDAT repository.", year: 2023, url: "https://lindat.mff.cuni.cz/repository/xmlui/handle/11234/1-4635" },
    { id: 212, name: "Tagesschau Archive", type: "dataset", modality: "text", desc: "German news archive from Tagesschau (2018-2023).", year: 2023, url: "https://huggingface.co/datasets/bjoernp/tagesschau-2018-2023" },
    { id: 213, name: "Danish Parliament Corpus 2009-2017 v1", type: "dataset", modality: "text", desc: "Legislative corpus of the Danish Parliament (2009-2017).", year: 2019, url: "https://repository.clarin.dk/repository/xmlui/handle/20.500.12115/8" },
    { id: 214, name: "Gaois Bilingual Corpus of English-Irish Legislation", type: "dataset", modality: "text", desc: "Bilingual English-Irish legislative corpus.", year: 2020, url: "https://portulanclarin.net/repository/browse/the-gaois-bilingual-corpus-of-english-irish-legislation-processed/daeac17c9e3511ea9b7f02420a000407b83de243dc0b469aab41084386c5b80f/" },
    { id: 215, name: "The Pile (PhilPapers)", type: "dataset", modality: "text", desc: "Philosophy-papers subset of The Pile.", year: 2020, url: "https://github.com/thoppe/The-Pile-PhilPapers" },
    { id: 216, name: "Swedish Culturomics Gigaword Corpus", type: "dataset", modality: "text", desc: "Large-scale Swedish text collection.", year: 2016, url: "https://spraakbanken.gu.se/en/resources/gigaword" },
    { id: 217, name: "Welsh-GOV", type: "dataset", modality: "text", desc: "Corpus of Welsh government content.", year: 2023, url: "https://www.llyw.cymru/" },
    { id: 218, name: "Yle Finnish News Archive", type: "dataset", modality: "text", desc: "Finnish news archive from the Language Bank of Finland.", year: 2020, url: "https://www.kielipankki.fi/download/YLE/fi/2019-2020-src/" },
    { id: 219, name: "CommonPhone-SE", type: "dataset", modality: "speech", desc: "Speech dataset derived from CommonPhone with audio samples in seven languages.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/CommonPhone-SE" },
    { id: 220, name: "distilled-yodas-spanish", type: "dataset", modality: "speech", desc: "High-quality Spanish subset of YODAS containing approximately 8,000 hours of recordings.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/distilled-yodas-spanish" },
    { id: 221, name: "corts_valencianes_asr_a", type: "dataset", modality: "speech", desc: "270+ hours of voice recordings from Valencian parliamentary sessions.", year: 2024, url: "https://huggingface.co/datasets/projecte-aina/corts_valencianes_asr_a" },
    { id: 222, name: "commonvoice_benchmark_catalan_accents", type: "benchmark", modality: "speech", desc: "Benchmark for evaluating ASR accuracy across Catalan accents.", year: 2024, url: "https://huggingface.co/datasets/projecte-aina/commonvoice_benchmark_catalan_accents" },
    { id: 223, name: "cv17_es_other_automatically_verified", type: "dataset", modality: "speech", desc: "581,680 Spanish audio files (784+ hours) validated with OpenAI's Whisper.", year: 2025, url: "https://huggingface.co/datasets/projecte-aina/cv17_es_other_automatically_verified" },
    { id: 224, name: "escagleu-64k", type: "dataset", modality: "speech", desc: "Parallel corpus of 64,091 phrases translated from Spanish to Catalan, Valencian, Galician and Basque.", year: 2024, url: "https://huggingface.co/datasets/projecte-aina/escagleu-64k" },
    { id: 225, name: "Synthetic DEM Corpus", type: "dataset", modality: "speech", desc: "371 hours of Mexican Spanish recordings with words, definitions and LLM-generated examples.", year: 2025, url: "https://huggingface.co/datasets/projecte-aina/synthetic_dem" },
    { id: 226, name: "composite_corpus_eseu_v1.0", type: "dataset", modality: "speech", desc: "Bilingual dataset with 1,456 hours of Basque-Spanish voice recordings and transcriptions.", year: 2025, url: "https://huggingface.co/datasets/HiTZ/composite_corpus_eseu_v1.0" },
    { id: 227, name: "composite_corpus_es_v1.0", type: "dataset", modality: "speech", desc: "Spanish speech dataset with 2,676 hours of transcribed recordings.", year: 2025, url: "https://huggingface.co/datasets/HiTZ/composite_corpus_es_v1.0" },
    { id: 228, name: "composite_corpus_eu_v2.1", type: "dataset", modality: "speech", desc: "Basque speech dataset with 707 hours of transcribed recordings.", year: 2025, url: "https://huggingface.co/datasets/HiTZ/composite_corpus_eu_v2.1" },
    { id: 229, name: "benchmark_eseu_testsets", type: "benchmark", modality: "speech", desc: "Balanced Spanish/Basque/code-switching test sets totaling 11 hours.", year: 2025, url: "https://huggingface.co/datasets/HiTZ/benchmark_eseu_testsets" },
    { id: 230, name: "Nos_ParlaSpeech-GL", type: "dataset", modality: "speech", desc: "Over 1,600 hours of aligned audio and text from Galician parliamentary sessions (2015-2022).", year: 2024, url: "https://huggingface.co/datasets/proxectonos/Nos_Parlaspeech-GL" },
    { id: 231, name: "Nos_Transcrispeech-GL", type: "dataset", modality: "speech", desc: "Manually transcribed 50-hour multi-domain Galician speech corpus.", year: 2024, url: "https://huggingface.co/datasets/proxectonos/Nos_Transcrispeech-GL" },
    { id: 232, name: "Nos_RG-Podcast-GL", type: "dataset", modality: "speech", desc: "328 hours of Galician podcast data transcribed and aligned across 33 series.", year: 2024, url: "https://huggingface.co/datasets/proxectonos/Nos_RG-Podcast-GL" },
    { id: 233, name: "Nos_Celtia-GL", type: "dataset", modality: "speech", desc: "20,000 Galician phrases comprising journalistic text and manually designed utterances for TTS.", year: 2023, url: "https://zenodo.org/records/7716958" },
    { id: 234, name: "Nos_Brais-GL", type: "dataset", modality: "speech", desc: "Galician TTS corpus with 16,121 phrases recorded in-studio by a professional speaker.", year: 2024, url: "https://zenodo.org/records/14265241" },
    { id: 235, name: "Nos_Telexornais-GL", type: "dataset", modality: "speech", desc: "ASR corpus with 1,100+ hours of transcribed and aligned Galician news broadcasts (2019-2022).", year: 2024, url: "https://huggingface.co/datasets/proxectonos/Nos_Telexornais-GL" },
    { id: 236, name: "ALIA_mixed_authentic_synthetic_MT", type: "dataset", modality: "translation", desc: "Multilingual MT corpus (453M+ sentences) combining OPUS, other public sources and synthetic data.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/ALIA_mixed_authentic_synthetic_MT" },
    { id: 237, name: "CA-GL Parallel Corpus", type: "dataset", modality: "translation", desc: "Catalan-Galician parallel corpus with 33.6M sentence pairs (NOS + AINA).", year: 2025, url: "https://huggingface.co/datasets/projecte-aina/CA-GL_Parallel_Corpus" },
    { id: 238, name: "CA-EU Parallel Corpus", type: "dataset", modality: "translation", desc: "Catalan-Basque parallel corpus with 10.4M sentence pairs (GAITU + AINA).", year: 2025, url: "https://huggingface.co/datasets/projecte-aina/CA-EU_Parallel_Corpus" },
    { id: 239, name: "Catalan-Aranese Parallel Corpus", type: "dataset", modality: "translation", desc: "Catalan-Aranese parallel corpus with 539,110 sentences from authentic and synthetic sources.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/Catalan-Aranese_Parallel_Corpus" },
    { id: 240, name: "ES-AN Parallel Corpus", type: "dataset", modality: "translation", desc: "Spanish-Aragonese parallel corpus with 47,521 sentences (synthetic + OPUS).", year: 2025, url: "https://huggingface.co/datasets/projecte-aina/ES-AN_Parallel_Corpus" },
    { id: 241, name: "ES-AST Parallel Corpus", type: "dataset", modality: "translation", desc: "Spanish-Asturian parallel corpus with 704,378 sentences (synthetic + OPUS).", year: 2025, url: "https://huggingface.co/datasets/projecte-aina/ES-AST_Parallel_Corpus" },
    { id: 242, name: "ES-OC Parallel Corpus", type: "dataset", modality: "translation", desc: "Spanish-Aranese parallel corpus with 419,908 sentences (synthetic + OPUS).", year: 2025, url: "https://huggingface.co/datasets/projecte-aina/ES-OC_Parallel_Corpus" },
    { id: 243, name: "Spanish-Valencian Catalan Parallel Corpus", type: "dataset", modality: "translation", desc: "2.16M Spanish-Valencian sentence pairs sourced from official publications.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/Spanish-Valencian_Catalan_Parallel_Corpus" },
    { id: 244, name: "UJI_PARALLEL_VA_ES", type: "dataset", modality: "translation", desc: "Valencian-Spanish parallel corpus with 120,281 sentence pairs from Universitat Jaume I.", year: 2025, url: "https://huggingface.co/datasets/gplsi/uji_parallel_va_es" },
    { id: 245, name: "DOGV_PARALLEL", type: "dataset", modality: "translation", desc: "Valencian-Spanish parallel corpus with 8.7M sentence pairs from the DOGV gazette.", year: 2025, url: "https://huggingface.co/datasets/gplsi/dogv_parallel" },
    { id: 246, name: "AMIC_PARALLEL", type: "dataset", modality: "translation", desc: "Valencian-Spanish parallel corpus with 738,777 sentence pairs from the AMIC media association.", year: 2025, url: "https://huggingface.co/datasets/gplsi/amic_parallel" },
    { id: 247, name: "BOUA_PARALLEL", type: "dataset", modality: "translation", desc: "Valencian-Spanish parallel corpus (357,518 pairs) from the University of Alicante's bulletin.", year: 2025, url: "https://huggingface.co/datasets/gplsi/boua_parallel" },
    { id: 248, name: "UJI_PARALLEL_VA_EN", type: "dataset", modality: "translation", desc: "Valencian-English parallel corpus with 43,107 sentence pairs from Universitat Jaume I.", year: 2025, url: "https://huggingface.co/datasets/gplsi/uji_parallel_va_en" },
    { id: 249, name: "ES-CA_translation_test", type: "benchmark", modality: "translation", desc: "Spanish-Catalan alignment test set (1,958 sentences) from Common Voice.", year: 2025, url: "https://huggingface.co/datasets/gplsi/ES-CA_translation_test" },
    { id: 250, name: "ES-VA_translation_test", type: "benchmark", modality: "translation", desc: "Spanish-Valencian alignment test set (1,958 sentences) from Common Voice.", year: 2025, url: "https://huggingface.co/datasets/gplsi/ES-VA_translation_test" },
    { id: 251, name: "CA-VA_alignment_test", type: "benchmark", modality: "translation", desc: "Catalan-Valencian alignment test set (1,958 sentences) from Common Voice.", year: 2025, url: "https://huggingface.co/datasets/gplsi/CA-VA_alignment_test" },
    { id: 252, name: "ALIA-parallel-translation", type: "dataset", modality: "translation", desc: "35.7M English-Spanish sentence pairs across legal, biomedical and heritage domains.", year: 2025, url: "https://huggingface.co/datasets/SINAI/ALIA-parallel-translation" },
    { id: 253, name: "ALIA-heritage-parallel-translation", type: "dataset", modality: "translation", desc: "288,955 English-Spanish documents from the cultural-heritage domain.", year: 2025, url: "https://huggingface.co/datasets/SINAI/ALIA-heritage-parallel-translation" },
    { id: 254, name: "ALIA Synthetic MT", type: "dataset", modality: "translation", desc: "137,726 synthetic English-Spanish-Basque sentences generated from Berria content.", year: 2025, url: "https://huggingface.co/datasets/HiTZ/ALIA_syntethic_MT" },
    { id: 255, name: "Spanish-Galician Idiom Parallel Corpus", type: "dataset", modality: "translation", desc: "8,800 Spanish-Galician bilingual idiom pairs from CORPES/CORGA plus synthetic data.", year: 2025, url: "https://huggingface.co/datasets/proxectonos/corpus_paralelo_idioms" },
    { id: 256, name: "SciELO-GL", type: "dataset", modality: "translation", desc: "300,000 Spanish-Galician and English-Galician aligned sentences from SCIELO.", year: 2025, url: "https://huggingface.co/datasets/proxectonos/SciELO-GL" },
    { id: 257, name: "DGT-GL", type: "dataset", modality: "translation", desc: "320,000 Spanish-Galician aligned sentence pairs from the EU's DGT.", year: 2025, url: "https://huggingface.co/datasets/proxectonos/DGT-GL" },
    { id: 258, name: "Finetuning-MT", type: "dataset", modality: "translation", desc: "190,000 aligned sentence pairs for MT fine-tuning across Galician, Portuguese, Spanish, Catalan, Basque and English (TowerBlocks).", year: 2025, url: "https://huggingface.co/datasets/proxectonos/Finetuning-MT" },
    { id: 259, name: "ACAData", type: "dataset", modality: "translation", desc: "Multilingual academic parallel corpus with 742,183 sentences from European repositories.", year: 2025, url: "https://huggingface.co/datasets/BSC-LT/ACAData" },
    { id: 260, name: "FLORES+G", type: "benchmark", modality: "translation", desc: "518-sentence gender-aware evaluation extension of FLORES for Spanish, Catalan, Basque and English.", year: 2025, url: "https://huggingface.co/datasets/HiTZ/flores_plus_gender" },
    { id: 261, name: "WinoTMeus", type: "benchmark", modality: "translation", desc: "Basque adaptation of WinoMT with 1,827 sentences for gender-bias evaluation in MT.", year: 2025, url: "https://huggingface.co/datasets/HiTZ/winomteus" },
    { id: 262, name: "ChatUI", type: "tool", modality: "text", desc: "Hugging Face Space providing a chat interface to interact with ALIA Kit models.", year: 2025, url: "https://huggingface.co/spaces/BSC-LT/ChatUI" },
    { id: 263, name: "SalamandraTA-7B Demo", type: "tool", modality: "translation", desc: "Hugging Face Space demonstrating SalamandraTA-7B's multilingual machine translation.", year: 2025, url: "https://huggingface.co/spaces/BSC-LT/SalamandraTA-7B-Demo" },
    { id: 264, name: "ALIA RAG Example (Google Colab)", type: "tool", modality: "text", desc: "Google Colab demo of a local retrieval-augmented generation system using a quantized Salamandra-7b-instruct.", year: 2025, url: "https://colab.research.google.com/drive/11UTLRmhtKgxE7FuccHXXlMoeikNVlrtH?usp=sharing" },
  ];

  const faqData = [
    { q: 'What is the AI Open Lab?', a: 'The AI Open Lab is a platform that unifies and provides access to public AI resources — open models, datasets, benchmarks, and tools — developed by public research centers. It promotes ethical, transparent, and accessible AI.' },
    { q: 'Who can use the resources?', a: 'The resources are available to researchers, developers, organizations, and governments. Most resources are released under open licenses, allowing free use for both research and commercial purposes.' },
    { q: 'How do I access the models and datasets?', a: 'You can browse the Resources page to explore available assets. Each resource includes documentation, licensing information, and download or API access instructions.' },
    { q: 'Are the models suitable for production use?', a: 'Yes. The models are developed with production readiness in mind, including comprehensive evaluation, documentation, and deployment guides. Many organizations already use them in production environments.' },
    { q: 'What languages are supported?', a: 'The initiative focuses on supporting non-global and underrepresented languages alongside major languages. Current resources cover 35 European languages, including Spanish, Catalan, Basque, Galician, Valencian and Portuguese, with ongoing efforts to expand coverage.' },
    { q: 'How can my organization contribute?', a: 'Organizations can contribute datasets, models, benchmarks, or tools. Visit the Join page to learn about partnership opportunities and how to submit resources for inclusion.' },
    { q: 'Is there technical support available?', a: 'Yes. Participants in the AI Open Lab can access infrastructure consulting, technical documentation, and community support channels for help with deployment and customization.' },
    { q: 'What makes these resources different from commercial alternatives?', a: 'These resources are developed by public research institutions with a focus on transparency, ethical AI, and cultural diversity. They come with full documentation of training data and methodologies, no vendor lock-in, and open licenses.' },
    { q: 'How is data privacy handled?', a: 'All datasets follow strict ethical guidelines and privacy regulations. Personal data is anonymized or excluded, and data collection processes are fully documented and auditable.' },
    { q: 'Can I fine-tune the models for my specific use case?', a: 'Absolutely. The models are released with fine-tuning support and documentation. The ALIA Kit provides tools specifically designed to help you adapt models to your domain and language requirements.' },
  ];

  /* ---------- ROUTER ---------- */

  function getPage() {
    const hash = window.location.hash.replace('#', '') || 'home';
    return hash;
  }

  function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageId);
    });

    // Close mobile nav
    const nav = document.getElementById('main-nav');
    if (nav) nav.classList.remove('open');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Re-check scroll-based reveals after page switch
    requestAnimationFrame(() => {
      checkScrollReveals();
      checkTimeline();
      checkJoinCards();
    });
  }

  window.addEventListener('hashchange', () => showPage(getPage()));

  /* ---------- INIT ---------- */

  document.addEventListener('DOMContentLoaded', () => {
    showPage(getPage());
    initHeader();
    initMobileMenu();
    initHeroParticles();
    initInfraCountUp();
    initCountUp();
    initResources();
    initFaq();
    initForms();
    initScrollReveals();
    initTimeline();
    initJoinParallax();
  });

  /* ---------- HEADER SCROLL ---------- */

  function initHeader() {
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ---------- MOBILE MENU ---------- */

  function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  /* ---------- HERO PARTICLES ---------- */

  function initHeroParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = container.offsetWidth;
      h = canvas.height = container.offsetHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.floor((w * h) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(63, 166, 120, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(63, 166, 120, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });
  }

  /* ---------- INFRASTRUCTURE DIAGRAM COUNT UP ---------- */

  function initInfraCountUp() {
    const nodes = document.querySelectorAll('.infra-node-count');
    if (!nodes.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.infra-node-count').forEach(el => {
            const target = parseInt(el.dataset.count, 10);
            const duration = 1500;
            const start = performance.now();
            function tick(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(target * eased);
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const diagram = document.getElementById('infra-diagram');
    if (diagram) observer.observe(diagram);
  }

  /* ---------- COUNT UP ---------- */

  function initCountUp() {
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;

    function animateStats() {
      statsBar.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
        } else {
          // Reset numbers when the stats bar leaves the viewport so that
          // the animation replays on the next entry.
          statsBar.querySelectorAll('.stat-number').forEach(el => {
            el.textContent = '0';
          });
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsBar);
  }

  /* ---------- SCROLL REVEAL ---------- */

  function checkScrollReveals() {
    document.querySelectorAll('.reveal-on-scroll:not(.revealed)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add('revealed');
      }
    });
  }

  function initScrollReveals() {
    window.addEventListener('scroll', checkScrollReveals, { passive: true });
    checkScrollReveals();
  }

  /* ---------- TIMELINE PROGRESSIVE REVEAL ---------- */

  function checkTimeline() {
    const timeline = document.getElementById('timeline');
    const progress = document.getElementById('timeline-progress');
    if (!timeline || !progress) return;

    const items = timeline.querySelectorAll('.timeline-item');
    if (!items.length) return;

    const section = timeline.closest('.timeline-section');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Mobile / small screens: fall back to per-item viewport reveal (vertical).
    if (isMobile || !section) {
      const viewportHeight = window.innerHeight;
      let lastRevealedOffset = 0;
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.75) {
          if (!item.classList.contains('revealed')) {
            item.style.transitionDelay = '0.15s';
            item.classList.add('revealed');
          }
          lastRevealedOffset = rect.bottom - timeline.getBoundingClientRect().top;
        }
      });
      progress.style.width = '';
      progress.style.height = Math.min(lastRevealedOffset, timeline.scrollHeight) + 'px';
      return;
    }

    // Desktop: horizontal timeline driven by scroll progress through the
    // sticky-pinned section. Each item appears as the user scrolls one
    // viewport further through the section.
    const sectionRect = section.getBoundingClientRect();
    const scrollableDistance = section.offsetHeight - window.innerHeight;
    const scrolled = Math.min(Math.max(-sectionRect.top, 0), scrollableDistance);
    const rawProgress = scrollableDistance > 0 ? scrolled / scrollableDistance : 0;

    // Reserve the first slice so only the first point is visible at the start,
    // then reveal the remaining items across the rest of the scroll range.
    const startThreshold = 0.08;
    const activeProgress = Math.max(0, (rawProgress - startThreshold) / (1 - startThreshold));
    const revealCount = 1 + Math.floor(activeProgress * items.length);

    items.forEach((item, index) => {
      if (index < revealCount) {
        if (!item.classList.contains('revealed')) {
          item.style.transitionDelay = (index === 0 ? 0 : 0.05) + 's';
          item.classList.add('revealed');
        }
      } else {
        item.classList.remove('revealed');
      }
    });

    // Horizontal progress line: stretches across revealed markers.
    const firstItem = items[0];
    const lastRevealed = items[Math.min(revealCount, items.length) - 1];
    if (firstItem && lastRevealed) {
      const timelineRect = timeline.getBoundingClientRect();
      const startRect = firstItem.getBoundingClientRect();
      const endRect = lastRevealed.getBoundingClientRect();
      const left = (startRect.left + startRect.width / 2) - timelineRect.left;
      const right = (endRect.left + endRect.width / 2) - timelineRect.left;
      progress.style.height = '';
      progress.style.left = left + 'px';
      progress.style.width = Math.max(0, right - left) + 'px';
    }
  }

  function initTimeline() {
    window.addEventListener('scroll', checkTimeline, { passive: true });
    window.addEventListener('resize', checkTimeline, { passive: true });
    checkTimeline();
  }

  /* ---------- JOIN PAGE — PARALLAX BACKGROUND & CARD REVEAL ---------- */

  function checkJoinCards() {
    const section = document.getElementById('join-benefits');
    if (!section) return;

    const cards = section.querySelectorAll('.join-card');
    const viewportHeight = window.innerHeight;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < viewportHeight * 0.8) {
        if (!card.classList.contains('revealed')) {
          card.style.transitionDelay = (index * 0.15) + 's';
          card.classList.add('revealed');
        }
      }
    });

    // Parallax: shift background opacity based on scroll
    const bg = document.getElementById('join-benefits-bg');
    const title = document.getElementById('join-title');
    if (!bg) return;

    const sectionRect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const scrolled = Math.max(0, -sectionRect.top);
    const progress = Math.min(scrolled / (sectionHeight * 0.6), 1);

    // Fade the dark background as user scrolls down
    bg.style.opacity = 1 - progress * 0.7;

    // Shift title color from dark (top cream bg) to light (bottom navy bg)
    if (title) {
      const r = Math.round(17 + progress * (255 - 17));
      const g = Math.round(24 + progress * (255 - 24));
      const b = Math.round(39 + progress * (255 - 39));
      title.style.color = `rgb(${r}, ${g}, ${b})`;
    }
  }

  function initJoinParallax() {
    window.addEventListener('scroll', checkJoinCards, { passive: true });
    checkJoinCards();
  }

  /* ---------- RESOURCES ---------- */

  function initResources() {
    const grid = document.getElementById('resources-grid');
    const noResults = document.getElementById('no-results');
    const countEl = document.getElementById('resources-count');
    const searchInput = document.getElementById('resources-search');
    const showMoreBtn = document.getElementById('resources-show-more');
    if (!grid) return;

    const PAGE_SIZE = 30;
    let activeType = 'all';
    let activeModality = 'all';
    let searchTerm = '';
    let visibleCount = PAGE_SIZE;

    const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

    function cardHtml(r) {
      const meta = [];
      if (r.params) meta.push(r.params + ' parameters');
      if (r.year) meta.push('Released ' + r.year);
      if (r.url) {
        return `
        <a class="resource-card" href="${escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer">
          <div class="resource-tags">
            <span class="resource-tag tag-${r.type}">${r.type}</span>
            <span class="resource-tag tag-${r.modality}">${r.modality}</span>
          </div>
          <h3>${escapeHtml(r.name)}</h3>
          <p>${escapeHtml(r.desc)}</p>
          <div class="resource-meta">${meta.join(' · ')}</div>
        </a>`;
      }
      return `
        <div class="resource-card">
          <div class="resource-tags">
            <span class="resource-tag tag-${r.type}">${r.type}</span>
            <span class="resource-tag tag-${r.modality}">${r.modality}</span>
          </div>
          <h3>${escapeHtml(r.name)}</h3>
          <p>${escapeHtml(r.desc)}</p>
          <div class="resource-meta">${meta.join(' · ')}</div>
        </div>`;
    }

    function renderResources() {
      const term = searchTerm.toLowerCase().trim();
      const filtered = resources.filter(r => {
        if (activeType !== 'all' && r.type !== activeType) return false;
        if (activeModality !== 'all' && r.modality !== activeModality) return false;
        if (term && !(r.name.toLowerCase().includes(term) || r.desc.toLowerCase().includes(term))) return false;
        return true;
      });

      if (countEl) {
        countEl.textContent = filtered.length + (filtered.length === 1 ? ' resource' : ' resources');
      }

      if (filtered.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        if (showMoreBtn) showMoreBtn.style.display = 'none';
        return;
      }

      if (noResults) noResults.style.display = 'none';
      const toShow = filtered.slice(0, visibleCount);
      grid.innerHTML = toShow.map(cardHtml).join('');

      if (showMoreBtn) {
        if (filtered.length > visibleCount) {
          showMoreBtn.style.display = '';
          showMoreBtn.textContent = 'Show more (' + (filtered.length - visibleCount) + ' remaining)';
        } else {
          showMoreBtn.style.display = 'none';
        }
      }
    }

    function setupFilters(containerId, setter) {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.addEventListener('click', e => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        setter(chip.dataset.filter);
        visibleCount = PAGE_SIZE;
        renderResources();
      });
    }

    setupFilters('filter-type', v => { activeType = v; });
    setupFilters('filter-modality', v => { activeModality = v; });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchTerm = searchInput.value;
        visibleCount = PAGE_SIZE;
        renderResources();
      });
    }

    if (showMoreBtn) {
      showMoreBtn.addEventListener('click', () => {
        visibleCount += PAGE_SIZE;
        renderResources();
      });
    }

    renderResources();
  }

  /* ---------- FAQ (multiple items can be open) ---------- */

  function initFaq() {
    const list = document.getElementById('faq-list');
    const searchInput = document.getElementById('faq-search');
    const noResults = document.getElementById('faq-no-results');
    if (!list) return;

    function renderFaq(filter) {
      const term = (filter || '').toLowerCase().trim();
      const filtered = faqData.filter(f =>
        !term || f.q.toLowerCase().includes(term) || f.a.toLowerCase().includes(term)
      );

      if (filtered.length === 0) {
        list.innerHTML = '';
        noResults.style.display = 'block';
        return;
      }

      noResults.style.display = 'none';
      list.innerHTML = filtered.map((f, i) => `
        <div class="faq-item" data-index="${i}">
          <button class="faq-question" type="button">
            <span>${f.q}</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">${f.a}</div>
          </div>
        </div>
      `).join('');
    }

    list.addEventListener('click', e => {
      const btn = e.target.closest('.faq-question');
      if (!btn) return;
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Toggle individually — no longer closes others
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => renderFaq(searchInput.value));
    }

    renderFaq('');
  }

  /* ---------- FORMS ---------- */

  function initForms() {
    // Newsletter
    const nlForm = document.getElementById('newsletter-form');
    if (nlForm) {
      nlForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = nlForm.querySelector('input[type="email"]').value;
        if (email) {
          nlForm.innerHTML = '<p style="font-weight:600;color:var(--accent);">Thank you! You have been subscribed.</p>';
        }
      });
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();

        // Honeypot check
        const honeypot = document.getElementById('contact-website');
        if (honeypot && honeypot.value) return;

        // Basic validation
        const name = document.getElementById('contact-name').value.trim();
        const org = document.getElementById('contact-org').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const interest = document.getElementById('contact-interest').value;
        const message = document.getElementById('contact-message').value.trim();

        if (!name || !org || !email || !interest || !message) return;

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }

        // In production, this would POST to a server endpoint
        const mailto = 'ai-open-lab@bsc.es';
        const subject = encodeURIComponent(`AI Open Lab Contact: ${interest}`);
        const body = encodeURIComponent(`Name: ${name}\nOrganization: ${org}\nEmail: ${email}\nRole: ${document.getElementById('contact-role').value}\nInterest: ${interest}\n\nMessage:\n${message}`);
        window.location.href = `mailto:${mailto}?subject=${subject}&body=${body}`;

        contactForm.reset();
        const btn = contactForm.querySelector('.btn-lg');
        btn.textContent = 'Message Sent!';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.disabled = false;
        }, 3000);
      });
    }
  }

})();
