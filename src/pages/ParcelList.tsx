import { useEffect, useState } from "react";
import { data } from "./../assets/data";
import Sheet from "../components/Sheet";
import { IParcel, IUser } from "../interfaces/interfaces";
import LoginForm from "../components/LoginForm";
const ParcelList = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [showLoggingForm, setShowLoggingForm] = useState(false);
  const [selectedCulture, setSelectedCulture] = useState<IParcel | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [content, setContent] = useState<"parcels" | "messages">("parcels");
  useEffect(() => {
    if (!showLoggingForm || !showSheet) {
      let _user: any = localStorage.getItem("awx4a5_user");
      if (!_user) return;
      _user = JSON.parse(_user);
      setUser(_user);
    }
  }, [showLoggingForm, showSheet]);
  const handleLogout = () => {
    localStorage.removeItem("awx4a5_user");
    setContent("parcels");
    setUser(null);
  };
  return (
    <>
      {showSheet && selectedCulture && (
        <Sheet
          parcel={selectedCulture}
          setShowSheet={setShowSheet}
          user={user}
        />
      )}
      {showLoggingForm && <LoginForm setShowLoggingForm={setShowLoggingForm} />}
      <div
        className={`prose max-w-none ${
          (showSheet || showLoggingForm) && "blur-sm"
        } `}
      >
        <div className="w-full h-16 flex justify-end items-center px-20 border-b">
          {user ? (
            <div className="flex gap-5">
              <button onClick={() => setContent("parcels")}>List</button>
              <button onClick={() => setContent("messages")}>Messages</button>
              <span>|</span>
              <span>{user.email}</span>
              <button className="text-red-500" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button
              className="font-bold text-blue-500"
              onClick={() => setShowLoggingForm(true)}
            >
              Log in
            </button>
          )}
        </div>
        <div className="w-10/12 mx-auto pt-10">
          {(() => {
            switch (content) {
              case "parcels":
                return (
                  <>
                    <h1>Liste parcels</h1>
                    <div className="relative overflow-x-auto mt-10">
                      <table className="text-sm text-left rtl:text-right text-gray-500  mx-auto">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Surface
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Culture
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Owner
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((parcel, key) => {
                            return (
                              <tr
                                className="bg-white border-b"
                                key={key}
                                onClick={() => {
                                  setSelectedCulture(data[key]);
                                  setShowSheet(true);
                                }}
                              >
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                  {parcel.id}
                                </th>
                                <td className="px-6 py-4">{parcel.surface}</td>
                                <td className="px-6 py-4">{parcel.culture}</td>
                                <td className="px-6 py-4">{parcel.owner}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                );
              case "messages":
                return (
                  <>
                    <h1>Liste parcels</h1>
                    {user?.messagesSent.map((item, key) => {
                      return (
                        <div
                          className="w-full border rounded-2xl p-5 px-8 shadow mt-5"
                          key={key}
                        >
                          <h2 className="m-0">
                            {item.to} | {item.parcel}
                          </h2>
                          <p className="m-0">{item.content}</p>
                        </div>
                      );
                    })}
                  </>
                );
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default ParcelList;
