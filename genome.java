import com.sedgewick.stdlib.StdIn;
import com.sedgewick.stdlib.StdOut;

/**
 * Created by Nick on 2/23/2016.
 */
public class genome {
    public static void main(String[] args){ //Main
        String sequence = StdIn.readString(); //Read sequence
        String start = "ATG"; //Initialize start codon
        String stop1 = "TAG"; //Initialize stop codons
        String stop2 = "TAA";
        String stop3 = "TGA";
        boolean did = false; //Boolean for if a start codon has been found
        int found = 0; //Initialize var to hold position where found
        int end; //Initialize var for where it ends

        for(int i = 0; i < sequence.length()-3; i++){ //For loop to go through sequence
            String curr = sequence.substring(i,i+3); //Initialize substring for each loop

            if(curr.equals(start) && did == false){ //If haven't found a start codon yet, check if codon is start
                found = i; //Set found to position of start codon
                did = true; //Start looking for end codon
            }

            if(did){ //If looking for end codon
                if(curr.equals(stop1)){ //Check if codon is TAG
                    end = i; //Set where end position is
                    if((end-found-3)%3 == 0){ //Check if actually a gene
                        StdOut.println(sequence.substring(found+3,end)); //Print sequence
                        did = false; //Start looking for start codon
                    } else {
                        did = false; //If not gene start looking for next one
                    }
                }
                if(curr.equals(stop2)){ //Check if codon is TAA
                    end = i;
                    if((end-found-3)%3 == 0){
                        StdOut.println(sequence.substring(found+3,end));
                        did = false;
                    } else {
                        did = false;
                    }
                }
                if(curr.equals(stop3)){ //Check if codon is TGA
                    end = i;
                    if((end-found-3)%3 == 0){
                        StdOut.println(sequence.substring(found+3,end));
                        did = false;
                    } else {
                        did = false;
                    }
                }
            }
        }

    }



}
