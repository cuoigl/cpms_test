// Hàm chờ cho đến khi điều kiện được đáp ứng hoặc hết thời gian timeout
async function waitUntil(conditionFunction, timeout, errorMessage) {
  const startTime = new Date().getTime();
  while (new Date().getTime() - startTime < timeout) {
    if (await conditionFunction()) {
      return true;
    }
  }
  throw new Error(errorMessage || "WaitUntil timeout exceeded");
}

describe("Login Test", () => {
  it("should login", async () => {
    // Mở trang web và đợi cho trang tải xong
    await browser.url(
      "https://personal-puta3n4i.outsystemscloud.com/CPMS/Login"
    );
    await waitUntil(
      async () =>
        (await browser.execute(() => document.readyState)) === "complete",
      200000,
      "Page did not load completely within 20 seconds"
    );

    // Điền thông tin đăng nhập và click vào nút đăng nhập
    await (await $("#Input_UsernameVal")).setValue("dinocpms@gmail.com");
    await (await $("#Input_PasswordVal")).setValue("dino3720");
    await (await $('button[type="button"]')).click();

    // Chờ cho đến khi trang chuyển hướng và tải xong
    await waitUntil(
      async () =>
        (await browser.getUrl()) !==
        "https://personal-puta3n4i.outsystemscloud.com/CPMS/",
      200000,
      "Login failed. Not redirected to the expected page."
    );
    await waitUntil(
      async () =>
        (await browser.execute(() => document.readyState)) === "complete",
      300000,
      "Page did not load completely within 30 seconds"
    );
  });
  async function scroll() {
    await browser.execute(() => {
      window.scrollBy(0, window.innerHeight);
    });
  }
  it("should in main page and click go to system", async () => {
    await waitUntil(
      async () =>
        (await browser.execute(() => document.readyState)) === "complete",
      400000,
      "Page did not load completely within 10 seconds"
    );
    await scroll();
    // Click Go to system
    await (await $("#b8-Button")).click();
    await waitUntil(
      async () =>
        (await browser.getUrl()) !==
        "https://personal-puta3n4i.outsystemscloud.com/CPMS/",
      400000,
      "Login failed. Not redirected to the expected page."
    );
    await waitUntil(
      async () =>
        (await browser.execute(() => document.readyState)) === "complete",
      400000,
      "Page did not load completely within 30 seconds"
    );
  });

  it("Shoul do admin job", async () => {
    await waitUntil(
      async () =>
        (await browser.execute(() => document.readyState)) === "complete",
      400000,
      "Page did not load completely within 10 seconds"
    );
    // Click
    await (await $('button[type="button"]')).click();
    await waitUntil(
      async () =>
        (await browser.getUrl()) !==
        "https://personal-puta3n4i.outsystemscloud.com/CPMS/",
      400000,
      "Login failed. Not redirected to the expected page."
    );
    await waitUntil(
      async () =>
        (await browser.execute(() => document.readyState)) === "complete",
      400000,
      "Page did not load completely within 30 seconds"
    );
    await browser.url(
      " https://personal-puta3n4i.outsystemscloud.com/CPMS/AccountManagement"
    );
    await waitUntil(
      async () =>
        (await browser.execute(() => document.readyState)) === "complete",
      400000,
      "Page did not load completely within 10 seconds"
    );
    await (await $(".btn")).click();
    await (await $(".padding-left-m")).click();
    await waitUntil(
      async () =>
        (await browser.execute(() => document.readyState)) === "complete",
      400000,
      "Page did not load completely within 10 seconds"
    );
    await waitUntil(
      async () => $("#CreateOrUpdateAccount").isExisting(),
      600000,
      'Element with ID "CreateOrUpdateAccount" did not appear within 20 seconds'
    );
    await (await $("#b6-Input_Email")).setValue("tiennvde140153@fpt.edu.vn");
    await (await $("#b6-Input_Name")).setValue("Tien");
    await (await $("#b6-Input_MemberCode")).setValue("DE140153");
    await waitUntil(
      async () => $("#b6-Input_MemberCode").isExisting(),
      600000,
      'Element with ID "Input_MemberCode" did not appear within 20 seconds'
    );
    await (await $('button[type="submit"]')).click();
  });
});
