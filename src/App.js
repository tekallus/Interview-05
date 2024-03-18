import React, { useState } from "react";

// Modal bileşeni
function Modal({ onClose, children }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div
        className="modal-overlay fixed top-0 left-0 w-full h-full bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="modal bg-white p-4 rounded-lg">
        {children}
        <button
          className="modal-close absolute top-2 right-2"
          onClick={onClose}
        >
          X
        </button>
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
          <p>{modalText}</p>
        </Modal>
      )}
    </div>
  );
}

export default App;
