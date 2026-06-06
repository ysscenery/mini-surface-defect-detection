import { useState } from "react";
import "./App.css";

function App() {
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [threshold, setThreshold] = useState("");
  const [results, setResults] = useState([]);

  const handleStart = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/detect"
      );

      const data = await response.json();

      setResults(data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setProductName("");
    setProductId("");
    setThreshold("");
    setResults([]);
  };

  const handleReport = () => {

    const filteredResults = results.filter(
      item =>
        item.confidence >= (parseFloat(threshold) || 0)
    );

    const report = {
      product_name: productName,
      product_id: productId,
      threshold: threshold,
      results: filteredResults
    };

    const blob = new Blob(
      [JSON.stringify(report, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "surface_defect_report.json";

    a.click();

    URL.revokeObjectURL(url);
  };

  const filteredResults = results.filter(
    item =>
      item.confidence >= (parseFloat(threshold) || 0)
  );

  return (
    <div className="container">

      <div className="card">

        <h1 className="title">
          Mini Surface Defect Detection
        </h1>

        <div className="form-group">
          <label>Ürün Adı</label>
          <input
            value={productName}
            onChange={(e) =>
              setProductName(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Ürün ID</label>
          <input
            value={productId}
            onChange={(e) =>
              setProductId(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Eşik Değeri</label>
          <input
            value={threshold}
            onChange={(e) =>
              setThreshold(e.target.value)
            }
          />
        </div>

        <div className="button-group">

          <button
            onClick={handleStart}
            style={{ backgroundColor: "#2e7d32" }}
          >
            Başlat
          </button>

          <button
            onClick={handleReset}
            style={{ backgroundColor: "#ef6c00" }}
          >
            Resetle
          </button>

          <button
            onClick={handleReport}
            style={{ backgroundColor: "#1565c0" }}
          >
            Rapor Oluştur
          </button>

        </div>

      </div>

      <div className="card results-card">

        <h2>Sonuçlar</h2>

        <h3>
          Toplam Hata Sayısı: {filteredResults.length}
        </h3>

        <table>
          <thead>
            <tr>
              <th>Hata Tipi</th>
              <th>Güven Skoru</th>
            </tr>
          </thead>

          <tbody>
            {filteredResults.map((item, index) => (
              <tr key={index}>
                <td>{item.defect_type}</td>
                <td>{item.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default App;