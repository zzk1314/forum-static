import {pget,ppost} from "../../utils/request"

export const style = {
  container: {
    backgroundColor: "red"
  },
  banner: {
    backgroundColor: "white",
    padding: 0,
    height: "80px",
    width: "1000px",
    margin: "0 auto",
  },
  avatar: {
    marginRight: "6px",
    marginTop: "16px"
  },
  navLabel: {
    fontSize: "20px",
    fontWeight: "300",
    fontFamily:"思源黑体cn,Helvetica Neue",
  },
  navLabelActive:{
    fontSize: "20px",
    fontWeight: "300",
    fontFamily:"思源黑体cn,Helvetica Neue",
    color:"#55cbcb"
  },

  paper:{
    width: 120,
    left: '81%',
    position: 'absolute',
    height: 60,
    textAlign: 'center',
    marginTop: -12,
  }
};

export function commentCount() {
  return pget(`/pc/asst/comment/count`);
}
