import { AppBar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title,setTitle] =useState("");
    const [content,setContent] = useState("");
    const navigate = useNavigate()

  return (
    <div>
      <AppBar />
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextEditor onChange={(e) => setContent(e.target.value)} />
          <button
          onClick={async ()=> {
            const response = await axios.post(`${BACKEND_URL}/api/v1/post`,{
                title,
                content
            },{
                headers:{
                    Authorization:  localStorage.getItem('token')
                }
            });
            navigate(`/blog/${response.data.id}`)
          }}
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 mt-4 shadow-xl shadow-gray-400"
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>) => void}) {
  return (
    <div className="pt-8">
      <div className="w-full mb-4">
        <div className="flex items-center justify-between px-3 py-3 border shadow rounded">
          <div className="px-4 py-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              id="editor"
              rows={16}
              className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:outline-none"
              placeholder="Write an article ... "
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
