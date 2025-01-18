// components/GymSelector.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react"; // Importando o ícone de dropdown

const GymSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gyms, setGyms] = useState(["Academia Alpha", "Gym Beta", "StrongFit"]);
  const [selectedGym, setSelectedGym] = useState(gyms[0]); // Inicializa com a primeira academia
  const [newGym, setNewGym] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectGym = (gym: string) => {
    setSelectedGym(gym);
    setIsOpen(false); // Fecha o dropdown ao selecionar uma academia
  };

  const handleAddGym = () => {
    if (newGym.trim() !== "") {
      setGyms([...gyms, newGym]);
      setSelectedGym(newGym);
      setNewGym(""); // Limpa o input após adicionar
      setIsOpen(false); // Fecha o dropdown
    }
  };

  return (
    <div className="relative w-64">
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 text-left rounded-lg shadow-md flex items-center justify-between"
      >
        <span>{selectedGym}</span>
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-muted border border-gray-300 rounded-lg shadow-md">
          <ul>
            {gyms.map((gym, index) => (
              <li
                key={index}
                onClick={() => handleSelectGym(gym)}
                className="px-4 py-2 hover:bg-blue-500 cursor-pointer"
              >
                {gym}
              </li>
            ))}
          </ul>
          <div className="px-4 py-2 border-t border-gray-300">
            <input
              type="text"
              value={newGym}
              onChange={(e) => setNewGym(e.target.value)}
              placeholder="Nova academia"
              className="w-full px-2 py-1 border rounded-lg"
            />
            <button
              onClick={handleAddGym}
              className="w-full mt-2 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
            >
              Adicionar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymSelector;
