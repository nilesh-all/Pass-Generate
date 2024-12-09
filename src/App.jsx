import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(6);
  const [Password, setPassword] = useState('');
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const PasswordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '~`!@#$%&*';

    for (let i = 1; i <= length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(Password);
    PasswordRef.current?.select();
  }, [Password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Password Generator</h1>
      <div className="w-full max-w-lg p-4 bg-green-100 rounded-md shadow-md text-center">
        <input
          type="text"
          placeholder="Generated Password"
          readOnly
          value={Password}
          ref={PasswordRef}
          className="w-full mb-4 p-3 text-lg text-gray-800 bg-yellow-100 rounded-md border border-gray-300"
        />
        <button
          onClick={copyPassword}
          className="w-full py-2 text-lg font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-400 transition"
        >
          Copy Password
        </button>
      </div>
      <div className="w-full max-w-lg mt-6">
        <label className="block mb-2 text-center">
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full cursor-pointer accent-blue-500"
          />
          <span className="block mt-1">Password Length: {length}</span>
        </label>
        <div className="flex items-center justify-around mt-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="accent-blue-500"
            />
            <span>Include Numbers</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="accent-blue-500"
            />
            <span>Include Special Characters</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
