const formatDate = (date: string) => {

  const dateLocal = new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  return dateLocal
}

export default formatDate