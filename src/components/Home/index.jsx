import axios from 'axios';
import Modal from './modal';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const Home = () => {

  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectItem, setSelectItem] = useState({});
  const [modalData, setModalData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4040/api/products');
      const products = response.data;
      const updatedList = products.filter(product => product.quantityInPieces !== null);
      setList(updatedList);
    } catch (error) {
      toast.error(error);
    }
  };
  const loadUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:4040/api/users');
      const updatedUsers = data.map(user => ({
        ...user,
        budget: user.budget.toFixed(2)
      }));
      setUsers(updatedUsers);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    loadUsers();
  }, [selectedUser, selectItem]);

  const handleClose = () => {
    setQuantity(1);
    setModal(false);
    setSelectedUser(null);
  };
  const handleUpdate = (item) => {
    if (item.quantityInPieces === 0) {
      setQuantity(0);
    } else {
      setQuantity(1);
    }
    setSelectItem(item)
    setModalData(item);
    setModal(true);
  };
  const handelSell = (event) => {
    event.preventDefault();

    const productId = modalData._id;
    const userId = selectedUser._id;

    if (quantity === 0) {
      toast.error('Item out of stock');
      return;
    }

    axios.post('http://localhost:4040/api/purchase', ({
      productId,
      userId,
      quantity,
    })).then(() => {
      fetchProducts().then(() => {
        toast.success('Item sold successfully');
      });
    }).catch((error) => {
      toast.error(error);
    });

    setModal(false);
    setSelectedUser(null);
    setQuantity(1);
  }

  return (
    <>
      <section className="bg-gray-600 w-full h-full grid grid-cols-1 lg:grid-cols-5 p-4 sm:grid-cols-2 md:grid-cols-5 gap-4" >
        {list.map((item, index) => (
          <div key={index} className="w-full max-w-sm border rounded-lg shadow hover:shadow-md bg-gray-800 border-gray-700">
            <div>
              <img className="object-contain w-full h-64 rounded-t-lg bg-white" src={item.Image == undefined || item.Image === "" ? "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" : item.Image} alt="product image" />
              <div className="p-5">
                <h5 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{item.name}</h5>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">Qty</span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">{item.quantityInPieces}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">Price</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{item.price}$</span>
                </div>
                <button
                  onClick={() => handleUpdate(item)}
                  className="block w-full py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                  Sell Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Modal modal={modal} selectItem={selectItem} setQuantity={setQuantity} selectedUser={selectedUser} setSelectedUser={setSelectedUser} handleClose={handleClose} handelSell={handelSell} users={users} modalData={modalData} quantity={quantity} />
    </>
  );
};

export default Home;