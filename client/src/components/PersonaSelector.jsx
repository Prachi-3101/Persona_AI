function PersonaSelector({ selectedPersona, setSelectedPersona }) {
  const personas = [
    {
      name: "Hitesh",
      title: "Chai Aur Code",
      avatar: "/assets/hitesh_sir.jpg",
    },
    {
      name: "Piyush",
      title: "Piyush Garg",
      avatar: "/assets/pitush_sir.jpeg",
    },
  ];

  return (
    <div className="space-y-1">
      {personas.map((person) => {
        const isActive = selectedPersona === person.name;
        return (
          <button
            key={person.name}
            onClick={() => setSelectedPersona(person.name)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 ${
              isActive
                ? "bg-indigo-50 border-2 border-indigo-600 shadow-sm"
                : "border-2 border-transparent hover:bg-gray-50 hover:border-gray-200"
            }`}
          >
            <img
              src={person.avatar}
              alt={person.name}
              className="w-10 h-10 rounded-full shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className={`font-semibold text-sm ${isActive ? "text-indigo-700" : "text-gray-800"}`}>
                {person.name}
              </p>
              <p className={`text-xs mt-0.5 truncate ${isActive ? "text-indigo-500" : "text-gray-400"}`}>
                {person.title}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default PersonaSelector;
