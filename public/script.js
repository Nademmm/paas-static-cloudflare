document.addEventListener("DOMContentLoaded", () => {
  const btnCek = document.querySelector("#cek");
  const pHasil = document.querySelector("#hasil");

  if (btnCek && pHasil) {
    btnCek.addEventListener("click", () => {
      const now = new Date().toLocaleTimeString("id-ID");
      pHasil.textContent = `✓ JavaScript berhasil berjalan di browser pada ${now}. Deploy Cloudflare Workers Aktif!`;
      pHasil.classList.add("success-flash");
    });
  }
});
