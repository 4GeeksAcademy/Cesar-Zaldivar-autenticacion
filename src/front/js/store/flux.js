const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user:{},
			
			token:"",
			auth: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			register: async (newUser) => {
				//try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup",{
						method: "POST",
						body: JSON.stringify(newUser),
						headers: {"Content-Type": "application/json"}
					})
					if(!resp.ok){
						throw new Error("error creating user")
					}
					const data = await resp.json()
					console.log(data)
					// don't forget to return something, that is how the async resolves
					return data;
				/*}catch(error){
					console.log("Error loading message from backend", error)
				}*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login: async (credentials) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						body: JSON.stringify(credentials),
						headers: { "Content-Type": "application/json" }
					});
					if (!resp.ok) {
						throw new Error("Error logging in");
					}
					const data = await resp.json();
					console.log("Logged in!: ", data.user);
			
					// Guardar el token y el usuario en el store
					setStore({ 
						token: data.access_token, 
						user: data.user, 
						auth: true
					});
			
					// Guardar el token en localStorage
					localStorage.setItem("token", data.access_token);
					
					console.log(data);
					return data;
				} catch (error) {
					console.error("Error loading message from backend:", error);
				}
			},
				logOut:() =>{
					localStorage.removeItem("token")
					setStore({auth:false})
				}			
			
		}
	};
};

export default getState;
