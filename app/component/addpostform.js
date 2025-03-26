import { useId } from "react";

const AddPostForm = ( {info, posts, setTitle, setContent, handleImage, handleSubmit, handleDelete} ) => {
  const uploadID = useId();
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <label>
        Title:
        <input
          type="text"
          value={info.title}
          onChange={e => setTitle(e)}
        />
      </label>
      <label>
        Content:
        <input
          type="text"
          value={info.content}
          onChange={e => setContent(e)}
        />
      </label>
      {info.image && (
        <div>
          <div>Image Preview</div>
          <img src={info.image} alt="image preview" style={{ width: '200px', height: 'auto' }} />
        </div>
      )}
      <label htmlFor={uploadID}>
        <button type="button" onClick={() => document.getElementById(uploadID).click()}>upload Image</button>
      </label>
      <input type="file" id={uploadID} onChange={e => handleImage(e)} accept="image/*" style={{ display: 'none' }}/>
      <button type="submit">submit</button>
      {posts.length > 0 ? <button type="button" onClick={handleDelete}>remove recent</button> : null}
    </form>
  )
}

export default AddPostForm;