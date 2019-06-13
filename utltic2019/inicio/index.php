<?php 
	include('../sesiones/verificar_sesion.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Sistema de Registros de Alumnos</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" type="text/css" href="../plugins/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="../plugins/fontawesome-free-5.8.1-web/css/all.min.css">
	<link rel="stylesheet" type="text/css" href="../css/estilos.css">

	<!-- Alertify	 -->
	<link rel="stylesheet" type="text/css" href="../plugins/alertifyjs/css/alertify.css">
	<link rel="stylesheet" type="text/css" href="../plugins/alertifyjs/css/themes/bootstrap.css">
</head>
<body>
	<header>
		<?php 
			include('../layout/encabezado.php');
		 ?>
	</header><!-- /header -->	
	<div class="container-fluid" >
		<div class="row" id="cuerpo" style="display:none">
			<div class="col-xs-0 col-sm-3 col-md-2 col-lg-2">
			<?php 
				include('../layout/menuv.php');
			 ?>
			</div>
			<div class="col-xs-12 col-sm-9 col-md-10 col-lg-10 cont">
			   <div class="titulo borde sombra">
			        <h3>Lista de alumnos ingresados al CC</h3>
			   </div>	
			   <div class="contenido borde sombra">
			        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam obcaecati eum, sit accusantium, quis recusandae consequatur tempora ipsam quidem odio cum ab rerum? Officia quis ad, fugit ut eligendi aliquid!
					Dolorum ea doloremque ex. Quam perspiciatis doloremque, iure illum expedita earum ut eaque autem hic reiciendis quasi quaerat deleniti, corrupti maxime doloribus tempore assumenda illo necessitatibus labore, veritatis dolores voluptatibus.
					Reprehenderit harum itaque ab veritatis non sint repellat ipsam. Obcaecati, perferendis dolor veritatis quas odio voluptates? Possimus aliquam sapiente eligendi sed cupiditate, minima tempora veritatis delectus quibusdam, libero architecto vitae?
					Est sint laborum eligendi magnam praesentium, incidunt optio quaerat, veniam ad aspernatur non beatae quibusdam, doloribus voluptate repellat qui odio recusandae quis a! Officiis sapiente odio molestiae eius dicta a!
					Tempore atque dicta excepturi, nobis sit ipsam dolorum saepe, corrupti a dolores eos officiis voluptatibus vel ipsum consequuntur minima asperiores cupiditate dignissimos doloremque ex odio? Nam inventore dicta sapiente aut?
					Unde voluptatum vel tenetur, distinctio voluptatibus omnis illo quam voluptate, officia exercitationem architecto. Enim cum tempore libero velit animi? Iusto nihil recusandae ratione incidunt excepturi nam voluptatibus voluptas ea reiciendis.
					Sequi omnis tenetur quisquam. Eligendi similique autem nesciunt obcaecati veniam, possimus consectetur minima deleniti, atque odio expedita laborum earum praesentium, quidem tenetur. Non, soluta odio nobis possimus perferendis reprehenderit. Rerum.
					Ab molestiae accusantium itaque labore. Adipisci dicta soluta perferendis omnis facilis maxime recusandae in, asperiores sint repellat obcaecati a. Nam aut earum, harum corporis voluptatem minima et inventore ipsam deserunt.
					Modi dolores exercitationem ea laborum animi officiis atque similique eum blanditiis, adipisci, aspernatur quisquam praesentium doloribus dicta repellat? Cum exercitationem molestiae temporibus provident soluta facere non recusandae accusamus omnis ratione.
					Quos, porro suscipit quam voluptatibus itaque dignissimos impedit eius maxime incidunt amet possimus tempore qui ducimus doloremque, libero, debitis cupiditate accusamus corporis? Nobis veniam, nihil error minus voluptate repudiandae nisi?
					Voluptatum laborum exercitationem laudantium dignissimos repellendus velit consequuntur rerum optio, quam atque facere commodi voluptatem at doloribus molestiae explicabo enim eaque ea fugit alias. Harum fugiat numquam quibusdam deserunt nisi?
					Reiciendis laudantium laboriosam hic iste magni accusantium neque dolorem dignissimos dolor quis nemo temporibus ad eos, nesciunt maxime quidem voluptas itaque architecto eaque fuga perferendis vel aspernatur et repellendus. Minus.</p>
			   </div>	

			</div>			
		</div>
	</div>
	<footer class="fondo">
		<?php 
			include('../layout/pie.php');
		 ?>			

	</footer>

	<script src="../plugins/jQuery/jQuery-2.1.4.min.js"></script>
	<!-- Preloaders -->
    <script src="../plugins/Preloaders/jquery.preloaders.js"></script>
	
	<script src="../js/menu.js"></script>
	<script src="../js/precarga.js"></script>
	<script src="../js/salir.js"></script>
	<script src="../plugins/bootstrap/js/bootstrap.min.js"></script>

	<!-- alertify -->
	<script type="text/javascript" src="../plugins/alertifyjs/alertify.js"></script>
	<script>
		window.onload = function() {
			$("#cuerpo").fadeIn("slow");
		};	
	</script>
</body>
</html>