export default function HomePage() {
  return (
    <main className="home-container">
      <h1 className="home-title">💸 Harcama Takip Uygulaması</h1>

      <p className="home-subtitle">Hoş geldin! 👋 Aşağıdan harcama listene ulaşabilirsin.</p>

      <div className="home-card">
        <h2 className="home-card-title">Harcama Listesi</h2>
        <p className="home-card-text">
          Geçmiş harcamalarını görüntüle, düzenle veya yenisini ekle.
        </p>
        
        
        <a href="/expenses" className="home-link">
          Listeye Git →
        </a>
      </div>
    </main>
  );
}