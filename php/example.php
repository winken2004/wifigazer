<?php

$GLOBALS['THRIFT_ROOT'] = '/var/www/hbase/thrift';							//指定Thrift library所在目錄位置(thrift資料夾放在哪)



require_once( $GLOBALS['THRIFT_ROOT'].'/Thrift.php' );
require_once( $GLOBALS['THRIFT_ROOT'].'/transport/TSocket.php' );
require_once( $GLOBALS['THRIFT_ROOT'].'/transport/TBufferedTransport.php' );
require_once( $GLOBALS['THRIFT_ROOT'].'/protocol/TBinaryProtocol.php' );
require_once( $GLOBALS['THRIFT_ROOT'].'/packages/Hbase/Hbase.php' );

$socket = new TSocket('192.168.2.14',9090);									//socket 指定 Thrift Server ip address


$socket->setSendTimeout( 10000 ); // Ten seconds (too long for production, but this is just a demo ;)
$socket->setRecvTimeout( 20000 ); // Twenty seconds

$transport = new TBufferedTransport( $socket );

$protocol = new TBinaryProtocol( $transport );

$client = new HbaseClient( $protocol );

$transport->open();


$js_arr;

$table_name = 'UserTable';
$start_row = "";
//$family = array("[Column Name1]","[Column Name2]","[Column Name3]"); 			//格式範例
$family = array('RSSIFromAP','x','y');						//example 以這三個column作為例子

$attributes = array();
$scanner = $client->scannerOpen($table_name,$start_row,$family,$attributes);

while(true)
{
  $get_arr = $client->scannerGet($scanner);
  if($get_arr == null)break;

  $name = null;
  $X_loc = null;
  $Y_loc = null;


  foreach($get_arr as $TRowResult)
  {
	 
    $row = $TRowResult->row;
	
    $name = $row;	

    $column = $TRowResult->columns;
    foreach($column as $k=>$v)
    {
	
      switch($k)															//自行調整
      {
	
        case "x:":
        $X_loc = $v->value;
        break;

        case "y:":
        $Y_loc = $v->value;
        break;


        default:
        break;
      }
	
    }
  }


 $tmp[] = array("User"=>$name,"Xlocation"=>$X_loc,"Ylocation"=>$Y_loc);		//將取得的值存成array
}

$json_str = json_encode($tmp);																	//Encode成json格式

echo "$json_str";																			//檢查json格式字串結果


$client->scannerClose($scanner);

$transport->close();
?>