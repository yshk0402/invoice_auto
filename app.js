(function () {
  const CATEGORY_OPTIONS = ["transportation", "meal", "supplies", "lodging", "communication", "other"];

  const TRANSLATIONS = {
    ja: {
      heroCopy: "スマホからレシートを送信し、Google Drive と Google スプレッドシートへ保存する PoC です。",
      logout: "ログアウト",
      statusIdle: "送信した内容は共有の Google Drive / Google スプレッドシートへ保存されます。",
      loginTitle: "ログイン",
      loginCopy: "社員ID とパスワードでログインします。",
      language: "表示言語",
      employeeId: "社員ID",
      password: "パスワード",
      loginSubmit: "ログイン",
      demoAccounts: "デモ用固定アカウント",
      cameraTitle: "Camera Scan",
      cameraCopy: "レシート画像を 1 枚選択して次へ進みます。",
      receiptImage: "レシート画像",
      previewCaption: "選択したレシート画像",
      back: "戻る",
      continue: "次へ",
      correctionTitle: "OCR Correction / Submit",
      correctionCopy: "OCR 補助値を確認し、必要に応じて修正して送信します。",
      ocrLoading: "OCR 補助をシミュレートしています...",
      date: "レシート日付",
      amount: "金額",
      merchant: "店名",
      category: "経費科目",
      payloadTitle: "送信データ",
      submitter: "送信者",
      languageLabel: "利用言語",
      imageRef: "保存ファイル",
      submit: "送信する",
      successTitle: "送信完了",
      successCopy: "Google Drive と Google スプレッドシートへの保存が完了しました。",
      latestSubmission: "保存されたデータ",
      submitAnother: "もう 1 件送る",
      loginError: "社員ID またはパスワードが正しくありません。",
      fileRequired: "レシート画像を選択してください。",
      submitSuccess: "提出データを保存しました。",
      serverError: "サーバー通信に失敗しました。",
      googleConfigMissing: "Google 連携の設定が不足しています:",
    },
    en: {
      heroCopy: "This PoC lets a smartphone user submit one receipt and saves it to Google Drive plus Google Sheets.",
      logout: "Log out",
      statusIdle: "Submitted data is saved to shared Google Drive and Google Sheets.",
      loginTitle: "Login",
      loginCopy: "Sign in with employee ID and password.",
      language: "Language",
      employeeId: "Employee ID",
      password: "Password",
      loginSubmit: "Sign in",
      demoAccounts: "Fixed demo accounts",
      cameraTitle: "Camera Scan",
      cameraCopy: "Choose one receipt image and continue.",
      receiptImage: "Receipt image",
      previewCaption: "Selected receipt image",
      back: "Back",
      continue: "Next",
      correctionTitle: "OCR Correction / Submit",
      correctionCopy: "Review the OCR draft, edit if needed, then submit.",
      ocrLoading: "Simulating OCR assistance...",
      date: "Receipt date",
      amount: "Amount",
      merchant: "Merchant",
      category: "Expense category",
      payloadTitle: "Submission payload",
      submitter: "Submitter",
      languageLabel: "Language",
      imageRef: "Saved file",
      submit: "Submit",
      successTitle: "Submitted",
      successCopy: "Saved to Google Drive and Google Sheets.",
      latestSubmission: "Saved payload",
      submitAnother: "Submit another",
      loginError: "Employee ID or password is incorrect.",
      fileRequired: "Choose a receipt image first.",
      submitSuccess: "Submission saved.",
      serverError: "Server request failed.",
      googleConfigMissing: "Google integration is missing configuration:",
    },
    zh: {
      heroCopy: "该 PoC 支持手机提交单张收据，并保存到 Google Drive 与 Google 表格。",
      logout: "退出登录",
      statusIdle: "提交数据会保存到共享的 Google Drive 和 Google 表格。",
      loginTitle: "登录",
      loginCopy: "使用员工ID和密码登录。",
      language: "语言",
      employeeId: "员工ID",
      password: "密码",
      loginSubmit: "登录",
      demoAccounts: "固定演示账号",
      cameraTitle: "拍摄收据",
      cameraCopy: "选择一张收据图片后继续。",
      receiptImage: "收据图片",
      previewCaption: "已选择的收据图片",
      back: "返回",
      continue: "下一步",
      correctionTitle: "OCR 修正 / 提交",
      correctionCopy: "确认 OCR 结果，必要时修改后提交。",
      ocrLoading: "正在模拟 OCR 辅助...",
      date: "收据日期",
      amount: "金额",
      merchant: "店名",
      category: "费用类别",
      payloadTitle: "提交数据",
      submitter: "提交者",
      languageLabel: "语言",
      imageRef: "保存文件",
      submit: "提交",
      successTitle: "提交完成",
      successCopy: "已完成 Google Drive 和 Google 表格保存。",
      latestSubmission: "已保存数据",
      submitAnother: "再提交一张",
      loginError: "员工ID或密码不正确。",
      fileRequired: "请先选择收据图片。",
      submitSuccess: "提交数据已保存。",
      serverError: "服务器请求失败。",
      googleConfigMissing: "Google 集成缺少以下配置：",
    },
    vi: {
      heroCopy: "PoC này cho phép người dùng trên điện thoại gửi một hóa đơn và lưu vào Google Drive cùng Google Sheets.",
      logout: "Đăng xuất",
      statusIdle: "Dữ liệu gửi sẽ được lưu vào Google Drive và Google Sheets dùng chung.",
      loginTitle: "Đăng nhập",
      loginCopy: "Đăng nhập bằng mã nhân viên và mật khẩu.",
      language: "Ngôn ngữ",
      employeeId: "Mã nhân viên",
      password: "Mật khẩu",
      loginSubmit: "Đăng nhập",
      demoAccounts: "Tài khoản demo cố định",
      cameraTitle: "Chụp hóa đơn",
      cameraCopy: "Chọn một ảnh hóa đơn rồi tiếp tục.",
      receiptImage: "Ảnh hóa đơn",
      previewCaption: "Ảnh hóa đơn đã chọn",
      back: "Quay lại",
      continue: "Tiếp tục",
      correctionTitle: "Sửa OCR / Gửi",
      correctionCopy: "Kiểm tra dữ liệu OCR, sửa nếu cần rồi gửi.",
      ocrLoading: "Đang mô phỏng OCR...",
      date: "Ngày hóa đơn",
      amount: "Số tiền",
      merchant: "Cửa hàng",
      category: "Loại chi phí",
      payloadTitle: "Dữ liệu gửi",
      submitter: "Người gửi",
      languageLabel: "Ngôn ngữ",
      imageRef: "Tệp đã lưu",
      submit: "Gửi",
      successTitle: "Đã gửi",
      successCopy: "Đã lưu vào Google Drive và Google Sheets.",
      latestSubmission: "Dữ liệu đã lưu",
      submitAnother: "Gửi thêm",
      loginError: "Mã nhân viên hoặc mật khẩu không đúng.",
      fileRequired: "Hãy chọn ảnh hóa đơn trước.",
      submitSuccess: "Đã lưu dữ liệu gửi.",
      serverError: "Yêu cầu tới máy chủ thất bại.",
      googleConfigMissing: "Thiếu cấu hình cho tích hợp Google:",
    },
  };

  const ui = {
    heroCopy: document.getElementById("hero-copy"),
    logoutButton: document.getElementById("logout-button"),
    statusBanner: document.getElementById("status-banner"),
    loginTitle: document.getElementById("login-title"),
    loginCopy: document.getElementById("login-copy"),
    languageLabel: document.getElementById("language-label"),
    languageSelect: document.getElementById("language-select"),
    employeeLabel: document.getElementById("employee-label"),
    employeeId: document.getElementById("employee-id"),
    passwordLabel: document.getElementById("password-label"),
    password: document.getElementById("password"),
    loginSubmit: document.getElementById("login-submit"),
    demoAccountTitle: document.getElementById("demo-account-title"),
    demoAccountList: document.getElementById("demo-account-list"),
    cameraTitle: document.getElementById("camera-title"),
    cameraCopy: document.getElementById("camera-copy"),
    receiptLabel: document.getElementById("receipt-label"),
    receiptFile: document.getElementById("receipt-file"),
    previewCard: document.getElementById("preview-card"),
    receiptPreview: document.getElementById("receipt-preview"),
    previewCaption: document.getElementById("preview-caption"),
    backToLogin: document.getElementById("back-to-login"),
    scanSubmit: document.getElementById("scan-submit"),
    correctionTitle: document.getElementById("correction-title"),
    correctionCopy: document.getElementById("correction-copy"),
    ocrLoading: document.getElementById("ocr-loading"),
    correctionForm: document.getElementById("correction-form"),
    dateLabel: document.getElementById("date-label"),
    dateField: document.getElementById("field-date"),
    amountLabel: document.getElementById("amount-label"),
    amountField: document.getElementById("field-amount"),
    merchantLabel: document.getElementById("merchant-label"),
    merchantField: document.getElementById("field-merchant"),
    categoryLabel: document.getElementById("category-label"),
    categoryField: document.getElementById("field-category"),
    payloadTitle: document.getElementById("payload-title"),
    summarySubmitterLabel: document.getElementById("summary-submitter-label"),
    summarySubmitter: document.getElementById("summary-submitter"),
    summaryLanguageLabel: document.getElementById("summary-language-label"),
    summaryLanguage: document.getElementById("summary-language"),
    summaryImageLabel: document.getElementById("summary-image-label"),
    summaryImage: document.getElementById("summary-image"),
    backToCamera: document.getElementById("back-to-camera"),
    submitReceipt: document.getElementById("submit-receipt"),
    successTitle: document.getElementById("success-title"),
    successCopy: document.getElementById("success-copy"),
    latestSubmissionTitle: document.getElementById("latest-submission-title"),
    latestSubmission: document.getElementById("latest-submission"),
    submitAnother: document.getElementById("submit-another"),
    screens: {
      login: document.getElementById("screen-login"),
      camera: document.getElementById("screen-camera"),
      correction: document.getElementById("screen-correction"),
      success: document.getElementById("screen-success"),
    },
  };

  const state = {
    language: detectInitialLanguage(),
    currentUser: null,
    selectedFile: null,
    selectedImageUrl: "",
    latestSubmission: null,
    googleSync: null,
    users: [],
  };

  function detectInitialLanguage() {
    const browserLang = navigator.language.slice(0, 2);
    return ["ja", "en", "zh", "vi"].includes(browserLang) ? browserLang : "ja";
  }

  function t(key) {
    return TRANSLATIONS[state.language][key];
  }

  function setStatus(message, kind) {
    ui.statusBanner.textContent = message;
    ui.statusBanner.classList.toggle("error", kind === "error");
  }

  function refreshStatus() {
    if (state.googleSync && !state.googleSync.ready) {
      setStatus(`${t("googleConfigMissing")} ${state.googleSync.missing.join(", ")}`, "error");
      return;
    }

    setStatus(t("statusIdle"));
  }

  function showScreen(name) {
    Object.entries(ui.screens).forEach(([screenName, element]) => {
      element.classList.toggle("hidden", screenName !== name);
    });
  }

  function revokeSelectedImage() {
    if (state.selectedImageUrl) {
      URL.revokeObjectURL(state.selectedImageUrl);
      state.selectedImageUrl = "";
    }
  }

  function renderLanguageOptions() {
    ui.languageSelect.innerHTML = "";
    [
      ["ja", "日本語"],
      ["en", "English"],
      ["zh", "中文"],
      ["vi", "Tiếng Việt"],
    ].forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      ui.languageSelect.appendChild(option);
    });
    ui.languageSelect.value = state.language;
  }

  function renderCategoryOptions() {
    ui.categoryField.innerHTML = "";
    CATEGORY_OPTIONS.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      ui.categoryField.appendChild(option);
    });
  }

  function renderAccounts() {
    ui.demoAccountList.innerHTML = "";
    state.users.forEach((user) => {
      const item = document.createElement("li");
      item.textContent = `${user.employee_id} / ${user.password} (${user.preferred_language})`;
      ui.demoAccountList.appendChild(item);
    });
  }

  function renderStaticText() {
    ui.heroCopy.textContent = t("heroCopy");
    ui.logoutButton.textContent = t("logout");
    ui.loginTitle.textContent = t("loginTitle");
    ui.loginCopy.textContent = t("loginCopy");
    ui.languageLabel.textContent = t("language");
    ui.employeeLabel.textContent = t("employeeId");
    ui.passwordLabel.textContent = t("password");
    ui.loginSubmit.textContent = t("loginSubmit");
    ui.demoAccountTitle.textContent = t("demoAccounts");
    ui.cameraTitle.textContent = t("cameraTitle");
    ui.cameraCopy.textContent = t("cameraCopy");
    ui.receiptLabel.textContent = t("receiptImage");
    ui.previewCaption.textContent = t("previewCaption");
    ui.backToLogin.textContent = t("back");
    ui.scanSubmit.textContent = t("continue");
    ui.correctionTitle.textContent = t("correctionTitle");
    ui.correctionCopy.textContent = t("correctionCopy");
    ui.ocrLoading.textContent = t("ocrLoading");
    ui.dateLabel.textContent = t("date");
    ui.amountLabel.textContent = t("amount");
    ui.merchantLabel.textContent = t("merchant");
    ui.categoryLabel.textContent = t("category");
    ui.payloadTitle.textContent = t("payloadTitle");
    ui.summarySubmitterLabel.textContent = t("submitter");
    ui.summaryLanguageLabel.textContent = t("languageLabel");
    ui.summaryImageLabel.textContent = t("imageRef");
    ui.backToCamera.textContent = t("back");
    ui.submitReceipt.textContent = t("submit");
    ui.successTitle.textContent = t("successTitle");
    ui.successCopy.textContent = t("successCopy");
    ui.latestSubmissionTitle.textContent = t("latestSubmission");
    ui.submitAnother.textContent = t("submitAnother");
  }

  function receiptImageSummary(receiptImage) {
    if (!receiptImage) return "-";
    if (typeof receiptImage === "string") return receiptImage;
    return receiptImage.view_url || receiptImage.file_name || receiptImage.file_id || "-";
  }

  function syncCorrectionSummary(receiptImage) {
    if (!state.currentUser) return;
    ui.summarySubmitter.textContent = state.currentUser.employee_id;
    ui.summaryLanguage.textContent = state.language;
    ui.summaryImage.textContent = receiptImageSummary(receiptImage || (state.selectedFile ? state.selectedFile.name : ""));
  }

  function renderLatestSubmission() {
    ui.latestSubmission.textContent = state.latestSubmission
      ? JSON.stringify(state.latestSubmission, null, 2)
      : "{}";
  }

  function resetFlow(keepUser) {
    state.selectedFile = null;
    revokeSelectedImage();
    ui.receiptFile.value = "";
    ui.previewCard.classList.add("hidden");
    ui.scanSubmit.disabled = true;
    ui.correctionForm.reset();
    ui.correctionForm.classList.add("hidden");
    ui.ocrLoading.classList.add("hidden");
    if (!keepUser) {
      state.currentUser = null;
      ui.logoutButton.classList.add("hidden");
      ui.employeeId.value = "";
      ui.password.value = "";
      showScreen("login");
    } else {
      showScreen("camera");
    }
  }

  function mockOcr(file) {
    const seed = (file.name + file.size).split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const sampleDates = ["2026-03-01", "2026-03-03", "2026-03-05", "2026-03-08", "2026-03-10"];
    const merchants = ["FamilyMart", "7-Eleven", "APA Hotel", "JR East", "Docomo Shop"];
    return {
      date: sampleDates[seed % sampleDates.length],
      amount: (seed % 8500) + 500,
      merchant: merchants[seed % merchants.length],
      expense_category: CATEGORY_OPTIONS[seed % CATEGORY_OPTIONS.length],
    };
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("file_read_failed"));
      reader.readAsDataURL(file);
    });
  }

  async function fetchJson(url, options) {
    const response = await fetch(url, options);
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "request_failed");
    }
    return payload;
  }

  ui.languageSelect.addEventListener("change", (event) => {
    state.language = event.target.value;
    renderStaticText();
    refreshStatus();
  });

  document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const result = await fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: ui.employeeId.value.trim(),
          password: ui.password.value,
        }),
      });
      state.currentUser = result.user;
      ui.logoutButton.classList.remove("hidden");
      refreshStatus();
      showScreen("camera");
    } catch (error) {
      setStatus(error.message === "invalid_credentials" ? t("loginError") : t("serverError"), "error");
    }
  });

  ui.receiptFile.addEventListener("change", (event) => {
    const [file] = event.target.files || [];
    state.selectedFile = file || null;
    revokeSelectedImage();
    if (!file) {
      ui.previewCard.classList.add("hidden");
      ui.scanSubmit.disabled = true;
      return;
    }
    state.selectedImageUrl = URL.createObjectURL(file);
    ui.receiptPreview.src = state.selectedImageUrl;
    ui.receiptPreview.alt = file.name;
    ui.previewCard.classList.remove("hidden");
    ui.scanSubmit.disabled = false;
  });

  document.getElementById("camera-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.selectedFile) {
      setStatus(t("fileRequired"), "error");
      return;
    }
    showScreen("correction");
    ui.ocrLoading.classList.remove("hidden");
    setStatus(t("ocrLoading"));
    await new Promise((resolve) => setTimeout(resolve, 900));
    const draft = mockOcr(state.selectedFile);
    ui.dateField.value = draft.date;
    ui.amountField.value = draft.amount;
    ui.merchantField.value = draft.merchant;
    ui.categoryField.value = draft.expense_category;
    syncCorrectionSummary(state.selectedFile.name);
    ui.ocrLoading.classList.add("hidden");
    ui.correctionForm.classList.remove("hidden");
    refreshStatus();
  });

  ui.correctionForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.currentUser || !state.selectedFile) return;
    try {
      const imageDataUrl = await readFileAsDataUrl(state.selectedFile);
      const result = await fetchJson("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: ui.dateField.value,
          amount: Number(ui.amountField.value),
          merchant: ui.merchantField.value.trim(),
          expense_category: ui.categoryField.value,
          submitter: state.currentUser.employee_id,
          language: state.language,
          receiptFileName: state.selectedFile.name,
          receiptMimeType: state.selectedFile.type || "image/jpeg",
          receiptDataUrl: imageDataUrl,
        }),
      });
      state.latestSubmission = result.submission;
      syncCorrectionSummary(result.submission.receipt_image);
      renderLatestSubmission();
      showScreen("success");
      setStatus(t("submitSuccess"));
    } catch {
      setStatus(t("serverError"), "error");
    }
  });

  ui.backToLogin.addEventListener("click", () => {
    resetFlow(false);
    refreshStatus();
  });

  ui.backToCamera.addEventListener("click", () => {
    showScreen("camera");
    refreshStatus();
  });

  ui.submitAnother.addEventListener("click", () => {
    resetFlow(true);
    refreshStatus();
  });

  ui.logoutButton.addEventListener("click", () => {
    resetFlow(false);
    refreshStatus();
  });

  async function bootstrap() {
    try {
      const result = await fetchJson("/api/bootstrap");
      state.users = result.users;
      state.googleSync = result.googleSync || null;
      renderLanguageOptions();
      renderCategoryOptions();
      renderAccounts();
      renderStaticText();
      renderLatestSubmission();
      refreshStatus();
    } catch {
      renderLanguageOptions();
      renderCategoryOptions();
      renderStaticText();
      setStatus(t("serverError"), "error");
    }
  }

  bootstrap();
})();
