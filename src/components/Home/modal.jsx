const Modal = ({ modal, setQuantity, selectItem, selectedUser, setSelectedUser, handleClose, handelSell, users, modalData, quantity }) => {
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handleIncrease = () => {
        if (quantity < selectItem.quantityInPieces) {
            setQuantity(quantity + 1);
        } else {
            setQuantity(selectItem.quantityInPieces);
        }
    };

    if (modal)
        return (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen text-center sm:block">
                    <div className="fixed inset-0 bg-gray-900 opacity-75" />

                    <div className="inline-block align-bottom bg-gray-800 border border-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <h4 className="text-2xl font-extrabold tracking-wide text-center text-slate-100 mb-4">
                                Sell product
                            </h4>
                            <div className="flex flex-col gap-4 mb-4">
                                <div className='flex flex-col gap-2'>
                                    <p className="font-bold text-slate-200">Current product</p>
                                    <input className="text-lg font-bold capitalize text-gray-500 p-2 bg-gray-100 rounded-lg w-full" name="Name" type="text" disabled defaultValue={modalData.name}></input>
                                </div>
                                <div>
                                    <label htmlFor="user" className="block mb-2 font-bold text-slate-200">
                                        Select a client
                                    </label>
                                    <select
                                        className="bg-gray-100 py-2 border font-semibold border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                        value={selectedUser ? selectedUser.name : ""}
                                        disabled={quantity <= 0}
                                        onChange={(e) => setSelectedUser(users.find((user) => user.name === e.target.value))}
                                    >
                                        <option disabled value="">
                                            Choose a client
                                        </option>
                                        {users.map((user, index) => (
                                            <option key={index} value={user.name} className="capitalize">
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {(selectedUser) ?
                                    <>
                                        <div className='flex flex-col gap-2 text-slate-200'>
                                            <p className="font-bold">Quantity</p>
                                            <div className="flex">
                                                <button className="px-4 bg-blue-500 text-white rounded-l-lg font-bold text-lg hover:bg-blue-200" onClick={handleDecrease}>-</button>
                                                <input className="w-10 text-center border  border-blue-500 bg-gray-800 text-white outline-none focus:border-non text-xl" name="comments" type="number" value={quantity} min={1} onChange={(e) => setQuantity(Number(e.target.value))} />
                                                <button className="px-4 bg-blue-500 text-white rounded-r-lg font-bold text-lg hover:bg-blue-200" onClick={handleIncrease}>+</button>
                                            </div>
                                        </div>
                                        <div className="bg-gray-200 h-60 border-2 flex flex-col border-gray-400 rounded-lg">
                                            <h2 className="bg-gray-300 text-center text-lg border-2 font-bold rounded-lg">Bill</h2>
                                            <div className='flex flex-col gap-4'>
                                                <div>
                                                    <p className="flex justify-between mx-5 my-2">Client Wallet
                                                        <input id="budget" disabled className="w-20 bg-gray-300 font-bold" type="text" value={selectedUser.budget} /></p>
                                                    <p className="flex justify-between mx-5 my-2">Unit Price
                                                        <input id="price" className="w-20 bg-gray-300 font-bold" disabled type="text" defaultValue={modalData.price} /></p>
                                                </div>
                                                <div>
                                                    <h2 className="bg-gray-300 text-center text-lg border-2 font-bold rounded-lg">Total</h2>
                                                    <div className="flex justify-between mx-5 my-2">All Price
                                                        <p id="allprice" className="w-20 bg-gray-300 font-bold">{(quantity * modalData.price).toFixed(2)}$</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    : quantity <= 0 &&
                                    <div className='text-slate-100 px-4 py-2 font-semibold bg-red-600 uppercase rounded'>Out of stock</div>
                                }
                            </div>
                        </div>
                        <div className="bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                disabled={selectedUser ? false : true}
                                className="w-full inline-flex justify-center disabled:bg-blue-400 rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={handelSell}>
                                Sell
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => handleClose(modalData)}>
                                Close
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    else
        <></>
}

export default Modal