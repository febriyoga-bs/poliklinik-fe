import swal from "sweetalert";

export function dialog (config) {
  return new Promise( async(resolve, reject) => {
    const result = await swal({
      
      confirm: true,
      buttons: {
        cancel: {
          text: "Batal",
          value: false,
          visible: true,
          className: 'app-btn'
        },
        confirm: {
          text: "Hapus",
          value: false,
          visible: true,
          className: 'app-btn'
        },
      },
      ...config
    });

    
    result ? resolve(result) : reject(result);
  })
}