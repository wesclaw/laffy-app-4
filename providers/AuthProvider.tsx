import React from 'react'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'expo-router'

export const AuthContext = React.createContext({
  user: null,
  signIn: async (email: string, password: string) => {},
  signUp: async (username: string, email: string, password: string) => {},
  signOut: async () => {},
  likes: [],
  getLikes: async (userId: string)=>{},
})

export const useAuth = () => React.useContext(AuthContext)

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const [user, setUser] = React.useState(null)
  const router = useRouter()
  const [ likes, setLikes ] = React.useState([])

  const getLikes = async (userId: string)=>{
    console.log("userID", userId)
    if(!userId) return

    const { data, error } = await supabase.from('Like').select('*').eq('user_id', userId)
    setLikes(data)
    console.log('like', data)
  }

  const getUser = async (id: string) => {
    const { data, error } = await supabase.from('User').select('*').eq('id', id).single()
    if(error) return console.error(error)
    setUser(data)
    router.push('/(tabs)')
  }
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if(error) return console.error(error)
    getUser(data.user.id)
    
  }

  const signUp = async (username: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          });
          
          if(error) return console.log(error)
    
          const {error: useError } = await supabase.from('User').insert({
            id: data.user?.id,
            username: username,
            email: email,
          })
          if(useError) return console.log(useError)
          // setUser(userData)  
          getUser(data?.user?.id)
          router.back();
          router.push('/(tabs)');
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if(error) return console.error(error)
    setUser(null)
    router.push('/(auth)')
  }
  
  // const [loading, setLoading] = React.useState(true)

  React.useEffect(()=>{
    const { data: authData } = supabase.auth.onAuthStateChange((event, session)=>{
     if(!session) return router.push('/(auth)')
     getUser(session?.user?.id) 
    })
    return ()=>{
      authData.subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{user, signIn, signUp, signOut, likes, getLikes }}>{children}</AuthContext.Provider>
}