import { useState } from "react";
import { IParcel, IUser } from "../interfaces/interfaces";
import { RxCross1 } from "react-icons/rx";
const Sheet: React.FC<{
  parcel: IParcel;
  user: IUser | null;
  setShowSheet: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ parcel, user, setShowSheet }) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSendMessage = () => {
    setIsLoading(true);
    if (!message) {
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      user?.messagesSent.push({
        parcel: parcel.parcel,
        to: parcel.owner,
        content: message,
      });
      localStorage.setItem("awx4a5_user", JSON.stringify(user));
      setIsLoading(false);
      setMessage("");
    }, 1000);
  };
  return (
    <div className="w-screen h-screen bg-black absolute top-0 left-0 z-50 bg-opacity-30 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-slate-50 mx-auto h-fit min-h-96 shadow-sm rounded-2xl p-10 px-20">
        <div className="w-full text-red-600 flex justify-end">
          <button
            onClick={() => setShowSheet(false)}
            className="ml-auto static"
          >
            <RxCross1 size={25} />
          </button>
        </div>
        <div className="flex justify-between mt-5 ">
          <p>
            <span className="font-semibold">Owner :</span> {parcel.owner}
          </p>
          <p>
            <span className="font-semibold">Culture :</span> {parcel.culture}
          </p>
          <p>
            <span className="font-semibold">Surface :</span> {parcel.surface} m2
          </p>
        </div>
        {user ? (
          <div className=" mt-5">
            <div className="relative overflow-x-auto">
              <table className="border shadow text-sm text-left rtl:text-right text-gray-500  mx-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Culture
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Planned (t)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Result (t)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {parcel.history.map((item, key) => {
                    return (
                      <tr className="bg-white border-b" key={key}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.culture}
                        </th>
                        <td className="px-6 py-4">{item.planned}</td>
                        <td className="px-6 py-4">{item.result}</td>
                        <td className="px-6 py-4">{item.date}</td>
                        <td className="px-6 py-4">{item.duration}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-5">
              <label htmlFor="" className="font-bold">
                Message :
              </label>
              <textarea
                name=""
                id=""
                rows={2}
                className="mt-2 border-stone-300 border-2 py-2 px-2 w-full hover:outline-none focus:outline-none focus:border-blue-400"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className={`py-2 text-white w-36 font-bold rounded-lg ${
                  isLoading ? "bg-blue-200 cursor-not-allowed" : "bg-blue-500"
                }`}
                onClick={handleSendMessage}
                disabled={isLoading}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-neutral-200 rounded-2xl mt-10 text-neutral-500 py-10 text-center cursor-not-allowed">
            Log first use this feature{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sheet;
