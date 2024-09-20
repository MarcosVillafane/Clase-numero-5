import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Mostrar el menú
        System.out.println("Ingrese el valor de a:");
        int a = scanner.nextInt();

        System.out.println("Ingrese el valor de b:");
        int b = scanner.nextInt();

        // Llamar al método add con los valores ingresados y almacenar el resultado
        int result = add(a, b);

        // Imprimir el resultado de la suma
        System.out.println("La suma de " + a + " y " + b + " es: " + result);

        // Cerrar el scanner
        scanner.close();
    }

    public static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }

    public static int add(int a, int b) {
        return a + b;
    }
}