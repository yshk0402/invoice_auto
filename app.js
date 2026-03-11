(function () {
  const DEMO_USERS = [
    { employee_id: "id1", password: "pass1", user_name: "Demo User 1", role: "Employee", preferred_language: "ja", active: "true" },
    { employee_id: "id2", password: "pass2", user_name: "Demo User 2", role: "Employee", preferred_language: "en", active: "true" },
    { employee_id: "id3", password: "pass3", user_name: "Demo User 3", role: "ForeignWorker", preferred_language: "zh", active: "true" },
    { employee_id: "id4", password: "pass4", user_name: "Demo User 4", role: "ForeignWorker", preferred_language: "vi", active: "true" },
    { employee_id: "id5", password: "pass5", user_name: "Demo User 5", role: "Employee", preferred_language: "ja", active: "true" },
  ].map((user) => ({ ...user, sheet_tab_name: `USER_${user.employee_id}` }));

  const CATEGORY_OPTIONS = ["transportation", "meal", "supplies", "lodging", "communication", "other"];

  const TRANSLATIONS = {
    ja: {
      heroCopy: "確定済み要件だけで組んだ PoC デモです。認証は固定アカウント、OCR と Google 連携はモック/参照情報として扱います。",
      logout: "ログアウト",
      statusIdle: "デモはブラウザ内に保存されます。Drive / Sheets 本連携はまだ行いません。",
      loginTitle: "ログイン",
      loginCopy: "社員ID とパスワードでログインし、撮影フローへ進みます。",
      language: "表示言語",
      employeeId: "社員ID",
      password: "パスワード",
      loginSubmit: "ログイン",
      demoAccounts: "PoC 固定アカウント",
      cameraTitle: "Camera Scan",
      cameraCopy: "レシートを 1 枚選択すると、OCR 補助付きの確認画面へ進みます。",
      receiptImage: "レシート画像",
      previewCaption: "選択したレシート画像",
      back: "戻る",
      continue: "OCR 補助へ進む",
      correctionTitle: "OCR Correction / Submit",
      correctionCopy: "OCR の抽出値を確認し、必要なら修正して送信します。",
      ocrLoading: "OCR 補助をシミュレートしています...",
      date: "レシート日付",
      amount: "金額",
      merchant: "店名",
      category: "経費科目",
      payloadTitle: "送信に含まれる契約項目",
      submitter: "送信者",
      languageLabel: "利用言語",
      imageRef: "画像参照",
      submit: "送信する",
      successTitle: "送信完了",
      successCopy: "レシート 1 件の提出データを生成しました。",
      latestSubmission: "最新提出データ",
      submitAnother: "もう 1 件送る",
      resetDemo: "デモ初期化",
      inspectorCopy: "この領域は製品画面ではなく、Google スプレッドシートへ渡す想定データの PoC 表示です。",
      userTabTitle: "Per-user Sheet Tab",
      loginError: "社員ID またはパスワードが正しくありません。",
      fileRequired: "レシート画像を選択してください。",
      submitSuccess: "提出データを保存しました。",
      emptyState: "まだ提出データはありません。",
    },
    en: {
      heroCopy: "This PoC demo is built only from confirmed requirements. Auth uses fixed accounts, while OCR and Google integrations remain mocked/reference-based.",
      logout: "Log out",
      statusIdle: "Demo data stays in this browser. Drive / Sheets are not actually connected yet.",
      loginTitle: "Login",
      loginCopy: "Sign in with employee ID and password to start the capture flow.",
      language: "Language",
      employeeId: "Employee ID",
      password: "Password",
      loginSubmit: "Sign in",
      demoAccounts: "PoC demo accounts",
      cameraTitle: "Camera Scan",
      cameraCopy: "Choose one receipt image to move to the OCR-assisted review screen.",
      receiptImage: "Receipt image",
      previewCaption: "Selected receipt image",
      back: "Back",
      continue: "Continue to OCR review",
      correctionTitle: "OCR Correction / Submit",
      correctionCopy: "Review the OCR suggestion, edit if needed, then submit one receipt.",
      ocrLoading: "Simulating OCR assistance...",
      date: "Receipt date",
      amount: "Amount",
      merchant: "Merchant",
      category: "Expense category",
      payloadTitle: "Submission contract fields",
      submitter: "Submitter",
      languageLabel: "Language",
      imageRef: "Image reference",
      submit: "Submit receipt",
      successTitle: "Submitted",
      successCopy: "One receipt submission record was created.",
      latestSubmission: "Latest submission payload",
      submitAnother: "Submit another receipt",
      resetDemo: "Reset demo",
      inspectorCopy: "This panel is not a product admin UI. It is a PoC view of the data intended for Google Sheets.",
      userTabTitle: "Per-user Sheet Tab",
      loginError: "Employee ID or password is incorrect.",
      fileRequired: "Choose a receipt image first.",
      submitSuccess: "Submission payload saved.",
      emptyState: "No submissions yet.",
    },
    zh: {
      heroCopy: "该 PoC 演示仅基于已确认需求。认证使用固定账号，OCR 和 Google 集成仍为模拟/引用信息。",
      logout: "退出登录",
      statusIdle: "演示数据只保存在当前浏览器。尚未真正连接 Drive / Sheets。",
      loginTitle: "登录",
      loginCopy: "使用员工 ID 和密码登录后进入拍摄流程。",
      language: "语言",
      employeeId: "员工ID",
      password: "密码",
      loginSubmit: "登录",
      demoAccounts: "PoC 固定账号",
      cameraTitle: "拍摄收据",
      cameraCopy: "选择一张收据图片后进入 OCR 辅助确认页面。",
      receiptImage: "收据图片",
      previewCaption: "已选择的收据图片",
      back: "返回",
      continue: "进入 OCR 确认",
      correctionTitle: "OCR 修正与提交",
      correctionCopy: "确认 OCR 结果，必要时修改后提交单张收据。",
      ocrLoading: "正在模拟 OCR 辅助...",
      date: "收据日期",
      amount: "金额",
      merchant: "店名",
      category: "费用类别",
      payloadTitle: "提交数据字段",
      submitter: "提交者",
      languageLabel: "语言",
      imageRef: "图片引用",
      submit: "提交",
      successTitle: "提交完成",
      successCopy: "已生成 1 条收据提交数据。",
      latestSubmission: "最新提交数据",
      submitAnother: "再提交一张",
      resetDemo: "重置演示",
      inspectorCopy: "此区域不是产品后台界面，而是面向 Google Sheets 的 PoC 数据预览。",
      userTabTitle: "用户 Sheet 标签页",
      loginError: "员工ID或密码不正确。",
      fileRequired: "请先选择收据图片。",
      submitSuccess: "提交数据已保存。",
      emptyState: "还没有提交数据。",
    },
    vi: {
      heroCopy: "Demo PoC này chỉ dùng các yêu cầu đã chốt. Xác thực dùng tài khoản cố định, còn OCR và tích hợp Google hiện ở dạng mô phỏng/tham chiếu.",
      logout: "Đăng xuất",
      statusIdle: "Dữ liệu demo chỉ lưu trong trình duyệt này. Drive / Sheets chưa được kết nối thật.",
      loginTitle: "Đăng nhập",
      loginCopy: "Đăng nhập bằng mã nhân viên và mật khẩu để bắt đầu luồng chụp hóa đơn.",
      language: "Ngôn ngữ",
      employeeId: "Mã nhân viên",
      password: "Mật khẩu",
      loginSubmit: "Đăng nhập",
      demoAccounts: "Tài khoản PoC cố định",
      cameraTitle: "Chụp hóa đơn",
      cameraCopy: "Chọn một ảnh hóa đơn để sang màn hình kiểm tra có hỗ trợ OCR.",
      receiptImage: "Ảnh hóa đơn",
      previewCaption: "Ảnh hóa đơn đã chọn",
      back: "Quay lại",
      continue: "Tiếp tục tới màn hình OCR",
      correctionTitle: "Sửa OCR / Gửi",
      correctionCopy: "Kiểm tra kết quả OCR, sửa nếu cần rồi gửi từng hóa đơn một.",
      ocrLoading: "Đang mô phỏng hỗ trợ OCR...",
      date: "Ngày hóa đơn",
      amount: "Số tiền",
      merchant: "Cửa hàng",
      category: "Loại chi phí",
      payloadTitle: "Trường dữ liệu gửi đi",
      submitter: "Người gửi",
      languageLabel: "Ngôn ngữ",
      imageRef: "Tham chiếu ảnh",
      submit: "Gửi hóa đơn",
      successTitle: "Đã gửi",
      successCopy: "Đã tạo 1 bản ghi gửi hóa đơn.",
      latestSubmission: "Dữ liệu gửi mới nhất",
      submitAnother: "Gửi thêm",
      resetDemo: "Đặt lại demo",
      inspectorCopy: "Khu vực này không phải màn hình quản trị sản phẩm mà là bản xem PoC dữ liệu dự kiến đưa vào Google Sheets.",
      userTabTitle: "Per-user Sheet Tab",
      loginError: "Mã nhân viên hoặc mật khẩu không đúng.",
      fileRequired: "Hãy chọn ảnh hóa đơn trước.",
      submitSuccess: "Đã lưu dữ liệu gửi.",
      emptyState: "Chưa có dữ liệu gửi nào.",
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
    resetDemo: document.getElementById("reset-demo"),
    inspectorCopy: document.getElementById("inspector-copy"),
    userTabTitle: document.getElementById("user-tab-title"),
    masterSheetBody: document.getElementById("master-sheet-body"),
    userSheetBody: document.getElementById("user-sheet-body"),
    screens: {
      login: document.getElementById("screen-login"),
      camera: document.getElementById("screen-camera"),
      correction: document.getElementById("screen-correction"),
      success: document.getElementById("screen-success"),
    },
  };

  const state = {
    language: detectInitialLanguage(),
    currentScreen: "login",
    currentUser: null,
    selectedFile: null,
    selectedImageUrl: "",
    ocrDraft: null,
    submissions: loadSubmissions(),
  };

  function detectInitialLanguage() {
    const browserLang = navigator.language.slice(0, 2);
    return ["ja", "en", "zh", "vi"].includes(browserLang) ? browserLang : "ja";
  }

  function loadSubmissions() {
    try {
      return JSON.parse(localStorage.getItem("invoice-auto-demo-submissions") || "[]");
    } catch {
      return [];
    }
  }

  function saveSubmissions() {
    localStorage.setItem("invoice-auto-demo-submissions", JSON.stringify(state.submissions));
  }

  function t(key) {
    return TRANSLATIONS[state.language][key];
  }

  function setStatus(message, kind) {
    ui.statusBanner.textContent = message;
    ui.statusBanner.classList.toggle("error", kind === "error");
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

  function renderStaticText() {
    ui.heroCopy.textContent = t("heroCopy");
    ui.logoutButton.textContent = state.currentUser ? t("logout") : "";
    ui.logoutButton.classList.toggle("hidden", !state.currentUser);
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
    ui.resetDemo.textContent = t("resetDemo");
    ui.inspectorCopy.textContent = t("inspectorCopy");
    ui.userTabTitle.textContent = state.currentUser
      ? `${t("userTabTitle")}: USER_${state.currentUser.employee_id}`
      : `${t("userTabTitle")}: USER_id1`;
  }

  function renderAccounts() {
    ui.demoAccountList.innerHTML = "";
    DEMO_USERS.forEach((user) => {
      const item = document.createElement("li");
      item.textContent = `${user.employee_id} / ${user.password} (${user.preferred_language})`;
      ui.demoAccountList.appendChild(item);
    });
  }

  function renderMasterSheet() {
    ui.masterSheetBody.innerHTML = "";
    DEMO_USERS.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.employee_id}</td>
        <td>${user.user_name}</td>
        <td>${user.role}</td>
        <td>${user.preferred_language}</td>
        <td>${user.sheet_tab_name}</td>
        <td>${user.active}</td>
      `;
      ui.masterSheetBody.appendChild(row);
    });
  }

  function renderUserSheet() {
    ui.userSheetBody.innerHTML = "";
    const employeeId = state.currentUser ? state.currentUser.employee_id : "id1";
    const rows = state.submissions.filter((item) => item.submitter === employeeId);

    if (!rows.length) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="8">${t("emptyState")}</td>`;
      ui.userSheetBody.appendChild(row);
      return;
    }

    rows
      .slice()
      .reverse()
      .forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.submitted_at}</td>
          <td>${item.date}</td>
          <td>${item.merchant}</td>
          <td>${item.amount}</td>
          <td>${item.expense_category}</td>
          <td>${item.receipt_image}</td>
          <td>${item.submitter}</td>
          <td>${item.language}</td>
        `;
        ui.userSheetBody.appendChild(row);
      });
  }

  function showScreen(name) {
    state.currentScreen = name;
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

  function resetFlow(keepUser) {
    state.selectedFile = null;
    state.ocrDraft = null;
    revokeSelectedImage();
    ui.receiptFile.value = "";
    ui.previewCard.classList.add("hidden");
    ui.scanSubmit.disabled = true;
    ui.correctionForm?.reset?.();
    if (!keepUser) {
      state.currentUser = null;
      showScreen("login");
    } else {
      showScreen("camera");
    }
    renderStaticText();
    renderUserSheet();
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

  function syncCorrectionSummary() {
    if (!state.currentUser) return;
    ui.summarySubmitter.textContent = state.currentUser.employee_id;
    ui.summaryLanguage.textContent = state.language;
    ui.summaryImage.textContent = state.selectedFile
      ? `Google Drive / shared-folder / ${state.selectedFile.name}`
      : "-";
  }

  function renderLatestSubmission() {
    const latest = state.submissions[state.submissions.length - 1];
    ui.latestSubmission.textContent = latest ? JSON.stringify(latest, null, 2) : "{}";
  }

  ui.languageSelect.addEventListener("change", (event) => {
    state.language = event.target.value;
    renderStaticText();
    renderUserSheet();
    setStatus(t("statusIdle"));
  });

  document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const found = DEMO_USERS.find(
      (user) =>
        user.employee_id === ui.employeeId.value.trim() &&
        user.password === ui.password.value
    );

    if (!found) {
      setStatus(t("loginError"), "error");
      return;
    }

    state.currentUser = found;
    state.language = state.language || found.preferred_language;
    renderStaticText();
    renderUserSheet();
    setStatus(t("statusIdle"));
    showScreen("camera");
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
    document.getElementById("correction-form").classList.add("hidden");
    setStatus(t("ocrLoading"));

    await new Promise((resolve) => setTimeout(resolve, 900));
    state.ocrDraft = mockOcr(state.selectedFile);
    ui.dateField.value = state.ocrDraft.date;
    ui.amountField.value = state.ocrDraft.amount;
    ui.merchantField.value = state.ocrDraft.merchant;
    ui.categoryField.value = state.ocrDraft.expense_category;
    syncCorrectionSummary();
    ui.ocrLoading.classList.add("hidden");
    document.getElementById("correction-form").classList.remove("hidden");
    setStatus(t("statusIdle"));
  });

  document.getElementById("correction-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!state.currentUser || !state.selectedFile) return;

    const submission = {
      date: ui.dateField.value,
      amount: Number(ui.amountField.value),
      merchant: ui.merchantField.value.trim(),
      expense_category: ui.categoryField.value,
      receipt_image: `Google Drive / shared-folder / ${state.selectedFile.name}`,
      submitter: state.currentUser.employee_id,
      submitted_at: new Date().toISOString(),
      language: state.language,
    };

    state.submissions.push(submission);
    saveSubmissions();
    renderLatestSubmission();
    renderUserSheet();
    showScreen("success");
    setStatus(t("submitSuccess"));
  });

  ui.backToLogin.addEventListener("click", () => {
    resetFlow(false);
    ui.password.value = "";
    ui.employeeId.focus();
  });

  ui.backToCamera.addEventListener("click", () => {
    showScreen("camera");
    setStatus(t("statusIdle"));
  });

  ui.submitAnother.addEventListener("click", () => {
    resetFlow(true);
    setStatus(t("statusIdle"));
  });

  ui.logoutButton.addEventListener("click", () => {
    ui.employeeId.value = "";
    ui.password.value = "";
    resetFlow(false);
    setStatus(t("statusIdle"));
  });

  ui.resetDemo.addEventListener("click", () => {
    localStorage.removeItem("invoice-auto-demo-submissions");
    state.submissions = [];
    renderLatestSubmission();
    renderUserSheet();
    setStatus(t("statusIdle"));
  });

  renderLanguageOptions();
  renderCategoryOptions();
  renderAccounts();
  renderMasterSheet();
  renderLatestSubmission();
  renderStaticText();
  renderUserSheet();
  setStatus(t("statusIdle"));
})();
