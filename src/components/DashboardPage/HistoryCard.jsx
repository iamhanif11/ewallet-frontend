import { useAuth } from "../../hooks/useAuth";


// const historyData = [
//   { id: 1, name: "Robert Fox", type: "Transfer", amount: "+Rp50.000", isIncome: true, image: "./1.svg" },
//   { id: 2, name: "Floyd Miles", type: "Send", amount: "-Rp50.000", isIncome: false, image: "./1-1.svg" },
//   { id: 3, name: "Adisurya", type: "Send", amount: "-Rp50.000", isIncome: false, image: "./1-2.svg" },
//   { id: 4, name: "Ujang", type: "Send", amount: "-Rp50.000", isIncome: false, image: "./1-3.svg" },
//   { id: 5, name: "Raulemos", type: "Transfer", amount: "+Rp50.000", isIncome: true, image: "./1-4.svg" },
//   { id: 6, name: "Reiva", type: "Send", amount: "-Rp50.000", isIncome: false, image: "./1-5.svg" }
// ];


function HistoryCard(){
  const { currentUser } = useAuth()

  // const activeUser = registeredUsers.find((u) => u.email === currentUser?.email)
  // const currentUser = activeUser?.history ? [...activeUser.history].reverse() : []
  // const transactions = currentUser?.history || []
  if (!currentUser) {
    return <div>Memuat riwayat...</div>;
  }

    return(
        <div className="bg-white p-6 border flex flex-col border-gray-200 rounded-xs font-montserrat w-full h-full">
      

      <div className="flex justify-between items-center mb-6">
        <h2 className=" font-semibold ">Transaction History</h2>
        <a href="#" className="text-blue-600 text-xs font-medium hover:underline">See All</a>
      </div>

      <div className="flex flex-col gap-5 flex-1">
       {currentUser.length > 0 ? (
         currentUser.slice(0, 10).map((item) => (
           <div key={item.id} className="history flex items-center justify-between">
             
             <div className="flex items-center gap-4">
               <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
               <div className="status flex flex-col">
                 <h3 className="font-semibold ">{item.name}</h3>
                 <p className="text-sm text-gray-500">{item.type}</p>
               </div>
             </div>
 
             <h3 className={`font-semibold ${item.isIncome ? 'text-green-500' : 'text-red-500'}`}>
               {item.amount}
             </h3>
             
           </div>
         ))

       ) : (
        <div className="flex flex-col items-center justify-center flex-1 opacity-40">
          <p className="text-sm">No Transaction Yet</p>
        </div>
       )} 

      </div>
    </div>
    )
}

export default HistoryCard