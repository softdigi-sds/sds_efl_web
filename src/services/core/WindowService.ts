const openExternalWindow =(url:string,callBack:(status:string)=>void,options?:any) =>{
    const width = options?.width || 800;
    const height = options?.height || 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;  
    const specs = `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`;  
    const childWindow = window.open(url, "_blank", specs);  
    if (!childWindow) {
      console.error("Failed to open the new window.");
      return;
    }  
      // Periodically check if the window is closed manually
      const interval = setInterval(() => {
        if (childWindow.closed) {
          clearInterval(interval);
         // console.log("Child window closed.");
          callBack("ABORTED");
        }
      }, 500);
    // Listen for messages from the child window
    window.addEventListener("message", (event) => {
      //console.log("event form child window " , event);
      // Ensure the origin is trusted for security reasons
      if (event.origin !== new URL(url).origin) {
        console.error("Untrusted origin:", event.origin);
        return;
      }
  
      if (event.data === "sdsSignOperationCompleted") {
        clearInterval(interval);       
        childWindow.close(); // Close the child window
        // Call a function to verify the action
        if(callBack){
            callBack("COMPLETED");
        }
      }
    });
  
  
  }

  export {
  openExternalWindow
};

