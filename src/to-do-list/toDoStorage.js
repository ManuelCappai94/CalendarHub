export function saveTodo(event){
    localStorage.setItem("todoEvents", JSON.stringify(event))
}

export function getTodoFromLocalStorage(){
    const storedTodo = localStorage.getItem("todoEvents")
    if(!storedTodo) return []
        try {
            const parsedTodo = JSON.parse(storedTodo)
            if(!Array.isArray(parsedTodo))return [];
            return parsedTodo
        } catch (error) {
             console.error("invalid Todo in localSotrage", error);
            return [] 
        }
}

export function deleteItemsFromLocalStorage(currentId, activeId){
    const allTodo = getTodoFromLocalStorage()
    const modTodo = allTodo.map( todo => {
              return todo.id === activeId
              ? {
                  ...todo,
                  items : todo.items.filter(x => x.id !== currentId)
              }
              : todo
          })
      saveTodo(modTodo)
      //faccio il return di modTodo, cosi che posso usare questo array per accedere al numero variante di attività completate
      return modTodo
}

export function deleteTodoListFromLocalStorage(currentId){
    const allTodo = getTodoFromLocalStorage()
    const  updateTodos = allTodo.filter(todo => todo.id !== currentId)
   
    saveTodo(updateTodos)
    
    return updateTodos
}