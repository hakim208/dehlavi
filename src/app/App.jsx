import React, { useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loading from '../components/LoadingGlobal';
import { useThemeStore } from '../shared/lib/zustandStore';
import Footer from '../widgets/footer/footer';
import Sidebar from '../widgets/sidebar/Sidebar';
import Router from './router/Router';

export default function App() {
  const { theme } = useThemeStore()
  const footerRef = useRef(null);

  // Theme switch
  React.useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [theme])

  // Loader state
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loading />   // ⬅️ Глобальный лоадинг

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-[#071122]">
        <Sidebar footerRef={footerRef} />
        <main className="">
          <Router />
        </main>
        <Footer ref={footerRef} />
      </div>
    </BrowserRouter>
  )
}
