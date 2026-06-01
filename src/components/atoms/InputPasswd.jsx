import { useState } from 'react';

const InputPassword = ({ 
  label = "Password", 
  placeholder = "Enter Your Password", 
  id = "password" ,
  name,
  value,
  onChange
}) => {
  // State untuk mengontrol apakah password terlihat atau tidak
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-sm font-medium text-black">
        {label}
      </label>
      
      <div className="relative group">
  
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <img src="Password.png" alt="passwd" />
        </div>

        <input
          id={id}
          name={name || id}
          value={value}
          onChange={onChange}
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300 text-gray-700"
        />

    
        <button 
          type="button" 
          onClick={toggleVisibility}
          className={`absolute right-4 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-40"
          } hover:opacity-100`}
        >

          <img 
            src={isVisible ? "Eye.png" : "Eye.png"} 
            alt={isVisible ? "show" : "hide"} 
            onError={(e) => { e.target.src = "EyeSlash.png" }} 
          />
        </button>
      </div>
    </div>
  );
};

export default InputPassword;