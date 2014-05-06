<?php
echo "test";
$GLOBALS['THRIFT_ROOT'] = '../.../www/hbase/thrift';							//���wThrift library�Ҧb�ؿ���m(thrift��Ƨ���b��)



require_once( $GLOBALS['THRIFT_ROOT'].'/Thrift.php' );
require_once( $GLOBALS['THRIFT_ROOT'].'/transport/TSocket.php' );
require_once( $GLOBALS['THRIFT_ROOT'].'/transport/TBufferedTransport.php' );
require_once( $GLOBALS['THRIFT_ROOT'].'/protocol/TBinaryProtocol.php' );
require_once( $GLOBALS['THRIFT_ROOT'].'/packages/Hbase/Hbase.php' );

$socket = new TSocket('192.168.144.124',62022);									//socket ���w Thrift Server ip address

$socket->setSendTimeout( 10000 ); // Ten seconds (too long for production, but this is just a demo ;)
$socket->setRecvTimeout( 20000 ); // Twenty seconds

$transport = new TBufferedTransport( $socket );
$protocol = new TBinaryProtocol( $transport );
$client = new HbaseClient( $protocol );
$transport->open();


$js_arr;

$table_name = 'POSITION';
$start_row = '';
//$family = array("[Column Name1]","[Column Name2]","[Column Name3]"); 			//�榡�d��
$family = array("AP_ID","Data_Rate:Ch1","POWER:Ch1");						//example �H�o�T��column�@���Ҥl


$scanner = $client->scannerOpen($table_name,$start_row,$family);
$tmp = array();

while(true)
{
  $get_arr = $client->scannerGet($scanner);
  if($get_arr == null)break;

  $AP_ID = null;															//initialization
  $ch1_Data_Rate = 0;
  $ch1_Power = 0; 

  foreach($get_arr as $TRowResult)
  {
 
    $row = $TRowResult->row;
    $column = $TRowResult->columns;
    foreach($column as $k=>$v)
    {
      switch($k)															//�ۦ�վ�
      {
        case "AP_ID:":
        $AP_ID = $v->value;
        break;

        case "Data_Rate:Ch1":
        $ch1_Data_Rate = $v->value;
        break;

        case "POWER:Ch1":
        $ch1_Power = $v->value;
        break;

        default:
        break;
      }
    }
  }

 $tmp[] = array("AP_ID"=>$AP_ID,"ch1_Data_Rate"=>$ch1_Data_Rate,"ch1_Power"=>$ch1_Power);		//�N���o���Ȧs��array
}

$json_str = json_encode($tmp);																	//Encode��json�榡

echo "$json_str";																			//�ˬdjson�榡�r�굲�G

$client->scannerClose($scanner);

$transport->close();
?>
