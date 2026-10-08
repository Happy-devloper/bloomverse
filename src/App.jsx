import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import BouquetBuilder from './pages/BouquetBuilder'
import PreviewScreen from './pages/PreviewScreen'
import SharedContentPage from './pages/SharedContentPage'
import LetterCreationFlow from './components/letters/LetterCreationFlow'
import { getContentFromUrl } from './utils/urlEncoding'

// Check for shared content in URL (supports both new and legacy formats)
const sharedContent = getContentFromUrl()
const hasSharedContentParameter = ['content', 'c', 'bouquet', 'b'].some((parameter) =>
  new URLSearchParams(window.location.search).has(parameter)
)

function App() {
  const [currentPage, setCurrentPage] = useState(() => hasSharedContentParameter ? 'shared' : 'landing')
  const [contentData, setContentData] = useState(null)

  const handleCreateBouquet = () => {
    setCurrentPage('builder')
  }
  
  const handleCreateLetter = () => {
    setCurrentPage('letter')
  }

  const handleContentComplete = (data) => {
    setContentData(data)
    setCurrentPage('preview')
  }

  const handleBackToBuilder = () => {
    setCurrentPage('builder')
  }

  const handleBackToHome = () => {
    setCurrentPage('landing')
    setContentData(null)
    // Clear URL
    window.history.pushState({}, '', '/')
  }

  return (
    <div className="bg-cream min-h-screen">
      {currentPage === 'landing' && (
        <LandingPage 
          onCreateBouquet={handleCreateBouquet}
          onCreateLetter={handleCreateLetter}
        />
      )}
      {currentPage === 'builder' && (
        <BouquetBuilder onComplete={handleContentComplete} />
      )}
      {currentPage === 'letter' && (
        <LetterCreationFlow onComplete={handleContentComplete} />
      )}
      {currentPage === 'preview' && contentData && (
        <PreviewScreen
          contentData={contentData}
          onBack={() => setCurrentPage(contentData.type === 'letter' ? 'letter' : 'builder')}
          onShare={handleBackToHome}
        />
      )}
      {currentPage === 'shared' && (
        <SharedContentPage contentData={sharedContent} />
      )}
    </div>
  )
}

export default App
