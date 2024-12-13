import { useState, useEffect,ReactNode } from "react";
import { createContext, useContext } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    author: {
      name: string;
    };
    title: string;
    content: string;
    id: string;
    postDate : string;
  }
  const NameContext = createContext<{
    name: string;
    setName: (newName: string) => void;
  }>({
    name: "",
    setName: () => {},
  });
  
  export const NameProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState<string>("");
    return (
      <NameContext.Provider value={{ name, setName }}>
        {children}
      </NameContext.Provider>
    );
  };
  
  export const useName = () => useContext(NameContext);

export const useBlog = ({id}:{id : string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog]  = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/post/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.post)
                console.log("Hello from here")
                console.log(response)
                console.log(blog)
                setLoading(false);
            })
    },[id])

    return {
        loading,
        blog
    }
  }
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs]  = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/post/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.posts)
                setLoading(false);
            })
    },[])

    return {
        loading,
        blogs
    }
}