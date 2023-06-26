import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs'
const TableRow = ({ _id, name, budget, debt, comments, position, handleUpdate, setModalDelete, setDataDelete }) => (
    <tr key={_id} className="hover:bg-gray-800 ">
        <td className="tableRow capitalize text-white">
            {name}
        </td>
        <td className="tableRow text-white">
            ${budget}
        </td>
        <td className="tableRow text-red-500">
            ${debt}
        </td>
        <td className="tableRow text-white">
            {position}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-border-gray-200 text-sm leading-5 font-medium">
            <div className="flex justify-center gap-5">
                <button
                    onClick={() => handleUpdate(_id, name, budget, debt, comments, position)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 shadow rounded"
                >
                    <BsPencilFill />
                </button>
                <button
                    onClick={() => {
                        setModalDelete(true);
                        setDataDelete(_id);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 shadow rounded"
                >
                    <BsFillTrash3Fill />
                </button>
            </div>
        </td>
    </tr>
)

export default TableRow