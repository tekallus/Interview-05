import React, { useState } from "react";


// Modal bileşeni
// Modal bileşeni
function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-75"
        onClick={onClose} // Add onClick to close on backdrop click
      ></div>
      <div className="modal-container bg-white w-1/2 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          {children}
          <button
            className="modal-close absolute top-0 right-0 px-4 py-2 mt-4 mr-4"
            onClick={onClose}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}

// Ana uygulama bileşeni
function App() {
  const [inputText, setInputText] = useState(""); // Input metni state'i
  const [textList, setTextList] = useState([]); // Metin listesi state'i
  const [modalText, setModalText] = useState(""); // Modal içeriği state'i
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal açık mı kapalı mı state'i

  // Input değişikliğini takip eden fonksiyon
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Metni listeye ekleyen fonksiyon
  const handleAddTextToList = () => {
    setTextList([...textList, inputText]);
    setInputText("");
  };
 // Klavyeden "Enter" tuşuna basıldığında
 const handleKeyPress = (e) => {
  if (e.key === "Enter") { // Eğer basılan tuş "Enter" ise
    handleAddTextToList(); // Metni listeye ekle
  }
};

  // Listeye tıklanırsa, modalı açan fonksiyon
  const handleListItemClick = (text) => {
    setModalText(text);
    setIsModalOpen(true);
  };

  // Modalı kapatma fonksiyonu
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Uygulama bileşenini render eder
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Enter text..."
        className="border border-gray-300 rounded-md px-3 py-2 mb-4"
      />
      <button onClick={handleAddTextToList} className="mb-4">
        Add
      </button>
      <ul>
        {textList.map((text, index) => (
          <li
            key={index}
            onClick={() => handleListItemClick(text)}
            className="cursor-pointer"
          >
            {text.length > 5 ? text.slice(0, 5) + "..." : text}
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <p>Full Text:{modalText}</p>
        </Modal>
      )}
    </div>
  );
}

export default App;
