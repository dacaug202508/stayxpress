

function Homeimage({image_src, css}) {
  return (
    <div className='h-full w-full'>
        <img className={`h-full w-full ${css}`}  src={image_src} alt={image_src} />
    </div>

  )
}

export default Homeimage