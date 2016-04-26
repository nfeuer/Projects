import com.sedgewick.stdlib.StdIn;
import com.sedgewick.stdlib.StdOut;

/**
 * Created by Nick on 3/4/2016.
 */
public class matrix {
    public static void main (String[] args){
        StdOut.print("Input 3 to confirm using a 3*3 matrix ");
        int n = StdIn.readInt(); //Read input

        StdOut.println("Input matrix values separated by spaces reading left to right. Press Crl+D when finished.");
        int[] array0 = StdIn.readAllInts(); //Put all values into an array
        int counter = 0;
        int determinant = 0;

        assert n*n == array0.length;

        int[][] initM = new int[n][n]; //Initialize matrix array
        for(int i=0; i < n; i++){
            for(int j=0; j < n; j++){ //Fill matrix array
                initM[i][j] = array0[counter];
                counter++;
            }
        }

        StdOut.println("Matrix:"); //Print out input matrix to confirm input was correct
        for(int i=0; i < n; i++){
            StdOut.println();
            for(int j=0; j < n; j++){
                StdOut.print(" "+initM[i][j]);
            }
        }

        determinant += initM[0][0]*(initM[1][1]*initM[2][2]-initM[1][2]*initM[2][1]); //Find the determinant of the original matrix
        determinant -= initM[0][1]*(initM[1][0]*initM[2][2]-initM[1][2]*initM[2][0]);
        determinant += initM[0][2]*(initM[1][0]*initM[2][1]-initM[1][1]*initM[2][0]);

        StdOut.println();
        StdOut.println("Determinant is: "+ determinant);

        int[][] cofM = new int[n][n]; //Create array of coefficients
        int[] hold = new int[4];
        for(int i=0; i < n; i++) {
            int count;
            count = 0;
            for (int j = 0; j < n; j++) {

                for(int r=0; r < n; r++) {
                    if(r != i) {
                        for (int col = 0; col < n; col++) {
                            if (col != j) {
                                hold[count] = initM[r][col];
                                count++;
                            }
                            if (r == 2 && col == 2 || i == 2 && r == 1 && col == 2 || i == 2 && j == 2 && r == 1 && col == 2) { //Put minor matrix through determinant method
                                cofM[i][j] = det(hold);
                                count = 0;
                            }
                        }
                    }
                }
            }
        }

        for(int i=0; i < n; i++) { //Fix for cofactor matrix by adding the + and -
            for (int j = 0; j < n; j++) {
                if(((i+j+2) % 2) != 0){
                    cofM[i][j] = -1*cofM[i][j];
                }
            }
        }


        StdOut.println();
        StdOut.println("Cofactor Matrix: "); //Print cofactor matrix
        for(int i=0; i < n; i++){
            StdOut.println();
            for(int j=0; j < n; j++){
                StdOut.print(" "+cofM[i][j]);
            }
        }

        int[][] adj = new int[n][n];
        for(int i=0; i < n; i++) { //Turn cofactor matrix into adj maxtrix by taking the transpose
            for (int j = 0; j < n; j++) {
                adj[i][j] = cofM[j][i];
            }
        }

        String[][] inverse = new String[n][n]; //Find inverse matrix
        for(int i=0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                int value = adj[i][j];
                inverse[i][j] = ""+value+"/"+determinant;

            }
        }

        StdOut.println();
        StdOut.println();
        StdOut.println("Inverse Matrix: "); //Print inverse matrix
        for(int i=0; i < n; i++){
            StdOut.println();
            for(int j=0; j < n; j++){
                StdOut.print(" "+inverse[i][j]);
            }
        }


    }

    public static int det(int[] minor) { //Determinant solving method
        int a = minor[0];
        int b = minor[1];
        int c = minor[2];
        int d = minor[3];
        int cof = (a*d-b*c);

        return cof;
    }



}
